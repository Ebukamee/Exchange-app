"use client";
import { Box, Flex, HStack, VStack, Text, Icon, Button } from "@chakra-ui/react";
import { NavLink, Outlet, useNavigate } from "@/src/compat/router";
import {
  FaListCheck, FaMoneyBillTransfer, FaBitcoin, FaGift, FaUsers, FaGear, FaArrowRightFromBracket,
} from "react-icons/fa6";
import Logo from "../components/Logo";
import useAuthStore from "../Store/userStore";

const nav = [
  { to: "/admin/dashboard/transactions", label: "Transactions", icon: FaListCheck, color: "#f97316" },
  { to: "/admin/dashboard/withdrawals", label: "Withdrawals", icon: FaMoneyBillTransfer, color: "#10b981" },
  { to: "/admin/dashboard/cryptos", label: "Cryptocurrencies", icon: FaBitcoin, color: "#f59e0b" },
  { to: "/admin/dashboard/giftcards", label: "Gift Cards", icon: FaGift, color: "#8b5cf6" },
  { to: "/admin/dashboard/users", label: "Users", icon: FaUsers, color: "#06b6d4" },
  { to: "/admin/dashboard/settings", label: "Settings", icon: FaGear, color: "#797B89" },
];

export default function AdminDashboard({ children }) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    navigate("/admin");
  };

  return (
    <Flex minH="100vh" bg="ink.50">
      <Box
        as="aside"
        display={{ base: "none", md: "flex" }}
        flexDir="column"
        w="260px"
        bg="white"
        borderRight="1px solid"
        borderColor="#e5e5e5"
        position="sticky"
        top="0"
        h="100vh"
        p={5}
      >
        <Box mb={2}>
          <Logo useImage imageHeight={28} />
        </Box>
        <HStack mb={8} gap={2}>
          <Box w="6px" h="6px" bg="brand.500" borderRadius="full" />
          <Text fontSize="xs" color="brand.500" fontWeight="700" letterSpacing="0.08em">ADMIN PANEL</Text>
        </HStack>
        <VStack align="stretch" gap={1} flex="1">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <HStack
                  px={4}
                  py={2.5}
                  borderRadius="xl"
                  gap={3}
                  bg={isActive ? "brand.50" : "transparent"}
                  color={isActive ? "brand.600" : "ink.500"}
                  _hover={{ bg: isActive ? "brand.50" : "ink.50", color: isActive ? "brand.600" : "ink.900" }}
                  transition="all .2s"
                >
                  <Flex w="32px" h="32px" bg={isActive ? "brand.500" : `${item.color}15`} color={isActive ? "white" : item.color} borderRadius="lg" align="center" justify="center" transition="all .2s">
                    <Icon fontSize="sm"><item.icon /></Icon>
                  </Flex>
                  <Text fontWeight={isActive ? "700" : "500"} fontSize="sm">{item.label}</Text>
                </HStack>
              )}
            </NavLink>
          ))}
        </VStack>
        <Button variant="ghost" color="ink.400" justifyContent="start" onClick={signOut} _hover={{ color: "brand.500", bg: "brand.50" }} borderRadius="xl">
          <Icon><FaArrowRightFromBracket /></Icon> Logout
        </Button>
      </Box>

      <Flex direction="column" flex="1" minW="0">
        {/* Mobile top bar */}
        <Box display={{ base: "block", md: "none" }} bg="white" borderBottom="1px solid" borderColor="#e5e5e5" p={4} position="sticky" top="0" zIndex="10">
          <Flex justify="space-between" align="center" mb={3}>
            <Logo useImage imageHeight={22} />
            <HStack gap={2}>
              <Box w="6px" h="6px" bg="brand.500" borderRadius="full" />
              <Text fontSize="xs" color="brand.500" fontWeight="700">ADMIN</Text>
              <Button size="xs" variant="ghost" color="ink.400" onClick={signOut}>Logout</Button>
            </HStack>
          </Flex>
          <HStack gap={2} overflowX="auto" pb={1}>
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {({ isActive }) => (
                  <HStack
                    px={3}
                    py={1.5}
                    borderRadius="full"
                    whiteSpace="nowrap"
                    fontSize="xs"
                    fontWeight="600"
                    bg={isActive ? "brand.500" : "ink.50"}
                    color={isActive ? "white" : "ink.600"}
                    gap={1.5}
                    transition="all .2s"
                  >
                    <Icon fontSize="xs"><item.icon /></Icon>
                    <Text>{item.label}</Text>
                  </HStack>
                )}
              </NavLink>
            ))}
          </HStack>
        </Box>

        <Box flex="1" p={{ base: 4, md: 8 }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
