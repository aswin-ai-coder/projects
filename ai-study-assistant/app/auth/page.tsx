"use client";
import {FormEvent,useState} from "react";
import {useRouter} from "next/navigation";

export default function AuthPage(){
 const router=useRouter(); const [mode,setMode]=useState<"login"|"signup">("login");
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [displayName,setDisplayName]=useState("");
 const [busy,setBusy]=useState(false); const [error,setError]=useState("");
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");
  try{const endpoint=mode==="login"?"/api/auth/login":"/api/auth/signup";const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password,displayName})});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||"Authentication failed");router.push("/");router.refresh();}catch(err){setError(err instanceof Error?err.message:"Authentication failed")}finally{setBusy(false)}
 }
 return <main className="min-h-screen bg-slate-950 text-white"><div className="mx-auto flex min-h-screen max-w-md items-center px-5 py-10"><section className="w-full rounded-3xl border border-slate-800 bg-slate-900/70 p-7 shadow-2xl"><p className="text-sm text-slate-500">AI Study Assistant</p><h1 className="mt-2 text-3xl font-bold">{mode==="login"?"Welcome back":"Create your account"}</h1><p className="mt-2 text-sm text-slate-400">Your study data stays in your project backend.</p>
 {error&&<div role="alert" className="mt-5 rounded-xl border border-red-900/60 bg-red-950/30 p-3 text-sm text-red-300">{error}</div>}
 <form onSubmit={submit} className="mt-6 space-y-4">{mode==="signup"&&<label className="block text-sm">Name<input required value={displayName} onChange={e=>setDisplayName(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3" autoComplete="name" /></label>}<label className="block text-sm">Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3" autoComplete="email" /></label><label className="block text-sm">Password<input required minLength={8} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3" autoComplete={mode==="login"?"current-password":"new-password"} /></label><button disabled={busy} className="w-full rounded-xl bg-white px-4 py-3 font-semibold text-slate-950 disabled:opacity-60">{busy?"Please wait…":mode==="login"?"Sign in":"Create account"}</button></form>
 <button type="button" onClick={()=>{setMode(mode==="login"?"signup":"login");setError("")}} className="mt-5 w-full text-sm text-slate-400 underline">{mode==="login"?"Need an account? Sign up":"Already have an account? Sign in"}</button></section></div></main>
}