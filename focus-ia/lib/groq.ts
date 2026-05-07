import { BreakdownResult } from "./types";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function createBreakdown(input: string): Promise<BreakdownResult> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY não foi configurada.");
  }

  const prompt = `
Voce e um assistente de funcao executiva. Transforme o texto do usuario em um plano simples.
Responda APENAS em JSON valido, sem markdown.
Formato:
{
  "summary": "resumo curto",
  "warning": "alerta gentil sobre hiperfoco/exaustao",
  "tasks": [
    {
      "title": "nome da tarefa",
      "priority": "Alta|Media|Baixa",
      "energy": "Baixa|Media|Alta",
      "durationMinutes": 25,
      "steps": ["microetapa 1", "microetapa 2"]
    }
  ]
}
Texto do usuario: ${input}
`;

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Voce responde somente JSON valido." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro Groq: ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("A Groq não retornou conteúdo.");
  }

  return JSON.parse(content) as BreakdownResult;
}
