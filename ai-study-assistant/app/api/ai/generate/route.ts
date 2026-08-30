import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { type, count, source } = await request.json();
  if (!["flashcards", "quiz"].includes(type) || !Number.isInteger(count) || count < 1 || count > 10 || typeof source !== "string" || !source.trim()) return NextResponse.json({ error: "Valid type, count, and study material are required." }, { status: 400 });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI is not configured yet. Add OPENAI_API_KEY to the server environment." }, { status: 503 });
  const schema = type === "flashcards" ? '{"items":[{"front":"question","back":"answer","subject":"subject","topic":"topic"}]}' : '{"items":[{"question":"question","options":["A","B","C","D"],"answer":0,"subject":"subject","topic":"topic"}]}';
  const instruction = type === "flashcards" ? `Create ${count} useful study flashcards from the supplied material.` : `Create ${count} multiple-choice quiz questions from the supplied material. The answer field is the zero-based index of the correct option.`;
  try {
    const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }, body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", input: [{ role: "system", content: `You create accurate educational material using only the supplied study material. Return valid JSON only, matching this shape: ${schema}` }, { role: "user", content: `${instruction}\n\nStudy material:\n${source}` }] }) });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || "The AI service returned an error." }, { status: response.status });
    const text = data?.output_text?.trim() || "";
    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch { return NextResponse.json({ error: "Unable to generate study material." }, { status: 502 }); }
}
