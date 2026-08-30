import TopicManager from "../topic-manager";
import SubjectNotes from "../notes-section";

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  const subjectName = decodeURIComponent(subject).replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10">
        <a href="/subjects" className="text-sm text-slate-400 hover:text-white">← Subjects</a>
        <header className="mt-8">
          <p className="text-sm text-slate-500">Subject workspace</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight">{subjectName}</h1>
          <p className="mt-3 text-slate-400">Build your topic checklist and keep your study material together.</p>
        </header>
        <TopicManager subjectName={subjectName} />
        <SubjectNotes subjectName={subjectName} />
      </div>
    </main>
  );
}
