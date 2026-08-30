import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  if (typeof prompt !== "string" || !prompt.trim()) return NextResponse.json({ error: "A prompt is required." }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI is not configured yet. Add OPENAI_API_KEY to the server environment." }, { status: 503 });

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", input: [{ role: "system", content: "You are a helpful study assistant. Explain concepts clearly, encourage learning, and prefer hints and reasoning over simply giving answers." }, { role: "user", content: prompt.trim() }] }),
    });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || "The AI service returned an error." }, { status: response.status });
    const answer = data?.output_text || data?.output?.flatMap((item: { content?: { text?: string }[] }) => item.content || []).map((part: { text?: string }) => part.text || "").join("").trim();
    return NextResponse.json({ answer: answer || "The AI returned an empty response." });
  } catch {
    return NextResponse.json({ error: "Unable to connect to the AI service." }, { status: 502 });
  }
}
