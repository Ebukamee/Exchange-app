"use client";
import { Box, Flex, Heading, Text, SimpleGrid, HStack, Icon } from "@chakra-ui/react";
import { FaCircleCheck } from "react-icons/fa6";

const reasons = [
  "Best rates in Naira",
  "Fast, verified payouts",
  "Bank-grade security",
  "Wide crypto & card variety",
  "Real human support",
  "No hidden charges",
];

const steps = [
  { n: "1", title: "Create an account", body: "Sign up and add your wallet and bank details in minutes." },
  { n: "2", title: "Start a trade", body: "Pick sell/buy crypto or sell a gift card, then upload your proof." },
  { n: "3", title: "Get verified & paid", body: "Our team reviews every trade and releases your funds fast." },
];

export default function Other() {
  return (
    <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }}>
      {/* How it works */}
      <Box textAlign="center" mb={12}>
        <Text fontSize="sm" color="ink.400" fontWeight="700" letterSpacing="0.1em" mb={2}>
          HOW IT WORKS
        </Text>
        <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "5xl" }} color="ink.900" letterSpacing="-0.02em">
          Trade in three simple steps
        </Heading>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={20}>
        {steps.map((s) => (
          <Box key={s.n} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={7}>
            <Flex
              w="44px"
              h="44px"
              align="center"
              justify="center"
              bg="ink.950"
              color="white"
              borderRadius="full"
              fontWeight="800"
              fontFamily="heading"
              mb={4}
            >
              {s.n}
            </Flex>
            <Heading fontSize="lg" mb={2} color="ink.900">
              {s.title}
            </Heading>
            <Text fontSize="sm" color="ink.500">
              {s.body}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Why us */}
      <Box bg="ink.950" borderRadius="l3" p={{ base: 8, md: 12 }} color="white">
        <Flex direction={{ base: "column", md: "row" }} gap={10} align="center">
          <Box flex="1">
            <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "5xl" }} mb={3} letterSpacing="-0.02em">
              Why traders choose Powerpay
            </Heading>
            <Text color="ink.300" maxW="440px">
              We built Powerpay to make trading crypto and gift cards effortless,
              transparent and safe — with real rates and payouts you can count on.
            </Text>
          </Box>
          <SimpleGrid flex="1" columns={{ base: 1, sm: 2 }} gap={4} w="100%">
            {reasons.map((r) => (
              <HStack key={r} gap={3}>
                <Icon color="brand.400"><FaCircleCheck /></Icon>
                <Text color="ink.100">{r}</Text>
              </HStack>
            ))}
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  );
}

