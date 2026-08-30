export type Note={id:string;title:string;content:string;subject:string;updatedAt:string};
export type Subject={id:string;name:string;description:string;topics:number;progress:number};
export type QuizAttempt={id:string;title:string;score:number;total:number;date:string};
export type StudySession={id:string;subject:string;topic:string;minutes:number;date:string};
export const NOTES_KEY="ai-study-assistant-notes";
export const SUBJECTS_KEY="ai-study-assistant-subjects";
export const QUIZ_HISTORY_KEY="ai-study-assistant-quiz-history";
export const STUDY_SESSIONS_KEY="ai-study-assistant-study-sessions";
export const SETTINGS_KEY="ai-study-assistant-settings";
export function readStorage<T>(key:string,fallback:T):T{if(typeof window==="undefined")return fallback;try{const raw=window.localStorage.getItem(key);return raw?JSON.parse(raw) as T:fallback;}catch{return fallback;}}
export function writeStorage<T>(key:string,value:T){window.localStorage.setItem(key,JSON.stringify(value));}
export function recordStudySession(subject:string,topic:string,minutes:number){const sessions=readStorage<StudySession[]>(STUDY_SESSIONS_KEY,[]);writeStorage(STUDY_SESSIONS_KEY,[{id:Date.now().toString(),subject,topic,minutes,date:new Date().toISOString()},...sessions]);}
