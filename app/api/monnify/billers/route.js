import { NextResponse } from "next/server";
import { getBillers } from "@/lib/monnify-vas";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category") || "ELECTRICITY";
    const data = await getBillers(category);
    return NextResponse.json({ ok: true, category, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
