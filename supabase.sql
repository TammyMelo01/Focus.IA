create table if not exists focus_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  title text not null,
  priority text not null,
  energy text not null,
  duration_minutes integer not null default 25,
  steps jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
