-- Enable pgcrypto extension for UUID generation
create extension if not exists pgcrypto;

-- Create votes table
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null unique,
  choice text not null check (choice in (
    'Μητσοτάκης',
    'Ανδρουλάκης',
    'Κωνσταντοπούλου',
    'Λατινοπούλου',
    'Κουτσούμπας',
    'Βελόπουλος',
    'Κασσελάκης',
    'Φάμελλος',
    'Χαρίτσης',
    'Νατσιός',
    'Άλλος',
    'Κανένας'
  )),
  user_agent text,
  gender text check (gender in ('Άνδρας', 'Γυναίκα', 'Άλλο', 'Δεν απαντώ')),
  age_group text check (age_group in ('17-24', '25-34', '35-44', '45-54', '55-64', '65+')),
  municipality text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create function to update updated_at timestamp
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- Create trigger for updated_at
drop trigger if exists trg_votes_updated_at on public.votes;
create trigger trg_votes_updated_at
before update on public.votes
for each row execute procedure public.touch_updated_at();

-- Enable Row Level Security (RLS)
alter table public.votes enable row level security;

-- Optional: Create indexes for better performance
create index if not exists idx_votes_ip_hash on public.votes(ip_hash);
create index if not exists idx_votes_choice on public.votes(choice);
create index if not exists idx_votes_created_at on public.votes(created_at);
create index if not exists idx_votes_gender on public.votes(gender);
create index if not exists idx_votes_age_group on public.votes(age_group);
create index if not exists idx_votes_municipality on public.votes(municipality);
