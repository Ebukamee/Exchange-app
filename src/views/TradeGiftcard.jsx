"use client";
import { useEffect, useState } from "react";
import {
  Box, Text, Input, Textarea, Button, VStack, HStack, SimpleGrid, Flex, Image, Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import DashboardLayout from "../components/DashboardLayout";
import FileUpload from "../components/FileUpload";
import { Field } from "../components/ui/field";
import { TradeCard } from "./SellCrypto";
import TransactionStore from "../Store/TransactionStore";
import { toast, err, naira } from "../Helper";

export default function SellGiftcard() {
  const { giftcards, fetchGiftcards, uploadImages, createTransaction } = TransactionStore();
  const [booting, setBooting] = useState(true);
  const [selected, setSelected] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("unit"); // "unit" (USD) or "naira"
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const nav = useNavigate();

  useEffect(() => {
    fetchGiftcards().catch(() => {}).finally(() => setBooting(false));
  }, [fetchGiftcards]);

  const list = giftcards.filter((g) => g.enabled);
  const subs = selected ? (Array.isArray(selected.subcategories) ? selected.subcategories : []) : [];
  const rate = selectedSub ? Number(selectedSub.rate) : 0;
  const raw = Number(amount || 0);
  const usdQty = mode === "unit" ? raw : rate ? raw / rate : 0;
  const payout = mode === "unit" ? rate * raw : raw;
  const valid = selected && selectedSub && usdQty > 0 && images.length > 0;

  const selectCard = (g) => {
    setSelected(g);
    setSelectedSub(null);
  };

  const submit = async () => {
    setLoading(true);
    try {
      const urls = await uploadImages(images);
      await createTransaction({
        type: "sell_giftcard",
        asset_name: selected.name,
        icon_url: selected.icon_url,
        amount: usdQty,
        sub_category: selectedSub.name,
        country,
        description,
        images: urls,
        idempotency_key: idempotencyKey,
      });
      toast("success", "Submitted for review. You'll be paid once verified.", "Card submitted");
      nav("/dashboard/history");
    } catch (error) {
      toast("error", err(error.message), "Could not submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <TradeCard title="Sell Gift Card" subtitle="Upload your card details, we verify, you get paid.">
        {booting ? (
          <Flex justify="center" py={10}><Spinner color="brand.500" /></Flex>
        ) : list.length === 0 ? (
          <Text color="ink.400" py={6} textAlign="center">No gift cards accepted right now.</Text>
        ) : (
          <VStack align="stretch" gap={6}>
            <Field label="Choose gift card">
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={3}>
                {list.map((g) => {
                  const active = selected?.id === g.id;
                  return (
                    <Box key={g.id} as="button" type="button" onClick={() => selectCard(g)}
                      border="2px solid" borderColor={active ? "brand.500" : "ink.100"} bg={active ? "brand.50" : "white"} borderRadius="l2" p={4}>
                      <HStack gap={2}>
                        {g.icon_url ? <Image src={g.icon_url} boxSize="26px" objectFit="contain" /> : null}
                        <Text fontWeight="600" fontSize="sm">{g.name}</Text>
                      </HStack>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Field>

            {selected && subs.length > 0 && (
              <Field label="Select subcategory">
                <SimpleGrid columns={{ base: 2, md: 3 }} gap={3}>
                  {subs.map((s, i) => {
                    const active = selectedSub?.name === s.name;
                    return (
                      <Box key={i} as="button" type="button" onClick={() => setSelectedSub(s)}
                        border="2px solid" borderColor={active ? "brand.500" : "ink.100"} bg={active ? "brand.50" : "white"} borderRadius="l2" p={3} textAlign="left">
                        <Text fontWeight="600" fontSize="sm" color="ink.900">{s.name}</Text>
                        <Text fontSize="xs" color="ink.500">{naira(s.rate)}/$</Text>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Field>
            )}

            {selected && selectedSub && (
              <>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Box>
                    <Field label={mode === "unit" ? "Card value ($)" : "Amount in Naira"}>
                      <Input type="number" min="0" step="any" placeholder={mode === "unit" ? "e.g. 100" : "0"} value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </Field>
                    <Text as="button" type="button" fontSize="xs" color="brand.600" fontWeight="600" mt={1} onClick={() => { setAmount(""); setMode(mode === "unit" ? "naira" : "unit"); }}>
                      Switch to {mode === "unit" ? "Naira (₦)" : "USD ($)"}
                    </Text>
                  </Box>
                  <Field label="Country">
                    <Input placeholder="e.g. USA" value={country} onChange={(e) => setCountry(e.target.value)} />
                  </Field>
                </SimpleGrid>

                <Box bg="ink.50" borderRadius="l2" p={4}>
                  <VStack align="stretch" gap={1}>
                    <Flex justify="space-between">
                      <Text color="ink.500" fontSize="sm">Rate ({selectedSub.name})</Text>
                      <Text fontWeight="600" color="ink.700" fontSize="sm">{naira(rate)}/$</Text>
                    </Flex>
                    {mode === "naira" && raw > 0 && (
                      <Flex justify="space-between">
                        <Text color="ink.500" fontSize="sm">Card value</Text>
                        <Text fontWeight="700" color="ink.900" fontSize="sm">${usdQty.toLocaleString("en", { maximumFractionDigits: 2 })}</Text>
                      </Flex>
                    )}
                    <Flex justify="space-between">
                      <Text color="ink.500" fontSize="sm">You'll receive</Text>
                      <Text fontWeight="800" color="brand.600">{naira(payout)}</Text>
                    </Flex>
                  </VStack>
                </Box>

                <Field label="Card image / proof">
                  <FileUpload files={images} onChange={setImages} label="Upload images of the gift card" hint="PNG, JPG — front, back, or receipt" />
                </Field>

                <Field label="Note (optional)">
                  <Textarea placeholder="Card code or extra details" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                </Field>

                <Button colorPalette="ink" size="lg" disabled={!valid} loading={loading} onClick={submit}>
                  Submit gift card
                </Button>
              </>
            )}
          </VStack>
        )}
      </TradeCard>
    </DashboardLayout>
  );
}
