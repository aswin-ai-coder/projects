"use client";

import { useState } from "react";
import { QUIZ_HISTORY_KEY, QuizAttempt, readStorage, writeStorage } from "../../lib/storage";

type Question = { question: string; options: string[]; answer: number; subject?: string; topic?: string };

export default function GeneratedPlayer({ questions }: { questions: Question[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const score = answers.reduce<number>((total, answer, index) => {
    return total + (answer !== null && answer === questions[index]?.answer ? 1 : 0);
  }, 0);

  if (!questions.length) return null;

  if (finished) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <p className="text-sm text-slate-500">AI quiz complete</p>
        <h2 className="mt-2 text-3xl font-bold">{score}/{questions.length}</h2>
        <p className="mt-3 text-slate-400">Your result has been saved to quiz history.</p>
      </section>
    );
  }

  const q = questions[current];
  const choose = (index: number) => {
    setSelected(index);
    setAnswers((items) => items.map((value, answerIndex) => (answerIndex === current ? index : value)));
  };

  const next = () => {
    if (current === questions.length - 1) {
      const history = readStorage<QuizAttempt[]>(QUIZ_HISTORY_KEY, []);
      const attempt: QuizAttempt = {
        id: Date.now().toString(),
        title: `AI Quiz · ${q.topic || q.subject || "Study"}`,
        score,
        total: questions.length,
        date: new Date().toLocaleString(),
      };
      writeStorage(QUIZ_HISTORY_KEY, [attempt, ...history]);
      setFinished(true);
    } else {
      const nextIndex = current + 1;
      setCurrent(nextIndex);
      setSelected(answers[nextIndex] ?? null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
      <div className="flex justify-between text-sm text-slate-500">
        <span>Question {current + 1} of {questions.length}</span>
        <span>{q.topic || q.subject || "AI generated"}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-white" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>
      <h2 className="mt-8 text-2xl font-bold leading-9">{q.question}</h2>
      <div className="mt-6 grid gap-3">
        {q.options.map((option, index) => (
          <button
            key={`${index}-${option}`}
            onClick={() => choose(index)}
            className={`rounded-xl border px-4 py-4 text-left text-sm ${selected === index ? "border-white bg-white text-slate-950" : "border-slate-700 hover:border-slate-500"}`}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
      <div className="mt-7 flex justify-end">
        <button
          disabled={selected === null}
          onClick={next}
          className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 disabled:opacity-30"
        >
          {current === questions.length - 1 ? "Finish quiz" : "Next"}
        </button>
      </div>
    </section>
  );
}
