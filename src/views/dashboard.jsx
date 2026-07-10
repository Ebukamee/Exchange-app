"use client";
import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, SimpleGrid, HStack, VStack, Icon, Button, Badge, Spinner } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaArrowTrendUp, FaCartShopping, FaGift, FaMoneyBillTransfer, FaWallet } from "react-icons/fa6";
import DashboardLayout from "../components/DashboardLayout";
import useAuthStore from "../Store/userStore";
import TransactionStore from "../Store/TransactionStore";
import { naira, cut, formatDate, statusMeta, txTypeLabel } from "../Helper";

const actions = [
  { to: "/dashboard/sell-crypto", label: "Sell Crypto", icon: FaArrowTrendUp },
  { to: "/dashboard/buy-crypto", label: "Buy Crypto", icon: FaCartShopping },
  { to: "/dashboard/sell-giftcard", label: "Sell Gift Card", icon: FaGift },
  { to: "/dashboard/withdraw", label: "Withdraw", icon: FaMoneyBillTransfer },
];

export default function Dashboard() {
  const { profile } = useAuthStore();
  const { transactions, getMyTransactions } = TransactionStore();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    getMyTransactions().catch(() => {}).finally(() => setLoading(false));
  }, [getMyTransactions]);

  const recent = transactions.slice(0, 5);

  return (
    <DashboardLayout>
      <VStack align="stretch" gap={8}>
        <Box>
          <Heading fontFamily="heading" fontSize="2xl" color="ink.900">
            Welcome back, {cut(profile?.full_name)} 👋
          </Heading>
          <Text color="ink.500">Here's what's happening with your account.</Text>
        </Box>

        {/* Balance card */}
        <Box
          bg="ink.950"
          color="white"
          borderRadius="l3"
          p={{ base: 6, md: 8 }}
          position="relative"
          overflow="hidden"
        >
          <Box position="absolute" top="-60px" right="-40px" w="260px" h="260px" bg="brand.500" opacity={0.3} filter="blur(90px)" borderRadius="full" />
          <HStack color="ink.300" gap={2} mb={2} zIndex={1} position="relative">
            <Icon><FaWallet /></Icon>
            <Text fontSize="sm">Powerpay balance</Text>
          </HStack>
          <Heading fontFamily="heading" fontSize={{ base: "4xl", md: "5xl" }} zIndex={1} position="relative">
            {naira(profile?.balance)}
          </Heading>
          <HStack mt={6} gap={3} zIndex={1} position="relative">
            <Button colorPalette="ink" onClick={() => nav("/dashboard/withdraw")}>
              Withdraw
            </Button>
            <Button variant="outline" color="white" borderColor="ink.700" _hover={{ bg: "ink.900" }} onClick={() => nav("/dashboard/sell-crypto")}>
              Sell crypto
            </Button>
          </HStack>
        </Box>

        {/* Quick actions */}
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
          {actions.map((a) => (
            <Box
              key={a.to}
              as="button"
              onClick={() => nav(a.to)}
              bg="white"
              borderRadius="l2"
              boxShadow="0 1px 3px rgba(10,14,36,0.06), 0 1px 2px rgba(10,14,36,0.04)"
              p={5}
              textAlign="left"
              transition="all .2s"
              _hover={{ boxShadow: "0 8px 24px rgba(10,14,36,0.12)", transform: "translateY(-3px)" }}
            >
              <Flex w="48px" h="48px" bg="brand.50" color="brand.500" borderRadius="l1" align="center" justify="center" mb={3} fontSize="lg">
                <Icon>{<a.icon />}</Icon>
              </Flex>
              <Text fontWeight="600" color="ink.900" fontSize="sm">{a.label}</Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Recent transactions */}
        <Box bg="white" borderRadius="l2" boxShadow="0 1px 3px rgba(10,14,36,0.06), 0 1px 2px rgba(10,14,36,0.04)" p={{ base: 5, md: 6 }}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading fontSize="lg" color="ink.900">Recent activity</Heading>
            <Button variant="ghost" size="sm" colorPalette="ink" onClick={() => nav("/dashboard/history")}>
              View all
            </Button>
          </Flex>
          {loading ? (
            <Flex justify="center" py={10}><Spinner color="brand.500" /></Flex>
          ) : recent.length === 0 ? (
            <Text color="ink.400" py={8} textAlign="center">No transactions yet. Start your first trade above.</Text>
          ) : (
            <VStack align="stretch" gap={0} divideY="1px" divideColor="ink.100">
              {recent.map((tx) => {
                const meta = statusMeta(tx.status);
                return (
                  <Flex key={tx.id} justify="space-between" align="center" py={4}>
                    <HStack gap={3}>
                      <Flex w="38px" h="38px" bg="brand.50" color="brand.500" borderRadius="full" align="center" justify="center" flexShrink={0} fontSize="sm">
                        {tx.asset_name?.[0] || "T"}
                      </Flex>
                      <Box>
                        <Text fontWeight="600" color="ink.900" fontSize="sm">
                          {txTypeLabel(tx.type)} • {tx.asset_name}
                        </Text>
                        <Text fontSize="xs" color="ink.400">{formatDate(tx.created_at)}</Text>
                      </Box>
                    </HStack>
                    <HStack gap={3}>
                      <Text fontWeight="700" color="ink.900" fontSize="sm">{naira(tx.payout)}</Text>
                      <Badge colorPalette={meta.palette}>{meta.label}</Badge>
                    </HStack>
                  </Flex>
                );
              })}
            </VStack>
          )}
        </Box>
      </VStack>
    </DashboardLayout>
  );
}

