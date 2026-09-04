import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {getSession} from "../../../../../server/auth";
import db from "../../../../../server/db";

async function user(){const id=(await cookies()).get("study_session")?.value;return id?getSession(id):null}

export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
  const u=await user();if(!u)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await params;
  const conversation=db.prepare("SELECT id,title,created_at,updated_at FROM ai_conversations WHERE id=? AND user_id=?").get(id,u.user_id);
  if(!conversation)return NextResponse.json({error:"Conversation not found."},{status:404});
  const messages=db.prepare("SELECT id,role,content,created_at FROM ai_messages WHERE conversation_id=? ORDER BY created_at ASC").all(id);
  return NextResponse.json({conversation,messages});
}

export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
  const u=await user();if(!u)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await params;const body=await request.json();const title=typeof body.title==="string"?body.title.trim():"";
  if(!title||title.length>80)return NextResponse.json({error:"Title must be 1–80 characters."},{status:400});
  const result=db.prepare("UPDATE ai_conversations SET title=?,updated_at=? WHERE id=? AND user_id=?").run(title,new Date().toISOString(),id,u.user_id);
  if(!result.changes)return NextResponse.json({error:"Conversation not found."},{status:404});
  return NextResponse.json({id,title});
}

export async function DELETE(_request:Request,{params}:{params:Promise<{id:string}>}){
  const u=await user();if(!u)return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await params;const result=db.prepare("DELETE FROM ai_conversations WHERE id=? AND user_id=?").run(id,u.user_id);
  if(!result.changes)return NextResponse.json({error:"Conversation not found."},{status:404});
  return new NextResponse(null,{status:204});
}
