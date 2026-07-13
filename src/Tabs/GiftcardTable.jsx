"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Button, Input, Image, Spinner, SimpleGrid, Switch, IconButton, Icon } from "@chakra-ui/react";
import { FaPlus, FaPen, FaTrash, FaGift } from "react-icons/fa6";
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogCloseTrigger } from "../components/ui/dialog";
import { Field } from "../components/ui/field";
import TransactionStore from "../Store/TransactionStore";
import { toast, err, naira } from "../Helper";
import ScrollReveal, { staggerDelay } from "../components/ScrollReveal";

const CARD_COLORS = [
  { bg: "rgba(139,92,246,0.1)", accent: "#8b5cf6" },
  { bg: "rgba(249,115,22,0.1)", accent: "#f97316" },
  { bg: "rgba(6,182,212,0.1)", accent: "#06b6d4" },
  { bg: "rgba(16,185,129,0.1)", accent: "#10b981" },
  { bg: "rgba(236,72,153,0.1)", accent: "#ec4899" },
  { bg: "rgba(245,158,11,0.1)", accent: "#f59e0b" },
  { bg: "rgba(59,130,246,0.1)", accent: "#3b82f6" },
];

const blankSub = { name: "", rate: "" };
const blank = { name: "", icon_url: "", subcategories: [{ ...blankSub }], enabled: true };

export default function ManageGiftcards() {
  const { giftcards, fetchGiftcards, saveGiftcard, deleteGiftcard } = TransactionStore();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchGiftcards().catch(() => {}).finally(() => setLoading(false));
  }, [fetchGiftcards]);

  const openNew = () => { setForm({ ...blank, subcategories: [{ ...blankSub }] }); setEditing("new"); };
  const openEdit = (g) => {
    const subs = Array.isArray(g.subcategories) && g.subcategories.length > 0
      ? g.subcategories.map((s) => ({ name: s.name, rate: String(s.rate) }))
      : [{ ...blankSub }];
    setForm({ ...g, subcategories: subs });
    setEditing(g.id);
  };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const setSub = (idx, key) => (e) => {
    const subs = [...form.subcategories];
    subs[idx] = { ...subs[idx], [key]: e.target.value };
    setForm({ ...form, subcategories: subs });
  };
  const addSub = () => setForm({ ...form, subcategories: [...form.subcategories, { ...blankSub }] });
  const removeSub = (idx) => {
    const subs = form.subcategories.filter((_, i) => i !== idx);
    setForm({ ...form, subcategories: subs.length ? subs : [{ ...blankSub }] });
  };

  const save = async () => {
    setBusy(true);
    try {
      const subcategories = form.subcategories
        .filter((s) => s.name.trim())
        .map((s) => ({ name: s.name.trim(), rate: Number(s.rate) || 0 }));
      await saveGiftcard({
        ...(editing !== "new" ? { id: editing } : {}),
        name: form.name,
        icon_url: form.icon_url,
        subcategories,
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

  const toggle = async (g) => {
    try { await saveGiftcard({ id: g.id, enabled: !g.enabled }); } catch (e) { toast("error", err(e.message), "Error"); }
  };

  const remove = async (g) => {
    if (!confirm(`Delete ${g.name}?`)) return;
    try { await deleteGiftcard(g.id); toast("success", "Deleted.", "Done"); } catch (e) { toast("error", err(e.message), "Error"); }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
        <HStack gap={3}>
          <Flex w="40px" h="40px" bg="rgba(139,92,246,0.1)" borderRadius="xl" align="center" justify="center">
            <Icon color="#8b5cf6" fontSize="md"><FaGift /></Icon>
          </Flex>
          <Box>
            <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Gift Cards</Heading>
            <Text color="ink.500" fontSize="sm">Add card types with subcategories and rates.</Text>
          </Box>
        </HStack>
        <Button colorPalette="brand" borderRadius="xl" onClick={openNew}><FaPlus /> Add gift card</Button>
      </Flex>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : giftcards.length === 0 ? (
        <Flex direction="column" align="center" py={12} gap={3}>
          <Flex w="48px" h="48px" bg="ink.50" borderRadius="full" align="center" justify="center">
            <Icon color="ink.300" fontSize="lg"><FaGift /></Icon>
          </Flex>
          <Text color="ink.400" fontSize="sm">No gift cards yet.</Text>
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {giftcards.map((g, i) => {
            const subs = Array.isArray(g.subcategories) ? g.subcategories : [];
            const clr = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <ScrollReveal key={g.id} delay={staggerDelay(i, 0.05)}>
                <Box
                  bg="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="#e5e5e5"
                  overflow="hidden"
                  transition="all .2s"
                  _hover={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transform: "translateY(-1px)" }}
                >
                  <Box bg={clr.bg} px={5} py={4}>
                    <Flex justify="space-between" align="start">
                      <HStack gap={3}>
                        {g.icon_url ? (
                          <Flex boxSize="40px" bg="white" borderRadius="xl" align="center" justify="center">
                            <Image src={g.icon_url} boxSize="28px" objectFit="contain" />
                          </Flex>
                        ) : (
                          <Flex boxSize="40px" bg="white" color={clr.accent} borderRadius="xl" align="center" justify="center" fontWeight="800" fontSize="sm">
                            {g.name?.[0]}
                          </Flex>
                        )}
                        <Box>
                          <Text fontWeight="700" color="ink.900">{g.name}</Text>
                          <Text fontSize="xs" color="ink.500">{subs.length} {subs.length === 1 ? "subcategory" : "subcategories"}</Text>
                        </Box>
                      </HStack>
                      <HStack>
                        <IconButton aria-label="Edit" size="sm" variant="ghost" borderRadius="lg" onClick={() => openEdit(g)}><FaPen /></IconButton>
                        <IconButton aria-label="Delete" size="sm" variant="ghost" colorPalette="red" borderRadius="lg" onClick={() => remove(g)}><FaTrash /></IconButton>
                      </HStack>
                    </Flex>
                  </Box>
                  <Box px={5} py={4}>
                    {subs.length > 0 && (
                      <VStack align="stretch" gap={2} mb={3}>
                        {subs.map((s, j) => (
                          <Flex key={j} justify="space-between" fontSize="xs" color="ink.600">
                            <Text>{s.name}</Text>
                            <Text fontWeight="700" color={clr.accent}>{naira(s.rate)}/$</Text>
                          </Flex>
                        ))}
                      </VStack>
                    )}
                    <Flex justify="end">
                      <Switch.Root checked={g.enabled} onCheckedChange={() => toggle(g)} colorPalette="brand">
                        <Switch.HiddenInput /><Switch.Control /><Switch.Label fontSize="xs">{g.enabled ? "On" : "Off"}</Switch.Label>
                      </Switch.Root>
                    </Flex>
                  </Box>
                </Box>
              </ScrollReveal>
            );
          })}
        </SimpleGrid>
      )}

      <DialogRoot open={!!editing} onOpenChange={(e) => !e.open && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing === "new" ? "Add gift card" : "Edit gift card"}</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            <VStack align="stretch" gap={4}>
              <Field label="Name"><Input value={form.name} onChange={set("name")} placeholder="Apple" /></Field>
              <Field label="Icon URL"><Input value={form.icon_url} onChange={set("icon_url")} placeholder="https://..." /></Field>

              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text fontWeight="600" fontSize="sm" color="ink.700">Subcategories</Text>
                  <Button size="xs" variant="outline" onClick={addSub}><FaPlus /> Add</Button>
                </Flex>
                <VStack align="stretch" gap={3}>
                  {form.subcategories.map((sub, idx) => (
                    <HStack key={idx} gap={2}>
                      <Input flex="1" placeholder="e.g. 25-99" value={sub.name} onChange={setSub(idx, "name")} size="sm" />
                      <Input w="120px" type="number" placeholder="Rate (NGN/$)" value={sub.rate} onChange={setSub(idx, "rate")} size="sm" />
                      <IconButton aria-label="Remove" size="sm" variant="ghost" colorPalette="red" onClick={() => removeSub(idx)}>
                        <FaTrash />
                      </IconButton>
                    </HStack>
                  ))}
                </VStack>
              </Box>
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
