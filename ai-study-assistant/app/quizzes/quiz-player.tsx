"use client";

import { useMemo, useState } from "react";

type Question = { question: string; options: string[]; answer: number };
const questions: Question[] = [
  { question: "What is 3 × 4?", options: ["7", "12", "14", "16"], answer: 1 },
  { question: "Which shape has three sides?", options: ["Square", "Circle", "Triangle", "Rectangle"], answer: 2 },
  { question: "What is 10 ÷ 2?", options: ["2", "5", "8", "20"], answer: 1 },
  { question: "Which number is prime?", options: ["9", "12", "13", "15"], answer: 2 },
  { question: "What is 5²?", options: ["10", "15", "20", "25"], answer: 3 },
];

export default function QuizPlayer() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);
  const score = useMemo(() => answers.reduce((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0), [answers]);
  const question = questions[current];

  function choose(index: number) { setSelected(index); setAnswers((items) => items.map((item, i) => i === current ? index : item)); }
  function next() { if (current === questions.length - 1) setFinished(true); else { setCurrent(current + 1); setSelected(answers[current + 1]); } }
  function restart() { setCurrent(0); setSelected(null); setAnswers(Array(questions.length).fill(null)); setFinished(false); }

  if (finished) return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
      <p className="text-sm text-slate-500">Quiz complete</p><h2 className="mt-2 text-3xl font-bold">{score}/{questions.length}</h2>
      <p className="mt-3 text-slate-400">You answered {score} questions correctly.</p>
      <button onClick={restart} className="mt-7 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">Try again</button>
    </section>
  );

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm text-slate-500"><span>Question {current + 1} of {questions.length}</span><span>{Math.round((current / questions.length) * 100)}% complete</span></div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
      <h2 className="mt-8 text-2xl font-bold leading-9">{question.question}</h2>
      <div className="mt-6 grid gap-3">{question.options.map((option, index) => <button key={option} onClick={() => choose(index)} className={`rounded-xl border px-4 py-4 text-left text-sm transition ${selected === index ? "border-white bg-white text-slate-950" : "border-slate-700 hover:border-slate-500"}`}><span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>{option}</button>)}</div>
      <div className="mt-7 flex justify-end"><button disabled={selected === null} onClick={next} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-30">{current === questions.length - 1 ? "Finish quiz" : "Next question"}</button></div>
    </section>
  );
}
