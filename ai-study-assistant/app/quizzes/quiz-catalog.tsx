"use client";

import Link from "next/link";
import { useState } from "react";

const quizzes = [
  { id: "mathematics-algebra", subject: "Mathematics", topic: "Algebra", questions: 5, difficulty: "Beginner" },
  { id: "mathematics-geometry", subject: "Mathematics", topic: "Geometry", questions: 5, difficulty: "Beginner" },
  { id: "science-forces", subject: "Science", topic: "Forces & Motion", questions: 5, difficulty: "Intermediate" },
  { id: "english-grammar", subject: "English", topic: "Grammar", questions: 5, difficulty: "Beginner" },
];

export default function QuizCatalog() {
  const [subject, setSubject] = useState("All");
  const filtered = subject === "All" ? quizzes : quizzes.filter((quiz) => quiz.subject === subject);
  return (
    <div>
      <div className="flex flex-wrap gap-2">{["All", "Mathematics", "Science", "English"].map((item) => <button key={item} onClick={() => setSubject(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${subject === item ? "bg-white text-slate-950" : "border border-slate-800 text-slate-400 hover:border-slate-600"}`}>{item}</button>)}</div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((quiz) => <article key={quiz.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><div className="flex items-start justify-between"><div><p className="text-xs text-slate-500">{quiz.subject}</p><h2 className="mt-1 text-xl font-bold">{quiz.topic}</h2></div><span className="rounded-lg border border-slate-800 px-2.5 py-1 text-xs text-slate-500">{quiz.difficulty}</span></div><p className="mt-4 text-sm text-slate-400">{quiz.questions} questions · Practice your {quiz.topic.toLowerCase()} skills.</p><Link href={`/quizzes/${quiz.id}`} className="mt-6 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-200">Start quiz</Link></article>)}
      </div>
    </div>
  );
}
