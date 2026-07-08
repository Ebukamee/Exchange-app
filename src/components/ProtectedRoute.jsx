"use client";
import { Flex, Spinner } from "@chakra-ui/react";
import { Navigate } from "@/src/compat/router";
import useAuthStore from "../Store/userStore";

// Gate for logged-in users. Optionally requires a completed profile
// (wallet + bank) and/or admin rights.
export default function ProtectedRoute({ children, requireOnboarding = true, requireAdmin = false }) {
  const { user, profile, authIsReady } = useAuthStore();

  if (!authIsReady) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  if (!user) return <Navigate to={requireAdmin ? "/admin" : "/login"} replace />;

  // Profile may still be loading right after auth resolves.
  if (!profile) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  if (requireAdmin && !profile.is_admin) return <Navigate to="/dashboard" replace />;

  const onboarded = profile.wallet_address && profile.account_number;
  if (requireOnboarding && !requireAdmin && !onboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

