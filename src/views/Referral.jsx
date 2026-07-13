"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Button, VStack, SimpleGrid, HStack, Icon, Flex } from "@chakra-ui/react";
import { FaCopy, FaWhatsapp, FaXTwitter, FaGift, FaUsers, FaChartLine } from "react-icons/fa6";
import ScrollReveal from "../components/ScrollReveal";
import DashboardLayout from "../components/DashboardLayout";
import useAuthStore from "../Store/userStore";

export default function Referral() {
  const { profile, fetchProfile } = useAuthStore();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!profile) fetchProfile();
  }, [profile, fetchProfile]);

  const copyLink = async () => {
    if (profile?.referral_code) {
      await navigator.clipboard.writeText(`https://powerpay.com/signup?ref=${profile.referral_code}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyCode = async () => {
    if (profile?.referral_code) {
      await navigator.clipboard.writeText(profile.referral_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareWhatsApp = () => {
    if (profile?.referral_code) {
      window.open(`https://wa.me/?text=${encodeURIComponent(`Join Powerpay with my referral code: ${profile.referral_code}\nhttps://powerpay.com/signup?ref=${profile.referral_code}`)}`, "_blank");
    }
  };

  const shareTwitter = () => {
    if (profile?.referral_code) {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Trade crypto & gift cards on Powerpay! Use my referral code: ${profile.referral_code}`)}&url=${encodeURIComponent(`https://powerpay.com/signup?ref=${profile.referral_code}`)}`, "_blank");
    }
  };

  return (
    <DashboardLayout>
      <Box maxW="800px" mx="auto">
        {/* Hero banner */}
        <ScrollReveal>
          <Box
            style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 40%, #d946ef 100%)" }}
            borderRadius="2xl"
            p={{ base: 6, md: 10 }}
            position="relative"
            overflow="hidden"
            mb={6}
          >
            <Box position="absolute" top="-50px" right="-30px" opacity={0.1}>
              <Icon fontSize="200px" color="white"><FaUsers /></Icon>
            </Box>
            <Box position="absolute" bottom="-20px" left="-20px" w="100px" h="100px" bg="white" opacity={0.06} borderRadius="full" />
            <Box position="absolute" top="30px" right="120px" w="40px" h="40px" bg="white" opacity={0.08} borderRadius="full" />

            <Box position="relative" zIndex={1}>
              <Flex w="56px" h="56px" bg="rgba(255,255,255,0.2)" borderRadius="xl" align="center" justify="center" mb={4}>
                <Icon color="white" fontSize="xl"><FaGift /></Icon>
              </Flex>
              <Heading fontFamily="heading" fontSize={{ base: "2xl", md: "3xl" }} color="white" mb={2} letterSpacing="-0.02em">
                Refer & Earn!
              </Heading>
              <Text color="rgba(255,255,255,0.85)" fontSize="sm" maxW="420px" lineHeight="1.7">
                Invite your friends to Powerpay and earn rewards when they sign up and start trading. The more friends you invite, the more you earn!
              </Text>
            </Box>
          </Box>
        </ScrollReveal>

        {/* Stats cards */}
        <ScrollReveal delay={0.1}>
          <SimpleGrid columns={{ base: 3 }} gap={4} mb={6}>
            <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={5} textAlign="center">
              <Flex w="40px" h="40px" bg="rgba(16,185,129,0.1)" borderRadius="lg" align="center" justify="center" mx="auto" mb={3}>
                <Icon color="#10b981" fontSize="md"><FaChartLine /></Icon>
              </Flex>
              <Text fontWeight="800" fontSize="xl" color="#1B1C20">₦0.00</Text>
              <Text fontSize="xs" color="#797B89" fontWeight="500">Total Earnings</Text>
            </Box>
            <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={5} textAlign="center">
              <Flex w="40px" h="40px" bg="rgba(139,92,246,0.1)" borderRadius="lg" align="center" justify="center" mx="auto" mb={3}>
                <Icon color="#8b5cf6" fontSize="md"><FaUsers /></Icon>
              </Flex>
              <Text fontWeight="800" fontSize="xl" color="#1B1C20">0</Text>
              <Text fontSize="xs" color="#797B89" fontWeight="500">Total Signups</Text>
            </Box>
            <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={5} textAlign="center">
              <Flex w="40px" h="40px" bg="rgba(249,115,22,0.1)" borderRadius="lg" align="center" justify="center" mx="auto" mb={3}>
                <Icon color="#f97316" fontSize="md"><FaGift /></Icon>
              </Flex>
              <Text fontWeight="800" fontSize="xl" color="#1B1C20">0</Text>
              <Text fontSize="xs" color="#797B89" fontWeight="500">Active Traders</Text>
            </Box>
          </SimpleGrid>
        </ScrollReveal>

        {/* Referral link */}
        <ScrollReveal delay={0.15}>
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={{ base: 5, md: 7 }} mb={6}>
            <Text fontWeight="800" color="#1B1C20" fontSize="md" mb={4}>Your Referral Link</Text>
            <Box bg="ink.50" borderRadius="xl" px={4} py={3} border="1px solid" borderColor="#e5e5e5" mb={4}>
              <Text fontSize="sm" color="#797B89" wordBreak="break-all" fontWeight="500">
                powerpay.com/signup?ref={profile?.referral_code || "..."}
              </Text>
            </Box>
            <HStack gap={3} flexWrap="wrap">
              <Button colorPalette="brand" size="sm" onClick={copyLink} px={6} fontWeight="700">
                <Icon><FaCopy /></Icon>
                {copied ? "Copied!" : "Copy link"}
              </Button>
              <Button size="sm" bg="#25D366" color="white" _hover={{ bg: "#1da851" }} onClick={shareWhatsApp}>
                <Icon><FaWhatsapp /></Icon>
                WhatsApp
              </Button>
              <Button size="sm" bg="#1B1C20" color="white" _hover={{ bg: "#383A47" }} onClick={shareTwitter}>
                <Icon><FaXTwitter /></Icon>
                Twitter
              </Button>
            </HStack>
          </Box>
        </ScrollReveal>

        {/* Referral code card */}
        <ScrollReveal delay={0.2}>
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={{ base: 5, md: 7 }} mb={6}>
            <Text fontWeight="800" color="#1B1C20" fontSize="md" mb={2}>Your Referral Code</Text>
            <Text fontSize="xs" color="#797B89" mb={4}>Share this code with friends who prefer to enter it manually during signup.</Text>
            <HStack gap={4} align="center">
              <Box
                bg="ink.50"
                borderRadius="xl"
                px={6}
                py={4}
                border="2px dashed"
                borderColor="brand.200"
              >
                <Text fontWeight="900" fontSize="2xl" color="brand.500" letterSpacing="0.15em" fontFamily="heading">
                  {profile?.referral_code || "..."}
                </Text>
              </Box>
              <Button variant="outline" size="sm" colorPalette="brand" onClick={copyCode}>
                <Icon><FaCopy /></Icon>
                Copy code
              </Button>
            </HStack>
          </Box>
        </ScrollReveal>

        {/* How it works */}
        <ScrollReveal delay={0.25}>
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={{ base: 5, md: 7 }}>
            <Text fontWeight="800" color="#1B1C20" fontSize="md" mb={5}>How it works</Text>
            <VStack align="stretch" gap={4}>
              {[
                { step: "1", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", title: "Share your link", desc: "Send your unique referral link to friends via WhatsApp, Twitter, or any platform." },
                { step: "2", color: "#f97316", bg: "rgba(249,115,22,0.1)", title: "Friends sign up", desc: "Your friends create a Powerpay account using your referral link or code." },
                { step: "3", color: "#10b981", bg: "rgba(16,185,129,0.1)", title: "Earn rewards", desc: "When your friends start trading, you earn rewards automatically." },
              ].map((item) => (
                <HStack key={item.step} gap={4} align="start">
                  <Flex w="40px" h="40px" bg={item.bg} color={item.color} borderRadius="xl" align="center" justify="center" fontWeight="800" fontSize="sm" flexShrink={0}>
                    {item.step}
                  </Flex>
                  <Box>
                    <Text fontWeight="700" color="#1B1C20" fontSize="sm">{item.title}</Text>
                    <Text fontSize="xs" color="#797B89" lineHeight="1.6">{item.desc}</Text>
                  </Box>
                </HStack>
              ))}
            </VStack>
          </Box>
        </ScrollReveal>
      </Box>
    </DashboardLayout>
  );
}
