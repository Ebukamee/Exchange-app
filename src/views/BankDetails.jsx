"use client";
import { useEffect, useState } from "react";
import { Box, Button, Input, Text, VStack, Heading, Flex, Spinner, HStack, Icon } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaWallet, FaBuildingColumns } from "react-icons/fa6";
import { Field } from "../components/ui/field";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";
import Logo from "../components/Logo";

// Onboarding: collect the wallet address (for receiving crypto) and bank
// details (for cash withdrawals). Required before the dashboard opens.
export default function Onboarding() {
  const { user, profile, fetchProfile, updateProfile } = useAuthStore();
  const [form, setForm] = useState({
    wallet_address: "",
    bank_name: "",
    account_name: "",
    account_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const p = profile || (await fetchProfile());
      if (p) {
        setForm({
          wallet_address: p.wallet_address || "",
          bank_name: p.bank_name || "",
          account_name: p.account_name || "",
          account_number: p.account_number || "",
        });
      }
      setBooting(false);
    })();
  }, [profile, fetchProfile]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      toast("success", "Details saved.", "You're all set");
      nav("/dashboard");
    } catch (error) {
      toast("error", err(error.message), "Could not save");
    } finally {
      setLoading(false);
      toaster.dismiss();
    }
  };

  if (booting) {
    return (
      <Flex h="100vh" align="center" justify="center">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }
  if (!user) {
    nav("/login");
    return null;
  }

  return (
    <Box minH="100vh" bg="ink.50" py={{ base: 8, md: 16 }} px={5}>
      <Box maxW="560px" mx="auto">
        <Flex justify="center" mb={8}>
          <Logo useImage imageHeight={34} />
        </Flex>
        <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l3" p={{ base: 6, md: 10 }}>
          <Heading fontFamily="heading" fontSize="2xl" color="ink.900" mb={1}>
            Complete your profile
          </Heading>
          <Text color="ink.500" mb={8}>
            We use these to send you crypto and pay out your withdrawals.
          </Text>

          <Box as="form" onSubmit={save}>
            <VStack align="stretch" gap={5}>
              <SectionLabel icon={FaWallet} text="Crypto wallet" />
              <Field label="Wallet address" helperText="Where we'll send crypto you buy.">
                <Input placeholder="e.g. bc1q... or 0x..." value={form.wallet_address} onChange={set("wallet_address")} required />
              </Field>

              <Box h="1px" bg="ink.100" my={2} />

              <SectionLabel icon={FaBuildingColumns} text="Bank account" />
              <Field label="Bank name">
                <Input placeholder="e.g. GTBank" value={form.bank_name} onChange={set("bank_name")} required />
              </Field>
              <Field label="Account name">
                <Input placeholder="Account holder name" value={form.account_name} onChange={set("account_name")} required />
              </Field>
              <Field label="Account number">
                <Input placeholder="10-digit account number" value={form.account_number} onChange={set("account_number")} required />
              </Field>

              <Button type="submit" colorPalette="ink" rounded="full" size="lg" loading={loading} mt={2}>
                Save & continue
              </Button>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function SectionLabel({ icon, text }) {
  return (
    <HStack gap={2} color="brand.600">
      <Icon>{<icon />}</Icon>
      <Text fontWeight="700" fontSize="sm" letterSpacing="0.04em">
        {text.toUpperCase()}
      </Text>
    </HStack>
  );
}
