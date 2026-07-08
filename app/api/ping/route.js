export async function GET() {
  return new Response(JSON.stringify({ ok: true, route: "/api/ping" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export async function POST() {
  return new Response(JSON.stringify({ ok: true, route: "/api/ping", method: "POST" }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
