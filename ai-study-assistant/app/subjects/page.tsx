export default function SubjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <a href="/" className="text-sm text-slate-400 hover:text-white">← Back home</a>
        <h1 className="mt-8 text-4xl font-bold">Subjects</h1>
        <p className="mt-3 text-slate-400">Your subjects will appear here as we build the study system.</p>
        <div className="mt-10 rounded-2xl border border-dashed border-slate-700 p-10 text-center">
          <p className="font-medium">No subjects yet</p>
          <p className="mt-2 text-sm text-slate-500">Subject creation is coming next.</p>
        </div>
      </div>
    </main>
  );
}
