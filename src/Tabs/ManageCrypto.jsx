"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Button, Input, Image, Spinner, SimpleGrid, Switch, IconButton, Icon } from "@chakra-ui/react";
import { FaPlus, FaPen, FaTrash, FaBitcoin } from "react-icons/fa6";
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogCloseTrigger } from "../components/ui/dialog";
import { Field } from "../components/ui/field";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira } from "../Helper";
import ScrollReveal, { staggerDelay } from "../components/ScrollReveal";

const CARD_COLORS = [
  { bg: "rgba(249,115,22,0.1)", accent: "#f97316" },
  { bg: "rgba(139,92,246,0.1)", accent: "#8b5cf6" },
  { bg: "rgba(6,182,212,0.1)", accent: "#06b6d4" },
  { bg: "rgba(16,185,129,0.1)", accent: "#10b981" },
  { bg: "rgba(236,72,153,0.1)", accent: "#ec4899" },
  { bg: "rgba(245,158,11,0.1)", accent: "#f59e0b" },
  { bg: "rgba(59,130,246,0.1)", accent: "#3b82f6" },
];

const blank = { name: "", symbol: "", icon_url: "", buy_price: "", sell_price: "", deposit_address: "", enabled: true };

export default function ManageCrypto() {
  const { cryptos, fetchCryptos, saveCrypto, deleteCrypto } = TransactionStore();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchCryptos().catch(() => {}).finally(() => setLoading(false));
  }, [fetchCryptos]);

  const openNew = () => { setForm(blank); setEditing("new"); };
  const openEdit = (c) => {
    setForm({ ...c, buy_price: String(c.buy_price), sell_price: String(c.sell_price) });
    setEditing(c.id);
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async () => {
    setBusy(true);
    try {
      await saveCrypto({
        ...(editing !== "new" ? { id: editing } : {}),
        name: form.name,
        symbol: form.symbol,
        icon_url: form.icon_url,
        deposit_address: form.deposit_address,
        buy_price: Number(form.buy_price) || 0,
        sell_price: Number(form.sell_price) || 0,
        enabled: form.enabled,
      });
      toast("success", "Saved.", "Done");
      setEditing(null);
    } catch (e) {
      toast("error", err(e.message), "Could not save");
    } finally {
      setBusy(false);
    }
  };

  const toggle = async (c) => {
    try { await saveCrypto({ id: c.id, enabled: !c.enabled }); } catch (e) { toast("error", err(e.message), "Error"); }
  };

  const remove = async (c) => {
    if (!confirm(`Delete ${c.name}?`)) return;
    try { await deleteCrypto(c.id); toast("success", "Deleted.", "Done"); } catch (e) { toast("error", err(e.message), "Error"); }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
        <HStack gap={3}>
          <Flex w="40px" h="40px" bg="rgba(245,158,11,0.1)" borderRadius="xl" align="center" justify="center">
            <Icon color="#f59e0b" fontSize="md"><FaBitcoin /></Icon>
          </Flex>
          <Box>
            <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Cryptocurrencies</Heading>
            <Text color="ink.500" fontSize="sm">Add coins and set buy/sell rates.</Text>
          </Box>
        </HStack>
        <Button colorPalette="brand" borderRadius="xl" onClick={openNew}><FaPlus /> Add crypto</Button>
      </Flex>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : cryptos.length === 0 ? (
        <Flex direction="column" align="center" py={12} gap={3}>
          <Flex w="48px" h="48px" bg="ink.50" borderRadius="full" align="center" justify="center">
            <Icon color="ink.300" fontSize="lg"><FaBitcoin /></Icon>
          </Flex>
          <Text color="ink.400" fontSize="sm">No cryptocurrencies yet.</Text>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {cryptos.map((c, i) => {
            const clr = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <ScrollReveal key={c.id} delay={staggerDelay(i, 0.05)}>
                <Box
                  bg="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="#e5e5e5"
                  p={5}
                  transition="all .2s"
                  _hover={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transform: "translateY(-1px)" }}
                >
                  <Flex justify="space-between" align="start">
                    <HStack gap={3}>
                      {c.icon_url ? (
                        <Flex boxSize="40px" bg={clr.bg} borderRadius="xl" align="center" justify="center">
                          <Image src={c.icon_url} boxSize="28px" objectFit="contain" />
                        </Flex>
                      ) : (
                        <Flex boxSize="40px" bg={clr.bg} color={clr.accent} borderRadius="xl" align="center" justify="center" fontWeight="800" fontSize="sm">
                          {c.name?.[0]}
                        </Flex>
                      )}
                      <Box>
                        <Text fontWeight="700" color="ink.900">{c.name} {c.symbol ? `(${c.symbol})` : ""}</Text>
                        <HStack gap={2} fontSize="xs" color="ink.500">
                          <Text>Buy <Text as="span" fontWeight="700" color={clr.accent}>{naira(c.buy_price)}</Text></Text>
                          <Text>·</Text>
                          <Text>Sell <Text as="span" fontWeight="700" color={clr.accent}>{naira(c.sell_price)}</Text></Text>
                        </HStack>
                      </Box>
                    </HStack>
                    <HStack>
                      <IconButton aria-label="Edit" size="sm" variant="ghost" borderRadius="lg" onClick={() => openEdit(c)}><FaPen /></IconButton>
                      <IconButton aria-label="Delete" size="sm" variant="ghost" colorPalette="red" borderRadius="lg" onClick={() => remove(c)}><FaTrash /></IconButton>
                    </HStack>
                  </Flex>
                  <Flex mt={3} justify="space-between" align="center">
                    <Text fontSize="xs" color="ink.400" wordBreak="break-all">{c.deposit_address || "No deposit address"}</Text>
                    <Switch.Root checked={c.enabled} onCheckedChange={() => toggle(c)} colorPalette="brand">
                      <Switch.HiddenInput /><Switch.Control /><Switch.Label fontSize="xs">{c.enabled ? "On" : "Off"}</Switch.Label>
                    </Switch.Root>
                  </Flex>
                </Box>
              </ScrollReveal>
            );
          })}
        </SimpleGrid>
      )}

      <DialogRoot open={!!editing} onOpenChange={(e) => !e.open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Add cryptocurrency" : "Edit cryptocurrency"}</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Field label="Name"><Input value={form.name} onChange={set("name")} placeholder="Bitcoin" /></Field>
              <Field label="Symbol"><Input value={form.symbol} onChange={set("symbol")} placeholder="BTC" /></Field>
              <Field label="Icon URL"><Input value={form.icon_url} onChange={set("icon_url")} placeholder="https://..." /></Field>
              <SimpleGrid columns={2} gap={4}>
                <Field label="Sell price (we pay / unit)"><Input type="number" value={form.sell_price} onChange={set("sell_price")} /></Field>
                <Field label="Buy price (we charge / unit)"><Input type="number" value={form.buy_price} onChange={set("buy_price")} /></Field>
              </SimpleGrid>
              <Field label="Deposit address" helperText="Wallet users send crypto to when selling.">
                <Input value={form.deposit_address} onChange={set("deposit_address")} placeholder="bc1q..." />
              </Field>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button colorPalette="brand" onClick={save} loading={busy} disabled={!form.name}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
