"use client";
import { useEffect, useState } from "react";
import { Box, Flex, Heading, Text, SimpleGrid, HStack, VStack, Icon, Button, Badge, Spinner } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaArrowTrendUp, FaCartShopping, FaGift, FaMoneyBillTransfer, FaWallet, FaArrowRight, FaUsers } from "react-icons/fa6";
import ScrollReveal, { staggerDelay } from "../components/ScrollReveal";
import DashboardLayout from "../components/DashboardLayout";
import useAuthStore from "../Store/userStore";
import TransactionStore from "../Store/TransactionStore";
import { naira, cut, formatDate, statusMeta, txTypeLabel } from "../Helper";

const actions = [
  { to: "/dashboard/sell-crypto", label: "Sell Crypto", icon: FaArrowTrendUp, gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", iconBg: "rgba(249,115,22,0.15)", iconColor: "#f97316" },
  { to: "/dashboard/buy-crypto", label: "Buy Crypto", icon: FaCartShopping, gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", iconBg: "rgba(139,92,246,0.15)", iconColor: "#8b5cf6" },
  { to: "/dashboard/sell-giftcard", label: "Sell Gift Card", icon: FaGift, gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", iconBg: "rgba(6,182,212,0.15)", iconColor: "#06b6d4" },
  { to: "/dashboard/withdraw", label: "Withdraw", icon: FaMoneyBillTransfer, gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)", iconBg: "rgba(16,185,129,0.15)", iconColor: "#10b981" },
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
      <VStack align="stretch" gap={6}>
        {/* Welcome + Balance */}
        <ScrollReveal>
          <Box
            style={{ background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)" }}
            borderRadius="2xl"
            p={{ base: 6, md: 8 }}
            position="relative"
            overflow="hidden"
            color="white"
          >
            {/* Decorative circles */}
            <Box position="absolute" top="-60px" right="-40px" w="200px" h="200px" bg="white" opacity={0.06} borderRadius="full" />
            <Box position="absolute" bottom="-30px" right="80px" w="120px" h="120px" bg="white" opacity={0.04} borderRadius="full" />
            <Box position="absolute" top="20px" right="160px" w="60px" h="60px" bg="white" opacity={0.05} borderRadius="full" />

            <Box position="relative" zIndex={1}>
              <Text fontSize="sm" color="rgba(255,255,255,0.7)" fontWeight="500" mb={1}>
                Welcome back,
              </Text>
              <Heading fontFamily="heading" fontSize={{ base: "xl", md: "2xl" }} mb={4}>
                {cut(profile?.full_name)} 👋
              </Heading>

              <HStack color="rgba(255,255,255,0.7)" gap={2} mb={1}>
                <Icon fontSize="sm"><FaWallet /></Icon>
                <Text fontSize="xs" fontWeight="600" letterSpacing="0.05em">POWERPAY BALANCE</Text>
              </HStack>
              <Heading fontFamily="heading" fontSize={{ base: "3xl", md: "4xl" }} letterSpacing="-0.02em">
                {naira(profile?.balance)}
              </Heading>

              <HStack mt={5} gap={3}>
                <Button size="sm" bg="white" color="#dc2626" fontWeight="700" _hover={{ bg: "rgba(255,255,255,0.9)" }} onClick={() => nav("/dashboard/withdraw")}>
                  Withdraw
                </Button>
                <Button size="sm" variant="outline" borderColor="rgba(255,255,255,0.3)" color="white" _hover={{ bg: "rgba(255,255,255,0.1)" }} onClick={() => nav("/dashboard/sell-crypto")}>
                  Sell crypto
                </Button>
              </HStack>
            </Box>
          </Box>
        </ScrollReveal>

        {/* Quick actions */}
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
          {actions.map((a, i) => (
            <ScrollReveal key={a.to} delay={staggerDelay(i)}>
              <Box
                as="button"
                onClick={() => nav(a.to)}
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="ink.100"
                p={5}
                textAlign="left"
                transition="all .25s"
                w="100%"
                _hover={{ borderColor: "transparent", transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  top="-20px"
                  right="-20px"
                  w="70px"
                  h="70px"
                  bg={a.iconBg}
                  borderRadius="full"
                  opacity={0.5}
                />
                <Flex
                  w="48px"
                  h="48px"
                  bg={a.iconBg}
                  color={a.iconColor}
                  borderRadius="xl"
                  align="center"
                  justify="center"
                  mb={3}
                  position="relative"
                >
                  <Icon fontSize="lg"><a.icon /></Icon>
                </Flex>
                <Text fontWeight="700" color="ink.900" fontSize="sm">{a.label}</Text>
                <Icon color="ink.300" fontSize="xs" mt={1}><FaArrowRight /></Icon>
              </Box>
            </ScrollReveal>
          ))}
        </SimpleGrid>

        {/* Referral banner */}
        {profile?.referral_code && (
          <ScrollReveal delay={0.15}>
            <Box
              as="button"
              onClick={() => nav("/dashboard/referral")}
              w="100%"
              textAlign="left"
              style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #d946ef 100%)" }}
              borderRadius="xl"
              p={{ base: 5, md: 6 }}
              position="relative"
              overflow="hidden"
              transition="all .25s"
              _hover={{ transform: "translateY(-2px)", boxShadow: "0 12px 32px rgba(139,92,246,0.3)" }}
            >
              <Box position="absolute" top="-30px" right="-10px" opacity={0.1}>
                <Icon fontSize="120px" color="white"><FaUsers /></Icon>
              </Box>
              <Box position="relative" zIndex={1}>
                <HStack gap={3} align="center">
                  <Flex w="44px" h="44px" bg="rgba(255,255,255,0.2)" borderRadius="xl" align="center" justify="center">
                    <Icon color="white" fontSize="lg"><FaGift /></Icon>
                  </Flex>
                  <Box flex="1">
                    <Text fontWeight="800" color="white" fontSize="md">Refer & Earn!</Text>
                    <Text fontSize="xs" color="rgba(255,255,255,0.8)">Invite friends and earn rewards when they trade</Text>
                  </Box>
                  <Icon color="white"><FaArrowRight /></Icon>
                </HStack>
              </Box>
            </Box>
          </ScrollReveal>
        )}

        {/* Recent transactions */}
        <ScrollReveal delay={0.2}>
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="ink.100" p={{ base: 5, md: 6 }}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading fontSize="lg" color="ink.900" fontFamily="heading">Recent activity</Heading>
              <Button variant="ghost" size="sm" colorPalette="brand" onClick={() => nav("/dashboard/history")}>
                View all
              </Button>
            </Flex>
            {loading ? (
              <Flex justify="center" py={10}><Spinner color="brand.500" /></Flex>
            ) : recent.length === 0 ? (
              <Flex direction="column" align="center" py={10} gap={3}>
                <Flex w="56px" h="56px" bg="ink.50" borderRadius="full" align="center" justify="center">
                  <Icon color="ink.300" fontSize="xl"><FaArrowTrendUp /></Icon>
                </Flex>
                <Text color="ink.400" textAlign="center" fontSize="sm">No transactions yet. Start your first trade above.</Text>
              </Flex>
            ) : (
              <VStack align="stretch" gap={0} divideY="1px" divideColor="ink.100">
                {recent.map((tx) => {
                  const meta = statusMeta(tx.status);
                  return (
                    <Flex key={tx.id} justify="space-between" align="center" py={3}>
                      <HStack gap={3}>
                        <Flex
                          w="38px"
                          h="38px"
                          bg={meta.palette === "green" ? "rgba(16,185,129,0.1)" : meta.palette === "red" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)"}
                          borderRadius="lg"
                          align="center"
                          justify="center"
                        >
                          <Icon
                            fontSize="sm"
                            color={meta.palette === "green" ? "#10b981" : meta.palette === "red" ? "#ef4444" : "#f59e0b"}
                          >
                            {tx.type?.includes("gift") ? <FaGift /> : tx.type?.includes("buy") ? <FaCartShopping /> : <FaArrowTrendUp />}
                          </Icon>
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
        </ScrollReveal>
      </VStack>
    </DashboardLayout>
  );
}
