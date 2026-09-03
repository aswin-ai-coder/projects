"use client";

import { useEffect, useState } from "react";
import { getCards, getNotes, getQuizzes, getSubjects, getTopics } from "../lib/feature-data";
import { searchAll, SearchItem } from "../lib/search-engine";

export default function UnifiedSearch() {
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

  return <section><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search subjects, topics, notes, cards, quizzes..." className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none"/>{error&&<p className="mt-3 text-sm text-red-300">{error}</p>}<div className="mt-4 space-y-2">{r.map(x=><div key={x.type+x.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"><span className="text-xs text-slate-500">{x.type}</span><p className="mt-1 font-semibold">{x.title}</p>{x.subtitle&&<p className="mt-1 text-sm text-slate-500">{x.subtitle}</p>}</div>)}{q&&r.length===0&&!error&&<p className="py-8 text-center text-sm text-slate-600">No results found.</p>}</div></section>;
}
