export type MicroTask = {
  title: string;
  priority: "Alta" | "Media" | "Baixa";
  energy: "Baixa" | "Media" | "Alta";
  durationMinutes: number;
  steps: string[];
};

export type BreakdownResult = {
  summary: string;
  warning: string;
  tasks: MicroTask[];
};
