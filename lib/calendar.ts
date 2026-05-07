import { MicroTask } from "./types";

function formatGoogleDate(date: Date) {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function createGoogleCalendarUrl(task: MicroTask, startDate = new Date()) {
  const endDate = new Date(startDate.getTime() + task.durationMinutes * 60000);
  const details = task.steps.map((step, index) => `${index + 1}. ${step}`).join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Focus.IA: ${task.title}`,
    details: `Prioridade: ${task.priority}\nEnergia: ${task.energy}\n\nMicroetapas:\n${details}`,
    dates: `${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
