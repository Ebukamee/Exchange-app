"use client";
import { useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "@/src/compat/router";
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
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast("success", "Welcome back!", "Logged in");
      nav("/dashboard");
    } catch (error) {
      toast("error", err(error.message), "Login failed");
    } finally {
      setLoading(false);
      toaster.dismiss();
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue trading on Paycryptt."
      footer={
        <Text fontSize="sm" color="ink.500" textAlign="center">
          Don't have an account?{" "}
          <Link to="/signup">
            <Text as="span" color="brand.600" fontWeight="600">
              Sign up
            </Text>
          </Link>
        </Text>
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
          <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading}>
            Log in
          </Button>
        </VStack>
      </Box>
    </AuthShell>
  );
}
