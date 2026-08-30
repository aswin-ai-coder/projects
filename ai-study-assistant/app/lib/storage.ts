import { KEYS, read, write } from "./domain";
export type Note={id:string;title:string;content:string;subject:string;updatedAt:string};
export type Subject={id:string;name:string;description:string;topics:number;progress:number};
export type QuizAttempt={id:string;title:string;score:number;total:number;date:string};
export type StudySession={id:string;subject:string;topic:string;minutes:number;date:string};
export const NOTES_KEY=KEYS.notes; export const SUBJECTS_KEY=KEYS.subjects; export const QUIZ_HISTORY_KEY=KEYS.attempts; export const STUDY_SESSIONS_KEY=KEYS.sessions; export const SETTINGS_KEY=KEYS.settings;
export function readStorage<T>(key:string,fallback:T):T{return read<T>(key,fallback)}
export function writeStorage<T>(key:string,value:T){write(key,value)}
export function recordStudySession(subject:string,topic:string,minutes:number){const sessions=readStorage<StudySession[]>(STUDY_SESSIONS_KEY,[]);writeStorage(STUDY_SESSIONS_KEY,[{id:Date.now().toString(),subject,topic,minutes,date:new Date().toISOString()},...sessions])}
