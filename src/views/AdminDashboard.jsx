"use client";
import { Box, Flex, HStack, VStack, Text, Icon, Button } from "@chakra-ui/react";
import { NavLink, Outlet, useNavigate } from "@/src/compat/router";
import {
  FaListCheck, FaMoneyBillTransfer, FaBitcoin, FaGift, FaUsers, FaGear, FaArrowRightFromBracket,
} from "react-icons/fa6";
import Logo from "../components/Logo";
import useAuthStore from "../Store/userStore";

const nav = [
  { to: "/admin/dashboard/transactions", label: "Transactions", icon: FaListCheck },
  { to: "/admin/dashboard/withdrawals", label: "Withdrawals", icon: FaMoneyBillTransfer },
  { to: "/admin/dashboard/cryptos", label: "Cryptocurrencies", icon: FaBitcoin },
  { to: "/admin/dashboard/giftcards", label: "Gift Cards", icon: FaGift },
  { to: "/admin/dashboard/users", label: "Users", icon: FaUsers },
  { to: "/admin/dashboard/settings", label: "Settings", icon: FaGear },
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
        bg="ink.950"
        color="white"
        position="sticky"
        top="0"
        h="100vh"
        p={6}
      >
        <Box mb={2}>
          <Logo useImage imageHeight={30} />
        </Box>
        <Text fontSize="xs" color="ink.400" mb={8} letterSpacing="0.1em">ADMIN PANEL</Text>
        <VStack align="stretch" gap={1} flex="1">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <HStack px={4} py={3} borderRadius="l1" gap={3}
                  bg={isActive ? "brand.500" : "transparent"}
                  color={isActive ? "white" : "ink.300"}
                  _hover={{ bg: isActive ? "brand.500" : "ink.900", color: "white" }}>
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

      <Flex direction="column" flex="1" minW="0">
        {/* Mobile top bar with horizontal nav */}
        <Box display={{ base: "block", md: "none" }} bg="ink.950" color="white" p={4} position="sticky" top="0" zIndex="10">
          <Flex justify="space-between" align="center" mb={3}>
            <Logo useImage imageHeight={26} />
            <Button size="xs" variant="ghost" color="ink.300" onClick={signOut}>Logout</Button>
          </Flex>
          <HStack gap={2} overflowX="auto" pb={1}>
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to}>
                {({ isActive }) => (
                  <Box px={3} py={1.5} borderRadius="full" whiteSpace="nowrap" fontSize="xs"
                    bg={isActive ? "brand.500" : "ink.900"} color="white">
                    {item.label}
                  </Box>
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

