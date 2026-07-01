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

export default function Signup() {
  const { signup } = useAuthStore();
  const [form, setForm] = useState({ fullname: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast("error", "Passwords do not match", "Check your details");
      return;
    }
    setLoading(true);
    try {
      await signup(form.email, form.password, form.fullname);
      toast("success", "Account created. Check your email to verify.", "Welcome to Paycryptt");
      nav("/verify-email?email=" + encodeURIComponent(form.email));
    } catch (error) {
      toast("error", err(error.message), "Sign up failed");
    } finally {
      setLoading(false);
      toaster.dismiss();
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start trading crypto and gift cards in minutes."
      footer={
        <Text fontSize="sm" color="ink.500" textAlign="center">
          Already have an account?{" "}
          <Link to="/login">
            <Text as="span" color="brand.600" fontWeight="600">
              Log in
            </Text>
          </Link>
        </Text>
      }
    >
      <Box as="form" onSubmit={handleSignup}>
        <VStack align="stretch" gap={5}>
          <Field label="Full name">
            <Input placeholder="Jane Doe" value={form.fullname} onChange={set("fullname")} required />
          </Field>
          <Field label="Email address">
            <Input type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} required />
          </Field>
          <Field label="Password">
            <PasswordInput placeholder="At least 6 characters" value={form.password} onChange={set("password")} required />
          </Field>
          <Field label="Confirm password">
            <PasswordInput placeholder="Re-enter password" value={form.confirm} onChange={set("confirm")} required />
          </Field>
          <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading}>
            Create account
          </Button>
        </VStack>
      </Box>
    </AuthShell>
  );
}
