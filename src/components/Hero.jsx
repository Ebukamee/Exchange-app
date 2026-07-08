"use client";
import { Box, Flex, Heading, Text, Button, HStack, Stack, SimpleGrid, Icon } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaArrowRight, FaBitcoin, FaEthereum } from "react-icons/fa6";
import { SiTether, SiBitcoin } from "react-icons/si";

function FloatBadge({ children, color, ...pos }) {
  return (
    <Flex
      position="absolute"
      zIndex={2}
      w={{ base: "44px", md: "56px" }}
      h={{ base: "44px", md: "56px" }}
      align="center"
      justify="center"
      bg="white"
      borderRadius="full"
      boxShadow="0 16px 34px -14px rgba(10,14,36,0.45)"
      color={color}
      fontSize={{ base: "xl", md: "2xl" }}
      display={{ base: "none", sm: "flex" }}
      {...pos}
    >
      <Icon>{children}</Icon>
    </Flex>
  );
}

export default function Hero() {
  const nav = useNavigate();
  return (
    <Box position="relative" overflow="hidden">
      {/* soft neutral glows (Cardtonic-style), red used only faintly */}
      <Box position="absolute" top="-140px" left="-100px" w="460px" h="460px" bg="ink.200" opacity={0.5} filter="blur(130px)" borderRadius="full" />
      <Box position="absolute" top="-100px" right="-60px" w="420px" h="420px" bg="brand.200" opacity={0.35} filter="blur(140px)" borderRadius="full" />

      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} pt={{ base: 12, md: 20 }} pb={12} position="relative">
        <Flex direction={{ base: "column", lg: "row" }} align="center" gap={14}>
          <Box flex="1">
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="800"
              fontSize={{ base: "5xl", md: "7xl" }}
              lineHeight="0.98"
              letterSpacing="-0.03em"
              color="ink.900"
            >
              Trade crypto & gift cards in{" "}
              <Text as="span" color="brand.500">another dimension</Text>
            </Heading>
            <Text mt={6} fontSize={{ base: "md", md: "lg" }} color="ink.500" maxW="500px">
              Simplify your money: buy, sell and swap Bitcoin, USDT and top gift
              cards for cash — at the best rates, with every trade verified.
            </Text>

            <Stack direction={{ base: "column", sm: "row" }} mt={9} gap={4}>
              <Button size="xl" colorPalette="ink" rounded="full" px={8} fontWeight="700" onClick={() => nav("/signup")}>
                Open an account <FaArrowRight />
              </Button>
              <Button size="xl" variant="outline" colorPalette="ink" rounded="full" px={8} fontWeight="700" onClick={() => nav("/rates")}>
                View rates
              </Button>
            </Stack>

            {/* Supports: coin row (Apex) */}
            <Box mt={10}>
              <Text fontSize="sm" fontWeight="700" color="ink.700" mb={3}>Supports:</Text>
              <HStack gap={5} color="ink.500">
                <Icon fontSize="2xl" color="brand.500"><FaBitcoin /></Icon>
                <Icon fontSize="2xl" color="ink.400"><SiTether /></Icon>
                <Icon fontSize="2xl" color="ink.400"><FaEthereum /></Icon>
                <Flex bg="ink.900" color="white" borderRadius="full" px={3} py={1} fontSize="xs" fontWeight="700">20+</Flex>
              </HStack>
            </Box>
          </Box>

          {/* estimate card */}
          <Box flex="1" w="100%" maxW="440px" position="relative">
            <FloatBadge top="-24px" left="-18px" color="#F7931A"><SiBitcoin /></FloatBadge>
            <FloatBadge top="40%" right="-26px" color="#26A17B"><SiTether /></FloatBadge>
            <FloatBadge bottom="-20px" left="10%" color="#627EEA"><FaEthereum /></FloatBadge>
            <Box bg="white" borderRadius="l3" border="1px solid" borderColor="ink.100" boxShadow="0 40px 80px -30px rgba(10,14,36,0.25)" p={6}>
              <Flex justify="space-between" align="center" mb={5}>
                <Text fontWeight="700" color="ink.900" fontFamily="heading">Quick estimate</Text>
                <Text fontSize="sm" color="brand.500" fontWeight="700">Live rates</Text>
              </Flex>
              <Stack gap={3}>
                <RateRow asset="Bitcoin (BTC)" price="₦1,650 / $" />
                <RateRow asset="USDT (TRC20)" price="₦1,610 / $" />
                <RateRow asset="Amazon Gift Card" price="₦1,150 / $" />
                <RateRow asset="Steam Gift Card" price="₦1,080 / $" />
              </Stack>
              <Button mt={6} w="100%" colorPalette="ink" rounded="full" fontWeight="700" onClick={() => nav("/signup")}>
                Trade now
              </Button>
            </Box>
          </Box>
        </Flex>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={6} mt={20}>
          <Stat value="₦2.5B+" label="Traded volume" />
          <Stat value="18k+" label="Happy traders" />
          <Stat value="< 10 min" label="Avg. payout" />
          <Stat value="24/7" label="Support" />
        </SimpleGrid>
      </Box>
    </Box>
  );
}

function RateRow({ asset, price }) {
  return (
    <Flex justify="space-between" align="center" bg="ink.50" borderRadius="l1" px={4} py={3}>
      <Text fontWeight="600" color="ink.800" fontSize="sm">{asset}</Text>
      <Text fontWeight="700" color="ink.900" fontSize="sm">{price}</Text>
    </Flex>
  );
}

function Stat({ value, label }) {
  return (
    <Box textAlign="center">
      <Text fontFamily="heading" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" color="ink.900" letterSpacing="-0.02em">
        {value}
      </Text>
      <Text fontSize="sm" color="ink.500">{label}</Text>
    </Box>
  );
}

