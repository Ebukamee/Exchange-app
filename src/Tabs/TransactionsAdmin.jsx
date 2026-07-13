"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Badge, Button, Spinner, SimpleGrid, Tabs, Icon } from "@chakra-ui/react";
import { FaListCheck, FaCircleCheck, FaCircleXmark, FaClock } from "react-icons/fa6";
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogCloseTrigger } from "../components/ui/dialog";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira, formatDate, statusMeta, txTypeLabel } from "../Helper";
import ScrollReveal, { staggerDelay } from "../components/ScrollReveal";

export default function TransactionsAdmin() {
  const { transactions, getAllTransactions, reviewTransaction, getAdminProofUrls } = TransactionStore();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [active, setActive] = useState(null);
  const [signedUrls, setSignedUrls] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getAllTransactions().then((r) => setHasMore(r.hasMore)).catch(() => {}).finally(() => setLoading(false));
  }, [getAllTransactions]);

  useEffect(() => {
    if (active?.images?.length) {
      setSignedUrls([]);
      getAdminProofUrls(active.images).then(setSignedUrls).catch(() => {});
    } else {
      setSignedUrls([]);
    }
  }, [active, getAdminProofUrls]);

  const review = async (tx, status) => {
    setBusy(true);
    try {
      await reviewTransaction(tx.id, status);
      toast("success", `Transaction ${status}.`, "Done");
      setActive(null);
      const r = await getAllTransactions();
      setHasMore(r.hasMore);
    } catch (e) {
      toast("error", err(e.message), "Could not update");
    } finally {
      setBusy(false);
    }
  };

  const loadMore = async () => {
    const r = await getAllTransactions(transactions.length);
    setHasMore(r.hasMore);
  };

  const filterBy = (s) => transactions.filter((t) => t.status === s);
  const pendingCount = filterBy("pending").length;
  const confirmedCount = filterBy("confirmed").length;
  const rejectedCount = filterBy("rejected").length;

  return (
    <Box>
      <ScrollReveal>
        <HStack gap={3} mb={1}>
          <Flex w="40px" h="40px" bg="rgba(249,115,22,0.1)" borderRadius="xl" align="center" justify="center">
            <Icon color="#f97316" fontSize="md"><FaListCheck /></Icon>
          </Flex>
          <Box>
            <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Transactions</Heading>
            <Text color="ink.500" fontSize="sm">Review proof and approve or reject trades.</Text>
          </Box>
        </HStack>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SimpleGrid columns={3} gap={4} my={6}>
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={4}>
            <HStack gap={2} mb={1}>
              <Flex w="28px" h="28px" bg="rgba(245,158,11,0.1)" borderRadius="lg" align="center" justify="center">
                <Icon color="#f59e0b" fontSize="xs"><FaClock /></Icon>
              </Flex>
              <Text fontSize="xs" color="#797B89" fontWeight="600">Pending</Text>
            </HStack>
            <Text fontWeight="800" fontSize="xl" color="#1B1C20">{pendingCount}</Text>
          </Box>
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={4}>
            <HStack gap={2} mb={1}>
              <Flex w="28px" h="28px" bg="rgba(16,185,129,0.1)" borderRadius="lg" align="center" justify="center">
                <Icon color="#10b981" fontSize="xs"><FaCircleCheck /></Icon>
              </Flex>
              <Text fontSize="xs" color="#797B89" fontWeight="600">Confirmed</Text>
            </HStack>
            <Text fontWeight="800" fontSize="xl" color="#1B1C20">{confirmedCount}</Text>
          </Box>
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={4}>
            <HStack gap={2} mb={1}>
              <Flex w="28px" h="28px" bg="rgba(239,68,68,0.1)" borderRadius="lg" align="center" justify="center">
                <Icon color="#ef4444" fontSize="xs"><FaCircleXmark /></Icon>
              </Flex>
              <Text fontSize="xs" color="#797B89" fontWeight="600">Rejected</Text>
            </HStack>
            <Text fontWeight="800" fontSize="xl" color="#1B1C20">{rejectedCount}</Text>
          </Box>
        </SimpleGrid>
      </ScrollReveal>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : (
        <Tabs.Root defaultValue="pending" variant="enclosed">
          <Tabs.List mb={5}>
            <Tabs.Trigger value="pending">Pending ({pendingCount})</Tabs.Trigger>
            <Tabs.Trigger value="confirmed">Confirmed</Tabs.Trigger>
            <Tabs.Trigger value="rejected">Rejected</Tabs.Trigger>
          </Tabs.List>
          {["pending", "confirmed", "rejected"].map((s) => (
            <Tabs.Content key={s} value={s}>
              {filterBy(s).length === 0 ? (
                <Flex direction="column" align="center" py={12} gap={3}>
                  <Flex w="48px" h="48px" bg="ink.50" borderRadius="full" align="center" justify="center">
                    <Icon color="ink.300" fontSize="lg"><FaListCheck /></Icon>
                  </Flex>
                  <Text color="ink.400" fontSize="sm">No {s} transactions.</Text>
                </Flex>
              ) : (
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                  {filterBy(s).map((tx, i) => (
                    <ScrollReveal key={tx.id} delay={staggerDelay(i, 0.05)}>
                      <TxCard tx={tx} onOpen={() => setActive(tx)} />
                    </ScrollReveal>
                  ))}
                </SimpleGrid>
              )}
            </Tabs.Content>
          ))}
          {hasMore && (
            <Flex justify="center" mt={4}>
              <Button variant="outline" colorPalette="brand" onClick={loadMore}>Load more</Button>
            </Flex>
          )}
        </Tabs.Root>
      )}

      <DialogRoot open={!!active} onOpenChange={(e) => !e.open && setActive(null)} size="lg">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{active ? `${txTypeLabel(active.type)} \u2022 ${active.asset_name}` : "\u00A0"}</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            {active && (
              <VStack align="stretch" gap={3}>
                <Row label="User" value={active.full_name || active.email || active.user_id} />
                <Row label="Amount / Qty" value={String(active.amount)} />
                <Row label="Rate" value={naira(active.rate)} />
                <Row label="Payout" value={naira(active.payout)} strong />
                {active.payment_method && <Row label="Payment" value={active.payment_method} />}
                {active.country && <Row label="Country" value={active.country} />}
                {active.sub_category && <Row label="Card type" value={active.sub_category} />}
                {active.wallet_address && <Row label="Wallet" value={active.wallet_address} />}
                {active.description && <Row label="Note" value={active.description} />}
                <Row label="Date" value={formatDate(active.created_at)} />
                {Array.isArray(active.images) && active.images.length > 0 && (
                  <Box>
                    <Text fontSize="sm" color="ink.500" mb={2}>Proof</Text>
                    <Flex gap={3} wrap="wrap">
                      {signedUrls.length > 0 ? signedUrls.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noreferrer">
                          <img src={url} alt="Proof" style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "12px", border: "1px solid #e5e5e5" }} />
                        </a>
                      )) : (
                        <Spinner size="sm" color="brand.500" />
                      )}
                    </Flex>
                  </Box>
                )}
              </VStack>
            )}
          </DialogBody>
          {active?.status === "pending" && (
            <DialogFooter>
              <Button variant="outline" colorPalette="red" onClick={() => review(active, "rejected")} loading={busy}>Reject</Button>
              <Button colorPalette="green" onClick={() => review(active, "confirmed")} loading={busy}>Confirm &amp; pay</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}

function TxCard({ tx, onOpen }) {
  const meta = statusMeta(tx.status);
  const statusColor = tx.status === "pending" ? "#f59e0b" : tx.status === "confirmed" ? "#10b981" : "#ef4444";
  return (
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
          <Flex w="36px" h="36px" bg={`${statusColor}15`} borderRadius="lg" align="center" justify="center">
            <Box w="8px" h="8px" bg={statusColor} borderRadius="full" />
          </Flex>
          <Box>
            <HStack gap={2} mb={0.5}>
              <Text fontWeight="700" color="ink.900" fontSize="sm">{txTypeLabel(tx.type)}</Text>
              <Badge colorPalette={meta.palette}>{meta.label}</Badge>
            </HStack>
            <Text fontSize="sm" color="ink.600">{tx.asset_name} • {naira(tx.payout)}</Text>
            <Text fontSize="xs" color="ink.400">{tx.email} • {formatDate(tx.created_at)}</Text>
          </Box>
        </HStack>
        <Button size="sm" variant="outline" colorPalette="brand" borderRadius="lg" onClick={onOpen}>Review</Button>
      </Flex>
    </Box>
  );
}

function Row({ label, value, strong }) {
  return (
    <Flex justify="space-between" gap={4} py={1}>
      <Text fontSize="sm" color="ink.500">{label}</Text>
      <Text fontSize="sm" fontWeight={strong ? "800" : "600"} color={strong ? "brand.600" : "ink.900"} textAlign="right" wordBreak="break-all">{value}</Text>
    </Flex>
  );
}
