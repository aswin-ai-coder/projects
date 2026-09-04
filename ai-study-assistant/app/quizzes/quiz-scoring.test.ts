import { describe,expect,it } from "vitest";
import { answerIsCorrect,normalizeAnswer,scoreQuiz } from "./quiz-scoring";

describe("quiz scoring",()=>{
 it("normalizes case and whitespace",()=>expect(normalizeAnswer("  New   York ")).toBe("new york"));
 it("scores multiple question types by answer",()=>expect(scoreQuiz([{answer:"A"},{answer:"True"},{answer:"newton"}],["a","true"," Newton "])).toEqual({score:3,total:3,percent:100}));
 it("does not count blank or incorrect answers",()=>expect(scoreQuiz([{answer:"A"},{answer:"B"}],["","C"])).toEqual({score:0,total:2,percent:0}));
 it("handles an empty quiz safely",()=>expect(scoreQuiz([],[])).toEqual({score:0,total:0,percent:0}));
 it("compares a single answer",()=>expect(answerIsCorrect({answer:"Paris"},"paris")).toBe(true));
});
