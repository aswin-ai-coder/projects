"use client";

import { useEffect, useState } from "react";

type QuizAttempt = { id: string; title: string; score: number; total: number; percent: number; completed_at: string };

export default function QuizHistory() {
  const [history, setHistory] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/data?resource=quiz_attempts")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load quiz history.");
        return response.json();
      })
      .then((result) => { if (active) setHistory(Array.isArray(result.data) ? result.data : []); })
      .catch((reason) => { if (active) setError(reason instanceof Error ? reason.message : "Could not load quiz history."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (loading) return <div className="rounded-2xl border border-slate-800 p-8 text-center text-sm text-slate-500">Loading quiz history…</div>;
  if (error) return <div className="rounded-2xl border border-red-900/60 bg-red-950/20 p-8 text-center text-sm text-red-300">{error}</div>;
  if (!history.length) return <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">No quiz attempts yet. Complete a quiz and your results will appear here.</div>;

  return <div className="space-y-3">{history.slice(0, 10).map((attempt) => <article key={attempt.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4"><div><h3 className="font-semibold">{attempt.title}</h3><p className="mt-1 text-xs text-slate-500">{new Date(attempt.completed_at).toLocaleString()}</p></div><div className="text-right"><p className="font-bold">{attempt.score}/{attempt.total}</p><p className="text-xs text-slate-500">{attempt.percent}%</p></div></article>)}</div>;
}
