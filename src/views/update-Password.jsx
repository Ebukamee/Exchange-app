"use client";
import { useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/src/compat/router";
import AuthShell from "../components/AuthShell";
import { Field } from "../components/ui/field";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";

export default function ForgotPassword() {
  const { resetPassword } = useAuthStore();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast("success", "Password reset link sent to your email.", "Check your inbox");
    } catch (error) {
      toast("error", err(error.message), "Could not send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Text fontSize="sm" color="ink.500" textAlign="center">
          Remembered it?{" "}
          <Link to="/login">
            <Text as="span" color="brand.600" fontWeight="600">
              Log in
            </Text>
          </Link>
        </Text>
      }
    >
      <Box as="form" onSubmit={submit}>
        <VStack align="stretch" gap={5}>
          <Field label="Email address">
            <Input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading} disabled={sent}>
            {sent ? "Email sent" : "Send reset link"}
          </Button>
        </VStack>
      </Box>
    </AuthShell>
  );
}

