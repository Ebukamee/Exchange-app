"use client";
import { Box, Heading, Text, SimpleGrid, Flex, Icon, HStack, Badge } from "@chakra-ui/react";
import { FaBolt, FaShieldHalved, FaMoneyBillWave, FaCircleCheck } from "react-icons/fa6";

// Apex-style "Get started in minutes" trust row.
const items = [
  { icon: FaBolt, title: "Swift transactions", body: "Trades reviewed and settled in minutes, not hours." },
  { icon: FaShieldHalved, title: "Secure & safe", body: "Every trade is manually verified before any payout." },
  { icon: FaMoneyBillWave, title: "Instant withdrawals", body: "Cash out your balance to your bank whenever you want." },
];

export default function TrustBadges() {
  return (
    <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} py={{ base: 14, md: 20 }}>
      <Box textAlign="center" mb={12}>
        <Text fontSize="sm" color="ink.400" fontWeight="700" letterSpacing="0.1em" mb={2}>
          WHY POWERPAY
        </Text>
        <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "5xl" }} color="ink.900" letterSpacing="-0.02em">
          Get started in minutes
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {items.map((it) => (
          <Box key={it.title} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={7} textAlign="center">
            <Flex w="60px" h="60px" mx="auto" align="center" justify="center" bg="ink.900" color="white" borderRadius="full" mb={4} fontSize="2xl">
              <Icon>{<it.icon />}</Icon>
            </Flex>
            <Heading fontSize="lg" mb={2} color="ink.900">{it.title}</Heading>
            <Text fontSize="sm" color="ink.500">{it.body}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <HStack justify="center" gap={{ base: 4, md: 8 }} mt={10} flexWrap="wrap">
        {["NDPR compliant", "Bank-grade security", "24/7 support"].map((t) => (
          <HStack key={t} gap={2}>
            <Icon color="brand.500"><FaCircleCheck /></Icon>
            <Text fontSize="sm" color="ink.600" fontWeight="600">{t}</Text>
          </HStack>
        ))}
      </HStack>
    </Box>
  );
}

