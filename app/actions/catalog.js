"use server";

import { q } from "@/lib/db";

// Public reads for the catalogue + deposit bank.
export async function getCryptos() {
  return q("select * from cryptocurrencies order by created_at asc");
}

export async function getGiftcards() {
  return q("select * from giftcards order by created_at asc");
}

export async function getDepositBank() {
  const rows = await q("select value from settings where key='deposit_bank'");
  return rows[0]?.value ?? null;
}

