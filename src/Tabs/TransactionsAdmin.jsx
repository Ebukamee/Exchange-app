"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Badge, Button, Image, Spinner, SimpleGrid, Tabs } from "@chakra-ui/react";
import { DialogRoot, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogCloseTrigger } from "../components/ui/dialog";
import TransactionStore from "../Store/TransactionStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira, formatDate, statusMeta, txTypeLabel } from "../Helper";

export default function TransactionsAdmin() {
  const { transactions, getAllTransactions, reviewTransaction } = TransactionStore();
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getAllTransactions().catch(() => {}).finally(() => setLoading(false));
  }, [getAllTransactions]);

  const review = async (tx, status) => {
    setBusy(true);
    try {
      await reviewTransaction(tx, status);
      toast("success", `Transaction ${status}.`, "Done");
      setActive(null);
      await getAllTransactions();
    } catch (e) {
      toast("error", err(e.message), "Could not update");
    } finally {
      setBusy(false);
      toaster.dismiss();
    }
  };

  const filterBy = (s) => transactions.filter((t) => t.status === s);

  return (
    <Box>
      <Heading fontFamily="heading" fontSize="2xl" color="ink.900" mb={1}>Transactions</Heading>
      <Text color="ink.500" mb={6}>Review proof and approve or reject trades.</Text>

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
                  {filterBy(s).map((tx) => (
                    <TxCard key={tx.id} tx={tx} onOpen={() => setActive(tx)} />
                  ))}
                </SimpleGrid>
              )}
            </Tabs.Content>
          ))}
        </Tabs.Root>
      )}

      <DialogRoot open={!!active} onOpenChange={(e) => !e.open && setActive(null)} size="lg">
        {active && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{txTypeLabel(active.type)} • {active.asset_name}</DialogTitle>
              <DialogCloseTrigger />
            </DialogHeader>
            <DialogBody>
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
                      {active.images.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noreferrer">
                          <Image src={url} boxSize="120px" objectFit="cover" borderRadius="l1" border="1px solid" borderColor="ink.100" />
                        </a>
                      ))}
                    </Flex>
                  </Box>
                )}
              </VStack>
            </DialogBody>
            {active.status === "pending" && (
              <DialogFooter>
                <Button variant="outline" colorPalette="red" onClick={() => review(active, "rejected")} loading={busy}>Reject</Button>
                <Button colorPalette="green" onClick={() => review(active, "approved")} loading={busy}>Approve &amp; pay</Button>
              </DialogFooter>
            )}
          </DialogContent>
        )}
      </DialogRoot>
    </Box>
  );
}

function TxCard({ tx, onOpen }) {
  const meta = statusMeta(tx.status);
  return (
    <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={4}>
      <Flex justify="space-between" align="start">
        <Box>
          <HStack gap={2} mb={1}>
            <Text fontWeight="700" color="ink.900" fontSize="sm">{txTypeLabel(tx.type)}</Text>
            <Badge colorPalette={meta.palette}>{meta.label}</Badge>
          </HStack>
          <Text fontSize="sm" color="ink.600">{tx.asset_name} • {naira(tx.payout)}</Text>
          <Text fontSize="xs" color="ink.400">{tx.email} • {formatDate(tx.created_at)}</Text>
        </Box>
        <Button size="sm" variant="outline" colorPalette="brand" onClick={onOpen}>Review</Button>
      </Flex>
    </Box>
  );
}

function Row({ label, value, strong }) {
  return (
    <Flex justify="space-between" gap={4}>
      <Text fontSize="sm" color="ink.500">{label}</Text>
      <Text fontSize="sm" fontWeight={strong ? "800" : "600"} color={strong ? "brand.600" : "ink.900"} textAlign="right" wordBreak="break-all">{value}</Text>
    </Flex>
  );
}

