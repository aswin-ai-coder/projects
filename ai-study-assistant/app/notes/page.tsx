import NotesManager from "./notes-manager";

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <a href="/" className="text-sm text-slate-400 hover:text-white">← Dashboard</a>
        <header className="mt-8">
          <p className="text-sm text-slate-500">Knowledge base</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">Notes</h1>
          <p className="mt-3 text-slate-400">Capture, organize, and quickly find what you are learning.</p>
        </header>
        <div className="mt-10"><NotesManager /></div>
      </div>
    </main>
  );
}
