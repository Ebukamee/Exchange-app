"use client";
import { useEffect, useState } from "react";
import {
  Box, Heading, Text, Input, Textarea, Button, VStack, HStack, SimpleGrid, Flex, Image, Icon, Clipboard, Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaCircleInfo, FaRegCopy } from "react-icons/fa6";
import DashboardLayout from "../components/DashboardLayout";
import FileUpload from "../components/FileUpload";
import { Field } from "../components/ui/field";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira } from "../Helper";

export default function SellCrypto() {
  const { cryptos, fetchCryptos, uploadImages, createTransaction } = TransactionStore();
  const [booting, setBooting] = useState(true);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    fetchCryptos().catch(() => {}).finally(() => setBooting(false));
  }, [fetchCryptos]);

  const list = cryptos.filter((c) => c.enabled);
  const payout = selected ? Number(amount || 0) * Number(selected.sell_price) : 0;
  const valid = selected && Number(amount) > 0 && images.length > 0;

  const submit = async () => {
    setLoading(true);
    try {
      const urls = await uploadImages(images);
      await createTransaction({
        type: "sell_crypto",
        asset_name: selected.name,
        icon_url: selected.icon_url,
        amount: Number(amount),
        rate: Number(selected.sell_price),
        payout,
        wallet_address: selected.deposit_address,
        description,
        images: urls,
      });
      toast("success", "Submitted for review. You'll be paid once verified.", "Trade submitted");
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
      <TradeCard title="Sell Crypto" subtitle="Send crypto to our wallet, upload proof, and get paid in Naira.">
        {booting ? (
          <Flex justify="center" py={10}><Spinner color="brand.500" /></Flex>
        ) : list.length === 0 ? (
          <Text color="ink.400" py={6} textAlign="center">No cryptocurrencies available right now.</Text>
        ) : (
          <VStack align="stretch" gap={6}>
            <Field label="Choose cryptocurrency">
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={3}>
                {list.map((c) => {
                  const active = selected?.id === c.id;
                  return (
                    <Box
                      key={c.id}
                      as="button"
                      type="button"
                      onClick={() => setSelected(c)}
                      border="2px solid"
                      borderColor={active ? "brand.500" : "ink.100"}
                      bg={active ? "brand.50" : "white"}
                      borderRadius="l2"
                      p={4}
                    >
                      <HStack gap={2}>
                        {c.icon_url ? <Image src={c.icon_url} boxSize="26px" objectFit="contain" /> : null}
                        <Text fontWeight="600" fontSize="sm">{c.name}</Text>
                      </HStack>
                      <Text fontSize="xs" color="ink.500" mt={1}>{naira(c.sell_price)}/unit</Text>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Field>

            {selected && (
              <>
                <Field label={`Amount of ${selected.name} to sell`}>
                  <Input type="number" min="0" step="any" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Field>

                <Box bg="ink.50" borderRadius="l2" p={4}>
                  <Flex justify="space-between">
                    <Text color="ink.500" fontSize="sm">You'll receive</Text>
                    <Text fontWeight="800" color="brand.600">{naira(payout)}</Text>
                  </Flex>
                </Box>

                {selected.deposit_address && (
                  <Box bg="brand.50" border="1px solid" borderColor="brand.100" borderRadius="l2" p={4}>
                    <HStack color="brand.700" mb={2} gap={2}>
                      <Icon><FaCircleInfo /></Icon>
                      <Text fontSize="sm" fontWeight="600">Send {selected.name} to this address, then upload proof:</Text>
                    </HStack>
                    <Clipboard.Root value={selected.deposit_address}>
                      <HStack bg="white" borderRadius="l1" p={3} justify="space-between">
                        <Text fontSize="sm" wordBreak="break-all">{selected.deposit_address}</Text>
                        <Clipboard.Trigger asChild>
                          <Button size="xs" variant="ghost" colorPalette="ink"><FaRegCopy /></Button>
                        </Clipboard.Trigger>
                      </HStack>
                    </Clipboard.Root>
                  </Box>
                )}

                <Field label="Proof of payment">
                  <FileUpload files={images} onChange={setImages} />
                </Field>

                <Field label="Note (optional)">
                  <Textarea placeholder="Anything we should know?" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                </Field>

                <Button colorPalette="ink" size="lg" disabled={!valid} loading={loading} onClick={submit}>
                  Submit trade
                </Button>
              </>
            )}
          </VStack>
        )}
      </TradeCard>
    </DashboardLayout>
  );
}

export function TradeCard({ title, subtitle, children }) {
  return (
    <Box maxW="640px" mx="auto">
      <Box mb={6}>
        <Heading fontFamily="heading" fontSize="2xl" color="ink.900">{title}</Heading>
        {subtitle && <Text color="ink.500">{subtitle}</Text>}
      </Box>
      <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l3" p={{ base: 5, md: 7 }}>
        {children}
      </Box>
    </Box>
  );
}
