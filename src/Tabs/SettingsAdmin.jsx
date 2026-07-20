"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Input, VStack, Flex, Spinner, HStack, Icon, IconButton, SimpleGrid } from "@chakra-ui/react";
import { FaGear, FaPlus, FaTrash, FaWhatsapp } from "react-icons/fa6";
import { Field } from "../components/ui/field";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";
import ScrollReveal from "../components/ScrollReveal";

export default function SettingsAdmin() {
  const { fetchDepositBank, saveDepositBank, fetchHeroRates, saveHeroRates, fetchWhatsapp, saveWhatsapp } = TransactionStore();
  const [form, setForm] = useState({ bank_name: "", account_name: "", account_number: "" });
  const [heroRates, setHeroRates] = useState([
    { asset: "Bitcoin (BTC)", price: "₦1,650 / $" },
    { asset: "USDT (TRC20)", price: "₦1,610 / $" },
    { asset: "Amazon Gift Card", price: "₦1,150 / $" },
    { asset: "Steam Gift Card", price: "₦1,080 / $" },
  ]);
  const [waNumber, setWaNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [busyRates, setBusyRates] = useState(false);
  const [busyWa, setBusyWa] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchDepositBank().then((v) => v && setForm({ bank_name: v.bank_name || "", account_name: v.account_name || "", account_number: v.account_number || "" })),
      fetchHeroRates().then((v) => { if (Array.isArray(v) && v.length > 0) setHeroRates(v); }),
      fetchWhatsapp().then((v) => { if (v?.number) setWaNumber(v.number); }),
    ]).catch(() => {}).finally(() => setLoading(false));
  }, [fetchDepositBank, fetchHeroRates, fetchWhatsapp]);

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

  const setRate = (idx, key) => (e) => {
    const updated = [...heroRates];
    updated[idx] = { ...updated[idx], [key]: e.target.value };
    setHeroRates(updated);
  };

  const addRate = () => {
    if (heroRates.length >= 6) return;
    setHeroRates([...heroRates, { asset: "", price: "" }]);
  };

  const removeRate = (idx) => {
    const updated = heroRates.filter((_, i) => i !== idx);
    setHeroRates(updated.length ? updated : [{ asset: "", price: "" }]);
  };

  const saveRates = async () => {
    setBusyRates(true);
    try {
      const cleaned = heroRates.filter((r) => r.asset.trim() && r.price.trim());
      if (cleaned.length === 0) throw new Error("Add at least one rate");
      await saveHeroRates(cleaned);
      toast("success", "Hero rates updated.", "Saved");
    } catch (er) {
      toast("error", err(er.message), "Could not save");
    } finally {
      setBusyRates(false);
    }
  };

  const saveWa = async () => {
    setBusyWa(true);
    try {
      await saveWhatsapp({ number: waNumber.trim() });
      toast("success", "WhatsApp number updated.", "Saved");
    } catch (er) {
      toast("error", err(er.message), "Could not save");
    } finally {
      setBusyWa(false);
    }
  };

  return (
    <Box maxW="640px">
      <ScrollReveal>
        <HStack gap={3} mb={6}>
          <Flex w="40px" h="40px" bg="rgba(121,123,137,0.1)" borderRadius="xl" align="center" justify="center">
            <Icon color="#797B89" fontSize="md"><FaGear /></Icon>
          </Flex>
          <Box>
            <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Settings</Heading>
            <Text color="ink.500" fontSize="sm">Manage bank details, homepage rates, and support contact.</Text>
          </Box>
        </HStack>
      </ScrollReveal>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : (
        <VStack align="stretch" gap={6}>
          {/* Bank details */}
          <ScrollReveal delay={0.1}>
            <Box as="form" onSubmit={save} bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={{ base: 5, md: 7 }}>
              <Text fontWeight="800" color="#1B1C20" fontSize="md" mb={4}>Deposit Bank Account</Text>
              <VStack align="stretch" gap={4}>
                <Field label="Bank name"><Input value={form.bank_name} onChange={set("bank_name")} placeholder="GTBank" /></Field>
                <Field label="Account name"><Input value={form.account_name} onChange={set("account_name")} placeholder="Powerpay Ltd" /></Field>
                <Field label="Account number"><Input value={form.account_number} onChange={set("account_number")} placeholder="0123456789" /></Field>
                <Button type="submit" colorPalette="brand" size="lg" borderRadius="xl" loading={busy}>Save bank details</Button>
              </VStack>
            </Box>
          </ScrollReveal>

          {/* Hero rates */}
          <ScrollReveal delay={0.15}>
            <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={{ base: 5, md: 7 }}>
              <Flex justify="space-between" align="center" mb={4}>
                <Box>
                  <Text fontWeight="800" color="#1B1C20" fontSize="md">Homepage Live Rates</Text>
                  <Text fontSize="xs" color="#797B89">These appear in the hero "Quick estimate" card on the landing page.</Text>
                </Box>
                {heroRates.length < 6 && (
                  <IconButton aria-label="Add" size="sm" variant="outline" colorPalette="brand" borderRadius="lg" onClick={addRate}><FaPlus /></IconButton>
                )}
              </Flex>
              <VStack align="stretch" gap={3}>
                {heroRates.map((r, idx) => (
                  <HStack key={idx} gap={2}>
                    <Input flex="1" placeholder="e.g. Bitcoin (BTC)" value={r.asset} onChange={setRate(idx, "asset")} size="sm" />
                    <Input w="150px" placeholder="e.g. ₦1,650 / $" value={r.price} onChange={setRate(idx, "price")} size="sm" />
                    <IconButton aria-label="Remove" size="sm" variant="ghost" colorPalette="red" onClick={() => removeRate(idx)}><FaTrash /></IconButton>
                  </HStack>
                ))}
              </VStack>
              <Button mt={4} colorPalette="brand" size="lg" borderRadius="xl" w="100%" loading={busyRates} onClick={saveRates}>Save hero rates</Button>
            </Box>
          </ScrollReveal>

          {/* WhatsApp */}
          <ScrollReveal delay={0.2}>
            <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={{ base: 5, md: 7 }}>
              <HStack gap={3} mb={4}>
                <Flex w="32px" h="32px" bg="rgba(37,211,102,0.1)" borderRadius="lg" align="center" justify="center">
                  <Icon color="#25D366" fontSize="sm"><FaWhatsapp /></Icon>
                </Flex>
                <Box>
                  <Text fontWeight="800" color="#1B1C20" fontSize="md">WhatsApp Support</Text>
                  <Text fontSize="xs" color="#797B89">The number used for the floating chat bubble and footer link.</Text>
                </Box>
              </HStack>
              <Field label="WhatsApp number" helperText="Enter without + sign, e.g. 2348168236123">
                <Input value={waNumber} onChange={(e) => setWaNumber(e.target.value)} placeholder="2348168236123" />
              </Field>
              <Button mt={4} colorPalette="brand" size="lg" borderRadius="xl" w="100%" loading={busyWa} onClick={saveWa}>Save WhatsApp number</Button>
            </Box>
          </ScrollReveal>
        </VStack>
      )}
    </Box>
  );
}
