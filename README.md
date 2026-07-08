# Powerpay

A platform to buy and sell cryptocurrency and gift cards, with every trade
verified by an admin before payout. Built with **Vite + React**, **Chakra UI v3**
and **Supabase** (Auth, Postgres, Storage).

## Stack
- **Frontend:** React 18, React Router, Chakra UI v3, Zustand
- **Backend:** Supabase — Auth, Postgres (with Row Level Security), Storage

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up Supabase — see [`supabase/SETUP.md`](supabase/SETUP.md). In short:
   - Create a project, run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor.
   - Copy `.env.example` to `.env` and fill in your project URL and anon key.
3. Run the app:
   ```bash
   npm run dev
   ```

## Areas
- **Public site** — `/`, `/about`, `/contact`, `/rates`
- **User dashboard** — `/dashboard` (sell/buy crypto, sell gift cards, withdraw, history)
- **Admin panel** — `/admin` (approve trades & withdrawals, manage crypto/gift-card rates, users, settings)

To become an admin, sign up, then in Supabase run:
```sql
update public.profiles set is_admin = true where email = 'you@example.com';
```

