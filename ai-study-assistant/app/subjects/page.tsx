import SubjectManager from "./subject-manager";

export default function SubjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <a href="/" className="text-sm text-slate-400 transition hover:text-white">← Dashboard</a>
        <header className="mt-8">
          <p className="text-sm text-slate-500">Learning library</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">Subjects</h1>
          <p className="mt-3 max-w-2xl text-slate-400">Organize your learning by subject and keep track of every topic.</p>
        </header>
        <div className="mt-10"><SubjectManager /></div>
      </div>
    </main>
  );
}
