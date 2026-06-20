create table if not exists trips (
  id bigint generated always as identity primary key,
  user_id uuid,
  platform text,
  distance numeric,
  income numeric,
  fuel_cost numeric,
  created_at timestamptz default now()
);
