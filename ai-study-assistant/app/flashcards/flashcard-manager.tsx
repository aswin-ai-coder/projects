"use client";

import { FormEvent, useEffect, useState } from "react";
import { readStorage, writeStorage } from "../lib/storage";

type Card = { id: string; front: string; back: string; subject: string; topic: string };
const KEY = "ai-study-assistant-flashcards";
const defaults: Card[] = [
  { id: "1", front: "What is a variable?", back: "A symbol or name that represents a value that can change.", subject: "Mathematics", topic: "Algebra" },
  { id: "2", front: "What is Newton's first law?", back: "An object remains at rest or in uniform motion unless acted on by a net external force.", subject: "Science", topic: "Forces & Motion" },
];

export default function FlashcardManager() {
  const [cards, setCards] = useState<Card[]>(defaults);
  const [subject, setSubject] = useState("Mathematics");
  const [topic, setTopic] = useState("Algebra");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => { setCards(readStorage<Card[]>(KEY, defaults)); }, []);
  function persist(next: Card[]) { setCards(next); writeStorage(KEY, next); }
  function add(event: FormEvent) { event.preventDefault(); if (!front.trim() || !back.trim()) return; persist([{ id: Date.now().toString(), front: front.trim(), back: back.trim(), subject, topic: topic.trim() || "General" }, ...cards]); setFront(""); setBack(""); }
  function remove(id: string) { persist(cards.filter((card) => card.id !== id)); }
  const visible = filter === "All" ? cards : cards.filter((card) => card.subject === filter);

  return <div>
    <form onSubmit={add} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <h2 className="text-xl font-bold">Create a flashcard</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input value={front} onChange={(e) => setFront(e.target.value)} required placeholder="Question / front" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" />
        <input value={back} onChange={(e) => setBack(e.target.value)} required placeholder="Answer / back" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" />
        <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"><option>Mathematics</option><option>Science</option><option>English</option><option>Other</option></select>
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" />
      </div>
      <button className="mt-5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">Add card</button>
    </form>
    <div className="mt-8 flex flex-wrap gap-2">{["All", "Mathematics", "Science", "English", "Other"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${filter === item ? "bg-white text-slate-950" : "border border-slate-800 text-slate-400"}`}>{item}</button>)}</div>
    <div className="mt-5 grid gap-4 md:grid-cols-2">{visible.map((card) => <article key={card.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs text-slate-500">{card.subject} · {card.topic}</p><h3 className="mt-2 font-semibold">{card.front}</h3></div><button onClick={() => remove(card.id)} className="text-xs text-slate-600 hover:text-slate-300">Delete</button></div><p className="mt-3 text-sm leading-6 text-slate-400">{card.back}</p></article>)}</div>
  </div>;
}
