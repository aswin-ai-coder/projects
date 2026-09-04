import Link from "next/link";
import QuizEditor from "../../quiz-editor";
export default async function EditQuizPage({params}:{params:Promise<{quiz:string}>}){const {quiz}=await params;return <main className="min-h-screen bg-slate-950 text-white"><div className="mx-auto max-w-4xl px-5 py-8 sm:px-8"><Link href="/quizzes" className="text-sm text-slate-400">← Quizzes</Link><h1 className="mt-8 text-4xl font-bold">Edit quiz</h1><div className="mt-8"><QuizEditor quizId={quiz}/></div></div></main>}
