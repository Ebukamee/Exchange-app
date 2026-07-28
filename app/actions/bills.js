"use server";

import { q } from "@/lib/db";
import { requireUser } from "@/lib/session";
import {
  getBillerProducts,
  validateCustomer,
  vendBill,
} from "@/lib/monnify-vas";

const AIRTIME_PROVIDERS = ["mtn", "glo", "airtel", "etisalat"];
const PHONE_RE = /^0[789][01]\d{8}$/;

function generateVendRef() {
  return `PP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Map our provider IDs to Monnify biller codes
// These may need adjustment once you see the actual biller codes from Monnify
const AIRTIME_BILLER_MAP = {
  mtn: "BIL100",
  glo: "BIL101",
  airtel: "BIL102",
  etisalat: "BIL103",
};

const DATA_BILLER_MAP = {
  mtn: "BIL108",
  glo: "BIL109",
  airtel: "BIL110",
  etisalat: "BIL111",
};

async function resolveBillerCode(category, providerKeyword) {
  // Try static map first for known providers
  if (category === "AIRTIME" && AIRTIME_BILLER_MAP[providerKeyword]) {
    return AIRTIME_BILLER_MAP[providerKeyword];
  }
  if (category === "DATA" && DATA_BILLER_MAP[providerKeyword]) {
    return DATA_BILLER_MAP[providerKeyword];
  }
  // Fallback: for electricity or unknown, the provider id IS the billerCode
  return providerKeyword;
}

// ── Airtime ─────────────────────────────────────────────────────────
export async function buyAirtime({ provider, phone, amount }) {
  const u = await requireUser();
  if (!AIRTIME_PROVIDERS.includes(provider)) throw new Error("Invalid provider");
  if (!PHONE_RE.test(phone)) throw new Error("Enter a valid 11-digit phone number");
  const amt = Number(amount);
  if (!amt || amt < 50 || amt > 50000) throw new Error("Amount must be between ₦50 and ₦50,000");

  const vendReference = generateVendRef();
  const billerCode = await resolveBillerCode("AIRTIME", provider);

  // Get the airtime product for this biller
  const products = await getBillerProducts(billerCode);
  if (!products.length) throw new Error("No airtime products found for this provider");
  const productCode = products[0].productCode;

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
    [u.id, provider, phone, amt, vendReference]
  );

  try {
    // Validate customer (phone number)
    let validationReference = null;
    try {
      const validation = await validateCustomer({ productCode, customerId: phone });
      if (validation?.vendInstruction?.requireValidationRef) {
        validationReference = validation.validationReference;
      }
    } catch {
      // Some airtime products may not require validation — proceed without
    }

    // Vend the airtime
    const res = await vendBill({
      productCode,
      customerId: phone,
      vendAmount: amt,
      vendReference,
      validationReference,
    });

    const status = res?.vendStatus || "PENDING";
    await q(
      `UPDATE bills SET vtpass_status = $1, vtpass_response = $2 WHERE request_id = $3`,
      [status === "SUCCESS" ? "delivered" : status.toLowerCase(), JSON.stringify(res), vendReference]
    );

    if (status === "FAILED") {
      await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
      await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [vendReference]);
      throw new Error("Airtime purchase failed. Your balance has been refunded.");
    }

    return { success: true, status: status === "SUCCESS" ? "delivered" : status.toLowerCase(), request_id: vendReference };
  } catch (err) {
    if (err.message.includes("refunded")) throw err;
    await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
    await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [vendReference]);
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

  const vendReference = generateVendRef();

  // variation_code here is the Monnify productCode for the selected data plan
  const productCode = variation_code;

  // Atomic balance deduction
  const rows = await q(
    'UPDATE "user" SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
    [amt, u.id]
  );
  if (!rows.length) throw new Error("Insufficient balance");

  await q(
    `INSERT INTO bills (user_id, type, provider, phone_or_meter, variation_code, amount, request_id)
     VALUES ($1, 'data', $2, $3, $4, $5, $6)`,
    [u.id, provider, phone, variation_code, amt, vendReference]
  );

  try {
    let validationReference = null;
    try {
      const validation = await validateCustomer({ productCode, customerId: phone });
      if (validation?.vendInstruction?.requireValidationRef) {
        validationReference = validation.validationReference;
      }
    } catch {
      // Proceed without validation if not required
    }

    const res = await vendBill({
      productCode,
      customerId: phone,
      vendAmount: amt,
      vendReference,
      validationReference,
    });

    const status = res?.vendStatus || "PENDING";
    await q(
      `UPDATE bills SET vtpass_status = $1, vtpass_response = $2 WHERE request_id = $3`,
      [status === "SUCCESS" ? "delivered" : status.toLowerCase(), JSON.stringify(res), vendReference]
    );

    if (status === "FAILED") {
      await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
      await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [vendReference]);
      throw new Error("Data purchase failed. Your balance has been refunded.");
    }

    return { success: true, status: status === "SUCCESS" ? "delivered" : status.toLowerCase(), request_id: vendReference };
  } catch (err) {
    if (err.message.includes("refunded")) throw err;
    await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
    await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [vendReference]);
    throw new Error("Data purchase failed. Your balance has been refunded.");
  }
}

// ── Electricity — Verify meter ──────────────────────────────────────
export async function verifyMeterNumber({ provider, meterNumber, meterType }) {
  await requireUser();
  if (!meterNumber || meterNumber.length < 6) throw new Error("Enter a valid meter number");

  // Get electricity products for this disco
  const products = await getBillerProducts(provider);
  // Find the product matching meter type (prepaid/postpaid)
  const product = products.find(
    (p) =>
      p.productCode?.toLowerCase().includes(meterType) ||
      p.productName?.toLowerCase().includes(meterType)
  ) || products[0];

  if (!product) throw new Error("No electricity products found for this provider");

  const result = await validateCustomer({
    productCode: product.productCode,
    customerId: meterNumber,
  });

  if (!result?.customerName && !result?.name) {
    throw new Error("Could not verify meter. Check the number and try again.");
  }

  return {
    customerName: result.customerName || result.name || "",
    address: result.address || result.Address || "",
    productCode: product.productCode,
    validationReference: result.validationReference || null,
    requireValidationRef: result?.vendInstruction?.requireValidationRef || false,
  };
}

export async function buyElectricity({ provider, meterNumber, meterType, amount, productCode, validationReference }) {
  const u = await requireUser();
  if (!meterNumber || meterNumber.length < 6) throw new Error("Enter a valid meter number");
  const amt = Number(amount);
  if (!amt || amt < 500) throw new Error("Minimum amount is ₦500");

  const vendReference = generateVendRef();

  // If productCode not passed, look it up
  if (!productCode) {
    const products = await getBillerProducts(provider);
    const product = products.find(
      (p) =>
        p.productCode?.toLowerCase().includes(meterType || "prepaid") ||
        p.productName?.toLowerCase().includes(meterType || "prepaid")
    ) || products[0];
    if (!product) throw new Error("No electricity products found");
    productCode = product.productCode;
  }

  const rows = await q(
    'UPDATE "user" SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
    [amt, u.id]
  );
  if (!rows.length) throw new Error("Insufficient balance");

  await q(
    `INSERT INTO bills (user_id, type, provider, phone_or_meter, variation_code, amount, request_id)
     VALUES ($1, 'electricity', $2, $3, $4, $5, $6)`,
    [u.id, provider, meterNumber, meterType || "prepaid", amt, vendReference]
  );

  try {
    const res = await vendBill({
      productCode,
      customerId: meterNumber,
      vendAmount: amt,
      vendReference,
      validationReference: validationReference || undefined,
    });

    const status = res?.vendStatus || "PENDING";
    // Monnify may return token in the response for prepaid meters
    const token = res?.token || res?.creditToken || res?.tokenCode || null;

    await q(
      `UPDATE bills SET vtpass_status = $1, vtpass_response = $2, token = $3 WHERE request_id = $4`,
      [status === "SUCCESS" ? "delivered" : status.toLowerCase(), JSON.stringify(res), token, vendReference]
    );

    if (status === "FAILED") {
      await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
      await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [vendReference]);
      throw new Error("Electricity purchase failed. Your balance has been refunded.");
    }

    return { success: true, status: status === "SUCCESS" ? "delivered" : status.toLowerCase(), token, request_id: vendReference };
  } catch (err) {
    if (err.message.includes("refunded")) throw err;
    await q('UPDATE "user" SET balance = balance + $1 WHERE id = $2', [amt, u.id]);
    await q(`UPDATE bills SET vtpass_status = 'failed' WHERE request_id = $1`, [vendReference]);
    throw new Error("Electricity purchase failed. Your balance has been refunded.");
  }
}

// ── Data plans lookup ───────────────────────────────────────────────
export async function getDataPlans(provider) {
  if (!AIRTIME_PROVIDERS.includes(provider)) throw new Error("Invalid provider");
  const billerCode = await resolveBillerCode("DATA", provider);
  const products = await getBillerProducts(billerCode);
  return products.map((p) => ({
    code: p.productCode,
    name: p.productName || p.name || p.productCode,
    amount: Number(p.amount || p.price || 0),
  }));
}

// ── Electricity variations lookup ───────────────────────────────────
export async function getElectricityVariations(provider) {
  const products = await getBillerProducts(provider);
  return products.map((p) => ({
    code: p.productCode,
    name: p.productName || p.name || p.productCode,
    amount: p.amount ? Number(p.amount) : null,
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
