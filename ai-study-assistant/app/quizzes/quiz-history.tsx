"use client";

import { useEffect, useState } from "react";
import { QUIZ_HISTORY_KEY, QuizAttempt, readStorage } from "../lib/storage";

export default function QuizHistory() {
  const [history, setHistory] = useState<QuizAttempt[]>([]);
  useEffect(() => setHistory(readStorage<QuizAttempt[]>(QUIZ_HISTORY_KEY, [])), []);
  if (!history.length) return <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">No quiz attempts yet. Complete a quiz and your results will appear here.</div>;
  return <div className="space-y-3">{history.slice(0, 10).map((attempt) => <article key={attempt.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4"><div><h3 className="font-semibold">{attempt.title}</h3><p className="mt-1 text-xs text-slate-500">{attempt.date}</p></div><div className="text-right"><p className="font-bold">{attempt.score}/{attempt.total}</p><p className="text-xs text-slate-500">{Math.round((attempt.score / attempt.total) * 100)}%</p></div></article>)}</div>;
}
