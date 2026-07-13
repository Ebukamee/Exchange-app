"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Input, VStack, Flex, Spinner, HStack, Icon } from "@chakra-ui/react";
import { FaGear } from "react-icons/fa6";
import { Field } from "../components/ui/field";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";
import ScrollReveal from "../components/ScrollReveal";

export default function SettingsAdmin() {
  const { fetchDepositBank, saveDepositBank } = TransactionStore();
  const [form, setForm] = useState({ bank_name: "", account_name: "", account_number: "" });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchDepositBank()
      .then((v) => v && setForm({ bank_name: v.bank_name || "", account_name: v.account_name || "", account_number: v.account_number || "" }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchDepositBank]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await saveDepositBank(form);
      toast("success", "Bank details updated.", "Saved");
    } catch (er) {
      toast("error", err(er.message), "Could not save");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box maxW="560px">
      <ScrollReveal>
        <HStack gap={3} mb={6}>
          <Flex w="40px" h="40px" bg="rgba(121,123,137,0.1)" borderRadius="xl" align="center" justify="center">
            <Icon color="#797B89" fontSize="md"><FaGear /></Icon>
          </Flex>
          <Box>
            <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Settings</Heading>
            <Text color="ink.500" fontSize="sm">The bank account users transfer to when buying crypto.</Text>
          </Box>
        </HStack>
      </ScrollReveal>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : (
        <ScrollReveal delay={0.1}>
          <Box as="form" onSubmit={save} bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={{ base: 5, md: 7 }}>
            <VStack align="stretch" gap={5}>
              <Field label="Bank name"><Input value={form.bank_name} onChange={set("bank_name")} placeholder="GTBank" /></Field>
              <Field label="Account name"><Input value={form.account_name} onChange={set("account_name")} placeholder="Powerpay Ltd" /></Field>
              <Field label="Account number"><Input value={form.account_number} onChange={set("account_number")} placeholder="0123456789" /></Field>
              <Button type="submit" colorPalette="brand" size="lg" borderRadius="xl" loading={busy}>Save bank details</Button>
            </VStack>
          </Box>
        </ScrollReveal>
      )}
    </Box>
  );
}
