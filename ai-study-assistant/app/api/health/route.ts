import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"ai-study-assistant",timestamp:new Date().toISOString()})}
