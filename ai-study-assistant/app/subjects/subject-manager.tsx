"use client";

import { FormEvent, useEffect, useState } from "react";

type Subject = { id: string; name: string; description: string; topics: number; progress: number };
const STORAGE_KEY = "ai-study-assistant-subjects";

const defaults: Subject[] = [
  { id: "math", name: "Mathematics", description: "Numbers, algebra, geometry and problem solving.", topics: 12, progress: 68 },
  { id: "science", name: "Science", description: "Explore the world through physics, chemistry and biology.", topics: 9, progress: 45 },
  { id: "english", name: "English", description: "Reading, writing, grammar and communication.", topics: 7, progress: 82 },
];

export default function SubjectManager() {
  const [subjects, setSubjects] = useState<Subject[]>(defaults);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setSubjects(JSON.parse(saved));
  }, []);

  function save(next: Subject[]) {
    setSubjects(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    save([...subjects, { id: Date.now().toString(), name: name.trim(), description: description.trim() || "A new subject ready for your study plan.", topics: 0, progress: 0 }]);
    setName(""); setDescription(""); setOpen(false);
  }

  return (
    <>
      <div className="mb-8 flex justify-end"><button onClick={() => setOpen(true)} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">+ Add subject</button></div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <article key={subject.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-600">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 font-bold">{subject.name[0].toUpperCase()}</div>
            <h2 className="mt-6 text-xl font-bold">{subject.name}</h2>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{subject.description}</p>
            <div className="mt-6 flex justify-between text-xs text-slate-500"><span>{subject.topics} topics</span><span>{subject.progress}% complete</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-white" style={{ width: `${subject.progress}%` }} /></div>
            <button className="mt-6 w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500">Open subject</button>
          </article>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">Add a subject</h2><p className="mt-1 text-sm text-slate-400">Create a place for your notes and topics.</p></div><button onClick={() => setOpen(false)} aria-label="Close" className="text-slate-500 hover:text-white">✕</button></div>
            <form onSubmit={submit} className="mt-6 space-y-4">
              <label className="block"><span className="mb-2 block text-sm font-medium">Subject name</span><input value={name} onChange={(e) => setName(e.target.value)} required autoFocus placeholder="e.g. Physics" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" /></label>
              <label className="block"><span className="mb-2 block text-sm font-medium">Description</span><textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="What are you learning?" className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" /></label>
              <div className="flex gap-3"><button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300">Cancel</button><button type="submit" className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">Create subject</button></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
