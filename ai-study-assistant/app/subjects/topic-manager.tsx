"use client";

import { FormEvent, useState } from "react";

type Topic = { id: string; name: string; completed: boolean };

const initialTopics: Topic[] = [
  { id: "algebra", name: "Algebra", completed: true },
  { id: "geometry", name: "Geometry", completed: false },
  { id: "fractions", name: "Fractions", completed: false },
];

export default function TopicManager({ subjectName }: { subjectName: string }) {
  const [topics, setTopics] = useState(initialTopics);
  const [name, setName] = useState("");

  function addTopic(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    setTopics([...topics, { id: Date.now().toString(), name: name.trim(), completed: false }]);
    setName("");
  }

  function toggle(id: string) {
    setTopics(topics.map((topic) => topic.id === id ? { ...topic, completed: !topic.completed } : topic));
  }

  const completed = topics.filter((topic) => topic.completed).length;
  const progress = topics.length ? Math.round((completed / topics.length) * 100) : 0;

  return (
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm text-slate-500">Topic checklist</p><h2 className="mt-1 text-2xl font-bold">{subjectName} topics</h2></div>
        <span className="text-sm text-slate-400">{completed}/{topics.length} completed · {progress}%</span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} /></div>
      <div className="mt-6 space-y-2">
        {topics.map((topic) => (
          <button key={topic.id} onClick={() => toggle(topic.id)} className="flex w-full items-center gap-3 rounded-xl border border-slate-800 px-4 py-3 text-left hover:border-slate-600">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${topic.completed ? "border-white bg-white text-slate-950" : "border-slate-600"}`}>{topic.completed ? "✓" : ""}</span>
            <span className={topic.completed ? "text-slate-500 line-through" : "text-slate-200"}>{topic.name}</span>
          </button>
        ))}
      </div>
      <form onSubmit={addTopic} className="mt-5 flex gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Add a topic..." className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" />
        <button type="submit" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">Add</button>
      </form>
    </section>
  );
}
