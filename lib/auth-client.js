"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

// Client SDK — hooks (useSession) + methods (signIn/signUp/signOut...).
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "https://powerpaytech.com" || "https://www.powerpaytech.com",
  plugins: [
    // keep the extra user fields typed/available on the client
    inferAdditionalFields({
      user: {
        full_name: { type: "string" },
        wallet_address: { type: "string" },
        bank_name: { type: "string" },
        account_name: { type: "string" },
        account_number: { type: "string" },
        referral_code: { type: "string" },
        referral_code_used: { type: "string" },
        referred_by: { type: "string" },
        balance: { type: "number" },
        is_admin: { type: "boolean" },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

