const subjects = [
  { name: "Mathematics", description: "Numbers, algebra, geometry and problem solving.", topics: 12, progress: 68 },
  { name: "Science", description: "Explore the world through physics, chemistry and biology.", topics: 9, progress: 45 },
  { name: "English", description: "Reading, writing, grammar and communication.", topics: 7, progress: 82 },
];

export default function SubjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:px-10">
        <a href="/" className="text-sm text-slate-400 transition hover:text-white">← Dashboard</a>
        <header className="mt-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Learning library</p>
            <h1 className="mt-1 text-4xl font-bold tracking-tight">Subjects</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Organize your learning by subject and keep track of every topic.</p>
          </div>
          <button className="hidden rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 sm:block">+ Add subject</button>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <article key={subject.name} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-slate-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 font-bold">{subject.name[0]}</div>
              <h2 className="mt-6 text-xl font-bold">{subject.name}</h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{subject.description}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                <span>{subject.topics} topics</span>
                <span>{subject.progress}% complete</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-white" style={{ width: `${subject.progress}%` }} />
              </div>
              <button className="mt-6 w-full rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">Open subject</button>
            </article>
          ))}
        </div>

        <button className="mt-6 w-full rounded-xl border border-dashed border-slate-700 px-5 py-4 text-sm font-semibold text-slate-400 transition hover:border-slate-500 hover:text-white sm:hidden">+ Add subject</button>
      </div>
    </main>
  );
}
