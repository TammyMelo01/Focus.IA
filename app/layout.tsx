import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: "Focus.IA",
  description: "Assistente inteligente para foco e produtividade",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
