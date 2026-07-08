"use client";
import { useState } from "react";
import { Button, Text, VStack, Flex, Icon } from "@chakra-ui/react";
import { Link } from "@/src/compat/router";
import { useSearchParams } from "next/navigation";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import AuthShell from "../components/AuthShell";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";

export default function VerifyEmail() {
  const { user, resendVerification } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const email = useSearchParams().get("email") || user?.email;

  const resend = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await resendVerification(email);
      toast("success", "Verification email sent again.", "Check your inbox");
    } catch (error) {
      toast("error", err(error.message), "Could not resend");
    } finally {
      setLoading(false);
      toaster.dismiss();
    }
  };

  return (
    <AuthShell
      title="Verify your email"
      subtitle="One quick step before you start trading."
      footer={
        <Text fontSize="sm" color="ink.500" textAlign="center">
          Already verified?{" "}
          <Link to="/login">
            <Text as="span" color="brand.600" fontWeight="600">
              Log in
            </Text>
          </Link>
        </Text>
      }
    >
      <VStack align="stretch" gap={6}>
        <Flex w="64px" h="64px" bg="brand.50" color="brand.500" borderRadius="full" align="center" justify="center" fontSize="2xl">
          <Icon><FaEnvelopeCircleCheck /></Icon>
        </Flex>
        <Text color="ink.600">
          We've sent a verification link{email ? ` to ` : ". "}
          {email && (
            <Text as="span" fontWeight="600" color="ink.900">
              {email}
            </Text>
          )}
          . Click the link to activate your account, then log in.
        </Text>
        <Button variant="outline" colorPalette="brand" onClick={resend} loading={loading}>
          Resend verification email
        </Button>
      </VStack>
    </AuthShell>
  );
}

