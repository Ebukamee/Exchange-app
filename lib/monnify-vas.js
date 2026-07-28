const BASE = process.env.MONNIFY_BASE_URL || "https://sandbox.monnify.com";
const API_KEY = process.env.MONNIFY_API_KEY || "";
const SECRET_KEY = process.env.MONNIFY_SECRET_KEY || "";

let tokenCache = { token: null, expiresAt: 0 };

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

  return res.json();
}

// Step 1: Get biller categories
export async function getCategories() {
  const data = await monnifyFetch("/api/v1/vas/bills-payment/biller-categories");
  return data?.responseBody ?? [];
}

// Step 2: List billers for a category
export async function getBillers(categoryCode) {
  const data = await monnifyFetch(`/api/v1/vas/bills-payment/billers?category_code=${categoryCode}`);
  return data?.responseBody ?? [];
}

// Step 3: Get products for a biller
export async function getBillerProducts(billerCode) {
  const data = await monnifyFetch(`/api/v1/vas/bills-payment/biller-products?biller_code=${billerCode}`);
  return data?.responseBody ?? [];
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
