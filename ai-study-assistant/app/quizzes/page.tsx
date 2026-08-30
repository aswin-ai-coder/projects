import QuizPlayer from "./quiz-player";

export default function QuizzesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10">
        <a href="/" className="text-sm text-slate-400 hover:text-white">← Dashboard</a>
        <header className="mt-8 mb-8">
          <p className="text-sm text-slate-500">Practice mode</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">Quick Quiz</h1>
          <p className="mt-3 text-slate-400">Test your knowledge and review your score when you finish.</p>
        </header>
        <QuizPlayer />
      </div>
    </main>
  );
}
