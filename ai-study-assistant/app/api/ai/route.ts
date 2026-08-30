import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt, context } = await request.json();
  if (typeof prompt !== "string" || !prompt.trim()) return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
  if (context !== undefined && typeof context !== "string") return NextResponse.json({ error: "Invalid study context." }, { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "AI is not configured yet. Add OPENAI_API_KEY to the server environment." }, { status: 503 });

  const studyContext = typeof context === "string" ? context.trim() : "";
  const input = studyContext ? `Here is the student's saved study material:\n\n${studyContext}\n\nStudent request:\n${prompt.trim()}` : prompt.trim();
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || "gpt-4.1-mini", input: [{ role: "system", content: "You are a helpful study assistant. When study material is provided, use it as the primary source. Clearly distinguish information from the material from general knowledge. Explain concepts clearly, encourage learning, and prefer hints and reasoning over simply giving answers." }, { role: "user", content: input }] }),
    });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: data?.error?.message || "The AI service returned an error." }, { status: response.status });
    const answer = data?.output_text || data?.output?.flatMap((item: { content?: { text?: string }[] }) => item.content || []).map((part: { text?: string }) => part.text || "").join("").trim();
    return NextResponse.json({ answer: answer || "The AI returned an empty response." });
  } catch { return NextResponse.json({ error: "Unable to connect to the AI service." }, { status: 502 }); }
}
