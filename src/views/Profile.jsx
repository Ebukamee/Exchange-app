"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Input, Button, VStack, SimpleGrid, HStack, Icon, Avatar } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaArrowRightFromBracket, FaCopy } from "react-icons/fa6";
import DashboardLayout from "../components/DashboardLayout";
import { Field } from "../components/ui/field";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";

export default function Profile() {
  const { profile, fetchProfile, updateProfile, logout } = useAuthStore();
  const [form, setForm] = useState({
    full_name: "", wallet_address: "", bank_name: "", account_name: "", account_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const p = profile || (await fetchProfile());
      if (p) {
        setForm({
          full_name: p.full_name || "",
          wallet_address: p.wallet_address || "",
          bank_name: p.bank_name || "",
          account_name: p.account_name || "",
          account_number: p.account_number || "",
        });
      }
    })();
  }, [profile, fetchProfile]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      toast("success", "Profile updated.", "Saved");
    } catch (error) {
      toast("error", err(error.message), "Could not save");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await logout();
    nav("/");
  };

  const copyReferralCode = async () => {
    if (profile?.referral_code) {
      await navigator.clipboard.writeText(profile.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <DashboardLayout>
      <Box maxW="720px" mx="auto">
        <HStack gap={4} mb={8}>
          <Avatar.Root size="lg" colorPalette="ink">
            <Avatar.Fallback name={profile?.full_name || profile?.email} />
          </Avatar.Root>
          <Box>
            <Heading fontFamily="heading" fontSize="xl" color="ink.900">{profile?.full_name || "Your profile"}</Heading>
            <Text color="ink.500" fontSize="sm">{profile?.email}</Text>
          </Box>
        </HStack>
        {profile?.referral_code ? (
          <Box mb={6} p={4} bg="ink.50" border="1px solid" borderColor="ink.100" borderRadius="l3">
            <Text fontSize="sm" color="ink.500" mb={2}>Your referral code</Text>
            <HStack gap={3}>
              <Text fontWeight="700" fontSize="lg" color="ink.900" letterSpacing="0.08em">{profile.referral_code}</Text>
              <Button size="sm" variant="ghost" onClick={copyReferralCode}>
                <Icon><FaCopy /></Icon>
                <Text>{copied ? "Copied!" : "Copy"}</Text>
              </Button>
            </HStack>
          </Box>
        ) : null}

        <Box as="form" onSubmit={save} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l3" p={{ base: 5, md: 7 }}>
          <VStack align="stretch" gap={5}>
            <Field label="Full name">
              <Input value={form.full_name} onChange={set("full_name")} />
            </Field>
            <Field label="Crypto wallet address" helperText="Where you receive crypto you buy.">
              <Input value={form.wallet_address} onChange={set("wallet_address")} />
            </Field>
            <Box h="1px" bg="ink.100" />
            <Text fontWeight="700" fontSize="sm" color="brand.600" letterSpacing="0.04em">BANK ACCOUNT</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field label="Bank name"><Input value={form.bank_name} onChange={set("bank_name")} /></Field>
              <Field label="Account name"><Input value={form.account_name} onChange={set("account_name")} /></Field>
            </SimpleGrid>
            <Field label="Account number"><Input value={form.account_number} onChange={set("account_number")} /></Field>
            <Button type="submit" colorPalette="ink" size="lg" loading={loading}>Save changes</Button>
          </VStack>
        </Box>

        <Button mt={6} variant="outline" colorPalette="red" onClick={signOut}>
          <Icon><FaArrowRightFromBracket /></Icon> Log out
        </Button>
      </Box>
    </DashboardLayout>
  );
}

