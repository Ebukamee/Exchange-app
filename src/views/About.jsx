"use client";
import { Box, Heading, Text, VStack, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import { FaBullseye, FaHandshake, FaLock } from "react-icons/fa6";
import Nav from "../components/nav";
import Footer from "../components/Footer";

const values = [
  { icon: FaBullseye, title: "Best rates", body: "We constantly track the market so you always get top value for your crypto and gift cards." },
  { icon: FaHandshake, title: "People first", body: "Real human support and a dead-simple experience, whether it's your first trade or your thousandth." },
  { icon: FaLock, title: "Security by design", body: "Every trade is manually verified before payout. Your funds and data are always protected." },
];

export default function About() {
  return (
    <Box bg="white">
      <Nav />

      <Box maxW="900px" mx="auto" px={{ base: 5, md: 8 }} pt={16} pb={8} textAlign="center">
        <Text fontSize="sm" color="ink.400" fontWeight="700" letterSpacing="0.1em" mb={3}>
          ABOUT POWERPAY
        </Text>
        <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "6xl" }} color="ink.900" letterSpacing="-0.03em">
          Trading crypto & gift cards, made simple
        </Heading>
        <Text mt={5} fontSize="lg" color="ink.500">
          Powerpay is a platform where people in Nigeria can buy and sell
          cryptocurrency and gift cards with confidence. Every transaction is
          reviewed by our team before money or crypto changes hands — keeping
          your trades safe and your payouts fast.
        </Text>
      </Box>

      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} py={12}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          {values.map((v) => (
            <Box key={v.title} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={7}>
              <Flex w="52px" h="52px" align="center" justify="center" bg="ink.900" color="white" borderRadius="l1" mb={4} fontSize="xl">
                <Icon>{<v.icon />}</Icon>
              </Flex>
              <Heading fontSize="lg" mb={2} color="ink.900">{v.title}</Heading>
              <Text fontSize="sm" color="ink.500">{v.body}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box maxW="900px" mx="auto" px={{ base: 5, md: 8 }} py={8}>
        <VStack align="start" gap={4} bg="ink.50" borderRadius="l3" p={{ base: 8, md: 10 }}>
          <Heading fontSize="2xl" color="ink.900">Our mission</Heading>
          <Text color="ink.600">
            We believe trading digital value should be effortless, transparent
            and fair. That's why we built Powerpay — to give everyone a clean,
            reliable way to convert crypto and gift cards to cash, at rates that
            actually make sense, with payouts you can trust.
          </Text>
        </VStack>
      </Box>

      <Footer />
    </Box>
  );
}

