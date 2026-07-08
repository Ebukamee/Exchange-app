"use client";
import { Box, Flex, HStack, VStack, Text, Icon, Button } from "@chakra-ui/react";
import { NavLink, useNavigate, useLocation } from "@/src/compat/router";
import {
  FaHouse,
  FaArrowTrendUp,
  FaCartShopping,
  FaGift,
  FaMoneyBillTransfer,
  FaClockRotateLeft,
  FaUser,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import Logo from "./Logo";
import useAuthStore from "../Store/userStore";
import { naira } from "../Helper";

const nav = [
  { to: "/dashboard", label: "Overview", icon: FaHouse, end: true },
  { to: "/dashboard/sell-crypto", label: "Sell Crypto", icon: FaArrowTrendUp },
  { to: "/dashboard/buy-crypto", label: "Buy Crypto", icon: FaCartShopping },
  { to: "/dashboard/sell-giftcard", label: "Sell Gift Card", icon: FaGift },
  { to: "/dashboard/withdraw", label: "Withdraw", icon: FaMoneyBillTransfer },
  { to: "/dashboard/history", label: "History", icon: FaClockRotateLeft },
  { to: "/dashboard/profile", label: "Profile", icon: FaUser },
];

export default function DashboardLayout({ children }) {
  const { profile, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Flex minH="100vh" bg="ink.50">
      {/* Sidebar (desktop) */}
      <Box
        as="aside"
        display={{ base: "none", md: "flex" }}
        flexDir="column"
        w="260px"
        bg="ink.950"
        color="white"
        position="sticky"
        top="0"
        h="100vh"
        p={6}
      >
        <Box mb={10}>
          <Logo useImage imageHeight={30} />
        </Box>
        <VStack align="stretch" gap={1} flex="1">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <HStack
                  px={4}
                  py={3}
                  borderRadius="l1"
                  gap={3}
                  bg={isActive ? "brand.500" : "transparent"}
                  color={isActive ? "white" : "ink.300"}
                  _hover={{ bg: isActive ? "brand.500" : "ink.900", color: "white" }}
                >
                  <Icon>{<item.icon />}</Icon>
                  <Text fontWeight="500" fontSize="sm">{item.label}</Text>
                </HStack>
              )}
            </NavLink>
          ))}
        </VStack>
        <Button variant="ghost" color="ink.300" justifyContent="start" onClick={signOut} _hover={{ color: "white", bg: "ink.900" }}>
          <Icon><FaArrowRightFromBracket /></Icon> Logout
        </Button>
      </Box>

      {/* Main */}
      <Flex direction="column" flex="1" minW="0">
        <Flex
          as="header"
          justify="space-between"
          align="center"
          bg="white"
          borderBottom="1px solid"
          borderColor="ink.100"
          px={{ base: 5, md: 8 }}
          py={4}
          position="sticky"
          top="0"
          zIndex="10"
        >
          <Box display={{ base: "block", md: "none" }}>
            <Logo useImage imageHeight={26} />
          </Box>
          <Text display={{ base: "none", md: "block" }} fontWeight="700" color="ink.900" fontFamily="heading">
            {nav.find((n) => (n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)))?.label || "Dashboard"}
          </Text>
          <HStack
            bg="brand.50"
            color="brand.700"
            px={4}
            py={2}
            borderRadius="full"
            gap={2}
          >
            <Text fontSize="xs" fontWeight="600" color="brand.500">BALANCE</Text>
            <Text fontWeight="800">{naira(profile?.balance)}</Text>
          </HStack>
        </Flex>

        <Box flex="1" p={{ base: 4, md: 8 }} pb={{ base: 24, md: 8 }}>
          {children}
        </Box>
      </Flex>

      {/* Bottom nav (mobile) */}
      <Flex
        display={{ base: "flex", md: "none" }}
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        borderTop="1px solid"
        borderColor="ink.100"
        justify="space-around"
        py={2}
        zIndex="20"
      >
        {nav.filter((n) => n.to !== "/dashboard/profile").slice(0, 5).map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {({ isActive }) => (
              <VStack gap={0.5} color={isActive ? "brand.500" : "ink.400"} px={2}>
                <Icon fontSize="lg">{<item.icon />}</Icon>
                <Text fontSize="9px">{item.label.split(" ")[0]}</Text>
              </VStack>
            )}
          </NavLink>
        ))}
      </Flex>
    </Flex>
  );
}

