"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, SimpleGrid, Flex, Image, Badge, Spinner, Tabs, HStack, Input } from "@chakra-ui/react";
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
                    <CryptoCalcCard key={c.id} crypto={c} />
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
                    <GiftcardCalcCard key={g.id} card={g} />
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

function CardIcon({ name, icon }) {
  return icon ? (
    <Image src={icon} boxSize="36px" borderRadius="md" objectFit="contain" />
  ) : (
    <Flex boxSize="36px" bg="brand.50" color="brand.500" borderRadius="md" align="center" justify="center" fontWeight="700" fontSize="sm">
      {name?.[0]}
    </Flex>
  );
}

function CryptoCalcCard({ crypto }) {
  const [qty, setQty] = useState("");
  const amt = Number(qty) || 0;
  const symbol = crypto.symbol || crypto.name;
  return (
    <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={6} _hover={{ borderColor: "brand.300" }}>
      <HStack mb={4} gap={3}>
        <CardIcon name={crypto.name} icon={crypto.icon_url} />
        <Box>
          <Text fontWeight="700" color="ink.900" lineHeight="1.2">{crypto.name}</Text>
          {crypto.symbol && <Text fontSize="xs" color="ink.400">{crypto.symbol}</Text>}
        </Box>
      </HStack>
      <Flex justify="space-between" py={1.5}>
        <Text fontSize="sm" color="ink.500">We buy at</Text>
        <Text fontSize="sm" fontWeight="700" color="ink.900">{naira(crypto.sell_price)}<Text as="span" color="ink.400" fontWeight="400">/USD</Text></Text>
      </Flex>
      <Flex justify="space-between" py={1.5} mb={3}>
        <Text fontSize="sm" color="ink.500">We sell at</Text>
        <Text fontSize="sm" fontWeight="700" color="ink.900">{naira(crypto.buy_price)}<Text as="span" color="ink.400" fontWeight="400">/USD</Text></Text>
      </Flex>
      <Box bg="ink.50" borderRadius="l1" p={3}>
        <Text fontSize="xs" color="ink.500" mb={2} fontWeight="600">Quick calculator</Text>
        <Input
          placeholder={`Enter amount in ${symbol}`}
          size="sm"
          type="number"
          min="0"
          step="any"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          bg="white"
          mb={2}
        />
        {amt > 0 && (
          <Box fontSize="sm">
            <Flex justify="space-between" py={1}>
              <Text color="ink.500">Sell {qty} {symbol}</Text>
              <Text fontWeight="700" color="green.600">{naira(amt * Number(crypto.sell_price))}</Text>
            </Flex>
            <Flex justify="space-between" py={1}>
              <Text color="ink.500">Buy {qty} {symbol}</Text>
              <Text fontWeight="700" color="brand.600">{naira(amt * Number(crypto.buy_price))}</Text>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function GiftcardCalcCard({ card }) {
  const subs = Array.isArray(card.subcategories) ? card.subcategories : [];
  const [selectedSub, setSelectedSub] = useState(subs[0] || null);
  const [usd, setUsd] = useState("");
  const amt = Number(usd) || 0;
  const rate = selectedSub ? Number(selectedSub.rate) : 0;
  return (
    <Box bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={6} _hover={{ borderColor: "brand.300" }}>
      <HStack mb={4} gap={3}>
        <CardIcon name={card.name} icon={card.icon_url} />
        <Text fontWeight="700" color="ink.900">{card.name}</Text>
      </HStack>
      {subs.length > 0 && (
        <Flex gap={2} wrap="wrap" mb={3}>
          {subs.map((s, i) => (
            <Box key={i} as="button" type="button" onClick={() => setSelectedSub(s)}
              px={3} py={1.5} borderRadius="full" fontSize="xs" fontWeight="600"
              bg={selectedSub?.name === s.name ? "brand.500" : "ink.100"}
              color={selectedSub?.name === s.name ? "white" : "ink.700"}>
              {s.name}
            </Box>
          ))}
        </Flex>
      )}
      {selectedSub && (
        <Flex justify="space-between" py={1.5} mb={3}>
          <Text fontSize="sm" color="ink.500">Rate ({selectedSub.name})</Text>
          <Text fontSize="sm" fontWeight="700" color="ink.900">{naira(rate)}/$</Text>
        </Flex>
      )}
      <Box bg="ink.50" borderRadius="l1" p={3}>
        <Text fontSize="xs" color="ink.500" mb={2} fontWeight="600">Quick calculator</Text>
        <Input
          placeholder="Enter card value in USD"
          size="sm"
          type="number"
          min="0"
          value={usd}
          onChange={(e) => setUsd(e.target.value)}
          bg="white"
          mb={2}
        />
        {amt > 0 && selectedSub && (
          <Flex justify="space-between" py={1} fontSize="sm">
            <Text color="ink.500">${usd} card</Text>
            <Text fontWeight="700" color="green.600">{naira(amt * rate)}</Text>
          </Flex>
        )}
      </Box>
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

