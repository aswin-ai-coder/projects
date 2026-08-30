import { KEYS, Note, Flashcard, Subject, Topic, read, write } from "./domain";
export const data={
 subjects:()=>read<Subject[]>(KEYS.subjects,[]),
 topics:()=>read<Topic[]>(KEYS.topics,[]),
 notes:()=>read<Note[]>(KEYS.notes,[]),
 flashcards:()=>read<Flashcard[]>(KEYS.flashcards,[]),
 saveSubjects:(v:Subject[])=>write(KEYS.subjects,v),
 saveTopics:(v:Topic[])=>write(KEYS.topics,v),
 saveNotes:(v:Note[])=>write(KEYS.notes,v),
 saveFlashcards:(v:Flashcard[])=>write(KEYS.flashcards,v),
};
export function subjectTopics(subjectId:string){return data.topics().filter(t=>t.subjectId===subjectId).sort((a,b)=>a.position-b.position)}
export function subjectNotes(subjectId:string){return data.notes().filter(n=>n.subjectId===subjectId&&!n.archived)}
export function subjectCards(subjectId:string){return data.flashcards().filter(c=>c.subjectId===subjectId)}
export function topicProgress(subjectId:string){const t=subjectTopics(subjectId);return t.length?Math.round(t.filter(x=>x.completed).length/t.length*100):0}
