"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import useAuthStore from "@/src/Store/userStore";

// Keeps the Zustand auth store in sync with Better Auth's session so the
// ported pages can keep reading `user` / `profile` from the store.
export default function AuthSync() {
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    const store = useAuthStore.getState();
    store.setUser(session?.user ?? null);
    store.setAuthIsReady(true);
    if (session?.user) store.fetchProfile();
    else store.setProfile(null);
  }, [session, isPending]);

  return null;
}
