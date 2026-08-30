import { StudySession, QuizAttempt, Flashcard } from "./domain";
export function totalStudyMinutes(sessions:StudySession[]){return sessions.reduce((n,s)=>n+s.minutes,0)}
export function quizAverage(attempts:QuizAttempt[]){return attempts.length?Math.round(attempts.reduce((n,a)=>n+a.percent,0)/attempts.length):0}
export function dueCards(cards:Flashcard[],now=Date.now()){return cards.filter(c=>new Date(c.dueAt).getTime()<=now)}
export function currentStreak(sessions:StudySession[],today=new Date()){const days=new Set(sessions.map(s=>new Date(s.startedAt).toISOString().slice(0,10)));let d=new Date(today);let streak=0;while(days.has(d.toISOString().slice(0,10))){streak++;d.setDate(d.getDate()-1)}return streak}
export function dailyMinutes(sessions:StudySession[],date=new Date()){const key=date.toISOString().slice(0,10);return sessions.filter(s=>s.startedAt.slice(0,10)===key).reduce((n,s)=>n+s.minutes,0)}
