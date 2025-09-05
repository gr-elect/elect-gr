-- Enable pgcrypto extension for UUID generation
create extension if not exists pgcrypto;

-- Create votes table
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  ip_hash text not null,
  poll_type text not null check (poll_type in ('prime_minister', 'party_preference')) default 'prime_minister',
  choice text not null,
  user_agent text,
  gender text check (gender in ('Άνδρας', 'Γυναίκα', 'Άλλο', 'Δεν απαντώ')),
  age_group text check (age_group in ('17-24', '25-34', '35-44', '45-54', '55-64', '65+')),
  municipality text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Composite unique constraint for ip_hash + poll_type
  unique(ip_hash, poll_type)
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

-- Create indexes for better performance
create index if not exists idx_votes_ip_hash_poll_type on public.votes(ip_hash, poll_type);
create index if not exists idx_votes_poll_type_choice on public.votes(poll_type, choice);
create index if not exists idx_votes_created_at on public.votes(created_at);
create index if not exists idx_votes_gender on public.votes(gender);
create index if not exists idx_votes_age_group on public.votes(age_group);
create index if not exists idx_votes_municipality on public.votes(municipality);

-- Composite indexes for fast aggregation queries
create index if not exists idx_votes_poll_type_choice_created on public.votes(poll_type, choice, created_at);
create index if not exists idx_votes_recent_pm on public.votes(poll_type, created_at) where poll_type = 'prime_minister' and created_at > (now() - interval '30 days');
create index if not exists idx_votes_recent_party on public.votes(poll_type, created_at) where poll_type = 'party_preference' and created_at > (now() - interval '30 days');

-- Create optimized stored procedure for getting vote results
create or replace function public.get_vote_results(
  poll_type_param text,
  days_limit integer default 30
)
returns table (
  choice text,
  vote_count bigint
) language sql stable as $$
  select 
    v.choice,
    count(*) as vote_count
  from public.votes v
  where v.poll_type = poll_type_param
    and v.created_at > (now() - (days_limit || ' days')::interval)
  group by v.choice
  order by vote_count desc;
$$;

-- Create function to get total vote count for a poll type
create or replace function public.get_total_votes(
  poll_type_param text,
  days_limit integer default 30
)
returns bigint language sql stable as $$
  select count(*)
  from public.votes v
  where v.poll_type = poll_type_param
    and v.created_at > (now() - (days_limit || ' days')::interval);
$$;
