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
  const [mode, setMode] = useState("unit"); // "unit" or "naira"
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const nav = useNavigate();

  useEffect(() => {
    fetchCryptos().catch(() => {}).finally(() => setBooting(false));
  }, [fetchCryptos]);

  const list = cryptos.filter((c) => c.enabled);
  const raw = Number(amount || 0);
  const rate = selected ? Number(selected.sell_price) : 0;
  const unitQty = mode === "unit" ? raw : rate ? raw / rate : 0;
  const payout = mode === "unit" ? raw * rate : raw;
  const valid = selected && unitQty > 0 && images.length > 0;

  const submit = async () => {
    setLoading(true);
    try {
      const urls = await uploadImages(images);
      await createTransaction({
        type: "sell_crypto",
        asset_name: selected.name,
        icon_url: selected.icon_url,
        amount: unitQty,
        wallet_address: selected.deposit_address,
        description,
        images: urls,
        idempotency_key: idempotencyKey,
      });
      toast("success", "Submitted for review. You'll be paid once verified.", "Trade submitted");
      nav("/dashboard/history");
    } catch (error) {
      toast("error", err(error.message), "Could not submit");
    } finally {
      setLoading(false);
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
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                {list.map((c) => {
                  const active = selected?.id === c.id;
                  const symbol = c.symbol || c.name;
                  return (
                    <Box
                      key={c.id}
                      as="button"
                      type="button"
                      onClick={() => setSelected(c)}
                      bg="ink.950"
                      borderRadius="xl"
                      border="2px solid"
                      borderColor={active ? "brand.500" : "ink.800"}
                      p={5}
                      position="relative"
                      overflow="hidden"
                      transition="all .25s"
                      _hover={{ borderColor: active ? "brand.500" : "brand.300", transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
                      boxShadow={active ? "0 0 0 3px rgba(239,68,68,0.2)" : "none"}
                      textAlign="left"
                    >
                      <Text
                        position="absolute"
                        bottom="-12px"
                        right="-8px"
                        fontSize="90px"
                        fontWeight="900"
                        color="ink.300"
                        opacity={0.08}
                        lineHeight="1"
                        userSelect="none"
                        pointerEvents="none"
                      >
                        {symbol?.[0]}
                      </Text>
                      <HStack gap={3} mb={3} position="relative">
                        {c.icon_url ? (
                          <Image src={c.icon_url} boxSize="36px" objectFit="contain" />
                        ) : (
                          <Flex boxSize="36px" bg="brand.500" color="white" borderRadius="full" align="center" justify="center" fontWeight="800" fontSize="sm">
                            {c.name?.[0]}
                          </Flex>
                        )}
                        <Box>
                          <Text fontWeight="800" fontSize="md" color="white" lineHeight="1.2">{c.name}</Text>
                          <Text fontSize="xs" color="ink.400" fontWeight="500">{symbol}</Text>
                        </Box>
                      </HStack>
                      <Box position="relative" mt={1}>
                        <Text fontSize="xs" color="ink.500" mb={0.5}>Rate</Text>
                        <Text fontSize="sm" fontWeight="700" color="brand.400">{naira(c.sell_price)}/USD</Text>
                      </Box>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Field>

            {selected && (
              <>
                <Field label={mode === "unit" ? `Amount of ${selected.symbol || selected.name} to sell` : "Amount in Naira"}>
                  <Input type="number" min="0" step="any" placeholder={mode === "unit" ? "0.00" : "0"} value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Field>
                <Text as="button" type="button" fontSize="xs" color="brand.600" fontWeight="600" mt={-4} onClick={() => { setAmount(""); setMode(mode === "unit" ? "naira" : "unit"); }}>
                  Switch to {mode === "unit" ? "Naira (₦)" : selected.symbol || selected.name}
                </Text>

                <Box bg="ink.50" borderRadius="l2" p={4}>
                  <VStack align="stretch" gap={1}>
                    {mode === "naira" && raw > 0 && (
                      <Flex justify="space-between">
                        <Text color="ink.500" fontSize="sm">You're selling</Text>
                        <Text fontWeight="700" color="ink.900" fontSize="sm">{unitQty.toLocaleString("en", { maximumFractionDigits: 7 })} {selected.symbol || selected.name}</Text>
                      </Flex>
                    )}
                    {mode === "unit" && raw > 0 && (
                      <Flex justify="space-between">
                        <Text color="ink.500" fontSize="sm">You're selling</Text>
                        <Text fontWeight="700" color="ink.900" fontSize="sm">{raw} {selected.symbol || selected.name}</Text>
                      </Flex>
                    )}
                    <Flex justify="space-between">
                      <Text color="ink.500" fontSize="sm">You'll receive</Text>
                      <Text fontWeight="800" color="brand.600">{naira(payout)}</Text>
                    </Flex>
                  </VStack>
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
      <Box bg="white" borderRadius="l3" border="1px solid" borderColor="ink.100" p={{ base: 5, md: 7 }}>
        {children}
      </Box>
    </Box>
  );
}

