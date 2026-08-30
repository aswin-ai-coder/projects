import { KEYS, Note, Subject, Topic, Flashcard, Quiz, QuizAttempt, StudySession, read, write, review } from "./domain";
export function getSubjects(){return read<Subject[]>(KEYS.subjects,[])}
export function getTopics(){return read<Topic[]>(KEYS.topics,[])}
export function getNotes(){return read<Note[]>(KEYS.notes,[])}
export function getCards(){return read<Flashcard[]>(KEYS.flashcards,[])}
export function getQuizzes(){return read<Quiz[]>(KEYS.quizzes,[])}
export function getAttempts(){return read<QuizAttempt[]>(KEYS.attempts,[])}
export function getSessions(){return read<StudySession[]>(KEYS.sessions,[])}
export function saveTopics(v:Topic[]){write(KEYS.topics,v)}
export function saveNotes(v:Note[]){write(KEYS.notes,v)}
export function saveCards(v:Flashcard[]){write(KEYS.flashcards,v)}
export function saveSessions(v:StudySession[]){write(KEYS.sessions,v)}
export function saveAttempts(v:QuizAttempt[]){write(KEYS.attempts,v)}
export function dueCards(){const now=Date.now();return getCards().filter(c=>new Date(c.dueAt).getTime()<=now)}
export function reviewCard(id:string,quality:0|1|2){saveCards(getCards().map(c=>c.id===id?review(c,quality):c))}
export function subjectProgress(subjectId:string){const topics=getTopics().filter(t=>t.subjectId===subjectId);return topics.length?Math.round(topics.filter(t=>t.completed).length/topics.length*100):0}
