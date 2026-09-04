import { describe,expect,it } from "vitest";
import { isAnswerCorrect,scoreQuiz } from "./quiz-scoring";
describe("quiz scoring",()=>{it("normalizes short answers",()=>expect(isAnswerCorrect({answer:"Newton"}," newton ")).toBe(true));it("scores mixed question answers",()=>expect(scoreQuiz([{answer:"A"},{answer:"True"},{answer:"42"}],["A","False","42"])).toEqual({score:2,total:3,percent:67}));it("handles empty quizzes",()=>expect(scoreQuiz([],[])).toEqual({score:0,total:0,percent:0}))});
