import { Flashcard, QuizAttempt, StudySession, Topic } from "./domain";
export function totalMinutes(s:StudySession[]){return s.reduce((n,x)=>n+x.minutes,0)}
export function quizAverage(a:QuizAttempt[]){return a.length?Math.round(a.reduce((n,x)=>n+x.percent,0)/a.length):0}
export function dueCards(c:Flashcard[],now=Date.now()){return c.filter(x=>new Date(x.dueAt).getTime()<=now)}
export function streak(s:StudySession[],today=new Date()){const days=new Set(s.map(x=>new Date(x.startedAt).toISOString().slice(0,10)));let d=new Date(today),n=0;while(days.has(d.toISOString().slice(0,10))){n++;d.setDate(d.getDate()-1)}return n}
export function topicCompletion(t:Topic[]){return t.length?Math.round(t.filter(x=>x.completed).length/t.length*100):0}
export function weeklyMinutes(s:StudySession[],now=new Date()){const start=new Date(now);start.setDate(start.getDate()-6);start.setHours(0,0,0,0);return s.filter(x=>new Date(x.startedAt)>=start).reduce((n,x)=>n+x.minutes,0)}
