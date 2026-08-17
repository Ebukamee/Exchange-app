"use server";

import { q } from "@/lib/db";
import { requireUser } from "@/lib/session";
import {
  getBillers,
  getBillerProducts,
  validateCustomer,
  vendBill,
} from "@/lib/monnify-vas";

const PHONE_RE = /^0[789][01]\d{8}$/;

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.billers)) return value.billers;
  if (Array.isArray(value?.products)) return value.products;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.result)) return value.result;
  // Support Monnify paginated shapes
  if (Array.isArray(value?.responseBody)) return value.responseBody;
  if (Array.isArray(value?.responseBody?.content)) return value.responseBody.content;

  const shallow = Object.values(value || {}).find(Array.isArray) || Object.values(value?.responseBody || {}).find(Array.isArray);
  if (shallow) return shallow;

  function findArray(obj, depth = 0) {
    if (depth > 2 || !obj || typeof obj !== "object") return null;
    for (const v of Object.values(obj)) {
      if (Array.isArray(v)) return v;
      if (typeof v === "object") {
        const res = findArray(v, depth + 1);
        if (res) return res;
      }
    }
    return null;
  }

  const rec = findArray(value);
  if (rec) return rec;

  return [];
}

function generateVendRef() {
  return `PP-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ── Fetch available providers from Monnify ──────────────────────────
export async function getAirtimeProviders() {
  const billers = toArray(await getBillers("AIRTIME"));
  return billers.map((b) => ({
    billerCode: b.billerCode,
    name: b.name || b.billerName,
  }));
}

export async function getDataProviders() {
  const billers = toArray(await getBillers("DATA"));
  return billers.map((b) => ({
    billerCode: b.billerCode,
    name: b.name || b.billerName,
  }));
}

export async function getElectricityProviders() {
  const billers = toArray(await getBillers("ELECTRICITY"));
  return billers.map((b) => ({
    billerCode: b.billerCode,
    name: b.name || b.billerName,
  }));
}

// ── Airtime ─────────────────────────────────────────────────────────
export async function buyAirtime({ billerCode, phone, amount }) {
  const u = await requireUser();
  if (!billerCode) throw new Error("Select a network provider");
  if (!PHONE_RE.test(phone)) throw new Error("Enter a valid 11-digit phone number");
  const amt = Number(amount);
  if (!amt || amt < 50 || amt > 50000) throw new Error("Amount must be between ₦50 and ₦50,000");

  const vendReference = generateVendRef();

  // Get the airtime product for this biller
  const products = toArray(await getBillerProducts(billerCode));
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
    [u.id, billerCode, phone, amt, vendReference]
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
      // Some airtime products may not require validation
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
export async function buyData({ billerCode, phone, productCode, amount }) {
  const u = await requireUser();
  if (!billerCode) throw new Error("Select a network provider");
  if (!PHONE_RE.test(phone)) throw new Error("Enter a valid 11-digit phone number");
  const amt = Number(amount);
  if (!amt || amt <= 0) throw new Error("Invalid amount");

  const vendReference = generateVendRef();

  // Atomic balance deduction
  const rows = await q(
    'UPDATE "user" SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance',
    [amt, u.id]
  );
  if (!rows.length) throw new Error("Insufficient balance");

  await q(
    `INSERT INTO bills (user_id, type, provider, phone_or_meter, variation_code, amount, request_id)
     VALUES ($1, 'data', $2, $3, $4, $5, $6)`,
    [u.id, billerCode, phone, productCode, amt, vendReference]
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
export async function verifyMeterNumber({ billerCode, meterNumber, meterType }) {
  await requireUser();
  if (!meterNumber || meterNumber.length < 6) throw new Error("Enter a valid meter number");
  if (!billerCode) throw new Error("Select a distribution company");

  // Get electricity products for this disco
  const products = toArray(await getBillerProducts(billerCode));
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

export async function buyElectricity({ billerCode, meterNumber, meterType, amount, productCode, validationReference }) {
  const u = await requireUser();
  if (!meterNumber || meterNumber.length < 6) throw new Error("Enter a valid meter number");
  if (!billerCode) throw new Error("Select a distribution company");
  const amt = Number(amount);
  if (!amt || amt < 500) throw new Error("Minimum amount is ₦500");

  const vendReference = generateVendRef();

  // If productCode not passed, look it up
  if (!productCode) {
    const products = toArray(await getBillerProducts(billerCode));
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
    [u.id, billerCode, meterNumber, meterType || "prepaid", amt, vendReference]
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
export async function getDataPlans(billerCode) {
  if (!billerCode) throw new Error("Select a provider first");
  const products = toArray(await getBillerProducts(billerCode));
  return products.map((p) => ({
    code: p.productCode,
    name: p.productName || p.name || p.productCode,
    amount: Number(p.amount || p.price || 0),
  }));
}

// ── Electricity variations lookup ───────────────────────────────────
export async function getElectricityVariations(billerCode) {
  const products = toArray(await getBillerProducts(billerCode));
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
