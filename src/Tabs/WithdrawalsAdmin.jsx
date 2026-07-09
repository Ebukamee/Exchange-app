"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Badge, Button, Spinner, SimpleGrid, Tabs } from "@chakra-ui/react";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira, formatDate, statusMeta } from "../Helper";

export default function WithdrawalsAdmin() {
  const { withdrawals, getAllWithdrawals, reviewWithdrawal } = TransactionStore();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    getAllWithdrawals().catch(() => {}).finally(() => setLoading(false));
  }, [getAllWithdrawals]);

  const review = async (wd, status) => {
    setBusy(wd.id);
    try {
      await reviewWithdrawal(wd, status);
      toast("success", `Withdrawal ${status}.`, "Done");
      await getAllWithdrawals();
    } catch (e) {
      toast("error", err(e.message), "Could not update");
    } finally {
      setBusy(null);
    }
  };

  const filterBy = (s) => withdrawals.filter((w) => w.status === s);

  return (
    <Box>
      <Heading fontFamily="heading" fontSize="2xl" color="ink.900" mb={1}>Withdrawals</Heading>
      <Text color="ink.500" mb={6}>Approve payouts to users' bank accounts. Rejecting refunds the balance.</Text>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : (
        <Tabs.Root defaultValue="pending" variant="enclosed">
          <Tabs.List mb={5}>
            <Tabs.Trigger value="pending">Pending ({filterBy("pending").length})</Tabs.Trigger>
            <Tabs.Trigger value="approved">Approved</Tabs.Trigger>
            <Tabs.Trigger value="rejected">Rejected</Tabs.Trigger>
          </Tabs.List>
          {["pending", "approved", "rejected"].map((s) => (
            <Tabs.Content key={s} value={s}>
              {filterBy(s).length === 0 ? (
                <Text color="ink.400" py={10} textAlign="center">Nothing here.</Text>
              ) : (
                <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                  {filterBy(s).map((wd) => {
                    const meta = statusMeta(wd.status);
                    return (
                      <Box key={wd.id} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={4}>
                        <Flex justify="space-between" mb={2}>
                          <Text fontWeight="800" color="brand.600">{naira(wd.amount)}</Text>
                          <Badge colorPalette={meta.palette}>{meta.label}</Badge>
                        </Flex>
                        <VStack align="stretch" gap={0.5} fontSize="sm" color="ink.600">
                          <Text>{wd.full_name || wd.email}</Text>
                          <Text>{wd.bank_name} • {wd.account_name}</Text>
                          <Text>{wd.account_number}</Text>
                          <Text fontSize="xs" color="ink.400">{formatDate(wd.created_at)}</Text>
                        </VStack>
                        {wd.status === "pending" && (
                          <HStack mt={3}>
                            <Button size="sm" variant="outline" colorPalette="red" onClick={() => review(wd, "rejected")} loading={busy === wd.id}>Reject</Button>
                            <Button size="sm" colorPalette="green" onClick={() => review(wd, "approved")} loading={busy === wd.id}>Mark paid</Button>
                          </HStack>
                        )}
                      </Box>
                    );
                  })}
                </SimpleGrid>
              )}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      )}
    </Box>
  );
}

