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
import { toaster } from "../components/ui/toaster";
import { toast, err, naira } from "../Helper";

export default function SellGiftcard() {
  const { giftcards, fetchGiftcards, uploadImages, createTransaction } = TransactionStore();
  const [booting, setBooting] = useState(true);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    fetchGiftcards().catch(() => {}).finally(() => setBooting(false));
  }, [fetchGiftcards]);

  const list = giftcards.filter((g) => g.enabled);
  const payout = selected ? Number(amount || 0) * Number(selected.rate) : 0;
  const valid = selected && Number(amount) > 0 && images.length > 0;

  const submit = async () => {
    setLoading(true);
    try {
      const urls = await uploadImages(images);
      await createTransaction({
        type: "sell_giftcard",
        asset_name: selected.name,
        icon_url: selected.icon_url,
        amount: Number(amount),
        rate: Number(selected.rate),
        payout,
        sub_category: subCategory,
        country,
        description,
        images: urls,
      });
      toast("success", "Submitted for review. You'll be paid once verified.", "Card submitted");
      nav("/dashboard/history");
    } catch (error) {
      toast("error", err(error.message), "Could not submit");
    } finally {
      setLoading(false);
      toaster.dismiss();
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
                    <Box key={g.id} as="button" type="button" onClick={() => setSelected(g)}
                      border="2px solid" borderColor={active ? "brand.500" : "ink.100"} bg={active ? "brand.50" : "white"} borderRadius="l2" p={4}>
                      <HStack gap={2}>
                        {g.icon_url ? <Image src={g.icon_url} boxSize="26px" objectFit="contain" /> : null}
                        <Text fontWeight="600" fontSize="sm">{g.name}</Text>
                      </HStack>
                      <Text fontSize="xs" color="ink.500" mt={1}>{naira(g.rate)}/$</Text>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Field>

            {selected && (
              <>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Field label="Card value ($)">
                    <Input type="number" min="0" step="any" placeholder="e.g. 100" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </Field>
                  <Field label="Country">
                    <Input placeholder="e.g. USA" value={country} onChange={(e) => setCountry(e.target.value)} />
                  </Field>
                </SimpleGrid>

                <Field label="Card type (optional)" helperText="e.g. Physical, E-code, Cash Receipt">
                  <Input placeholder="e.g. E-code" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} />
                </Field>

                <Box bg="ink.50" borderRadius="l2" p={4}>
                  <Flex justify="space-between">
                    <Text color="ink.500" fontSize="sm">You'll receive</Text>
                    <Text fontWeight="800" color="brand.600">{naira(payout)}</Text>
                  </Flex>
                </Box>

                <Field label="Card image / proof">
                  <FileUpload files={images} onChange={setImages} />
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
