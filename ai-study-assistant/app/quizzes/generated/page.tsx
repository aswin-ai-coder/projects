"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readStorage } from "../../lib/storage";

type Question = { question: string; options: string[]; answer: number; subject?: string; topic?: string };
const KEY = "ai-study-assistant-generated-quizzes";

export default function GeneratedQuizzesPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  useEffect(() => setQuestions(readStorage<Question[]>(KEY, [])), []);
  return <main className="min-h-screen bg-slate-950 text-white"><div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10"><Link href="/quizzes" className="text-sm text-slate-400 hover:text-white">← Quizzes</Link><header className="mt-8 mb-8"><p className="text-sm text-slate-500">AI-generated practice</p><h1 className="mt-1 text-4xl font-bold tracking-tight">Generated quizzes</h1><p className="mt-3 text-slate-400">Your AI-generated questions are ready to practice.</p></header>{questions.length ? <div className="space-y-4">{questions.map((q, i) => <article key={i} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><p className="text-xs text-slate-500">{q.subject || "Study"}{q.topic ? ` · ${q.topic}` : ""}</p><h2 className="mt-2 text-lg font-bold">{i + 1}. {q.question}</h2><div className="mt-4 grid gap-2 sm:grid-cols-2">{q.options.map((option, j) => <div key={j} className={`rounded-xl border px-4 py-3 text-sm ${j === q.answer ? "border-slate-500 text-white" : "border-slate-800 text-slate-400"}`}>{String.fromCharCode(65 + j)}. {option}</div>)}</div></article>)}</div> : <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center text-sm text-slate-500">No generated quiz questions yet. Generate some from the AI page first.</div>}</div></main>;
}
