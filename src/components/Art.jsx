"use client";
import { Box, Flex, Icon } from "@chakra-ui/react";
import {
  SiBitcoin, SiEthereum, SiTether, SiBinance, SiSolana, SiLitecoin, SiDogecoin,
  SiAmazon, SiApple, SiSteam, SiPlaystation, SiVisa, SiMastercard, SiNetflix,
} from "react-icons/si";

// Decorative, illustration-style artwork that fills the lower-right of the
// colourful solution cards — in the spirit of Cardtonic / Apex imagery.

const COINS = {
  btc: { icon: SiBitcoin, color: "#F7931A" },
  eth: { icon: SiEthereum, color: "#627EEA" },
  usdt: { icon: SiTether, color: "#26A17B" },
  bnb: { icon: SiBinance, color: "#F0B90B" },
  sol: { icon: SiSolana, color: "#9945FF" },
  ltc: { icon: SiLitecoin, color: "#345D9D" },
  doge: { icon: SiDogecoin, color: "#C2A633" },
};

function Coin({ token, size, ...pos }) {
  const c = COINS[token];
  return (
    <Flex
      position="absolute"
      w={size}
      h={size}
      align="center"
      justify="center"
      borderRadius="full"
      bg="white"
      color={c.color}
      boxShadow="0 14px 30px -12px rgba(10,14,36,0.45)"
      fontSize={`calc(${size} * 0.52)`}
      {...pos}
    >
      <Icon>{<c.icon />}</Icon>
    </Flex>
  );
}

export function CoinCluster({ tokens }) {
  // Big overlapping coins piled in the corner.
  const layout = [
    { size: "96px", right: "20px", bottom: "-10px" },
    { size: "70px", right: "96px", bottom: "24px" },
    { size: "58px", right: "10px", bottom: "82px" },
    { size: "46px", right: "120px", bottom: "-16px" },
  ];
  return (
    <Box position="absolute" right="0" bottom="0" w="240px" h="200px" pointerEvents="none">
      <Sparkle top="18px" right="150px" />
      <Sparkle top="70px" right="30px" />
      {tokens.map((t, i) => layout[i] && <Coin key={t} token={t} {...layout[i]} />)}
    </Box>
  );
}

function GiftCard({ grad, icon, color, rotate, ...pos }) {
  return (
    <Box
      position="absolute"
      w="168px"
      h="104px"
      borderRadius="16px"
      p="12px"
      transform={`rotate(${rotate}deg)`}
      boxShadow="0 20px 40px -18px rgba(10,14,36,0.5)"
      style={{ backgroundImage: grad }}
      {...pos}
    >
      <Flex w="34px" h="34px" align="center" justify="center" borderRadius="9px" bg="whiteAlpha.300" color={color} fontSize="lg">
        <Icon>{<icon />}</Icon>
      </Flex>
      <Box mt="16px" w="70%" h="7px" borderRadius="full" bg="whiteAlpha.500" />
      <Box mt="8px" w="45%" h="7px" borderRadius="full" bg="whiteAlpha.400" />
    </Box>
  );
}

export function GiftCardFan() {
  return (
    <Box position="absolute" right="-6px" bottom="-14px" w="260px" h="200px" pointerEvents="none">
      <Sparkle top="10px" right="200px" />
      <GiftCard grad="linear-gradient(135deg,#7a4de0,#b78bff)" icon={SiPlaystation} color="white" rotate={-14} right="86px" bottom="30px" />
      <GiftCard grad="linear-gradient(135deg,#111827,#374151)" icon={SiSteam} color="white" rotate={-2} right="40px" bottom="4px" />
      <GiftCard grad="linear-gradient(135deg,#ff9900,#ffb84d)" icon={SiAmazon} color="#111" rotate={12} right="-14px" bottom="-24px" />
    </Box>
  );
}

export function BankCards() {
  return (
    <Box position="absolute" right="0" bottom="-10px" w="240px" h="190px" pointerEvents="none">
      <Sparkle top="20px" right="150px" />
      <GiftCard grad="linear-gradient(135deg,#1a1f71,#3b62d4)" icon={SiVisa} color="white" rotate={-10} right="70px" bottom="34px" />
      <GiftCard grad="linear-gradient(135deg,#c0392b,#eb4b1f)" icon={SiMastercard} color="white" rotate={8} right="-16px" bottom="-18px" />
    </Box>
  );
}

// Small four-point sparkle used to fill negative space (Apex style).
function Sparkle({ size = "20px", ...pos }) {
  return (
    <Box position="absolute" w={size} h={size} opacity={0.7} {...pos}>
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <path d="M12 0c.6 6 5.4 10.8 12 12-6.6 1.2-11.4 6-12 12-.6-6-5.4-10.8-12-12C6.6 10.8 11.4 6 12 0Z" fill="#ffffff" fillOpacity="0.8" />
      </svg>
    </Box>
  );
}

// A small stylised phone card used on dark panels (Apex style).
export function PhoneCard() {
  return (
    <Box
      w="180px"
      h="360px"
      borderRadius="28px"
      bg="ink.900"
      border="6px solid"
      borderColor="ink.800"
      p="14px"
      boxShadow="0 40px 80px -30px rgba(0,0,0,0.6)"
      position="relative"
      overflow="hidden"
    >
      <Box w="60px" h="6px" bg="ink.700" borderRadius="full" mx="auto" mb="14px" />
      <Box bg="ink.800" borderRadius="16px" p="14px" mb="12px">
        <Box w="50%" h="8px" bg="ink.600" borderRadius="full" mb="10px" />
        <Box w="80%" h="16px" bg="whiteAlpha.800" borderRadius="full" />
      </Box>
      {[["#F7931A", SiBitcoin], ["#26A17B", SiTether], ["#627EEA", SiEthereum], ["#E50914", SiNetflix]].map(([color, I], i) => (
        <Flex key={i} align="center" gap="10px" bg="ink.800" borderRadius="12px" p="9px" mb="9px">
          <Flex w="28px" h="28px" align="center" justify="center" borderRadius="full" bg="white" color={color}>
            <Icon fontSize="sm">{<I />}</Icon>
          </Flex>
          <Box flex="1">
            <Box w="60%" h="6px" bg="ink.600" borderRadius="full" mb="6px" />
            <Box w="40%" h="6px" bg="ink.700" borderRadius="full" />
          </Box>
        </Flex>
      ))}
    </Box>
  );
}

