export type Note = { id: string; title: string; content: string; subject: string; updatedAt: string };
export type Subject = { id: string; name: string; description: string; topics: number; progress: number };
export type QuizAttempt = { id: string; title: string; score: number; total: number; date: string };

export const NOTES_KEY = "ai-study-assistant-notes";
export const SUBJECTS_KEY = "ai-study-assistant-subjects";
export const QUIZ_HISTORY_KEY = "ai-study-assistant-quiz-history";

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
