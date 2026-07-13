"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Badge, Button, Spinner, SimpleGrid, Tabs, Icon } from "@chakra-ui/react";
import { FaMoneyBillTransfer, FaClock, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira, formatDate, statusMeta } from "../Helper";
import ScrollReveal, { staggerDelay } from "../components/ScrollReveal";

export default function WithdrawalsAdmin() {
  const { withdrawals, getAllWithdrawals, reviewWithdrawal } = TransactionStore();
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    getAllWithdrawals().then((r) => setHasMore(r.hasMore)).catch(() => {}).finally(() => setLoading(false));
  }, [getAllWithdrawals]);

  const review = async (wd, status) => {
    setBusy(wd.id);
    try {
      await reviewWithdrawal(wd.id, status);
      toast("success", `Withdrawal ${status}.`, "Done");
      const r = await getAllWithdrawals();
      setHasMore(r.hasMore);
    } catch (e) {
      toast("error", err(e.message), "Could not update");
    } finally {
      setBusy(null);
    }
  };

  const loadMore = async () => {
    const r = await getAllWithdrawals(withdrawals.length);
    setHasMore(r.hasMore);
  };

  const filterBy = (s) => withdrawals.filter((w) => w.status === s);
  const pendingCount = filterBy("pending").length;

  return (
    <Box>
      <ScrollReveal>
        <HStack gap={3} mb={6}>
          <Flex w="40px" h="40px" bg="rgba(16,185,129,0.1)" borderRadius="xl" align="center" justify="center">
            <Icon color="#10b981" fontSize="md"><FaMoneyBillTransfer /></Icon>
          </Flex>
          <Box>
            <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Withdrawals</Heading>
            <Text color="ink.500" fontSize="sm">Approve payouts to users' bank accounts. Rejecting refunds the balance.</Text>
          </Box>
        </HStack>
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
                    <Icon color="ink.300" fontSize="lg"><FaMoneyBillTransfer /></Icon>
                  </Flex>
                  <Text color="ink.400" fontSize="sm">No {s} withdrawals.</Text>
                </Flex>
              ) : (
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                  {filterBy(s).map((wd, i) => {
                    const meta = statusMeta(wd.status);
                    const statusColor = wd.status === "pending" ? "#f59e0b" : wd.status === "confirmed" ? "#10b981" : "#ef4444";
                    return (
                      <ScrollReveal key={wd.id} delay={staggerDelay(i, 0.05)}>
                        <Box
                          bg="white"
                          borderRadius="xl"
                          border="1px solid"
                          borderColor="#e5e5e5"
                          p={5}
                          transition="all .2s"
                          _hover={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transform: "translateY(-1px)" }}
                        >
                          <Flex justify="space-between" mb={3}>
                            <HStack gap={3}>
                              <Flex w="36px" h="36px" bg={`${statusColor}15`} borderRadius="lg" align="center" justify="center">
                                <Box w="8px" h="8px" bg={statusColor} borderRadius="full" />
                              </Flex>
                              <Text fontWeight="800" color="brand.600" fontSize="lg">{naira(wd.amount)}</Text>
                            </HStack>
                            <Badge colorPalette={meta.palette}>{meta.label}</Badge>
                          </Flex>
                          <VStack align="stretch" gap={1} fontSize="sm" color="ink.600" pl={1}>
                            <Text fontWeight="600">{wd.full_name || wd.email}</Text>
                            <Text color="ink.500">{wd.bank_name} • {wd.account_name}</Text>
                            <Text fontWeight="600" color="ink.900">{wd.account_number}</Text>
                            <Text fontSize="xs" color="ink.400">{formatDate(wd.created_at)}</Text>
                          </VStack>
                          {wd.status === "pending" && (
                            <HStack mt={4} gap={3}>
                              <Button size="sm" variant="outline" colorPalette="red" borderRadius="lg" onClick={() => review(wd, "rejected")} loading={busy === wd.id}>Reject</Button>
                              <Button size="sm" colorPalette="green" borderRadius="lg" onClick={() => review(wd, "confirmed")} loading={busy === wd.id}>Mark paid</Button>
                            </HStack>
                          )}
                        </Box>
                      </ScrollReveal>
                    );
                  })}
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
    </Box>
  );
}
