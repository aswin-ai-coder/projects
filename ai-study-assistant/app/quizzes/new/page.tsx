import Link from "next/link";
import QuizEditor from "../quiz-editor";
export default function NewQuizPage(){return <main className="min-h-screen bg-slate-950 text-white"><div className="mx-auto max-w-4xl px-5 py-8 sm:px-8"><Link href="/quizzes" className="text-sm text-slate-400">← Quizzes</Link><h1 className="mt-8 text-4xl font-bold">Create quiz</h1><p className="mt-2 text-slate-400">Build a quiz with multiple-choice, true/false, or short-answer questions.</p><div className="mt-8"><QuizEditor/></div></div></main>}
