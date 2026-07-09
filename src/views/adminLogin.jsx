"use client";
import { useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/src/compat/router";
import { getRedirectUrl } from "@/lib/subdomain";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/ui/field";
import { PasswordInput } from "../components/ui/password-input";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";

export default function AdminLogin() {
  const { login, fetchProfile, logout } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setFormError("");

    try {
      await login(email, password);
      const profile = await fetchProfile();
      if (!profile?.is_admin) {
        await logout();
        throw new Error("This account is not an administrator");
      }
      toast("success", "Welcome, admin.", "Logged in");
      const url = getRedirectUrl(window.location.hostname, true, "/dashboard");
      window.location.href = url;
    } catch (error) {
      const message = err(error?.message || "Unable to access the admin area right now.");
      setFormError(message);
      toast("error", message, "Access denied");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Admin sign in" subtitle="Restricted area — staff access only.">
      <Box as="form" onSubmit={handleSubmit}>
        <VStack align="stretch" gap={5}>
          <Field label="Email address">
            <Input type="email" placeholder="admin@Powerpay.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Password">
            <PasswordInput placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          {formError ? (
            <Text fontSize="sm" color="red.500">
              {formError}
            </Text>
          ) : null}
          <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading} loadingText="Signing in..." disabled={loading}>
            Sign in
          </Button>
          <Text fontSize="xs" color="ink.400" textAlign="center">
            Need a regular account? Go to the <Link to="/login"><Text as="span" color="brand.600">user login</Text></Link>.
          </Text>
        </VStack>
      </Box>
    </AuthShell>
  );
}

