import { NextResponse } from "next/server";
import { getBillerProducts } from "@/lib/monnify-vas";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const billerCode = url.searchParams.get("billerCode");
    if (!billerCode) return NextResponse.json({ ok: false, error: "Missing billerCode" }, { status: 400 });
    const data = await getBillerProducts(billerCode);
    return NextResponse.json({ ok: true, billerCode, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
