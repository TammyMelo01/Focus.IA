# Focus.IA

Assistente com IA para transformar textos grandes em microetapas, organizar prioridades e reduzir sobrecarga mental.

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra: http://localhost:3000

## Variáveis de ambiente na Vercel

Adicione em Project Settings > Environment Variables:

- `GROQ_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Se ainda não usa Supabase, pode deixar Supabase como `test` no começo.

## Deploy na Vercel

1. Suba os arquivos para o GitHub.
2. Na Vercel, clique em Add New > Project.
3. Importe o repositório.
4. Framework Preset: Next.js.
5. Adicione as variáveis.
6. Clique em Deploy.
