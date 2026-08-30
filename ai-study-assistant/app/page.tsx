export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
          AI Study Assistant
        </p>
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Learn smarter. Study with purpose.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Your personal workspace for subjects, notes, practice, progress, and AI-powered learning.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/subjects"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            View subjects
          </a>
          <span className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300">
            Foundation v0.1
          </span>
        </div>
      </section>
    </main>
  );
}
