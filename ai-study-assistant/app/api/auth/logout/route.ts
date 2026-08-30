import {NextResponse} from "next/server";import {cookies} from "next/headers";import {deleteSession} from "../../../../server/auth";
export async function POST(){const c=await cookies(),id=c.get("study_session")?.value;if(id)deleteSession(id);const r=NextResponse.json({ok:true});r.cookies.set("study_session","",{httpOnly:true,expires:new Date(0),path:"/"});return r}
