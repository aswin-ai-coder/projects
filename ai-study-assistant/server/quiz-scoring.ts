export type QuizQuestion={type?:string;answer:string};
export function normalizeAnswer(value:string){return value.trim().toLowerCase().replace(/\s+/g," ")}
export function isAnswerCorrect(question:QuizQuestion,answer:string|null){return answer!==null&&normalizeAnswer(answer)===normalizeAnswer(question.answer)}
export function scoreQuiz(questions:QuizQuestion[],answers:(string|null)[]){const score=questions.reduce((n,q,i)=>n+(isAnswerCorrect(q,answers[i])?1:0),0);return {score,total:questions.length,percent:questions.length?Math.round(score/questions.length*100):0}}
