# Powerpay — Supabase Setup

Follow these steps once to connect the app to your own Supabase project.

## 1. Create a project
1. Go to https://supabase.com → **New project**.
2. Pick a name/password/region and wait for it to provision.

## 2. Run the schema
1. Open **SQL Editor → New query**.
2. Paste the entire contents of [`schema.sql`](./schema.sql) and click **Run**.
   - This creates all tables (`profiles`, `cryptocurrencies`, `giftcards`,
     `transactions`, `withdrawals`, `settings`), Row Level Security policies,
     the `proofs` storage bucket, and helper functions.

## 3. Get your API keys
1. **Project Settings → API**.
2. Copy the **Project URL** and the **anon / public** key.
3. In the project root, copy `.env.example` to `.env` and fill them in:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## 4. Auth settings
- **Authentication → Providers → Email**: keep enabled.
- For quick testing you can turn **"Confirm email"** OFF
  (Authentication → Sign In / Providers). Leave it ON for production;
  users then confirm via the email link before logging in.
- **Authentication → URL Configuration**: set **Site URL** to your app URL
  (e.g. `http://localhost:5173`) so verification/reset links work.

## 5. Make yourself an admin
1. Start the app (`npm run dev`) and **sign up** with your email.
2. Back in Supabase **SQL Editor**, run:

```sql
update public.profiles set is_admin = true where email = 'you@example.com';
```

3. Log into the admin panel at `/admin`.

## 6. Seed some data (optional)
From the admin panel you can add cryptocurrencies and gift cards, set rates,
and set the company bank account (the account users pay into when buying crypto).

