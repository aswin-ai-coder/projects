"use client";

import { useEffect, useMemo, useState } from "react";
import { readStorage } from "../lib/storage";

type Card = { id: string; front: string; back: string; subject: string; topic: string };
const KEY = "ai-study-assistant-flashcards";
const defaults: Card[] = [
  { id: "1", front: "What is a variable?", back: "A symbol or name that represents a value that can change.", subject: "Mathematics", topic: "Algebra" },
  { id: "2", front: "What is Newton's first law?", back: "An object remains at rest or in uniform motion unless acted on by a net external force.", subject: "Science", topic: "Forces & Motion" },
];

export default function FlashcardPlayer() {
  const [cards, setCards] = useState<Card[]>(defaults);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => setCards(readStorage<Card[]>(KEY, defaults)), []);
  const subjects = useMemo(() => ["All", ...Array.from(new Set(cards.map((card) => card.subject)))], [cards]);
  const visible = filter === "All" ? cards : cards.filter((card) => card.subject === filter);
  useEffect(() => { if (index >= visible.length) setIndex(0); setFlipped(false); }, [filter, visible.length, index]);

  if (!visible.length) return <div className="rounded-2xl border border-dashed border-slate-800 p-10 text-center text-slate-500">No flashcards available.</div>;
  const card = visible[index];
  function move(amount: number) { setIndex((index + amount + visible.length) % visible.length); setFlipped(false); }

  return <section>
    <div className="mb-5 flex flex-wrap gap-2">{subjects.map((item) => <button key={item} onClick={() => { setFilter(item); setIndex(0); }} className={`rounded-xl px-4 py-2 text-sm font-semibold ${filter === item ? "bg-white text-slate-950" : "border border-slate-800 text-slate-400"}`}>{item}</button>)}</div>
    <div className="mb-4 flex items-center justify-between text-sm text-slate-500"><span>{card.subject} · {card.topic}</span><span>Card {index + 1} of {visible.length}</span></div>
    <button onClick={() => setFlipped(!flipped)} className="flex min-h-[300px] w-full items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 p-10 text-center shadow-xl transition hover:border-slate-500 sm:min-h-[360px]"><div><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{flipped ? "Answer" : "Question"}</p><p className="mt-5 text-2xl font-bold leading-9 sm:text-3xl">{flipped ? card.back : card.front}</p><p className="mt-8 text-sm text-slate-600">Click to flip</p></div></button>
    <div className="mt-5 flex justify-center gap-3"><button onClick={() => move(-1)} className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold hover:border-slate-500">Previous</button><button onClick={() => move(1)} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">Next card</button></div>
  </section>;
}
