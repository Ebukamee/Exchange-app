"use client";
import { Box, Flex, Heading, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { Link } from "@/src/compat/router";
import { FaCircleCheck } from "react-icons/fa6";
import Logo from "./Logo";
import { PhoneCard, CoinCluster } from "./Art";

// Split-screen auth layout: brand panel on the left, form on the right.
export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <Flex minH="100vh" bg="white">
      {/* Brand panel */}
      <Box
        display={{ base: "none", lg: "flex" }}
        flexDir="column"
        justifyContent="space-between"
        w="42%"
        bg="ink.950"
        color="white"
        p={12}
        position="relative"
        overflow="hidden"
      >
        <Box position="absolute" bottom="-120px" left="-80px" w="420px" h="420px" bg="brand.500" opacity={0.25} filter="blur(120px)" borderRadius="full" />
        {/* illustration: phone mockup peeking from the corner + floating coins */}
        <Box position="absolute" right="-46px" bottom="-70px" transform="rotate(9deg)" opacity={0.95} pointerEvents="none" zIndex={0}>
          <PhoneCard />
        </Box>
        <Box position="absolute" top="90px" right="-10px" w="200px" h="160px" pointerEvents="none" zIndex={0}>
          <CoinCluster tokens={["btc", "eth", "usdt"]} />
        </Box>
        <Link to="/" style={{ position: "relative", zIndex: 1 }}>
          <Logo useImage imageHeight={34} />
        </Link>
        <VStack align="start" gap={6} zIndex={1}>
          <Heading fontFamily="heading" fontSize="4xl" lineHeight="1.1">
            The smart way to trade crypto & gift cards.
          </Heading>
          <VStack align="start" gap={3}>
            {["Best rates in Naira", "Payouts in minutes", "Every trade admin-verified"].map((t) => (
              <HStack key={t} gap={3}>
                <Icon color="brand.400"><FaCircleCheck /></Icon>
                <Text color="ink.200">{t}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
        <Text fontSize="sm" color="ink.400" zIndex={1}>
          © {new Date().getFullYear()} Paycryptt
        </Text>
      </Box>

      {/* Form panel */}
      <Flex flex="1" align="center" justify="center" p={{ base: 6, md: 10 }}>
        <Box w="100%" maxW="420px">
          <Box display={{ base: "block", lg: "none" }} mb={8}>
            <Link to="/">
              <Logo useImage imageHeight={32} />
            </Link>
          </Box>
          <Heading fontFamily="heading" fontSize="3xl" color="ink.900" mb={2}>
            {title}
          </Heading>
          {subtitle && (
            <Text color="ink.500" mb={8}>
              {subtitle}
            </Text>
          )}
          {children}
          {footer && <Box mt={6}>{footer}</Box>}
        </Box>
      </Flex>
    </Flex>
  );
}
