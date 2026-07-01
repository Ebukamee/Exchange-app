"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Input, VStack, Flex, Spinner } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";

// The company bank account users pay into when buying crypto by transfer.
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
      toaster.dismiss();
    }
  };

  return (
    <Box maxW="560px">
      <Heading fontFamily="heading" fontSize="2xl" color="ink.900" mb={1}>Settings</Heading>
      <Text color="ink.500" mb={6}>The bank account users transfer to when buying crypto.</Text>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : (
        <Box as="form" onSubmit={save} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l3" p={6}>
          <VStack align="stretch" gap={5}>
            <Field label="Bank name"><Input value={form.bank_name} onChange={set("bank_name")} placeholder="GTBank" /></Field>
            <Field label="Account name"><Input value={form.account_name} onChange={set("account_name")} placeholder="Paycryptt Ltd" /></Field>
            <Field label="Account number"><Input value={form.account_number} onChange={set("account_number")} placeholder="0123456789" /></Field>
            <Button type="submit" colorPalette="brand" size="lg" loading={busy}>Save bank details</Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
