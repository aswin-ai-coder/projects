"use client";

import { useEffect, useState } from "react";
import { NOTES_KEY, SUBJECTS_KEY, Note, Subject, readStorage } from "../lib/storage";

export default function ContextPanel({ onContextChange }: { onContextChange: (context: string) => void }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("All subjects");
  const [selectedNote, setSelectedNote] = useState("All notes");

  useEffect(() => {
    setSubjects(readStorage<Subject[]>(SUBJECTS_KEY, []));
    setNotes(readStorage<Note[]>(NOTES_KEY, []));
  }, []);

  useEffect(() => {
    const subjectNotes = selectedSubject === "All subjects" ? notes : notes.filter((note) => note.subject === selectedSubject);
    const chosen = selectedNote === "All notes" ? subjectNotes : subjectNotes.filter((note) => note.id === selectedNote);
    onContextChange(chosen.map((note) => `Subject: ${note.subject}\nTitle: ${note.title}\nContent: ${note.content}`).join("\n\n"));
  }, [notes, selectedSubject, selectedNote, onContextChange]);

  const availableNotes = selectedSubject === "All subjects" ? notes : notes.filter((note) => note.subject === selectedSubject);
  return <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Study context</p><p className="mt-1 text-sm text-slate-400">Give the AI your saved material.</p></div><span className="text-xs text-slate-600">{availableNotes.length} notes</span></div><div className="mt-4 grid gap-3 sm:grid-cols-2"><select value={selectedSubject} onChange={(e) => { setSelectedSubject(e.target.value); setSelectedNote("All notes"); }} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none"><option>All subjects</option>{subjects.map((subject) => <option key={subject.id}>{subject.name}</option>)}</select><select value={selectedNote} onChange={(e) => setSelectedNote(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none"><option value="All notes">All notes</option>{availableNotes.map((note) => <option key={note.id} value={note.id}>{note.title}</option>)}</select></div></div>;
}
