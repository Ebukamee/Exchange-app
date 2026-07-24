const BASE = process.env.VTPASS_BASE_URL || "https://sandbox.vtpass.com";
const API_KEY = process.env.VTPASS_API_KEY || "";
const SECRET_KEY = process.env.VTPASS_SECRET_KEY || "";

const headers = {
  "api-key": API_KEY,
  "secret-key": SECRET_KEY,
  "Content-Type": "application/json",
};

async function vtFetch(path, { method = "GET", body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`VTpass ${res.status}: ${res.statusText}`);
  return res.json();
}

export async function getVariations(serviceID) {
  const data = await vtFetch(`/api/service-variations?serviceID=${serviceID}`);
  return data?.content?.variations ?? [];
}

export async function verifyMeter(serviceID, billersCode, type) {
  const data = await vtFetch("/api/merchant-verify", {
    method: "POST",
    body: { billersCode, serviceID, type },
  });
  if (data?.content?.error) throw new Error(data.content.error);
  return data?.content ?? null;
}

export async function purchaseBill({ serviceID, billersCode, variation_code, amount, phone, request_id }) {
  const data = await vtFetch("/api/pay", {
    method: "POST",
    body: { request_id, serviceID, billersCode, variation_code, amount, phone },
  });
  return data;
}

export async function requery(request_id) {
  const data = await vtFetch("/api/requery", {
    method: "POST",
    body: { request_id },
  });
  return data;
}
