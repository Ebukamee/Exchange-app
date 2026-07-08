"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Tabs, VStack, Flex, HStack, Badge, Image, Spinner, Link as CLink } from "@chakra-ui/react";
import DashboardLayout from "../components/DashboardLayout";
import TransactionStore from "../Store/TransactionStore";
import { naira, formatDate, statusMeta, txTypeLabel } from "../Helper";

export default function History() {
  const { transactions, withdrawals, getMyTransactions, getMyWithdrawals } = TransactionStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyTransactions(), getMyWithdrawals()])
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [getMyTransactions, getMyWithdrawals]);

  return (
    <DashboardLayout>
      <Box maxW="820px" mx="auto">
        <Heading fontFamily="heading" fontSize="2xl" color="ink.900" mb={6}>History</Heading>
        {loading ? (
          <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
        ) : (
          <Tabs.Root defaultValue="transactions" variant="enclosed">
            <Tabs.List mb={5}>
              <Tabs.Trigger value="transactions">Transactions</Tabs.Trigger>
              <Tabs.Trigger value="withdrawals">Withdrawals</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="transactions">
              {transactions.length === 0 ? (
                <Empty label="No transactions yet." />
              ) : (
                <VStack align="stretch" gap={3}>
                  {transactions.map((tx) => <TxRow key={tx.id} tx={tx} />)}
                </VStack>
              )}
            </Tabs.Content>

            <Tabs.Content value="withdrawals">
              {withdrawals.length === 0 ? (
                <Empty label="No withdrawals yet." />
              ) : (
                <VStack align="stretch" gap={3}>
                  {withdrawals.map((wd) => <WdRow key={wd.id} wd={wd} />)}
                </VStack>
              )}
            </Tabs.Content>
          </Tabs.Root>
        )}
      </Box>
    </DashboardLayout>
  );
}

function TxRow({ tx }) {
  const meta = statusMeta(tx.status);
  return (
    <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={4}>
      <Flex justify="space-between" align="start" gap={3}>
        <HStack gap={3} align="start">
          {tx.icon_url ? (
            <Image src={tx.icon_url} boxSize="40px" borderRadius="md" objectFit="contain" />
          ) : (
            <Flex boxSize="40px" bg="brand.50" color="brand.500" borderRadius="md" align="center" justify="center" fontWeight="700">
              {tx.asset_name?.[0]}
            </Flex>
          )}
          <Box>
            <Text fontWeight="600" color="ink.900" fontSize="sm">{txTypeLabel(tx.type)} • {tx.asset_name}</Text>
            <Text fontSize="xs" color="ink.400">{formatDate(tx.created_at)}</Text>
            {tx.amount ? <Text fontSize="xs" color="ink.500">Qty: {tx.amount}{tx.country ? ` • ${tx.country}` : ""}</Text> : null}
            {Array.isArray(tx.images) && tx.images.length > 0 && (
              <CLink href={tx.images[0]} target="_blank" color="brand.600" fontSize="xs">View proof</CLink>
            )}
          </Box>
        </HStack>
        <VStack align="end" gap={1}>
          <Text fontWeight="700" color="ink.900">{naira(tx.payout)}</Text>
          <Badge colorPalette={meta.palette}>{meta.label}</Badge>
        </VStack>
      </Flex>
    </Box>
  );
}

function WdRow({ wd }) {
  const meta = statusMeta(wd.status);
  return (
    <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={4}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontWeight="600" color="ink.900" fontSize="sm">Withdrawal to {wd.bank_name || "bank"}</Text>
          <Text fontSize="xs" color="ink.400">{formatDate(wd.created_at)} • {wd.account_number}</Text>
        </Box>
        <VStack align="end" gap={1}>
          <Text fontWeight="700" color="ink.900">{naira(wd.amount)}</Text>
          <Badge colorPalette={meta.palette}>{meta.label}</Badge>
        </VStack>
      </Flex>
    </Box>
  );
}

function Empty({ label }) {
  return <Text color="ink.400" py={12} textAlign="center">{label}</Text>;
}

