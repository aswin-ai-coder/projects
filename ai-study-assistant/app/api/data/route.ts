import { NextResponse } from "next/server";

const allowed = new Set(["GET", "POST", "PUT", "DELETE"]);

export async function GET() {
  return NextResponse.json({ ok: true, message: "Local-first data API ready." });
}
export async function POST(request: Request) {
  if (!allowed.has("POST")) return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  try { const body = await request.json(); return NextResponse.json({ ok: true, data: body }, { status: 201 }); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
}
