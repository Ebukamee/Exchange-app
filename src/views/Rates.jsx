"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, SimpleGrid, Flex, Image, Badge, Spinner, Tabs, HStack } from "@chakra-ui/react";
import Nav from "../components/nav";
import Footer from "../components/Footer";
import TransactionStore from "../Store/TransactionStore";
import { naira } from "../Helper";

export default function RatesPage() {
  const { cryptos, giftcards, fetchCryptos, fetchGiftcards } = TransactionStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchCryptos(), fetchGiftcards()])
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [fetchCryptos, fetchGiftcards]);

  return (
    <Box bg="white" minH="100vh">
      <Nav />
      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} py={16}>
        <Box textAlign="center" mb={10}>
          <Text fontSize="sm" color="ink.400" fontWeight="700" letterSpacing="0.1em" mb={3}>
            LIVE RATES
          </Text>
          <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "6xl" }} color="ink.900" letterSpacing="-0.03em">
            Today's best rates
          </Heading>
          <Text mt={4} color="ink.500">
            Rates are set by our team and updated regularly. Sign up to lock in your trade.
          </Text>
        </Box>

        {loading ? (
          <Flex justify="center" py={20}>
            <Spinner size="xl" color="brand.500" />
          </Flex>
        ) : (
          <Tabs.Root defaultValue="crypto" variant="enclosed">
            <Tabs.List mb={8} justifyContent="center">
              <Tabs.Trigger value="crypto">Cryptocurrency</Tabs.Trigger>
              <Tabs.Trigger value="giftcards">Gift Cards</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="crypto">
              {cryptos.filter((c) => c.enabled).length === 0 ? (
                <Empty label="No cryptocurrencies listed yet." />
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
                  {cryptos.filter((c) => c.enabled).map((c) => (
                    <RateCard
                      key={c.id}
                      name={c.name}
                      icon={c.icon_url}
                      rows={[
                        ["We buy at", naira(c.sell_price)],
                        ["We sell at", naira(c.buy_price)],
                      ]}
                    />
                  ))}
                </SimpleGrid>
              )}
            </Tabs.Content>

            <Tabs.Content value="giftcards">
              {giftcards.filter((g) => g.enabled).length === 0 ? (
                <Empty label="No gift cards listed yet." />
              ) : (
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
                  {giftcards.filter((g) => g.enabled).map((g) => (
                    <RateCard
                      key={g.id}
                      name={g.name}
                      icon={g.icon_url}
                      rows={[["Rate / $", naira(g.rate)]]}
                    />
                  ))}
                </SimpleGrid>
              )}
            </Tabs.Content>
          </Tabs.Root>
        )}
      </Box>
      <Footer />
    </Box>
  );
}

function RateCard({ name, icon, rows }) {
  return (
    <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={6} _hover={{ borderColor: "brand.300" }}>
      <HStack mb={4} gap={3}>
        {icon ? (
          <Image src={icon} boxSize="40px" borderRadius="md" objectFit="contain" />
        ) : (
          <Flex boxSize="40px" bg="brand.50" color="brand.500" borderRadius="md" align="center" justify="center" fontWeight="700">
            {name?.[0]}
          </Flex>
        )}
        <Text fontWeight="700" color="ink.900">{name}</Text>
      </HStack>
      {rows.map(([label, value]) => (
        <Flex key={label} justify="space-between" py={1.5}>
          <Text fontSize="sm" color="ink.500">{label}</Text>
          <Text fontSize="sm" fontWeight="700" color="ink.900">{value}</Text>
        </Flex>
      ))}
    </Box>
  );
}

function Empty({ label }) {
  return (
    <Flex direction="column" align="center" py={16} gap={2}>
      <Badge colorPalette="gray">Coming soon</Badge>
      <Text color="ink.500">{label}</Text>
    </Flex>
  );
}

