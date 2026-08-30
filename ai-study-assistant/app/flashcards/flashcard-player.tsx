"use client";

import { useState } from "react";

type Card = { front: string; back: string };
const cards: Card[] = [
  { front: "What is a variable?", back: "A symbol or name that represents a value that can change." },
  { front: "What is Newton's first law?", back: "An object remains at rest or in uniform motion unless acted on by a net external force." },
  { front: "What is a noun?", back: "A word that names a person, place, thing, or idea." },
  { front: "What is the area of a rectangle?", back: "Length multiplied by width." },
  { front: "What is photosynthesis?", back: "The process plants use to convert light energy into chemical energy." },
];

export default function FlashcardPlayer() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];
  function next() { setIndex((index + 1) % cards.length); setFlipped(false); }
  function previous() { setIndex((index - 1 + cards.length) % cards.length); setFlipped(false); }
  return (
    <section>
      <div className="mb-4 flex items-center justify-between text-sm text-slate-500"><span>Card {index + 1} of {cards.length}</span><span>Tap the card to flip</span></div>
      <button onClick={() => setFlipped(!flipped)} className="flex min-h-[300px] w-full items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 p-10 text-center shadow-xl transition hover:border-slate-500 sm:min-h-[360px]">
        <div><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{flipped ? "Answer" : "Question"}</p><p className="mt-5 text-2xl font-bold leading-9 sm:text-3xl">{flipped ? card.back : card.front}</p><p className="mt-8 text-sm text-slate-600">Click to {flipped ? "see the question" : "reveal the answer"}</p></div>
      </button>
      <div className="mt-5 flex justify-center gap-3"><button onClick={previous} className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold hover:border-slate-500">Previous</button><button onClick={next} className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">Next card</button></div>
    </section>
  );
}
