"use client";

import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/src/Store/userStore";

function Loading() {
  return (
    <Flex h="100vh" align="center" justify="center">
      <Spinner size="xl" color="brand.500" />
    </Flex>
  );
}

// Requires a signed-in (and, by default, onboarded) user.
export function RequireAuth({ children, requireOnboarding = true }) {
  const { user, profile, authIsReady } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!authIsReady) return;
    if (!user) {
      if (typeof window !== "undefined" && window.location.hostname.startsWith("dashboard.")) {
        const domain = process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com";
        const loginUrl = new URL(`https://${domain}/login`);
        loginUrl.searchParams.set("next", window.location.href);
        window.location.replace(loginUrl.toString());
      } else {
        router.replace("/login");
      }
    } else if (requireOnboarding && profile && !(profile.wallet_address && profile.account_number)) {
      router.replace("/onboarding");
    }
  }, [authIsReady, user, profile, requireOnboarding, router]);

  if (!authIsReady || !user || (requireOnboarding && (!profile || !(profile.wallet_address && profile.account_number)))) {
    return <Loading />;
  }
  return children;
}

// Requires an admin user.
export function RequireAdmin({ children }) {
  const { user, profile, authIsReady } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!authIsReady) return;
    if (!user || (profile && !profile.is_admin)) router.replace("/admin");
  }, [authIsReady, user, profile, router]);

  if (!authIsReady || !user || !profile || !profile.is_admin) return <Loading />;
  return children;
}

