"use client";
import { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { useSearchParams } from "next/navigation";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/ui/field";
import { PasswordInput } from "../components/ui/password-input";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";

// Reached via the emailed reset link — Supabase establishes a temporary
// session, so updateUser can set the new password.
export default function ResetPassword() {
  const { updatePassword } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const token = useSearchParams().get("token");

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast("error", "Passwords do not match", "Check your details");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(password, token);
      toast("success", "Password updated. You can log in now.", "All set");
      nav("/login");
    } catch (error) {
      toast("error", err(error.message), "Could not update");
    } finally {
      setLoading(false);
      toaster.dismiss();
    }
  };

  return (
    <AuthShell title="Set a new password" subtitle="Choose a strong password for your account.">
      <Box as="form" onSubmit={submit}>
        <VStack align="stretch" gap={5}>
          <Field label="New password">
            <PasswordInput placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>
          <Field label="Confirm new password">
            <PasswordInput placeholder="Re-enter password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </Field>
          <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading}>
            Update password
          </Button>
        </VStack>
      </Box>
    </AuthShell>
  );
}

