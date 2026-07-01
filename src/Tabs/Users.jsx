"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Spinner, SimpleGrid, Badge, Avatar, Input } from "@chakra-ui/react";
import useAuthStore from "../Store/userStore";
import { naira, formatDate } from "../Helper";

export default function Users() {
  const { getAllUsers } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    getAllUsers().then(setUsers).catch(() => {}).finally(() => setLoading(false));
  }, [getAllUsers]);

  const filtered = users.filter(
    (u) =>
      !q ||
      u.full_name?.toLowerCase().includes(q.toLowerCase()) ||
      u.email?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
        <Box>
          <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Users</Heading>
          <Text color="ink.500">{users.length} registered {users.length === 1 ? "user" : "users"}.</Text>
        </Box>
        <Input maxW="260px" placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} />
      </Flex>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {filtered.map((u) => (
            <Box key={u.id} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={4}>
              <Flex justify="space-between" align="start">
                <HStack gap={3}>
                  <Avatar.Root size="sm" colorPalette="brand"><Avatar.Fallback name={u.full_name || u.email} /></Avatar.Root>
                  <Box>
                    <HStack gap={2}>
                      <Text fontWeight="700" color="ink.900">{u.full_name || "—"}</Text>
                      {u.is_admin && <Badge colorPalette="brand">Admin</Badge>}
                    </HStack>
                    <Text fontSize="xs" color="ink.500">{u.email}</Text>
                    <Text fontSize="xs" color="ink.400">Joined {formatDate(u.created_at)}</Text>
                  </Box>
                </HStack>
                <Text fontWeight="800" color="brand.600">{naira(u.balance)}</Text>
              </Flex>
              <VStack align="stretch" gap={0.5} mt={3} fontSize="xs" color="ink.500">
                {u.wallet_address && <Text wordBreak="break-all">Wallet: {u.wallet_address}</Text>}
                {u.account_number && <Text>Bank: {u.bank_name} • {u.account_number}</Text>}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
