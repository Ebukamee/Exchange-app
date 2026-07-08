"use client";
import { Box, Heading, Text, SimpleGrid, Flex, HStack, Icon } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaArrowRight, FaBitcoin, FaCartShopping, FaGift, FaMoneyBillWave } from "react-icons/fa6";
import { CoinCluster, GiftCardFan, BankCards } from "./Art";

// Cardtonic / Apex signature: large rounded pastel "solution" cards, each with
// an illustration-style artwork filling the lower-right corner.
const solutions = [
  {
    icon: FaBitcoin,
    title: "Sell Crypto",
    body: "Send BTC, USDT or ETH to our wallet, upload your proof, and get paid in Naira the moment it's verified.",
    bg: "#eef4ff",
    accent: "#3b62d4",
    art: <CoinCluster tokens={["btc", "eth", "usdt", "bnb"]} />,
  },
  {
    icon: FaCartShopping,
    title: "Buy Crypto",
    body: "Pay by bank transfer or straight from your Powerpay balance and receive crypto in your wallet.",
    bg: "#eafaf1",
    accent: "#1f9d57",
    art: <CoinCluster tokens={["sol", "eth", "ltc", "doge"]} />,
  },
  {
    icon: FaGift,
    title: "Sell Gift Cards",
    body: "Amazon, iTunes, Steam, Google Play and more — trade your cards for cash at the best rates around.",
    bg: "#fdeff0",
    accent: "#ef2b3a",
    art: <GiftCardFan />,
  },
  {
    icon: FaMoneyBillWave,
    title: "Withdraw Anytime",
    body: "Cash out your Powerpay balance to your bank account whenever you want. Fast, simple, no stress.",
    bg: "#f3eefe",
    accent: "#7a4de0",
    art: <BankCards />,
  },
];

export default function FeaturesSection() {
  const nav = useNavigate();
  return (
    <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} py={{ base: 16, md: 24 }}>
      <Box mb={12}>
        <Heading
          fontFamily="heading"
          fontWeight="800"
          fontSize={{ base: "4xl", md: "6xl" }}
          lineHeight="1"
          letterSpacing="-0.03em"
          color="ink.200"
        >
          One platform,
          <br />
          <Text as="span" color="ink.900">endless possibilities</Text>
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 5, md: 7 }}>
        {solutions.map((s) => (
          <Box
            key={s.title}
            bg={s.bg}
            borderRadius="l3"
            p={{ base: 7, md: 10 }}
            minH={{ base: "300px", md: "320px" }}
            position="relative"
            overflow="hidden"
            transition="transform .2s"
            _hover={{ transform: "translateY(-4px)" }}
          >
            <Box position="relative" zIndex={1} maxW={{ md: "62%" }}>
              <Flex w="56px" h="56px" align="center" justify="center" borderRadius="l2" bg="white" color={s.accent} fontSize="2xl" mb={5} boxShadow="0 8px 20px -10px rgba(0,0,0,0.2)">
                <Icon>{<s.icon />}</Icon>
              </Flex>
              <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "2xl", md: "3xl" }} color="ink.900" mb={3} letterSpacing="-0.02em">
                {s.title}
              </Heading>
              <Text color="ink.600" mb={6}>{s.body}</Text>
              <HStack
                as="button"
                onClick={() => nav("/signup")}
                gap={2}
                color={s.accent}
                fontWeight="700"
                fontSize="sm"
                _hover={{ gap: 3 }}
                transition="gap .15s"
              >
                <Text>Start now</Text>
                <FaArrowRight />
              </HStack>
            </Box>
            {s.art}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

