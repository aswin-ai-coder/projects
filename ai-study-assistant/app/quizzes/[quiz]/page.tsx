import QuizPlayer from "../quiz-player";

export default async function QuizPage({ params }: { params: Promise<{ quiz: string }> }) {
  const { quiz } = await params;
  const title = decodeURIComponent(quiz).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  return <main className="min-h-screen bg-slate-950 text-white"><div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10"><a href="/quizzes" className="text-sm text-slate-400 hover:text-white">← Quizzes</a><header className="mt-8 mb-8"><p className="text-sm text-slate-500">Practice</p><h1 className="mt-1 text-4xl font-bold tracking-tight">{title}</h1><p className="mt-3 text-slate-400">Work through the questions and see your result at the end.</p></header><QuizPlayer /></div></main>;
}
