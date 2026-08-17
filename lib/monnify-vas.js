const BASE = process.env.MONNIFY_BASE_URL || "https://sandbox.monnify.com";
const API_KEY = process.env.MONNIFY_API_KEY || "";
const SECRET_KEY = process.env.MONNIFY_SECRET_KEY || "";

let tokenCache = { token: null, expiresAt: 0 };

function normalizeList(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.responseBody)) return value.responseBody;
  // Monnify often returns paginated shapes with `responseBody.content`
  if (Array.isArray(value?.responseBody?.content)) return value.responseBody.content;
  if (Array.isArray(value?.responseBody?.billers)) return value.responseBody.billers;
  if (Array.isArray(value?.responseBody?.products)) return value.responseBody.products;
  if (Array.isArray(value?.responseBody?.data)) return value.responseBody.data;
  if (Array.isArray(value?.responseBody?.result)) return value.responseBody.result;

  // Check immediate children for arrays (shallow)
  const shallow = Object.values(value || {}).find(Array.isArray) || Object.values(value?.responseBody || {}).find(Array.isArray);
  if (shallow) return shallow;

  // As a last resort, recursively search up to depth 2 for the first array
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

async function getAccessToken() {
  if (tokenCache.token && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const credentials = Buffer.from(`${API_KEY}:${SECRET_KEY}`).toString("base64");
  const res = await fetch(`${BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(`Monnify auth failed: ${res.status}`);
  const data = await res.json();

  if (!data?.responseBody?.accessToken) {
    throw new Error("Monnify auth: no access token returned");
  }

  // Cache token with 1 minute buffer before expiry
  tokenCache = {
    token: data.responseBody.accessToken,
    expiresAt: Date.now() + (data.responseBody.expiresIn - 60) * 1000,
  };

  return tokenCache.token;
}

function logMonnifyShape(label, value) {
  const payload = value && typeof value === "object" ? value : { value };
  const keys = payload && typeof payload === "object" ? Object.keys(payload) : [];
  console.log(`[Monnify Debug] ${label}`, {
    isArray: Array.isArray(value),
    type: value === null ? "null" : typeof value,
    keys,
    responseBodyType: value?.responseBody === undefined ? "undefined" : typeof value?.responseBody,
    responseBodyIsArray: Array.isArray(value?.responseBody),
    responseBodyLength: Array.isArray(value?.responseBody) ? value.responseBody.length : undefined,
    raw: value,
  });
}

async function monnifyFetch(path, { method = "GET", body } = {}) {
  const token = await getAccessToken();
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Monnify ${res.status}: ${text || res.statusText}`);
  }

  const data = await res.json();
  logMonnifyShape(path, data);
  return data;
}

// Step 1: Get biller categories
export async function getCategories() {
  const data = await monnifyFetch("/api/v1/vas/bills-payment/biller-categories");
  return normalizeList(data);
}

// Step 2: List billers for a category
export async function getBillers(categoryCode) {
  const data = await monnifyFetch(`/api/v1/vas/bills-payment/billers?category_code=${categoryCode}`);
  return normalizeList(data);
}

// Step 3: Get products for a biller
export async function getBillerProducts(billerCode) {
  const data = await monnifyFetch(`/api/v1/vas/bills-payment/biller-products?biller_code=${billerCode}`);
  return normalizeList(data);
}

// Step 4: Validate customer
export async function validateCustomer({ productCode, customerId }) {
  const data = await monnifyFetch("/api/v1/vas/bills-payment/validate-customer", {
    method: "POST",
    body: { productCode, customerId },
  });
  return data?.responseBody ?? null;
}

// Step 5: Vend / process bill payment
export async function vendBill({ productCode, customerId, vendAmount, vendReference, validationReference }) {
  const body = { productCode, customerId, vendAmount, vendReference };
  if (validationReference) body.validationReference = validationReference;

  const data = await monnifyFetch("/api/v1/vas/bills-payment/vend", {
    method: "POST",
    body,
  });
  return data?.responseBody ?? null;
}

// Step 6: Check transaction status
export async function requeryBill(vendReference) {
  const data = await monnifyFetch(`/api/v1/vas/bills-payment/requery?vendReference=${encodeURIComponent(vendReference)}`);
  return data?.responseBody ?? null;
}
