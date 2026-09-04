import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession } from "../../../../server/auth";
import db from "../../../../server/db";

async function user(){const sid=(await cookies()).get("study_session")?.value;return sid?getSession(sid):null;}
export async function GET(){const u=await user();if(!u)return NextResponse.json({error:"Unauthorized"},{status:401});return NextResponse.json({data:{id:u.user_id,email:u.email,displayName:u.display_name}})}
export async function PATCH(req:Request){const u=await user();if(!u)return NextResponse.json({error:"Unauthorized"},{status:401});const b=await req.json().catch(()=>({}));const name=String(b.displayName||"").trim().slice(0,80);if(!name)return NextResponse.json({error:"Display name is required"},{status:400});db.prepare("UPDATE users SET display_name=? WHERE id=?").run(name,u.user_id);return NextResponse.json({data:{id:u.user_id,email:u.email,displayName:name}})}
