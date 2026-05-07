"use client";

const [theme, setTheme] = useState("light");

function toggleTheme() {
  const nextTheme = theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
  document.body.className = nextTheme;
}

import { useState } from "react";
import { Brain, CalendarClock, Loader2, ShieldCheck, Sparkles, TimerReset } from "lucide-react";
import { TaskCard } from "@/components/TaskCard";
import { BreakdownResult } from "@/lib/types";

const example = "Tenho que responder clientes, organizar documentos, montar uma proposta, revisar pendencias e separar pausas porque costumo hiperfocar e esquecer do tempo.";

export default function Home() {
  const [input, setInput] = useState(example);
  const [result, setResult] = useState<BreakdownResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao organizar tarefas.");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Brain size={18} /> Assistente de função executiva com IA</div>
          <h1>Focus.IA transforma pensamentos soltos em ações pequenas.</h1>
          <p>
            Cole um texto grande, uma lista confusa ou um despejo mental. A IA organiza prioridades,
            quebra em microetapas e cria blocos que podem ir para o Google Agenda.
          </p>
          <div className="hero-actions">
            <button onClick={handleSubmit} disabled={loading || !input.trim()}>
              {loading ? <Loader2 className="spin" size={20} /> : <Sparkles size={20} />}
              {loading ? "Organizando..." : "Organizar meu dia"}
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="stat"><TimerReset /> Pausas anti-hiperfoco</div>
          <div className="stat"><CalendarClock /> Agenda com microblocos</div>
          <div className="stat"><ShieldCheck /> Menos sobrecarga mental</div>
        </div>
      </section>

      <section className="workspace">
        <div className="panel input-panel">
          <label htmlFor="brain-dump">Despejo mental ou texto grande</label>
          <textarea
            id="brain-dump"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ex: Tenho muitas pendências hoje e não sei por onde começar..."
          />
          <button className="wide" onClick={handleSubmit} disabled={loading || !input.trim()}>
            {loading ? "Pensando..." : "Quebrar em microetapas"}
          </button>
          {error && <p className="error">{error}</p>}
        </div>

        <div className="panel result-panel">
          {!result && !loading && (
            <div className="empty-state">
              <Sparkles size={34} />
              <h2>Seu plano aparece aqui</h2>
              <p>O Focus.IA vai sugerir prioridade, energia, duração e microetapas.</p>
            </div>
          )}

          {loading && (
            <div className="empty-state">
              <Loader2 className="spin" size={34} />
              <h2>Organizando suas tarefas...</h2>
              <p>Separando ações pequenas e realistas.</p>
            </div>
          )}

          {result && (
            <div className="results">
              <div className="summary-box">
                <h2>{result.summary}</h2>
                <p>{result.warning}</p>
              </div>
              <div className="task-grid">
                {result.tasks.map((task, index) => (
                  <TaskCard key={`${task.title}-${index}`} task={task} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
