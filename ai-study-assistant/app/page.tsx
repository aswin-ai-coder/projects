"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { NOTES_KEY, QUIZ_HISTORY_KEY, SUBJECTS_KEY, Note, QuizAttempt, Subject, readStorage } from "./lib/storage";

const defaultSubjects: Subject[] = [
  { id: "math", name: "Mathematics", description: "Numbers, algebra, geometry and problem solving.", topics: 12, progress: 68 },
  { id: "science", name: "Science", description: "Explore the world through physics, chemistry and biology.", topics: 9, progress: 45 },
  { id: "english", name: "English", description: "Reading, writing, grammar and communication.", topics: 7, progress: 82 },
];
const FLASHCARDS_KEY = "ai-study-assistant-flashcards";

type Card = { id: string; front: string; back: string; subject: string; topic: string };

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>(defaultSubjects);
  const [notes, setNotes] = useState<Note[]>([]);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    setSubjects(readStorage<Subject[]>(SUBJECTS_KEY, defaultSubjects));
    setNotes(readStorage<Note[]>(NOTES_KEY, []));
    setAttempts(readStorage<QuizAttempt[]>(QUIZ_HISTORY_KEY, []));
    setCards(readStorage<Card[]>(FLASHCARDS_KEY, []));
  }, []);
  const stats = useMemo(() => {
    const totalTopics = subjects.reduce((sum, s) => sum + s.topics, 0);
    const progress = subjects.length ? Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length) : 0;
    const quizScore = attempts.length ? Math.round(attempts.reduce((sum, a) => sum + a.score / a.total, 0) / attempts.length * 100) : 0;
    return { totalTopics, progress, quizScore };
  }, [subjects, attempts]);
  return <main className="min-h-screen bg-slate-950 text-white"><div className="mx-auto flex min-h-screen max-w-[1440px]"><aside className="hidden w-64 shrink-0 border-r border-slate-800 px-5 py-7 lg:block"><div className="mb-10 flex items-center gap-3 px-2"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-bold text-slate-950">AI</div><div><p className="font-bold">Study AI</p><p className="text-xs text-slate-500">Your learning space</p></div></div><nav className="space-y-2"><Link href="/" className="block rounded-xl bg-slate-800 px-4 py-3 text-sm font-medium">Dashboard</Link><Link href="/subjects" className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-white">Subjects</Link><Link href="/notes" className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-white">Notes</Link><Link href="/quizzes" className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-white">Quizzes</Link><Link href="/flashcards" className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-slate-900 hover:text-white">Flashcards</Link></nav></aside><section className="flex-1 px-5 py-7 sm:px-8 lg:px-10"><header><p className="text-sm text-slate-500">Sunday, August 30</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Good afternoon, Aswin.</h1><p className="mt-2 text-slate-400">Here is your current learning overview.</p></header><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Study progress", `${stats.progress}%`, "Across your subjects"],["Topics", stats.totalTopics.toString(), "Total topics"],["Notes", notes.length.toString(), "Saved notes"],["Quiz average", attempts.length ? `${stats.quizScore}%` : "—", attempts.length ? `${attempts.length} attempts` : "No attempts yet"]].map(([label,value,detail]) => <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-3 text-3xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div>)}</div><section className="mt-10"><div className="mb-5 flex items-end justify-between"><div><h2 className="text-xl font-bold">Your subjects</h2><p className="mt-1 text-sm text-slate-500">Pick up where you left off.</p></div><Link href="/subjects" className="text-sm font-semibold text-slate-300 hover:text-white">View all</Link></div><div className="grid gap-4 md:grid-cols-3">{subjects.slice(0,3).map((subject) => <Link key={subject.id} href={`/subjects/${subject.name.toLowerCase().replace(/[^a-z0-9]+/g,"-")}`} className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 hover:border-slate-600"><div className="flex items-center justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 font-bold">{subject.name[0]}</div><span className="text-xs text-slate-500">{subject.topics} topics</span></div><h3 className="mt-6 font-semibold">{subject.name}</h3><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-white" style={{width:`${subject.progress}%`}} /></div><p className="mt-2 text-xs text-slate-500">{subject.progress}% complete</p></Link>)}</div></section><section className="mt-10 grid gap-4 md:grid-cols-3"><Link href="/quizzes" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-600"><p className="text-sm text-slate-500">Practice</p><h2 className="mt-2 text-xl font-bold">Take a quiz</h2><p className="mt-2 text-sm text-slate-400">Test what you know.</p></Link><Link href="/flashcards/manage" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-600"><p className="text-sm text-slate-500">Memory</p><h2 className="mt-2 text-xl font-bold">Flashcards</h2><p className="mt-2 text-sm text-slate-400">{cards.length} saved cards.</p></Link><Link href="/notes" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-600"><p className="text-sm text-slate-500">Knowledge</p><h2 className="mt-2 text-xl font-bold">Your notes</h2><p className="mt-2 text-sm text-slate-400">{notes.length} saved notes.</p></Link></section></section></div></main>;
}
