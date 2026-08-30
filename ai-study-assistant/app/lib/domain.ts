export type User = { id:string; displayName:string; email:string; createdAt:string };
export type Subject = { id:string; name:string; description:string; createdAt:string };
export type Topic = { id:string; subjectId:string; name:string; completed:boolean; position:number };
export type Note = { id:string; subjectId:string; topicId?:string; title:string; content:string; tags:string[]; pinned:boolean; archived:boolean; createdAt:string; updatedAt:string };
export type Flashcard = { id:string; subjectId:string; topicId?:string; front:string; back:string; interval:number; ease:number; dueAt:string; reviews:number; createdAt:string };
export type QuizQuestion = { id:string; question:string; options:string[]; answer:number; explanation?:string };
export type Quiz = { id:string; subjectId:string; topicId?:string; title:string; difficulty:string; questions:QuizQuestion[]; createdAt:string };
export type QuizAttempt = { id:string; quizId:string; title:string; score:number; total:number; percent:number; completedAt:string };
export type StudySession = { id:string; subjectId?:string; topicId?:string; activity:string; minutes:number; startedAt:string; endedAt?:string };
export type Settings = { displayName:string; dailyGoalMinutes:number; aiStyle:"concise"|"balanced"|"detailed"; theme:"dark"|"light"|"system" };
export const KEYS={user:"study-user",subjects:"study-subjects",topics:"study-topics",notes:"study-notes",flashcards:"study-flashcards",quizzes:"study-quizzes",attempts:"study-attempts",sessions:"study-sessions",settings:"study-settings",conversations:"study-ai-conversations"};
export function read<T>(key:string,fallback:T):T{if(typeof window==="undefined")return fallback;try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch{return fallback}}
export function write<T>(key:string,value:T){localStorage.setItem(key,JSON.stringify(value))}
export function review(card:Flashcard,quality:0|1|2):Flashcard{const next={...card};next.interval=quality===0?1:quality===1?Math.max(1,Math.round(card.interval*1.5)):Math.max(1,Math.round(card.interval*card.ease));next.ease=quality===0?Math.max(1.3,card.ease-.2):Math.min(2.8,card.ease+(quality===2?.15:.05));next.reviews++;next.dueAt=new Date(Date.now()+next.interval*86400000).toISOString();return next}
