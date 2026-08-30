import { NextResponse } from "next/server";
export async function POST(request:Request){const {q=""}=await request.json();if(typeof q!=="string")return NextResponse.json({error:"Invalid query"},{status:400});return NextResponse.json({query:q.trim(),message:"Search indexing is ready for the unified data layer."})}
