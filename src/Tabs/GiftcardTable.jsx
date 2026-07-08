"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Button, Input, Image, Spinner, SimpleGrid, Switch, IconButton } from "@chakra-ui/react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa6";
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogCloseTrigger } from "../components/ui/dialog";
import { Field } from "../components/ui/field";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira } from "../Helper";

const blank = { name: "", icon_url: "", rate: "", enabled: true };

export default function ManageGiftcards() {
  const { giftcards, fetchGiftcards, saveGiftcard, deleteGiftcard } = TransactionStore();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchGiftcards().catch(() => {}).finally(() => setLoading(false));
  }, [fetchGiftcards]);

  const openNew = () => { setForm(blank); setEditing("new"); };
  const openEdit = (g) => { setForm({ ...g, rate: String(g.rate) }); setEditing(g.id); };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async () => {
    setBusy(true);
    try {
      await saveGiftcard({
        ...(editing !== "new" ? { id: editing } : {}),
        name: form.name,
        icon_url: form.icon_url,
        rate: Number(form.rate) || 0,
        enabled: form.enabled,
      });
      toast("success", "Saved.", "Done");
      setEditing(null);
    } catch (e) {
      toast("error", err(e.message), "Could not save");
    } finally {
      setBusy(false);
      toaster.dismiss();
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
        <Box>
          <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Gift Cards</Heading>
          <Text color="ink.500">Add card types and set the rate per dollar.</Text>
        </Box>
        <Button colorPalette="brand" onClick={openNew}><FaPlus /> Add gift card</Button>
      </Flex>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : giftcards.length === 0 ? (
        <Text color="ink.400" py={10} textAlign="center">No gift cards yet.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {giftcards.map((g) => (
            <Box key={g.id} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={4}>
              <Flex justify="space-between" align="start">
                <HStack gap={3}>
                  {g.icon_url ? <Image src={g.icon_url} boxSize="36px" objectFit="contain" /> :
                    <Flex boxSize="36px" bg="brand.50" color="brand.500" borderRadius="md" align="center" justify="center" fontWeight="700">{g.name?.[0]}</Flex>}
                  <Box>
                    <Text fontWeight="700" color="ink.900">{g.name}</Text>
                    <Text fontSize="xs" color="ink.500">{naira(g.rate)}/$</Text>
                  </Box>
                </HStack>
                <HStack>
                  <IconButton aria-label="Edit" size="sm" variant="ghost" onClick={() => openEdit(g)}><FaPen /></IconButton>
                  <IconButton aria-label="Delete" size="sm" variant="ghost" colorPalette="red" onClick={() => remove(g)}><FaTrash /></IconButton>
                </HStack>
              </Flex>
              <Flex mt={3} justify="end">
                <Switch.Root checked={g.enabled} onCheckedChange={() => toggle(g)} colorPalette="brand">
                  <Switch.HiddenInput /><Switch.Control /><Switch.Label fontSize="xs">{g.enabled ? "On" : "Off"}</Switch.Label>
                </Switch.Root>
              </Flex>
            </Box>
          ))}
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
              <Field label="Name"><Input value={form.name} onChange={set("name")} placeholder="Amazon" /></Field>
              <Field label="Icon URL"><Input value={form.icon_url} onChange={set("icon_url")} placeholder="https://..." /></Field>
              <Field label="Rate per $ (NGN)"><Input type="number" value={form.rate} onChange={set("rate")} placeholder="1100" /></Field>
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

