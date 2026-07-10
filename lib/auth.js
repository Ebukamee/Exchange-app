import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { pool } from "./db";
import { sendVerificationEmail, sendResetEmail } from "./email";

function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// Better Auth on the Supabase Postgres pool. Users live in the `user` table
// with extra profile fields (wallet, bank, balance, admin flag).
export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || (process.env.NODE_ENV === 'production' ? "https://powerpaytech.com" : "http://localhost:3000"),
  rateLimit: {
    enabled: true,
    window: 60,
    max: 10,
    customRules: {
      "/sign-up/email": { window: 300, max: 5 },
      "/forgot-password": { window: 300, max: 3 },
    },
  },
 advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: ".powerpaytech.com", // leading dot shares across all subdomains
    },
  },
  trustedOrigins: [
    "https://powerpaytech.com",
    "https://www.powerpaytech.com",
    "https://dashboard.powerpaytech.com",
    "https://admin.powerpaytech.com",
  ],

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

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Generate a unique referral code (retry on collision)
          let referral_code;
          for (let i = 0; i < 10; i++) {
            const candidate = generateCode();
            const { rows } = await pool.query(
              'SELECT 1 FROM "user" WHERE referral_code = $1',
              [candidate]
            );
            if (!rows.length) { referral_code = candidate; break; }
          }
          if (!referral_code) throw new Error("Could not generate a unique referral code");

          // Validate referral_code_used if provided
          let referred_by = null;
          let referral_code_used = user.referral_code_used || null;
          if (referral_code_used) {
            referral_code_used = referral_code_used.trim().toUpperCase();
            const { rows } = await pool.query(
              'SELECT id FROM "user" WHERE referral_code = $1',
              [referral_code_used]
            );
            if (!rows.length) {
              throw new APIError("BAD_REQUEST", {
                message: "That referral code doesn't exist. Check it and try again, or leave it blank.",
              });
            }
            referred_by = rows[0].id;
          }

          return {
            data: {
              ...user,
              referral_code,
              referral_code_used,
              referred_by,
            },
          };
        },
      },
    },
  },

  plugins: [nextCookies()], // must be last — handles cookie setting in server actions
});

