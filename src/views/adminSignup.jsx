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

export default function AdminSignup() {
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
      toast("success", "Admin account request created. Please verify your email.", "Admin access");
      nav("/verify-email?email=" + encodeURIComponent(form.email));
    } catch (error) {
      const message = err(error?.message || "Unable to create the admin account right now.");
      setFormError(message);
      toast("error", message, "Sign up failed");
    } finally {
      setLoading(false);
      toaster.dismiss();
    }
  };

  return (
    <AuthShell title="Create admin access" subtitle="Request staff access for the admin portal.">
      <Box as="form" onSubmit={handleSignup}>
        <VStack align="stretch" gap={5}>
          <Field label="Full name">
            <Input placeholder="Jane Doe" value={form.fullname} onChange={set("fullname")} required />
          </Field>
          <Field label="Email address">
            <Input type="email" placeholder="admin@paycryptt.com" value={form.email} onChange={set("email")} required />
          </Field>
          <Field label="Password">
            <PasswordInput placeholder="At least 8 characters and include upper, lower, number and _ - #" value={form.password} onChange={set("password")} required />
          </Field>
          <Field label="Confirm password">
            <PasswordInput placeholder="Re-enter password (same rules)" value={form.confirm} onChange={set("confirm")} required />
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
            Create admin account
          </Button>
          <Text fontSize="xs" color="ink.400" textAlign="center">
            Already have admin access? <Link to="/admin/login"><Text as="span" color="brand.600">Sign in here</Text></Link>.
          </Text>
        </VStack>
      </Box>
    </AuthShell>
  );
}
