"use client";
import { useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
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
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      const profile = await fetchProfile();
      if (!profile?.is_admin) {
        await logout();
        throw new Error("This account is not an administrator");
      }
      toast("success", "Welcome, admin.", "Logged in");
      nav("/admin/dashboard");
    } catch (error) {
      toast("error", err(error.message), "Access denied");
    } finally {
      setLoading(false);
      toaster.dismiss();
    }
  };

  return (
    <AuthShell title="Admin sign in" subtitle="Restricted area — staff access only.">
      <Box as="form" onSubmit={handleSubmit}>
        <VStack align="stretch" gap={5}>
          <Field label="Email address">
            <Input type="email" placeholder="admin@paycryptt.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Password">
            <PasswordInput placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading}>
            Sign in
          </Button>
          <Text fontSize="xs" color="ink.400" textAlign="center">
            Not an admin? Go to the <Text as="a" href="/login" color="brand.600">user login</Text>.
          </Text>
        </VStack>
      </Box>
    </AuthShell>
  );
}
