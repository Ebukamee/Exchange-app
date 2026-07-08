import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { pool } from "./db";
import { sendVerificationEmail, sendResetEmail } from "./email";

// Better Auth on the Supabase Postgres pool. Users live in the `user` table
// with extra profile fields (wallet, bank, balance, admin flag).
export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || (process.env.NODE_ENV === 'production' ? "https://dashboard.powerpaytech.com" : "http://localhost:3000"),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 6,
    sendResetPassword: async ({ user, url }) => {
      await sendResetEmail(user.email, url);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(user.email, url);
    },
  },

  user: {
    additionalFields: {
      full_name: { type: "string", required: false, input: true },
      wallet_address: { type: "string", required: false, input: true },
      bank_name: { type: "string", required: false, input: true },
      account_name: { type: "string", required: false, input: true },
      account_number: { type: "string", required: false, input: true },
      referral_code: { type: "string", required: false, input: false },
      referral_code_used: { type: "string", required: false, input: true },
      referred_by: { type: "string", required: false, input: false },
      // server-managed — clients cannot set these
      balance: { type: "number", required: false, input: false, defaultValue: 0 },
      is_admin: { type: "boolean", required: false, input: false, defaultValue: false },
    },
  },

  plugins: [nextCookies()], // must be last — handles cookie setting in server actions
});

