"use client";
import { useState } from "react";
import { Box, Flex, HStack, VStack, Button, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "@/src/compat/router";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/rates", label: "Rates" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="20"
      bg="rgba(255,255,255,0.85)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="ink.100"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 5, md: 8 }}
        py={4}
        justify="space-between"
        align="center"
      >
        <Link to="/">
          <Logo useImage imageHeight={36} size={30} textColor="ink.900" />
        </Link>

        <HStack gap={8} display={{ base: "none", md: "flex" }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              <Text fontWeight="500" color="ink.600" _hover={{ color: "brand.500" }}>
                {l.label}
              </Text>
            </Link>
          ))}
        </HStack>

        <HStack gap={3} display={{ base: "none", md: "flex" }}>
          <Button variant="ghost" color="ink.800" fontWeight="600" onClick={() => nav("/login")}>
            Login
          </Button>
          <Button colorPalette="ink" rounded="full" px={7} fontWeight="700" onClick={() => nav("/signup")}>
            Get started
          </Button>
        </HStack>

        <Box
          display={{ base: "block", md: "none" }}
          onClick={() => setOpen(!open)}
          cursor="pointer"
        >
          {open ? <FaTimes size="1.4em" /> : <FaBars size="1.4em" />}
        </Box>
      </Flex>

      {open && (
        <Box display={{ base: "block", md: "none" }} px={5} pb={5}>
          <VStack align="stretch" gap={3}>
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}>
                <Text py={2} fontWeight="500" color="ink.700">
                  {l.label}
                </Text>
              </Link>
            ))}
            <Button variant="outline" colorPalette="ink" rounded="full" onClick={() => nav("/login")}>
              Login
            </Button>
            <Button colorPalette="ink" rounded="full" onClick={() => nav("/signup")}>
              Get started
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
}

