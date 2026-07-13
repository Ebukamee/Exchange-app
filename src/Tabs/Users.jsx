"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, HStack, VStack, Spinner, SimpleGrid, Badge, Avatar, Input, Button, Icon } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa6";
import { adminGetUsers, toggleAdmin } from "@/app/actions/admin";
import { naira, formatDate } from "../Helper";
import { toast } from "../Helper";
import ScrollReveal, { staggerDelay } from "../components/ScrollReveal";

const PAGE_LIMIT = 50;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [q, setQ] = useState("");

  const load = async (offset = 0) => {
    const data = await adminGetUsers(offset);
    const more = data.length > PAGE_LIMIT;
    const items = more ? data.slice(0, PAGE_LIMIT) : data;
    if (offset === 0) {
      setUsers(items);
    } else {
      setUsers((prev) => [...prev, ...items]);
    }
    setHasMore(more);
  };

  useEffect(() => {
    load().catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleToggleAdmin = async (user) => {
    const newStatus = !user.is_admin;
    try {
      await toggleAdmin(user.id, newStatus);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, is_admin: newStatus } : u))
      );
      toast("success", `${user.full_name || user.email} is ${newStatus ? "now an admin" : "no longer an admin"}.`);
    } catch (e) {
      toast("error", e.message || "Failed to update admin status.");
    }
  };

  const filtered = users.filter(
    (u) =>
      !q ||
      u.full_name?.toLowerCase().includes(q.toLowerCase()) ||
      u.email?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
        <HStack gap={3}>
          <Flex w="40px" h="40px" bg="rgba(6,182,212,0.1)" borderRadius="xl" align="center" justify="center">
            <Icon color="#06b6d4" fontSize="md"><FaUsers /></Icon>
          </Flex>
          <Box>
            <Heading fontFamily="heading" fontSize="2xl" color="ink.900">Users</Heading>
            <Text color="ink.500" fontSize="sm">{users.length} registered {users.length === 1 ? "user" : "users"}.</Text>
          </Box>
        </HStack>
        <Input maxW="260px" placeholder="Search name or email" value={q} onChange={(e) => setQ(e.target.value)} borderRadius="xl" />
      </Flex>

      {loading ? (
        <Flex justify="center" py={16}><Spinner size="lg" color="brand.500" /></Flex>
      ) : filtered.length === 0 ? (
        <Flex direction="column" align="center" py={12} gap={3}>
          <Flex w="48px" h="48px" bg="ink.50" borderRadius="full" align="center" justify="center">
            <Icon color="ink.300" fontSize="lg"><FaUsers /></Icon>
          </Flex>
          <Text color="ink.400" fontSize="sm">{q ? "No users match your search." : "No users yet."}</Text>
        </Flex>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {filtered.map((u, i) => (
              <ScrollReveal key={u.id} delay={staggerDelay(i, 0.05)}>
                <Box
                  bg="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="#e5e5e5"
                  p={5}
                  transition="all .2s"
                  _hover={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transform: "translateY(-1px)" }}
                >
                  <Flex justify="space-between" align="start">
                    <HStack gap={3}>
                      <Avatar.Root size="sm" colorPalette="brand"><Avatar.Fallback name={u.full_name || u.email} /></Avatar.Root>
                      <Box>
                        <HStack gap={2}>
                          <Text fontWeight="700" color="ink.900">{u.full_name || "—"}</Text>
                          {u.is_admin && <Badge colorPalette="brand" borderRadius="full">Admin</Badge>}
                        </HStack>
                        <Text fontSize="xs" color="ink.500">{u.email}</Text>
                        <Text fontSize="xs" color="ink.400">Joined {formatDate(u.created_at)}</Text>
                      </Box>
                    </HStack>
                    <Box bg="ink.50" px={3} py={1.5} borderRadius="lg">
                      <Text fontWeight="700" color="ink.900" fontSize="sm">{naira(u.balance)}</Text>
                    </Box>
                  </Flex>
                  <Flex align="center" justify="space-between" mt={3}>
                    <VStack align="stretch" gap={0.5} fontSize="xs" color="ink.500">
                      {u.wallet_address && <Text wordBreak="break-all">Wallet: {u.wallet_address}</Text>}
                      {u.account_number && <Text>Bank: {u.bank_name} • {u.account_number}</Text>}
                    </VStack>
                    <Button
                      size="xs"
                      variant={u.is_admin ? "outline" : "solid"}
                      colorPalette={u.is_admin ? "red" : "brand"}
                      borderRadius="lg"
                      onClick={() => handleToggleAdmin(u)}
                    >
                      {u.is_admin ? "Remove Admin" : "Make Admin"}
                    </Button>
                  </Flex>
                </Box>
              </ScrollReveal>
            ))}
          </SimpleGrid>
          {hasMore && (
            <Flex justify="center" mt={4}>
              <Button variant="outline" colorPalette="brand" onClick={() => load(users.length)}>Load more</Button>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}
