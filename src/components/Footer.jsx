"use client";
import { Box, Flex, HStack, VStack, Text, SimpleGrid, Icon } from "@chakra-ui/react";
import { Link } from "@/src/compat/router";
import { FaXTwitter, FaInstagram, FaFacebook, FaWhatsapp, FaShieldHalved } from "react-icons/fa6";
import Logo from "./Logo";

export default function Footer() {
  return (
    <Box bg="ink.950" color="ink.200" mt={20} borderTopRadius={{ base: "l3", md: "40px" }}>
      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} py={16}>
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={10}>
          <VStack align="start" gap={4}>
            <Logo useImage imageHeight={36} />
            <Text fontSize="sm" color="ink.300" maxW="240px">
              The fast, secure way to trade crypto and gift cards for cash in
              Nigeria. Every trade verified before payout.
            </Text>
            <HStack gap={4} pt={2} fontSize="lg">
              <FaXTwitter />
              <FaInstagram />
              <FaFacebook />
              <a href="https://wa.me/8168236123" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </HStack>
          </VStack>

          <FooterCol
            title="Product"
            items={[
              ["Sell Crypto", "/signup"],
              ["Buy Crypto", "/signup"],
              ["Sell Gift Cards", "/signup"],
              ["Rates", "/rates"],
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              ["About", "/about"],
              ["Contact", "/contact"],
            ]}
          />
          <FooterCol
            title="Account"
            items={[
              ["Login", "/login"],
              ["Create account", "/signup"],
            ]}
          />
        </SimpleGrid>

        <HStack mt={12} gap={3} flexWrap="wrap">
          {["NDPR Compliant", "PCI-DSS Secure", "SSL Encrypted"].map((b) => (
            <HStack key={b} bg="ink.900" border="1px solid" borderColor="ink.800" borderRadius="full" px={4} py={2} gap={2}>
              <Icon color="brand.400" fontSize="sm"><FaShieldHalved /></Icon>
              <Text fontSize="xs" color="ink.200" fontWeight="600">{b}</Text>
            </HStack>
          ))}
        </HStack>

        <Flex
          mt={8}
          pt={6}
          borderTop="1px solid"
          borderColor="ink.800"
          justify="space-between"
          direction={{ base: "column", md: "row" }}
          gap={3}
          fontSize="sm"
          color="ink.400"
        >
          <Text>© {new Date().getFullYear()} Powerpay. All rights reserved.</Text>
          <Text>Trade smart. Get paid fast.</Text>
        </Flex>
      </Box>
    </Box>
  );
}

function FooterCol({ title, items }) {
  return (
    <VStack align="start" gap={3}>
      <Text fontWeight="700" color="white" fontSize="sm" letterSpacing="0.06em">
        {title.toUpperCase()}
      </Text>
      {items.map(([label, to]) => (
        <Link key={label} to={to}>
          <Text fontSize="sm" color="ink.300" _hover={{ color: "brand.400" }}>
            {label}
          </Text>
        </Link>
      ))}
    </VStack>
  );
}

