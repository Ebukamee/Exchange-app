"use client";
import { useEffect, useState } from "react";
import { Box, Text, Input, Button, VStack, HStack, Flex, Icon } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaBuildingColumns } from "react-icons/fa6";
import DashboardLayout from "../components/DashboardLayout";
import { Field } from "../components/ui/field";
import { TradeCard } from "./SellCrypto";
import TransactionStore from "../Store/TransactionStore";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err, naira } from "../Helper";

export default function Withdraw() {
  const { requestWithdrawal } = TransactionStore();
  const { profile, fetchProfile } = useAuthStore();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const nav = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const balance = Number(profile?.balance || 0);
  const numAmt = Number(amount || 0);
  const valid = numAmt >= 1000 && numAmt <= balance;

  const submit = async () => {
    setLoading(true);
    try {
      await requestWithdrawal({
        amount: Number(amount),
        bank_name: profile.bank_name,
        account_name: profile.account_name,
        account_number: profile.account_number,
        idempotency_key: idempotencyKey,
      });
      await fetchProfile();
      toast("success", "Withdrawal requested. It'll be processed shortly.", "Request sent");
      nav("/dashboard/history");
    } catch (error) {
      toast("error", err(error.message), "Could not withdraw");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <TradeCard title="Withdraw" subtitle="Cash out your Powerpay balance to your bank account.">
        <VStack align="stretch" gap={6}>
          <Box bg="ink.950" color="white" borderRadius="l2" p={5}>
            <Text fontSize="sm" color="ink.300">Available balance</Text>
            <Text fontFamily="heading" fontSize="3xl" fontWeight="800">{naira(balance)}</Text>
          </Box>

          <Box border="1px solid" borderColor="ink.100" borderRadius="l2" p={4}>
            <HStack color="brand.600" mb={2} gap={2}>
              <Icon><FaBuildingColumns /></Icon>
              <Text fontSize="sm" fontWeight="600">Paying out to</Text>
            </HStack>
            {profile?.account_number ? (
              <VStack align="stretch" gap={1} fontSize="sm">
                <Flex justify="space-between"><Text color="ink.500">Bank</Text><Text fontWeight="600">{profile.bank_name}</Text></Flex>
                <Flex justify="space-between"><Text color="ink.500">Name</Text><Text fontWeight="600">{profile.account_name}</Text></Flex>
                <Flex justify="space-between"><Text color="ink.500">Account</Text><Text fontWeight="600">{profile.account_number}</Text></Flex>
              </VStack>
            ) : (
              <Text fontSize="sm" color="ink.400">
                No bank account on file.{" "}
                <Text as="span" color="brand.600" cursor="pointer" onClick={() => nav("/dashboard/profile")}>Add one</Text>.
              </Text>
            )}
          </Box>

          <Field label="Amount to withdraw" helperText="Minimum ₦1,000" errorText={amount && !valid ? (numAmt < 1000 ? "Minimum withdrawal is ₦1,000" : "Amount exceeds your balance") : undefined} invalid={!!amount && !valid}>
            <Input type="number" min="0" step="any" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Field>

          <Button colorPalette="ink" size="lg" disabled={!valid || !profile?.account_number} loading={loading} onClick={submit}>
            Request withdrawal
          </Button>
        </VStack>
      </TradeCard>
    </DashboardLayout>
  );
}

