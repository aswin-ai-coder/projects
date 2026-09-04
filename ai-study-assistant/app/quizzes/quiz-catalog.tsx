"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const seedQuizzes = [
  { id:"mathematics-algebra", title:"Algebra Basics", subject:"Mathematics", topic:"Algebra", difficulty:"Beginner", questions:[
    {type:"multiple_choice",question:"What is 3 × 4?",options:["7","12","14","16"],answer:"12"},
    {type:"multiple_choice",question:"Solve x + 5 = 9.",options:["2","3","4","5"],answer:"4"},
    {type:"true_false",question:"2 is an even number.",options:["True","False"],answer:"True"},
    {type:"short_answer",question:"What is 10 ÷ 2?",answer:"5"},
    {type:"multiple_choice",question:"What is 5²?",options:["10","15","20","25"],answer:"25"},
  ]},
  { id:"mathematics-geometry", title:"Geometry Basics", subject:"Mathematics", topic:"Geometry", difficulty:"Beginner", questions:[
    {type:"multiple_choice",question:"Which shape has three sides?",options:["Square","Circle","Triangle","Rectangle"],answer:"Triangle"},
    {type:"true_false",question:"A square has four equal sides.",options:["True","False"],answer:"True"},
    {type:"multiple_choice",question:"How many degrees are in a right angle?",options:["45","90","180","360"],answer:"90"},
  ]},
  { id:"science-forces", title:"Forces & Motion", subject:"Science", topic:"Forces & Motion", difficulty:"Intermediate", questions:[
    {type:"multiple_choice",question:"What force pulls objects toward Earth?",options:["Friction","Gravity","Magnetism","Tension"],answer:"Gravity"},
    {type:"true_false",question:"Friction can slow a moving object.",options:["True","False"],answer:"True"},
    {type:"short_answer",question:"What is the SI unit of force?",answer:"newton"},
  ]},
  { id:"english-grammar", title:"Grammar Basics", subject:"English", topic:"Grammar", difficulty:"Beginner", questions:[
    {type:"multiple_choice",question:"Which word is a noun?",options:["quickly","teacher","running","bright"],answer:"teacher"},
    {type:"true_false",question:"A sentence should begin with a capital letter.",options:["True","False"],answer:"True"},
    {type:"multiple_choice",question:"Choose the correct word: They ___ ready.",options:["is","are","be","am"],answer:"are"},
  ]},
];

export default function QuizCatalog() {
  const [quizzes,setQuizzes]=useState<any[]>([]), [subject,setSubject]=useState("All"), [loading,setLoading]=useState(true), [error,setError]=useState<string|null>(null);
  async function load(){
    setLoading(true);setError(null);
    try{
      const r=await fetch("/api/data?resource=quizzes"); if(!r.ok) throw new Error("Sign in to manage quizzes.");
      const body=await r.json(); let items=body.data||[];
      if(!items.length){
        await Promise.all(seedQuizzes.map(q=>fetch("/api/data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({resource:"quizzes",id:q.id,title:q.title,subject_id:null,topic_id:null,difficulty:q.difficulty,questions:q.questions})})));
        const seeded=await fetch("/api/data?resource=quizzes"); items=(await seeded.json()).data||[];
      }
      setQuizzes(items);
    }catch(e){setError(e instanceof Error?e.message:"Could not load quizzes.")}finally{setLoading(false)}
  }
  useEffect(()=>{void load()},[]);
  const subjects=useMemo(()=>["All",...Array.from(new Set(quizzes.map(q=>q.subject||"General")))],[quizzes]);
  const filtered=subject==="All"?quizzes:quizzes.filter(q=>(q.subject||"General")===subject);
  if(loading)return <div className="rounded-2xl border border-slate-800 p-8 text-slate-400">Loading quizzes…</div>;
  if(error)return <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-6"><p className="text-red-300">{error}</p><button onClick={()=>void load()} className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">Retry</button></div>;
  return <div>
    <div className="flex flex-wrap gap-2">{subjects.map(item=><button key={item} onClick={()=>setSubject(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${subject===item?"bg-white text-slate-950":"border border-slate-800 text-slate-400 hover:border-slate-600"}`}>{item}</button>)}<Link href="/quizzes/new" className="ml-auto rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950">Create quiz</Link></div>
    {!filtered.length?<div className="mt-6 rounded-2xl border border-slate-800 p-8 text-center text-slate-400">No quizzes match this filter.</div>:<div className="mt-6 grid gap-4 md:grid-cols-2">{filtered.map(q=>{let questions=[];try{questions=JSON.parse(q.questions_json||"[]")}catch{} return <article key={q.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs text-slate-500">{q.subject||"General"} · {q.topic||"Practice"}</p><h2 className="mt-1 text-xl font-bold">{q.title}</h2></div><span className="rounded-lg border border-slate-800 px-2.5 py-1 text-xs text-slate-500">{q.difficulty}</span></div><p className="mt-4 text-sm text-slate-400">{questions.length} questions</p><div className="mt-6 flex gap-2"><Link href={`/quizzes/${q.id}`} className="flex-1 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950">Start</Link><Link href={`/quizzes/${q.id}/edit`} className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold">Edit</Link></div></article>})}</div>}
  </div>;
}
