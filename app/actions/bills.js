"use server";

import { q } from "@/lib/db";
import { requireUser } from "@/lib/session";
import { purchaseBill, getVariations as vtGetVariations, verifyMeter as vtVerifyMeter } from "@/lib/vtpass";

const AIRTIME_PROVIDERS = ["mtn", "glo", "airtel", "etisalat"];
const PHONE_RE = /^0[789][01]\d{8}$/;

function generateRequestId() {
  return `PP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ── Airtime ─────────────────────────────────────────────────────────
export async function buyAirtime({ provider, phone, amount }) {
  const u = await requireUser();
  if (!AIRTIME_PROVIDERS.includes(provider)) throw new Error("Invalid provider");
  if (!PHONE_RE.test(phone)) throw new Error("Enter a valid 11-digit phone number");
  const amt = Number(amount);
  if (!amt || amt < 50 || amt > 50000) throw new Error("Amount must be between ₦50 and ₦50,000");

  const request_id = generateRequestId();

  // Atomic balance deduction
  const rows = await q(
    'UPDATE "user" SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
    [amt, u.id]
  );
  if (!rows.length) throw new Error("Insufficient balance");

  // Insert pending bill
  await q(
    `INSERT INTO bills (user_id, type, provider, phone_or_meter, amount, request_id)
     VALUES ($1, 'airtime', $2, $3, $4, $5)`,
    [u.id, provider, phone, amt, request_id]
  );

  try {
    const res = await purchaseBill({
      serviceID: provider,
      phone,
      amount: amt,
      request_id,
    });

    const status = res?.content?.transactions?.status || "pending";
    await q(
      `UPDATE bills SET vtpass_status = $1, vtpass_response = $2 WHERE request_id = $3`,
      [status === "delivered" ? "delivered" : status, JSON.stringify(res), request_id]
    );

    if (status !== "delivered" && status !== "initiated") {
      // Refund on failure
      await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
      await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [request_id]);
      throw new Error("Airtime purchase failed. Your balance has been refunded.");
    }

    return { success: true, status, request_id };
  } catch (err) {
    if (err.message.includes("refunded")) throw err;
    // Network / unexpected error — refund
    await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
    await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [request_id]);
    throw new Error("Airtime purchase failed. Your balance has been refunded.");
  }
}

// ── Data ────────────────────────────────────────────────────────────
export async function buyData({ provider, phone, variation_code, amount }) {
  const u = await requireUser();
  if (!AIRTIME_PROVIDERS.includes(provider)) throw new Error("Invalid provider");
  if (!PHONE_RE.test(phone)) throw new Error("Enter a valid 11-digit phone number");
  const amt = Number(amount);
  if (!amt || amt <= 0) throw new Error("Invalid amount");

  const request_id = generateRequestId();

  const rows = await q(
    'UPDATE "user" SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
    [amt, u.id]
  );
  if (!rows.length) throw new Error("Insufficient balance");

  await q(
    `INSERT INTO bills (user_id, type, provider, phone_or_meter, variation_code, amount, request_id)
     VALUES ($1, 'data', $2, $3, $4, $5, $6)`,
    [u.id, provider, phone, variation_code, amt, request_id]
  );

  try {
    const res = await purchaseBill({
      serviceID: provider + "-data",
      phone,
      variation_code,
      amount: amt,
      request_id,
    });

    const status = res?.content?.transactions?.status || "pending";
    await q(
      `UPDATE bills SET vtpass_status = $1, vtpass_response = $2 WHERE request_id = $3`,
      [status === "delivered" ? "delivered" : status, JSON.stringify(res), request_id]
    );

    if (status !== "delivered" && status !== "initiated") {
      await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
      await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [request_id]);
      throw new Error("Data purchase failed. Your balance has been refunded.");
    }

    return { success: true, status, request_id };
  } catch (err) {
    if (err.message.includes("refunded")) throw err;
    await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
    await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [request_id]);
    throw new Error("Data purchase failed. Your balance has been refunded.");
  }
}

// ── Electricity ─────────────────────────────────────────────────────
export async function verifyMeterNumber({ provider, meterNumber, meterType }) {
  await requireUser();
  if (!meterNumber || meterNumber.length < 6) throw new Error("Enter a valid meter number");
  const result = await vtVerifyMeter(provider, meterNumber, meterType);
  if (!result?.Customer_Name) throw new Error("Could not verify meter. Check the number and try again.");
  return { customerName: result.Customer_Name, address: result.Address || "" };
}

export async function buyElectricity({ provider, meterNumber, meterType, amount }) {
  const u = await requireUser();
  if (!meterNumber || meterNumber.length < 6) throw new Error("Enter a valid meter number");
  const amt = Number(amount);
  if (!amt || amt < 500) throw new Error("Minimum amount is ₦500");

  const variation_code = meterType || "prepaid";
  const request_id = generateRequestId();

  const rows = await q(
    'UPDATE "user" SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
    [amt, u.id]
  );
  if (!rows.length) throw new Error("Insufficient balance");

  await q(
    `INSERT INTO bills (user_id, type, provider, phone_or_meter, variation_code, amount, request_id)
     VALUES ($1, 'electricity', $2, $3, $4, $5, $6)`,
    [u.id, provider, meterNumber, variation_code, amt, request_id]
  );

  try {
    const res = await purchaseBill({
      serviceID: provider,
      billersCode: meterNumber,
      variation_code,
      amount: amt,
      phone: meterNumber,
      request_id,
    });

    const status = res?.content?.transactions?.status || "pending";
    const token = res?.purchased_code || res?.token || res?.content?.transactions?.unique_element || null;

    await q(
      `UPDATE bills SET vtpass_status = $1, vtpass_response = $2, token = $3 WHERE request_id = $4`,
      [status === "delivered" ? "delivered" : status, JSON.stringify(res), token, request_id]
    );

    if (status !== "delivered" && status !== "initiated") {
      await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
      await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [request_id]);
      throw new Error("Electricity purchase failed. Your balance has been refunded.");
    }

    return { success: true, status, token, request_id };
  } catch (err) {
    if (err.message.includes("refunded")) throw err;
    await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
    await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [request_id]);
    throw new Error("Electricity purchase failed. Your balance has been refunded.");
  }
}

// ── Data plans lookup ───────────────────────────────────────────────
export async function getDataPlans(provider) {
  if (!AIRTIME_PROVIDERS.includes(provider)) throw new Error("Invalid provider");
  const variations = await vtGetVariations(provider + "-data");
  return variations.map((v) => ({
    code: v.variation_code,
    name: v.name,
    amount: Number(v.variation_amount),
  }));
}

// ── Electricity variations lookup ───────────────────────────────────
export async function getElectricityVariations(provider) {
  const variations = await vtGetVariations(provider);
  return variations.map((v) => ({
    code: v.variation_code,
    name: v.name,
    amount: v.variation_amount === "0" ? null : Number(v.variation_amount),
  }));
}

// ── Bill history ────────────────────────────────────────────────────
export async function getBillHistory() {
  const u = await requireUser();
  return q(
    `SELECT id, type, provider, phone_or_meter, variation_code, amount, vtpass_status, token, created_at
     FROM bills WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [u.id]
  );
}
