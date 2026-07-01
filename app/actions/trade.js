"use server";

import { randomUUID } from "crypto";
import { q } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { supabaseAdmin, PROOFS_BUCKET } from "@/lib/storage";

// Upload proof images (sent as FormData 'files'). Returns public URLs.
export async function uploadProofs(formData) {
  const u = await requireUser();
  const files = formData.getAll("files");
  const urls = [];
  for (const file of files) {
    if (!file || typeof file === "string") continue;
    const ext = (file.name?.split(".").pop() || "png").toLowerCase();
    const path = `${u.id}/${randomUUID()}.${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    const { error } = await supabaseAdmin.storage
      .from(PROOFS_BUCKET)
      .upload(path, buf, { contentType: file.type || "image/png", upsert: false });
    if (error) throw new Error(error.message);
    const { data } = supabaseAdmin.storage.from(PROOFS_BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}

export async function createTransaction(p) {
  const u = await requireUser();
  const rows = await q(
    `insert into transactions
      (user_id, type, asset_name, icon_url, sub_category, country, amount, rate, payout, payment_method, wallet_address, description, images, status)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
     returning *`,
    [
      u.id, p.type, p.asset_name, p.icon_url, p.sub_category || null, p.country || null,
      p.amount || 0, p.rate || 0, p.payout || 0, p.payment_method || null,
      p.wallet_address || null, p.description || null, JSON.stringify(p.images || []),
      p.status || "pending",
    ]
  );
  return rows[0];
}

export async function buyWithBalance({ asset_name, icon_url, amount, rate, payout, wallet_address }) {
  const u = await requireUser();
  const rows = await q('select balance from "user" where id = $1', [u.id]);
  if (!rows[0] || Number(rows[0].balance) < Number(payout)) throw new Error("Insufficient balance");
  await q('update "user" set balance = balance - $1 where id = $2', [payout, u.id]);
  return createTransaction({
    type: "buy_crypto", asset_name, icon_url, amount, rate, payout,
    wallet_address, payment_method: "balance", status: "approved",
  });
}

export async function requestWithdrawal({ amount, bank_name, account_name, account_number }) {
  const u = await requireUser();
  const rows = await q('select balance from "user" where id = $1', [u.id]);
  if (!rows[0] || Number(rows[0].balance) < Number(amount)) throw new Error("Insufficient balance");
  await q('update "user" set balance = balance - $1 where id = $2', [amount, u.id]);
  const w = await q(
    `insert into withdrawals (user_id, amount, bank_name, account_name, account_number)
     values ($1,$2,$3,$4,$5) returning *`,
    [u.id, amount, bank_name, account_name, account_number]
  );
  return w[0];
}

export async function getMyTransactions() {
  const u = await requireUser();
  return q("select * from transactions where user_id = $1 order by created_at desc", [u.id]);
}

export async function getMyWithdrawals() {
  const u = await requireUser();
  return q("select * from withdrawals where user_id = $1 order by created_at desc", [u.id]);
}
