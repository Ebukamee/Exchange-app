"use client";
import { useState } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const faqItems = [
  {
    q: "How does Paycryptt work?",
    a: "Create an account, choose whether to buy/sell crypto or sell a gift card, and upload proof of your transaction. Our admin team verifies every trade before releasing your funds — so you're always in safe hands.",
  },
  {
    q: "How fast are payouts?",
    a: "Most verified trades are paid out within minutes. Funds go to your Paycryptt balance, which you can withdraw to your bank account any time.",
  },
  {
    q: "Is Paycryptt safe?",
    a: "Yes. Every transaction is manually reviewed, your data is protected, and payouts only happen after your proof is verified.",
  },
  {
    q: "What can I trade?",
    a: "Bitcoin, USDT, Ethereum and other supported coins, plus popular gift cards like Amazon, iTunes, Steam and Google Play. The admin team keeps rates up to date.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Box maxW="820px" mx="auto" px={{ base: 5, md: 8 }} py={{ base: 16, md: 24 }}>
      <Box textAlign="center" mb={10}>
        <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "5xl" }} color="ink.900" letterSpacing="-0.02em">
          Frequently asked questions
        </Heading>
        <Text mt={3} color="ink.500">
          Everything you need to know before your first trade.
        </Text>
      </Box>

      {faqItems.map((item, i) => {
        const active = open === i;
        return (
          <Box
            key={item.q}
            border="1px solid"
            borderColor={active ? "ink.300" : "ink.100"}
            borderRadius="l2"
            mb={4}
            overflow="hidden"
            bg={active ? "ink.50" : "white"}
          >
            <Flex
              align="center"
              justify="space-between"
              p={5}
              cursor="pointer"
              onClick={() => setOpen(active ? -1 : i)}
            >
              <Text fontWeight="700" color="ink.900">
                {item.q}
              </Text>
              <Box color="brand.500">{active ? <FaMinus /> : <FaPlus />}</Box>
            </Flex>
            {active && (
              <Text px={5} pb={5} color="ink.600" fontSize="sm">
                {item.a}
              </Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
