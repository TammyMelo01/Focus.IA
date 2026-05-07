import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Focus.IA",
  description: "Assistente de microtarefas com IA"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
