export type QuizQuestion={answer:string};
export const normalizeAnswer=(value:string)=>value.trim().toLowerCase().replace(/\s+/g," ");
export const answerIsCorrect=(question:QuizQuestion,answer:string|null|undefined)=>Boolean(answer)&&normalizeAnswer(answer||"")===normalizeAnswer(question.answer);
export function scoreQuiz(questions:QuizQuestion[],answers:(string|null|undefined)[]){const score=questions.reduce((total,q,i)=>total+(answerIsCorrect(q,answers[i])?1:0),0);return {score,total:questions.length,percent:questions.length?Math.round(score/questions.length*100):0};}
