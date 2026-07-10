-- =====================================================================
--  Powerpay — domain tables (Next.js + Better Auth edition)
--
--  RUN ORDER:
--   1) First create Better Auth tables:   npm run auth:migrate
--      (creates "user", "session", "account", "verification")
--   2) Then run THIS file in Supabase SQL Editor.
--
--  Access is server-side only (direct Postgres via server actions), so we
--  enable RLS with no policies to block the public PostgREST/anon API.
--  The Postgres role used by the app bypasses RLS.
-- =====================================================================

create extension if not exists "pgcrypto";

-- Status enum shared by transactions & withdrawals
do $$ begin
  create type public.trade_status as enum ('pending','confirmed','rejected');
exception when duplicate_object then null;
end $$;

-- Add referral tracking to Better Auth user table.
alter table if exists "user" add column if not exists referral_code text;
alter table if exists "user" add column if not exists referral_code_used text;
alter table if exists "user" add column if not exists referred_by text;
alter table if exists "user" add column if not exists balance numeric(14,2) not null default 0;
create unique index if not exists user_referral_code_idx on "user"(referral_code);

-- ---------- CRYPTOCURRENCIES ----------
create table if not exists public.cryptocurrencies (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  symbol          text,
  icon_url        text,
  buy_price       numeric(14,2) not null default 0,
  sell_price      numeric(14,2) not null default 0,
  deposit_address text,
  enabled         boolean not null default true,
  created_at      timestamptz not null default now()
);
alter table public.cryptocurrencies enable row level security;

-- ---------- GIFT CARDS ----------
create table if not exists public.giftcards (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  icon_url        text,
  subcategories   jsonb not null default '[]'::jsonb,   -- [{name, rate}, ...]
  enabled         boolean not null default true,
  created_at      timestamptz not null default now()
);
alter table public.giftcards enable row level security;

-- ---------- TRANSACTIONS ----------
create table if not exists public.transactions (
  id             uuid primary key default gen_random_uuid(),
  user_id        text not null references "user"(id) on delete cascade,
  type           text not null check (type in ('buy_crypto','sell_crypto','sell_giftcard')),
  asset_name     text,
  icon_url       text,
  sub_category   text,
  country        text,
  amount         numeric(20,10) not null default 0,
  rate           numeric(20,10) not null default 0,
  payout         numeric(14,2) not null default 0,
  payment_method text,
  wallet_address text,
  description    text,
  images         jsonb not null default '[]'::jsonb,
  status         public.trade_status not null default 'pending',
  created_at     timestamptz not null default now()
);
alter table public.transactions enable row level security;
create index if not exists tx_user_idx on public.transactions(user_id);

-- ---------- WITHDRAWALS ----------
create table if not exists public.withdrawals (
  id             uuid primary key default gen_random_uuid(),
  user_id        text not null references "user"(id) on delete cascade,
  amount         numeric(14,2) not null,
  bank_name      text,
  account_name   text,
  account_number text,
  status         public.trade_status not null default 'pending',
  created_at     timestamptz not null default now()
);
alter table public.withdrawals enable row level security;
create index if not exists wd_user_idx on public.withdrawals(user_id);

-- ---------- SETTINGS ----------
create table if not exists public.settings (
  key   text primary key,
  value jsonb not null default '{}'::jsonb
);
alter table public.settings enable row level security;

insert into public.settings (key, value)
values ('deposit_bank', '{"bank_name":"","account_name":"","account_number":""}'::jsonb)
on conflict (key) do nothing;

-- =====================================================================
--  STORAGE — private bucket for proof images (accessed via signed URLs).
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('proofs', 'proofs', false)
on conflict (id) do update set public = false;

drop policy if exists "proofs: public read" on storage.objects;

-- =====================================================================
--  Make yourself admin after signing up:
--    update "user" set is_admin = true where email = 'you@example.com';
-- =====================================================================

