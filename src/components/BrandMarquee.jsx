"use client";
import { Box, Heading, Text, Flex, HStack, Icon } from "@chakra-ui/react";
import {
  SiAmazon, SiApple, SiSteam, SiPlaystation, SiNetflix, SiSpotify, SiAdidas,
  SiNike, SiEbay, SiWalmart, SiGoogleplay, SiRoblox, SiAirbnb, SiNintendo,
  SiUber, SiTarget, SiVisa, SiMastercard, SiAmericanexpress, SiItunes,
} from "react-icons/si";

// Gift-card brands with their signature colours (Cardtonic-style logo wall).
const rowA = [
  { icon: SiAmazon, name: "Amazon", color: "#FF9900" },
  { icon: SiApple, name: "Apple", color: "#111111" },
  { icon: SiSteam, name: "Steam", color: "#1b2838" },
  { icon: SiPlaystation, name: "PlayStation", color: "#003791" },
  { icon: SiNetflix, name: "Netflix", color: "#E50914" },
  { icon: SiSpotify, name: "Spotify", color: "#1DB954" },
  { icon: SiGoogleplay, name: "Google Play", color: "#00A0FF" },
  { icon: SiItunes, name: "iTunes", color: "#EA4CC0" },
  { icon: SiRoblox, name: "Roblox", color: "#111111" },
  { icon: SiNintendo, name: "Nintendo", color: "#E60012" },
];

const rowB = [
  { icon: SiEbay, name: "eBay", color: "#E53238" },
  { icon: SiWalmart, name: "Walmart", color: "#0071CE" },
  { icon: SiNike, name: "Nike", color: "#111111" },
  { icon: SiAdidas, name: "Adidas", color: "#111111" },
  { icon: SiAirbnb, name: "Airbnb", color: "#FF5A5F" },
  { icon: SiUber, name: "Uber", color: "#111111" },
  { icon: SiTarget, name: "Target", color: "#CC0000" },
  { icon: SiVisa, name: "Visa", color: "#1A1F71" },
  { icon: SiMastercard, name: "Mastercard", color: "#EB4B1F" },
  { icon: SiAmericanexpress, name: "Amex", color: "#2E77BC" },
];

function Chip({ icon, name, color }) {
  return (
    <HStack
      gap={2.5}
      bg="white"
      border="1px solid"
      borderColor="ink.100"
      borderRadius="full"
      px={5}
      py={3}
      boxShadow="0 6px 20px -12px rgba(10,14,36,0.35)"
      flexShrink={0}
    >
      <Icon fontSize="xl" color={color}>{<icon />}</Icon>
      <Text fontWeight="700" fontSize="sm" color="ink.800" whiteSpace="nowrap">{name}</Text>
    </HStack>
  );
}

function Row({ items, dir }) {
  const doubled = [...items, ...items];
  return (
    <Box
      className="marquee-mask"
      overflow="hidden"
      css={{
        maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <Box className={`marquee-track marquee-${dir}`}>
        {doubled.map((b, i) => (
          <Chip key={`${b.name}-${i}`} {...b} />
        ))}
      </Box>
    </Box>
  );
}

export default function BrandMarquee() {
  return (
    <Box bg="ink.50" borderY="1px solid" borderColor="ink.100" py={{ base: 14, md: 20 }} overflow="hidden">
      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} textAlign="center" mb={10}>
        <Text fontSize="sm" color="ink.400" fontWeight="700" letterSpacing="0.1em" mb={2}>
          100+ CARDS SUPPORTED
        </Text>
        <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "5xl" }} color="ink.900" letterSpacing="-0.02em">
          Trade all your favourite gift cards
        </Heading>
      </Box>
      <Flex direction="column" gap={4}>
        <Row items={rowA} dir="left" />
        <Row items={rowB} dir="right" />
      </Flex>
    </Box>
  );
}
