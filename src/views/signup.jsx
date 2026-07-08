"use client";
import { useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "@/src/compat/router";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/ui/field";
import { PasswordInput } from "../components/ui/password-input";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, isValidPassword } from "../Helper";

export default function Signup() {
  const { signup } = useAuthStore();
  const [form, setForm] = useState({ fullname: "", email: "", password: "", confirm: "", referralCode: "" });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const nav = useNavigate();

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (form.password !== form.confirm) {
      const message = "Passwords do not match";
      setFormError(message);
      toast("error", message, "Check your details");
      return;
    }

    if (!isValidPassword(form.password)) {
      const message = "Password must be at least 8 characters and include uppercase, lowercase, a number, and one of: _ - #";
      setFormError(message);
      toast("error", message, "Invalid password");
      return;
    }

    setLoading(true);
    setFormError("");

    try {
      await signup(form.email, form.password, form.fullname, form.referralCode);
      toast("success", "Account created. Check your email to verify.", "Welcome to Powerpay");
      nav("/verify-email?email=" + encodeURIComponent(form.email));
    } catch (error) {
      const message = err(error?.message || "Unable to create your account right now.");
      setFormError(message);
      toast("error", message, "Sign up failed");
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
        <VStack gap={2}>
          <Text fontSize="sm" color="ink.500" textAlign="center">
            Already have an account?{" "}
            <Link to="/login">
              <Text as="span" color="brand.600" fontWeight="600">
                Log in
              </Text>
            </Link>
          </Text>
        </VStack>
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
            <PasswordInput placeholder="At least 8 characters and include upper, lower, number, and _ - #" value={form.password} onChange={set("password")} required />
          </Field>
          <Field label="Confirm password">
            <PasswordInput placeholder="Re-enter password" value={form.confirm} onChange={set("confirm")} required />
          </Field>
          <Field label="Referral code (optional)">
            <Input placeholder="ABC123" value={form.referralCode} onChange={set("referralCode")} />
          </Field>
          {formError ? (
            <Text fontSize="sm" color="red.500">
              {formError}
            </Text>
          ) : null}
          <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading} loadingText="Creating account..." disabled={loading}>
            Create account
          </Button>
        </VStack>
      </Box>
    </AuthShell>
  );
}

