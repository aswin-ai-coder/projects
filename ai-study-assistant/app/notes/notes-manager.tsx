"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { NOTES_KEY, Note, readStorage, writeStorage } from "../lib/storage";

const initialNotes: Note[] = [
  { id: "1", title: "Algebra basics", content: "Key rules and examples for solving simple equations.", subject: "Mathematics", updatedAt: "Today" },
  { id: "2", title: "Forces and motion", content: "Review Newton's laws and common examples.", subject: "Science", updatedAt: "Yesterday" },
];

export default function NotesManager() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("Mathematics");

  useEffect(() => {
    const saved = readStorage<Note[] | null>(NOTES_KEY, null);
    if (saved) setNotes(saved);
    else writeStorage(NOTES_KEY, initialNotes);
  }, []);

  const filtered = useMemo(() => notes.filter((note) => `${note.title} ${note.content} ${note.subject}`.toLowerCase().includes(query.toLowerCase())), [notes, query]);
  function persist(next: Note[]) { setNotes(next); writeStorage(NOTES_KEY, next); }
  function startCreate() { setEditing({ id: "", title: "", content: "", subject: "Mathematics", updatedAt: "Now" }); setTitle(""); setContent(""); setSubject("Mathematics"); }
  function startEdit(note: Note) { setEditing(note); setTitle(note.title); setContent(note.content); setSubject(note.subject); }
  function save(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const next: Note = { id: editing?.id || Date.now().toString(), title: title.trim(), content: content.trim(), subject, updatedAt: "Just now" };
    persist(editing?.id ? notes.map((note) => note.id === editing.id ? next : note) : [next, ...notes]);
    setEditing(null);
  }
  function remove(id: string) { persist(notes.filter((note) => note.id !== id)); }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes..." className="w-full flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-slate-500" />
        <button onClick={startCreate} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-200">+ New note</button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((note) => <article key={note.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><div className="flex items-start justify-between gap-4"><div><span className="text-xs text-slate-500">{note.subject}</span><h2 className="mt-1 text-lg font-bold">{note.title}</h2></div><span className="text-xs text-slate-600">{note.updatedAt}</span></div><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{note.content}</p><div className="mt-5 flex gap-2"><button onClick={() => startEdit(note)} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold hover:border-slate-500">Edit</button><button onClick={() => remove(note.id)} className="rounded-lg border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-300">Delete</button></div></article>)}
      </div>
      {filtered.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-800 p-10 text-center text-sm text-slate-500">No notes match your search.</div>}
      {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"><div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">{editing.id ? "Edit note" : "New note"}</h2><button onClick={() => setEditing(null)} className="text-slate-500 hover:text-white">✕</button></div><form onSubmit={save} className="mt-6 space-y-4"><input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Note title" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" /><select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400"><option>Mathematics</option><option>Science</option><option>English</option><option>Other</option></select><textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={8} placeholder="Write your note..." className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-slate-400" /><div className="flex justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold">Cancel</button><button type="submit" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">Save note</button></div></form></div></div>}
    </div>
  );
}
