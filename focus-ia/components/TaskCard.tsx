import { CalendarPlus, CheckCircle2, Clock, Zap } from "lucide-react";
import { MicroTask } from "@/lib/types";
import { createGoogleCalendarUrl } from "@/lib/calendar";

export function TaskCard({ task, index }: { task: MicroTask; index: number }) {
  return (
    <article className="task-card">
      <div className="task-topline">
        <span className="task-number">{index + 1}</span>
        <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>

      <h3>{task.title}</h3>

      <div className="task-meta">
        <span><Clock size={16} /> {task.durationMinutes} min</span>
        <span><Zap size={16} /> Energia {task.energy}</span>
      </div>

      <ul className="steps">
        {task.steps.map((step, stepIndex) => (
          <li key={stepIndex}>
            <CheckCircle2 size={16} />
            <span>{step}</span>
          </li>
        ))}
      </ul>

      <a className="calendar-button" href={createGoogleCalendarUrl(task)} target="_blank" rel="noreferrer">
        <CalendarPlus size={18} /> Agendar no Google Agenda
      </a>
    </article>
  );
}
