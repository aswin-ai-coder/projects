import {Note,Subject,Topic,Flashcard,Quiz,QuizAttempt,StudySession} from "./domain";
async function api<T>(resource:string,init?:RequestInit):Promise<T>{const r=await fetch(`/api/data?resource=${encodeURIComponent(resource)}`,{...init,headers:{"Content-Type":"application/json",...(init?.headers||{})}});const d=await r.json();if(!r.ok)throw Error(d.error||"Request failed");return d.data as T}
export const getSubjects=()=>api<Subject[]>("subjects");export const getTopics=()=>api<Topic[]>("topics");export const getNotes=()=>api<Note[]>("notes");export const getCards=()=>api<Flashcard[]>("flashcards");export const getQuizzes=()=>api<Quiz[]>("quizzes");export const getAttempts=()=>api<QuizAttempt[]>("quiz_attempts");export const getSessions=()=>api<StudySession[]>("study_sessions");
export async function create(resource:string,payload:any){return api<any>(resource,{method:"POST",body:JSON.stringify({...payload,resource})})}
export async function update(resource:string,id:string,payload:any){return api<any>(resource,{method:"PATCH",body:JSON.stringify({...payload,resource,id})})}
export async function remove(resource:string,id:string){return api<any>(resource,{method:"DELETE",body:JSON.stringify({id})})}
export async function reviewCard(id:string,quality:0|1|2){return api<any>("flashcards",{method:"PATCH",body:JSON.stringify({resource:"flashcards",id,quality})})}
