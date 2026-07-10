"use client";
import { useEffect, useState } from "react";
import {
  Box, Text, Input, Button, VStack, HStack, SimpleGrid, Flex, Image, Icon, Clipboard, Spinner, RadioGroup,
} from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaCircleInfo, FaRegCopy, FaWallet, FaBuildingColumns } from "react-icons/fa6";
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
              <SimpleGrid columns={{ base: 2, md: 3 }} gap={3}>
                {list.map((c) => {
                  const active = selected?.id === c.id;
                  return (
                    <Box key={c.id} as="button" type="button" onClick={() => setSelected(c)}
                      border="2px solid" borderColor={active ? "brand.500" : "ink.100"} bg={active ? "brand.50" : "white"} borderRadius="l2" p={4}>
                      <HStack gap={2}>
                        {c.icon_url ? <Image src={c.icon_url} boxSize="26px" objectFit="contain" /> : null}
                        <Text fontWeight="600" fontSize="sm">{c.name}</Text>
                      </HStack>
                      <Text fontSize="xs" color="ink.500" mt={1}>{naira(c.buy_price)}/unit</Text>
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
                <Text as="button" type="button" fontSize="xs" color="brand.600" fontWeight="600" mt={-4} onClick={() => { setAmount(""); setMode(mode === "unit" ? "naira" : "unit"); }}>
                  Switch to {mode === "unit" ? "Naira (₦)" : selected.symbol || selected.name}
                </Text>

                <Box bg="ink.50" borderRadius="l2" p={4}>
                  <VStack align="stretch" gap={1}>
                    {mode === "naira" && raw > 0 && (
                      <Flex justify="space-between">
                        <Text color="ink.500" fontSize="sm">You're buying</Text>
                        <Text fontWeight="700" color="ink.900" fontSize="sm">{unitQty.toLocaleString("en", { maximumFractionDigits: 7 })} {selected.symbol || selected.name}</Text>
                      </Flex>
                    )}
                    <Flex justify="space-between">
                      <Text color="ink.500" fontSize="sm">You'll pay</Text>
                      <Text fontWeight="800" color="brand.600">{naira(cost)}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="ink.400" fontSize="xs">Sent to your wallet</Text>
                      <Text color="ink.500" fontSize="xs" wordBreak="break-all">{profile?.wallet_address || "—"}</Text>
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
                      <Box bg="brand.50" border="1px solid" borderColor="brand.100" borderRadius="l2" p={4}>
                        <HStack color="brand.700" mb={3} gap={2}>
                          <Icon><FaCircleInfo /></Icon>
                          <Text fontSize="sm" fontWeight="600">Transfer {naira(cost)} to:</Text>
                        </HStack>
                        <VStack align="stretch" gap={1} fontSize="sm">
                          <Flex justify="space-between"><Text color="ink.500">Bank</Text><Text fontWeight="600">{depositBank.bank_name}</Text></Flex>
                          <Flex justify="space-between"><Text color="ink.500">Name</Text><Text fontWeight="600">{depositBank.account_name}</Text></Flex>
                          <Clipboard.Root value={depositBank.account_number}>
                            <Flex justify="space-between" align="center">
                              <Text color="ink.500">Account</Text>
                              <HStack><Text fontWeight="600">{depositBank.account_number}</Text>
                                <Clipboard.Trigger asChild><Button size="2xs" variant="ghost" colorPalette="ink"><FaRegCopy /></Button></Clipboard.Trigger>
                              </HStack>
                            </Flex>
                          </Clipboard.Root>
                        </VStack>
                      </Box>
                    ) : (
                      <Text fontSize="sm" color="ink.400">Bank details not set yet — please try the balance option or contact support.</Text>
                    )}
                    <Field label="Proof of payment">
                      <FileUpload files={images} onChange={setImages} />
                    </Field>
                  </>
                )}

                <Button colorPalette="ink" size="lg" disabled={!valid} loading={loading} onClick={submit}>
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
        border="1px solid"
        borderColor={active ? "brand.500" : "ink.100"}
        bg={active ? "brand.50" : "white"}
        borderRadius="l2"
        p={4}
        w="100%"
      >
        <Icon color="brand.500">{<icon />}</Icon>
        <Box flex="1">
          <Text fontWeight="600" fontSize="sm" color="ink.900">{title}</Text>
          <Text fontSize="xs" color="ink.500">{desc}</Text>
        </Box>
        <RadioGroup.ItemIndicator />
      </HStack>
    </RadioGroup.Item>
  );
}

