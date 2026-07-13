"use client";
import { useEffect, useState } from "react";
import {
  Box, Text, Input, Button, VStack, HStack, SimpleGrid, Flex, Image, Icon, Clipboard, Spinner, RadioGroup,
} from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaCircleInfo, FaRegCopy, FaWallet, FaBuildingColumns } from "react-icons/fa6";

const CARD_COLORS = [
  { bg: "linear-gradient(135deg, #f97316, #ea580c)", light: "rgba(249,115,22,0.12)", accent: "#f97316" },
  { bg: "linear-gradient(135deg, #8b5cf6, #7c3aed)", light: "rgba(139,92,246,0.12)", accent: "#8b5cf6" },
  { bg: "linear-gradient(135deg, #06b6d4, #0891b2)", light: "rgba(6,182,212,0.12)", accent: "#06b6d4" },
  { bg: "linear-gradient(135deg, #10b981, #059669)", light: "rgba(16,185,129,0.12)", accent: "#10b981" },
  { bg: "linear-gradient(135deg, #ec4899, #db2777)", light: "rgba(236,72,153,0.12)", accent: "#ec4899" },
  { bg: "linear-gradient(135deg, #f59e0b, #d97706)", light: "rgba(245,158,11,0.12)", accent: "#f59e0b" },
  { bg: "linear-gradient(135deg, #3b82f6, #2563eb)", light: "rgba(59,130,246,0.12)", accent: "#3b82f6" },
  { bg: "linear-gradient(135deg, #ef4444, #dc2626)", light: "rgba(239,68,68,0.12)", accent: "#ef4444" },
];
import DashboardLayout from "../components/DashboardLayout";
import FileUpload from "../components/FileUpload";
import { Field } from "../components/ui/field";
import { TradeCard } from "./SellCrypto";
import TransactionStore from "../Store/TransactionStore";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira } from "../Helper";

export default function BuyCrypto() {
  const { cryptos, fetchCryptos, depositBank, fetchDepositBank, uploadImages, createTransaction, buyWithBalance } = TransactionStore();
  const { profile, fetchProfile } = useAuthStore();
  const [booting, setBooting] = useState(true);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("unit"); // "unit" or "naira"
  const [method, setMethod] = useState("bank");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const nav = useNavigate();

  useEffect(() => {
    Promise.all([fetchCryptos(), fetchDepositBank(), fetchProfile()])
      .catch(() => {})
      .finally(() => setBooting(false));
  }, [fetchCryptos, fetchDepositBank, fetchProfile]);

  const list = cryptos.filter((c) => c.enabled);
  const raw = Number(amount || 0);
  const rate = selected ? Number(selected.buy_price) : 0;
  const unitQty = mode === "unit" ? raw : rate ? raw / rate : 0;
  const cost = mode === "unit" ? raw * rate : raw;
  const enoughBalance = Number(profile?.balance || 0) >= cost;
  const valid =
    selected &&
    unitQty > 0 &&
    (method === "balance" ? enoughBalance && cost > 0 : images.length > 0);

  const submit = async () => {
    setLoading(true);
    try {
      if (method === "balance") {
        await buyWithBalance({
          asset_name: selected.name,
          icon_url: selected.icon_url,
          amount: unitQty,
          wallet_address: profile.wallet_address,
          idempotency_key: idempotencyKey,
        });
        await fetchProfile();
        toast("success", "Purchase complete — crypto is on its way to your wallet.", "Done");
      } else {
        const urls = await uploadImages(images);
        await createTransaction({
          type: "buy_crypto",
          asset_name: selected.name,
          icon_url: selected.icon_url,
          amount: unitQty,
          payment_method: "bank",
          wallet_address: profile.wallet_address,
          images: urls,
          idempotency_key: idempotencyKey,
        });
        toast("success", "Submitted for review. Crypto is sent once verified.", "Trade submitted");
      }
      nav("/dashboard/history");
    } catch (error) {
      toast("error", err(error.message), "Could not submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <TradeCard title="Buy Crypto" subtitle="Pay by bank transfer or with your Powerpay balance.">
        {booting ? (
          <Flex justify="center" py={10}><Spinner color="brand.500" /></Flex>
        ) : list.length === 0 ? (
          <Text color="ink.400" py={6} textAlign="center">No cryptocurrencies available right now.</Text>
        ) : (
          <VStack align="stretch" gap={6}>
            <Field label="Choose cryptocurrency">
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                {list.map((c, idx) => {
                  const active = selected?.id === c.id;
                  const symbol = c.symbol || c.name;
                  const clr = CARD_COLORS[idx % CARD_COLORS.length];
                  return (
                    <Box
                      key={c.id}
                      as="button"
                      type="button"
                      onClick={() => setSelected(c)}
                      bg="white"
                      borderRadius="xl"
                      border="2px solid"
                      borderColor={active ? clr.accent : "#e5e5e5"}
                      overflow="hidden"
                      transition="all .25s"
                      _hover={{ transform: "translateY(-3px)", boxShadow: `0 8px 24px ${clr.light}`, borderColor: clr.accent }}
                      boxShadow={active ? `0 0 0 3px ${clr.light}` : "none"}
                      textAlign="left"
                    >
                      <Box style={{ background: active ? clr.bg : clr.light }} p={4} position="relative" overflow="hidden" transition="all .25s">
                        <Box position="absolute" top="-15px" right="-15px" w="50px" h="50px" bg={active ? "rgba(255,255,255,0.15)" : clr.light} borderRadius="full" />
                        <HStack gap={3}>
                          {c.icon_url ? (
                            <Flex boxSize="40px" bg={active ? "rgba(255,255,255,0.2)" : "white"} borderRadius="xl" align="center" justify="center" transition="all .25s">
                              <Image src={c.icon_url} boxSize="28px" objectFit="contain" />
                            </Flex>
                          ) : (
                            <Flex boxSize="40px" bg={active ? "rgba(255,255,255,0.2)" : clr.light} color={active ? "white" : clr.accent} borderRadius="xl" align="center" justify="center" fontWeight="800" fontSize="sm" transition="all .25s">
                              {c.name?.[0]}
                            </Flex>
                          )}
                          <Box>
                            <Text fontWeight="800" fontSize="md" color={active ? "white" : "#1B1C20"} lineHeight="1.2" transition="all .25s">{c.name}</Text>
                            <Text fontSize="xs" color={active ? "rgba(255,255,255,0.7)" : "#797B89"} fontWeight="500" transition="all .25s">{symbol}</Text>
                          </Box>
                        </HStack>
                      </Box>
                      <Box px={4} py={3}>
                        <Text fontSize="xs" color="#797B89" mb={0.5}>Rate</Text>
                        <Text fontSize="sm" fontWeight="700" color={clr.accent}>{naira(c.buy_price)}/USD</Text>
                      </Box>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Field>

            {selected && (
              <>
                <Field label={mode === "unit" ? `Amount of ${selected.symbol || selected.name} to buy` : "Amount in Naira"}>
                  <Input type="number" min="0" step="any" placeholder={mode === "unit" ? "0.00" : "0"} value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Field>
                <Text as="button" type="button" fontSize="xs" color="brand.500" fontWeight="600" mt={-4} onClick={() => { setAmount(""); setMode(mode === "unit" ? "naira" : "unit"); }}>
                  Switch to {mode === "unit" ? "Naira (₦)" : selected.symbol || selected.name}
                </Text>

                <Box bg="#1B1C20" borderRadius="xl" p={4}>
                  <VStack align="stretch" gap={1}>
                    {mode === "naira" && raw > 0 && (
                      <Flex justify="space-between">
                        <Text color="#797B89" fontSize="sm">You're buying</Text>
                        <Text fontWeight="700" color="#fff" fontSize="sm">{unitQty.toLocaleString("en", { maximumFractionDigits: 7 })} {selected.symbol || selected.name}</Text>
                      </Flex>
                    )}
                    <Flex justify="space-between">
                      <Text color="#797B89" fontSize="sm">You'll pay</Text>
                      <Text fontWeight="800" color="brand.500">{naira(cost)}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="#5C5C5C" fontSize="xs">Sent to your wallet</Text>
                      <Text color="#797B89" fontSize="xs" wordBreak="break-all">{profile?.wallet_address || "—"}</Text>
                    </Flex>
                  </VStack>
                </Box>

                <Field label="Payment method">
                  <RadioGroup.Root value={method} onValueChange={(e) => setMethod(e.value)}>
                    <VStack align="stretch" gap={3}>
                      <MethodOption value="bank" active={method === "bank"} icon={FaBuildingColumns} title="Bank transfer" desc="Pay into our account and upload proof." />
                      <MethodOption
                        value="balance"
                        active={method === "balance"}
                        icon={FaWallet}
                        title="Powerpay balance"
                        desc={`Balance: ${naira(profile?.balance)}${cost > 0 && !enoughBalance ? " — insufficient" : ""}`}
                      />
                    </VStack>
                  </RadioGroup.Root>
                </Field>

                {method === "bank" && (
                  <>
                    {depositBank?.account_number ? (
                      <Box bg="#1B1C20" border="1px solid" borderColor="#2a2b30" borderRadius="xl" p={4}>
                        <HStack color="brand.500" mb={3} gap={2}>
                          <Icon><FaCircleInfo /></Icon>
                          <Text fontSize="sm" fontWeight="600" color="#fff">Transfer {naira(cost)} to:</Text>
                        </HStack>
                        <VStack align="stretch" gap={1} fontSize="sm">
                          <Flex justify="space-between"><Text color="#797B89">Bank</Text><Text fontWeight="600" color="#fff">{depositBank.bank_name}</Text></Flex>
                          <Flex justify="space-between"><Text color="#797B89">Name</Text><Text fontWeight="600" color="#fff">{depositBank.account_name}</Text></Flex>
                          <Clipboard.Root value={depositBank.account_number}>
                            <Flex justify="space-between" align="center">
                              <Text color="#797B89">Account</Text>
                              <HStack><Text fontWeight="600" color="#fff">{depositBank.account_number}</Text>
                                <Clipboard.Trigger asChild><Button size="2xs" variant="ghost" color="#797B89"><FaRegCopy /></Button></Clipboard.Trigger>
                              </HStack>
                            </Flex>
                          </Clipboard.Root>
                        </VStack>
                      </Box>
                    ) : (
                      <Text fontSize="sm" color="#5C5C5C">Bank details not set yet — please try the balance option or contact support.</Text>
                    )}
                    <Field label="Proof of payment">
                      <FileUpload files={images} onChange={setImages} />
                    </Field>
                  </>
                )}

                <Button colorPalette="brand" size="lg" disabled={!valid} loading={loading} onClick={submit}>
                  {method === "balance" ? "Buy now" : "Submit trade"}
                </Button>
              </>
            )}
          </VStack>
        )}
      </TradeCard>
    </DashboardLayout>
  );
}

function MethodOption({ value, active, icon, title, desc }) {
  return (
    <RadioGroup.Item value={value}>
      <RadioGroup.ItemHiddenInput />
      <HStack
        border="2px solid"
        borderColor={active ? "brand.500" : "#e5e5e5"}
        bg={active ? "#fff5f5" : "white"}
        borderRadius="xl"
        p={4}
        w="100%"
        transition="all .2s"
        _hover={{ borderColor: active ? "brand.500" : "#5C5C5C" }}
      >
        <Icon color="brand.500">{<icon />}</Icon>
        <Box flex="1">
          <Text fontWeight="600" fontSize="sm" color="#1B1C20">{title}</Text>
          <Text fontSize="xs" color="#5C5C5C">{desc}</Text>
        </Box>
        <RadioGroup.ItemIndicator />
      </HStack>
    </RadioGroup.Item>
  );
}

