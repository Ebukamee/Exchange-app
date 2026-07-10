"use server";

import { q } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { sendNotice } from "@/lib/email";
import { naira } from "@/src/Helper/format.js";

// ---------- Transactions ----------
export async function adminGetTransactions() {
  await requireAdmin();
  return q(
    `select t.*, u.full_name, u.email
     from transactions t left join "user" u on u.id = t.user_id
     order by t.created_at desc`
  );
}

export async function reviewTransaction(txId, status) {
  await requireAdmin();
  const updated = await q(
    "update transactions set status = $1::trade_status where id = $2 and status = 'pending'::trade_status returning *",
    [status, txId]
  );
  if (!updated.length) throw new Error("Transaction already reviewed");
  const tx = updated[0];
  if (status === "confirmed" && tx.type !== "buy_crypto") {
    await q('update "user" set balance = balance + $1 where id = $2', [Number(tx.payout), tx.user_id]);
  }
  const rows = await q('select email from "user" where id = $1', [tx.user_id]);
  if (rows[0]?.email) {
    try {
      await sendNotice(
        rows[0].email,
        `Your trade was ${status}`,
        `Your ${tx.asset_name} transaction of ${naira(tx.payout)} has been ${status}.`
      );
    } catch (e) {
      console.error("notice email failed", e.message);
    }
  }
}

// ---------- Withdrawals ----------
export async function adminGetWithdrawals() {
  await requireAdmin();
  return q(
    `select w.*, u.full_name, u.email
     from withdrawals w left join "user" u on u.id = w.user_id
     order by w.created_at desc`
  );
}

export async function reviewWithdrawal(wdId, status) {
  await requireAdmin();
  const updated = await q(
    "update withdrawals set status = $1::trade_status where id = $2 and status = 'pending'::trade_status returning *",
    [status, wdId]
  );
  if (!updated.length) throw new Error("Withdrawal already reviewed");
  const wd = updated[0];
  if (status === "rejected") {
    await q('update "user" set balance = balance + $1 where id = $2', [Number(wd.amount), wd.user_id]);
  }
  const rows = await q('select email from "user" where id = $1', [wd.user_id]);
  if (rows[0]?.email) {
    try {
      const msg = status === "confirmed"
        ? `Your withdrawal of ${naira(wd.amount)} to ${wd.bank_name} (${wd.account_number}) has been confirmed and is being processed.`
        : `Your withdrawal of ${naira(wd.amount)} has been rejected. The funds have been returned to your balance.`;
      await sendNotice(rows[0].email, `Withdrawal ${status}`, msg);
    } catch (e) {
      console.error("withdrawal email failed", e.message);
    }
  }
}

// ---------- Users ----------
export async function adminGetUsers() {
  await requireAdmin();
  return q(
    `select id, email, full_name, wallet_address, bank_name, account_name,
            account_number, balance, is_admin, "createdAt" as created_at
     from "user" order by "createdAt" desc`
  );
}

export async function toggleAdmin(userId, makeAdmin) {
  await requireAdmin();
  await q('update "user" set is_admin = $1 where id = $2', [!!makeAdmin, userId]);
}

// ---------- Catalogue ----------
function buildUpsert(table, payload, columns) {
  const keys = columns.filter((c) => c in payload);
  if (payload.id) {
    const sets = keys.map((k, i) => `${k} = $${i + 1}`);
    const vals = keys.map((k) => payload[k]);
    vals.push(payload.id);
    return { text: `update ${table} set ${sets.join(", ")} where id = $${vals.length}`, vals };
  }
  const cols = keys.join(", ");
  const ph = keys.map((_, i) => `$${i + 1}`).join(", ");
  return { text: `insert into ${table} (${cols}) values (${ph})`, vals: keys.map((k) => payload[k]) };
}

export async function saveCrypto(payload) {
  await requireAdmin();
  const { text, vals } = buildUpsert("cryptocurrencies", payload, [
    "name", "symbol", "icon_url", "buy_price", "sell_price", "deposit_address", "enabled",
  ]);
  await q(text, vals);
}

export async function deleteCrypto(id) {
  await requireAdmin();
  await q("delete from cryptocurrencies where id = $1", [id]);
}

export async function saveGiftcard(payload) {
  await requireAdmin();
  if (payload.subcategories) payload.subcategories = JSON.stringify(payload.subcategories);
  const { text, vals } = buildUpsert("giftcards", payload, ["name", "icon_url", "subcategories", "enabled"]);
  await q(text, vals);
}

export async function deleteGiftcard(id) {
  await requireAdmin();
  await q("delete from giftcards where id = $1", [id]);
}

export async function saveDepositBank(value) {
  await requireAdmin();
  await q("update settings set value = $1 where key = 'deposit_bank'", [JSON.stringify(value)]);
}

