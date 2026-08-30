const subjects = [
  { name: "Mathematics", topics: 12, progress: 68, icon: "M" },
  { name: "Science", topics: 9, progress: 45, icon: "S" },
  { name: "English", topics: 7, progress: 82, icon: "E" },
];

const navItems = [
  { label: "Dashboard", href: "/", active: true },
  { label: "Subjects", href: "/subjects" },
  { label: "Notes", href: "#notes" },
  { label: "Practice", href: "#practice" },
  { label: "Progress", href: "#progress" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-[1440px]">
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950 px-5 py-7 lg:block">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-bold text-slate-950">AI</div>
            <div>
              <p className="font-bold">Study AI</p>
              <p className="text-xs text-slate-500">Your learning space</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${item.active ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-white"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold">Keep going</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">Small study sessions add up. Your next milestone is waiting.</p>
          </div>
        </aside>

        <section className="flex-1 px-5 py-7 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">Sunday, August 30</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Good afternoon, Aswin.</h1>
            </div>
            <button className="hidden rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white sm:block">
              Settings
            </button>
          </header>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Study progress", "64%", "Across all subjects"],
              ["Topics completed", "28", "This learning cycle"],
              ["Study streak", "7 days", "Keep it going"],
            ].map(([label, value, detail]) => (
              <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-3 text-3xl font-bold">{value}</p>
                <p className="mt-1 text-xs text-slate-500">{detail}</p>
              </div>
            ))}
          </div>

          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-bold">Your subjects</h2>
                <p className="mt-1 text-sm text-slate-500">Pick up where you left off.</p>
              </div>
              <a href="/subjects" className="text-sm font-semibold text-slate-300 hover:text-white">View all</a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {subjects.map((subject) => (
                <a key={subject.name} href="/subjects" className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:-translate-y-0.5 hover:border-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 font-bold">{subject.icon}</div>
                    <span className="text-xs text-slate-500">{subject.topics} topics</span>
                  </div>
                  <h3 className="mt-6 font-semibold group-hover:text-white">{subject.name}</h3>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-white" style={{ width: `${subject.progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{subject.progress}% complete</p>
                </a>
              ))}
            </div>
          </section>

          <section className="mt-10 grid gap-4 md:grid-cols-2">
            <div id="practice" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm text-slate-500">Next up</p>
              <h2 className="mt-2 text-xl font-bold">Continue your study session</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Practice the topics you have been working on and strengthen your understanding.</p>
              <button className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950">Start practice</button>
            </div>
            <div id="notes" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm text-slate-500">Quick access</p>
              <h2 className="mt-2 text-xl font-bold">Your notes</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">Save explanations, ideas, and important study material in one organized place.</p>
              <button className="mt-6 rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200">Open notes</button>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
