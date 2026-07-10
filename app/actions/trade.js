"use server";

import { randomUUID } from "crypto";
import { q } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { supabaseAdmin, PROOFS_BUCKET } from "@/lib/storage";
import { sendNotice } from "@/lib/email";
import { naira, txTypeLabel } from "@/src/Helper/format.js";

// ── Constants ──────────────────────────────────────────────────────
const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MIN_WITHDRAWAL = 1000; // Naira

// ── Idempotency guard (in-memory, single-instance) ────────────────
const _idemCache = new Map();
const IDEM_TTL = 60_000;

function checkIdempotency(userId, key) {
  if (!key) return;
  const k = `${userId}:${key}`;
  const entry = _idemCache.get(k);
  if (entry && Date.now() - entry < IDEM_TTL) {
    throw new Error("Duplicate request — please wait and try again.");
  }
  _idemCache.set(k, Date.now());
  if (_idemCache.size > 1000) {
    const now = Date.now();
    for (const [ck, ts] of _idemCache) {
      if (now - ts > IDEM_TTL) _idemCache.delete(ck);
    }
  }
}

// ── Magic-byte image validation ───────────────────────────────────
function detectImageType(buf) {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpeg";
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return "png";
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) return "webp";
  return null;
}

const CONTENT_TYPES = { jpeg: "image/jpeg", png: "image/png", webp: "image/webp" };

// ── Server-side price lookups ─────────────────────────────────────
async function lookupCryptoPrice(assetName, direction) {
  const rows = await q(
    "select buy_price, sell_price, enabled from cryptocurrencies where name = $1",
    [assetName]
  );
  if (!rows.length) throw new Error("Asset not found");
  if (!rows[0].enabled) throw new Error("Asset is currently disabled");
  return Number(direction === "buy" ? rows[0].buy_price : rows[0].sell_price);
}

async function lookupGiftcardRate(assetName, subCategory) {
  const rows = await q(
    "select subcategories, enabled from giftcards where name = $1",
    [assetName]
  );
  if (!rows.length) throw new Error("Gift card not found");
  if (!rows[0].enabled) throw new Error("Gift card is currently disabled");
  const subs = rows[0].subcategories;
  const match = Array.isArray(subs) ? subs.find((s) => s.name === subCategory) : null;
  if (!match) throw new Error("Subcategory not found");
  return Number(match.rate);
}

// ── Internal insert (NOT exported) ────────────────────────────────
async function _insertTransaction(userId, email, p) {
  const rows = await q(
    `insert into transactions
      (user_id, type, asset_name, icon_url, sub_category, country, amount, rate, payout, payment_method, wallet_address, description, images, status)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::trade_status)
     returning *`,
    [
      userId, p.type, p.asset_name, p.icon_url || null, p.sub_category || null, p.country || null,
      p.amount, p.rate, p.payout, p.payment_method || null,
      p.wallet_address || null, p.description || null, JSON.stringify(p.images || []),
      p.status,
    ]
  );
  const tx = rows[0];
  try {
    const label = txTypeLabel(tx.type);
    const st = tx.status === "confirmed" ? "confirmed" : "submitted and is pending review";
    await sendNotice(
      email,
      `${label} transaction ${tx.status === "confirmed" ? "confirmed" : "received"}`,
      `Your ${label} transaction for ${tx.asset_name} (${naira(tx.payout)}) has been ${st}. You can track its progress from your dashboard.`
    );
  } catch (e) {
    console.error("transaction email failed", e.message);
  }
  return tx;
}

// ── Exported actions ──────────────────────────────────────────────

// Upload proof images. Returns storage paths (not public URLs).
export async function uploadProofs(formData) {
  const u = await requireUser();
  const files = formData.getAll("files").filter((f) => f && typeof f !== "string");
  if (files.length === 0) throw new Error("No files provided");
  if (files.length > MAX_FILES) throw new Error(`Maximum ${MAX_FILES} files allowed`);

  const paths = [];
  for (const file of files) {
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length > MAX_FILE_SIZE) throw new Error(`File "${file.name}" exceeds 5 MB limit`);
    const type = detectImageType(buf);
    if (!type) throw new Error(`File "${file.name}" is not a valid JPEG, PNG, or WebP image`);

    const ext = type === "jpeg" ? "jpg" : type;
    const path = `${u.id}/${randomUUID()}.${ext}`;
    const { error } = await supabaseAdmin.storage
      .from(PROOFS_BUCKET)
      .upload(path, buf, { contentType: CONTENT_TYPES[type], upsert: false });
    if (error) throw new Error(error.message);
    paths.push(path);
  }
  return paths;
}

// Create a trade — rate & payout are always computed server-side, status forced to "pending".
export async function createTransaction(p) {
  const u = await requireUser();
  checkIdempotency(u.id, p.idempotency_key);

  const amount = Number(p.amount);
  if (!amount || amount <= 0) throw new Error("Amount must be greater than zero");

  let rate, payout;
  if (p.type === "sell_crypto") {
    rate = await lookupCryptoPrice(p.asset_name, "sell");
    payout = Math.round(amount * rate * 100) / 100;
  } else if (p.type === "sell_giftcard") {
    if (!p.sub_category) throw new Error("Subcategory is required");
    rate = await lookupGiftcardRate(p.asset_name, p.sub_category);
    payout = Math.round(amount * rate * 100) / 100;
  } else if (p.type === "buy_crypto") {
    rate = await lookupCryptoPrice(p.asset_name, "buy");
    payout = Math.round(amount * rate * 100) / 100;
  } else {
    throw new Error("Invalid transaction type");
  }

  return _insertTransaction(u.id, u.email, {
    type: p.type, asset_name: p.asset_name, icon_url: p.icon_url,
    sub_category: p.sub_category, country: p.country,
    amount, rate, payout,
    payment_method: p.payment_method, wallet_address: p.wallet_address,
    description: p.description, images: p.images || [],
    status: "pending",
  });
}

// Buy crypto with Powerpay balance — rate looked up server-side, status "confirmed".
export async function buyWithBalance({ asset_name, icon_url, amount, wallet_address, idempotency_key }) {
  const u = await requireUser();
  checkIdempotency(u.id, idempotency_key);

  const qty = Number(amount);
  if (!qty || qty <= 0) throw new Error("Amount must be greater than zero");

  const rate = await lookupCryptoPrice(asset_name, "buy");
  const payout = Math.round(qty * rate * 100) / 100;

  const rows = await q(
    'update "user" set balance = balance - $1 where id = $2 and balance >= $1 returning balance',
    [payout, u.id]
  );
  if (!rows.length) throw new Error("Insufficient balance");

  return _insertTransaction(u.id, u.email, {
    type: "buy_crypto", asset_name, icon_url, amount: qty, rate, payout,
    wallet_address, payment_method: "balance", status: "confirmed", images: [],
  });
}

// Request a withdrawal to bank.
export async function requestWithdrawal({ amount, bank_name, account_name, account_number, idempotency_key }) {
  const u = await requireUser();
  checkIdempotency(u.id, idempotency_key);

  const numAmount = Number(amount);
  if (!numAmount || numAmount <= 0) throw new Error("Invalid amount");
  if (numAmount < MIN_WITHDRAWAL) throw new Error(`Minimum withdrawal is ${naira(MIN_WITHDRAWAL)}`);

  const rows = await q(
    'update "user" set balance = balance - $1 where id = $2 and balance >= $1 returning balance',
    [numAmount, u.id]
  );
  if (!rows.length) throw new Error("Insufficient balance");
  const w = await q(
    `insert into withdrawals (user_id, amount, bank_name, account_name, account_number)
     values ($1,$2,$3,$4,$5) returning *`,
    [u.id, numAmount, bank_name, account_name, account_number]
  );
  try {
    await sendNotice(
      u.email,
      "Withdrawal request received",
      `Your withdrawal of ${naira(numAmount)} to ${bank_name} (${account_number}) has been submitted and is pending review.`
    );
  } catch (e) {
    console.error("withdrawal email failed", e.message);
  }
  return w[0];
}

// Get signed URLs for proof image paths (handles both raw paths and legacy full URLs).
export async function getSignedProofUrls(paths) {
  await requireUser();
  if (!Array.isArray(paths) || paths.length === 0) return [];
  const base = supabaseAdmin.storage.from(PROOFS_BUCKET).getPublicUrl("").data.publicUrl;
  const cleaned = paths.map((p) => (p.startsWith("http") ? p.replace(base, "") : p));
  const { data, error } = await supabaseAdmin.storage.from(PROOFS_BUCKET).createSignedUrls(cleaned, 300);
  if (error) throw new Error(error.message);
  return data.map((d) => d.signedUrl);
}

export async function getMyTransactions() {
  const u = await requireUser();
  return q("select * from transactions where user_id = $1 order by created_at desc", [u.id]);
}

export async function getMyWithdrawals() {
  const u = await requireUser();
  return q("select * from withdrawals where user_id = $1 order by created_at desc", [u.id]);
}
