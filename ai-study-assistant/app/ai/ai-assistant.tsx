"use client";

import { FormEvent, useState } from "react";

const actions = ["Explain", "Summarize", "Make quiz", "Make flashcards"];

export default function AiAssistant() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setOutput("");
    try {
      const response = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
      const data = await response.json();
      setOutput(response.ok ? data.answer : data.error || "Something went wrong.");
    } catch {
      setOutput("Could not reach the AI service. Check your server configuration.");
    } finally { setLoading(false); }
  }

  function useAction(action: string) { setPrompt(`${action}: `); }

  return <div className="max-w-3xl"><div className="flex flex-wrap gap-2">{actions.map((action) => <button key={action} onClick={() => useAction(action)} className="rounded-xl border border-slate-800 px-4 py-2 text-sm text-slate-400 hover:border-slate-600 hover:text-white">{action}</button>)}</div><form onSubmit={submit} className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={6} placeholder="Ask the AI to help you learn..." className="w-full resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-slate-600" /><div className="mt-4 flex justify-end"><button disabled={loading || !prompt.trim()} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-30">{loading ? "Thinking..." : "Ask AI"}</button></div></form>{output && <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"><p className="text-xs font-semibold uppercase tracking-widest text-slate-500">AI response</p><div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">{output}</div></section>}</div>;
}
