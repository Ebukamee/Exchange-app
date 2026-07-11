"use client";
import { Box, Heading, Text, SimpleGrid, HStack, VStack, Avatar, Icon, Badge, Flex } from "@chakra-ui/react";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";
import ScrollReveal, { staggerDelay } from "./ScrollReveal";

// Cardtonic-style social proof: rated reviews with avatars + source badge.
const reviews = [
  { name: "Chidi O.", source: "Trustpilot", text: "Fastest payout I've used. Sold BTC and got my Naira before I finished my coffee." },
  { name: "Amaka N.", source: "App Store", text: "Sold my Amazon card at a great rate and the team verified it in minutes. Smooth." },
  { name: "Tunde A.", source: "Play Store", text: "Rates are genuinely the best I've found. Buying USDT from my balance is so easy." },
  { name: "Blessing E.", source: "X", text: "Clean app, no stress, real support. Powerpay is now my go-to for gift cards." },
];

export default function Testimonials() {
  return (
    <Box bg="ink.50" borderY="1px solid" borderColor="ink.100" py={{ base: 16, md: 24 }}>
      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }}>
        <ScrollReveal>
          <Box textAlign="center" mb={12}>
            <Text fontSize="sm" color="ink.400" fontWeight="700" letterSpacing="0.1em" mb={2}>
              TRUSTED BY THOUSANDS
            </Text>
            <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "5xl" }} color="ink.900" letterSpacing="-0.02em">
              What our traders say
            </Heading>
            <HStack justify="center" gap={1} mt={3} color="#f59e0b">
              {Array.from({ length: 5 }).map((_, i) => <Icon key={i}><FaStar /></Icon>)}
              <Text ml={2} color="ink.600" fontWeight="600" fontSize="sm">4.9/5 from 3,000+ reviews</Text>
            </HStack>
          </Box>
        </ScrollReveal>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={5}>
          {reviews.map((r, i) => (
            <ScrollReveal key={r.name} delay={staggerDelay(i)}>
            <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={6}>
              <Icon color="ink.200" fontSize="2xl" mb={3}><FaQuoteLeft /></Icon>
              <Text fontSize="sm" color="ink.700" mb={5}>{r.text}</Text>
              <Flex justify="space-between" align="center">
                <HStack gap={3}>
                  <Avatar.Root size="sm" colorPalette="ink"><Avatar.Fallback name={r.name} /></Avatar.Root>
                  <Text fontWeight="700" fontSize="sm" color="ink.900">{r.name}</Text>
                </HStack>
                <Badge colorPalette="gray" fontSize="10px">{r.source}</Badge>
              </Flex>
            </Box>
            </ScrollReveal>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

