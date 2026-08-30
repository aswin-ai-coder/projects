import FlashcardManager from "../flashcard-manager";

export default function ManageFlashcardsPage() {
  return <main className="min-h-screen bg-slate-950 text-white"><div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10"><a href="/flashcards" className="text-sm text-slate-400 hover:text-white">← Flashcards</a><header className="mt-8 mb-8"><p className="text-sm text-slate-500">Your study deck</p><h1 className="mt-1 text-4xl font-bold tracking-tight">Manage flashcards</h1><p className="mt-3 text-slate-400">Create cards and organize them by subject and topic.</p></header><FlashcardManager /></div></main>;
}
