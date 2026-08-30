"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { NOTES_KEY, Note, readStorage } from "../lib/storage";

export default function SubjectNotes({ subjectName }: { subjectName: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setNotes(readStorage<Note[]>(NOTES_KEY, []));
  }, []);

  const subjectNotes = useMemo(() => notes.filter((note) => note.subject.toLowerCase() === subjectName.toLowerCase() && `${note.title} ${note.content}`.toLowerCase().includes(query.toLowerCase())), [notes, subjectName, query]);

  return (
    <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm text-slate-500">Knowledge base</p><h2 className="mt-1 text-2xl font-bold">{subjectName} notes</h2></div>
        <Link href="/notes" className="rounded-xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-950 hover:bg-slate-200">Manage notes</Link>
      </div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search this subject's notes..." className="mt-5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" />
      <div className="mt-5 space-y-2">
        {subjectNotes.map((note) => <article key={note.id} className="rounded-xl border border-slate-800 p-4"><div className="flex items-center justify-between gap-4"><h3 className="font-semibold">{note.title}</h3><span className="text-xs text-slate-600">{note.updatedAt}</span></div><p className="mt-2 text-sm leading-6 text-slate-400 line-clamp-2">{note.content}</p></article>)}
      </div>
      {subjectNotes.length === 0 && <p className="mt-5 rounded-xl border border-dashed border-slate-800 p-6 text-center text-sm text-slate-500">No notes for this subject yet.</p>}
    </section>
  );
}
