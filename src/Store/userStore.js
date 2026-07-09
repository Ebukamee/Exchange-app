"use client";

import { create } from "zustand";
import { authClient } from "@/lib/auth-client";
import { generateReferralCode } from "@/src/Helper/format";
import { getProfile, updateProfile as updateProfileAction } from "@/app/actions/account";
import { adminGetUsers } from "@/app/actions/admin";

// Auth + profile store. State is hydrated by <AuthSync/> from Better Auth's
// session; methods wrap the Better Auth client and server actions.
const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  authIsReady: false,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setAuthIsReady: (v) => set({ authIsReady: v }),

  fetchProfile: async () => {
    try {
      const profile = await getProfile();
      set({ profile });
      return profile;
    } catch {
      return null;
    }
  },

  signup: async (email, password, name, referralCode) => {
    const referral_code = generateReferralCode();
    const payload = {
      email,
      password,
      name,
      full_name: name,
      referral_code,
    };
    if (referralCode) payload.referral_code_used = referralCode;

    const { data, error } = await authClient.signUp.email(payload);
    if (error) throw new Error(error.message);
    return data;
  },

  login: async (email, password) => {
    const { data, error } = await authClient.signIn.email({ email, password });
    if (error) throw new Error(error.message);
    return data;
  },

  logout: async () => {
    await authClient.signOut();
    set({ user: null, profile: null });
  },

  resendVerification: async (email) => {
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/login",
    });
    if (error) throw new Error(error.message);
  },

  resetPassword: async (email) => {
    const { error } = await authClient.forgetPassword({
      email,
      redirectTo: "/reset-password",
    });
    if (error) throw new Error(error.message);
  },

  // Used on the reset-password page (token comes from the email link URL).
  updatePassword: async (newPassword, token) => {
    const { error } = await authClient.resetPassword({ newPassword, token });
    if (error) throw new Error(error.message);
  },

  updateProfile: async (fields) => {
    const profile = await updateProfileAction(fields);
    set({ profile });
    return profile;
  },

  getAllUsers: async () => adminGetUsers(),
}));

export default useAuthStore;

