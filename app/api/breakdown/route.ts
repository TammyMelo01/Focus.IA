import { NextResponse } from "next/server";
import { createBreakdown } from "@/lib/groq";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = String(body.input || "").trim();

    if (!input) {
      return NextResponse.json({ error: "Envie um texto para organizar." }, { status: 400 });
    }

    const result = await createBreakdown(input);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
