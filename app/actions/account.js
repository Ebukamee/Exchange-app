"use server";

import { q } from "@/lib/db";
import { requireUser } from "@/lib/session";

const PROFILE_COLS =
  'id, email, full_name, wallet_address, bank_name, account_name, account_number, balance, is_admin, referral_code';

export async function getProfile() {
  const u = await requireUser();
  const rows = await q(`select ${PROFILE_COLS} from "user" where id = $1`, [u.id]);
  return rows[0] || null;
}

export async function updateProfile(fields) {
  const u = await requireUser();
  const allowed = ["full_name", "wallet_address", "bank_name", "account_name", "account_number"];
  const sets = [];
  const vals = [];
  let i = 1;
  for (const k of allowed) {
    if (k in fields) {
      sets.push(`${k} = $${i++}`);
      vals.push(fields[k]);
    }
  }
  if (!sets.length) return;
  vals.push(u.id);
  await q(`update "user" set ${sets.join(", ")} where id = $${i}`, vals);
  return getProfile();
}

export async function getReferrals() {
  const u = await requireUser();
  const rows = await q(
    `SELECT id, full_name, email, created_at FROM "user" WHERE referred_by = $1 ORDER BY created_at DESC`,
    [u.id]
  );
  return rows;
}

