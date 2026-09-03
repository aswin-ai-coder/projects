"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCards, getNotes, getQuizzes, getSubjects, getTopics } from "../lib/feature-data";
import { searchAll, SearchItem } from "../lib/search-engine";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [r, setR] = useState<SearchItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setError("");
    if (!q.trim()) {
      setR([]);
      return () => { active = false; };
    }

    Promise.all([getSubjects(), getTopics(), getNotes(), getCards(), getQuizzes()])
      .then(([subjects, topics, notes, cards, quizzes]) => {
        if (active) setR(searchAll(q, { subjects, topics, notes, cards, quizzes }));
      })
      .catch((err: unknown) => {
        if (active) {
          setR([]);
          setError(err instanceof Error ? err.message : "Search failed");
        }
      });

    return () => { active = false; };
  }, [q]);

  return <main className="min-h-screen bg-slate-950 text-white"><div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10"><Link href="/" className="text-sm text-slate-400 hover:text-white">← Dashboard</Link><header className="mt-8"><p className="text-sm text-slate-500">Global search</p><h1 className="mt-1 text-4xl font-bold">Search everything</h1><p className="mt-3 text-slate-400">Find subjects, topics, notes, flashcards, and quizzes.</p></header><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search everything..." className="mt-8 w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-4 outline-none focus:border-slate-400"/>{error&&<p className="mt-4 rounded-xl border border-red-900/50 bg-red-950/20 p-4 text-sm text-red-300">{error}</p>}<div className="mt-6 space-y-3">{r.map(x=><Link key={x.type+x.id} href={x.type==="Subject"?`/subjects/${x.title.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`:x.type==="Note"?"/notes":x.type==="Flashcard"?"/flashcards":x.type==="Quiz"?"/quizzes":"/subjects"} className="block rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-600"><p className="text-xs text-slate-500">{x.type}</p><h2 className="mt-1 font-semibold">{x.title}</h2>{x.subtitle&&<p className="mt-1 text-sm text-slate-400">{x.subtitle}</p>}</Link>)}{q&&r.length===0&&!error&&<p className="rounded-2xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">No results found.</p>}</div></div></main>;
}
