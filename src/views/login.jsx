"use client";
import { useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/src/compat/router";
import { useSearchParams } from "next/navigation";
import { useSubdomain } from "@/lib/hooks/useSubdomain";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/ui/field";
import { PasswordInput } from "../components/ui/password-input";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";

export default function Login() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const { redirectToDashboard } = useSubdomain();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("next");
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "powerpaytech.com";
  const safeRedirectUrl = (() => {
    if (!redirectUrl) return null;
    try {
      const url = new URL(redirectUrl, typeof window !== "undefined" ? window.location.origin : `https://${domain}`);
      const dashboardHost = `dashboard.${domain}`;
      if (url.hostname === domain || url.hostname === dashboardHost || url.pathname.startsWith("/dashboard")) {
        return url.toString();
      }
    } catch (error) {
      return null;
    }
    return null;
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setFormError("");

    try {
      await login(email, password);
      toast("success", "Welcome back!", "Logged in");
      if (safeRedirectUrl) {
        window.location.href = safeRedirectUrl;
      } else {
        redirectToDashboard("/dashboard");
      }
    } catch (error) {
      const message = err(error?.message || "Unable to sign in right now.");
      setFormError(message);
      toast("error", message, "Login failed");
    } finally {
      setLoading(false);
      toaster.dismiss();
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue trading on Powerpay."
      footer={
        <VStack gap={2}>
          <Text fontSize="sm" color="ink.500" textAlign="center">
            Don't have an account?{" "}
            <Link to="/signup">
              <Text as="span" color="brand.600" fontWeight="600">
                Sign up
              </Text>
            </Link>
          </Text>
        </VStack>
      }
    >
      <Box as="form" onSubmit={handleSubmit}>
        <VStack align="stretch" gap={5}>
          <Field label="Email address">
            <Input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Password">
            <PasswordInput placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          <Box textAlign="right">
            <Link to="/forgot-password">
              <Text as="span" fontSize="sm" color="brand.600" fontWeight="600">
                Forgot password?
              </Text>
            </Link>
          </Box>
          {formError ? (
            <Text fontSize="sm" color="red.500">
              {formError}
            </Text>
          ) : null}
          <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading} loadingText="Signing in..." disabled={loading}>
            Log in
          </Button>
        </VStack>
      </Box>
    </AuthShell>
  );
}

