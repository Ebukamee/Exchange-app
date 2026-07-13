"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Input, Button, VStack, SimpleGrid, HStack, Icon, Avatar, Flex } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaArrowRightFromBracket, FaCopy, FaWhatsapp, FaXTwitter, FaGift } from "react-icons/fa6";
import ScrollReveal from "../components/ScrollReveal";
import DashboardLayout from "../components/DashboardLayout";
import { Field } from "../components/ui/field";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err } from "../Helper";

export default function Profile() {
  const { profile, fetchProfile, updateProfile, logout } = useAuthStore();
  const [form, setForm] = useState({
    full_name: "", wallet_address: "", bank_name: "", account_name: "", account_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const p = profile || (await fetchProfile());
      if (p) {
        setForm({
          full_name: p.full_name || "",
          wallet_address: p.wallet_address || "",
          bank_name: p.bank_name || "",
          account_name: p.account_name || "",
          account_number: p.account_number || "",
        });
      }
    })();
  }, [profile, fetchProfile]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      toast("success", "Profile updated.", "Saved");
    } catch (error) {
      toast("error", err(error.message), "Could not save");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await logout();
    nav("/");
  };

  const copyReferralCode = async () => {
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
        {/* Profile header */}
        <ScrollReveal>
          <HStack gap={4} mb={8}>
            <Avatar.Root size="lg" colorPalette="brand">
              <Avatar.Fallback name={profile?.full_name || profile?.email} />
            </Avatar.Root>
            <Box>
              <Heading fontFamily="heading" fontSize="xl" color="#1B1C20">{profile?.full_name || "Your profile"}</Heading>
              <Text color="#5C5C5C" fontSize="sm">{profile?.email}</Text>
            </Box>
          </HStack>
        </ScrollReveal>

        {/* Referral section — Apex-style */}
        {profile?.referral_code && (
          <ScrollReveal delay={0.1}>
            <Box mb={8}>
              {/* Gradient banner */}
              <Box
                style={{ background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)" }}
                borderRadius="xl"
                p={{ base: 6, md: 8 }}
                position="relative"
                overflow="hidden"
                mb={4}
              >
                <Box position="absolute" top="-40px" right="-20px" opacity={0.12}>
                  <Icon fontSize="180px" color="white"><FaGift /></Icon>
                </Box>
                <Box position="absolute" bottom="-20px" left="-30px" opacity={0.06}>
                  <Icon fontSize="120px" color="white"><FaGift /></Icon>
                </Box>
                <Box position="relative" zIndex={1}>
                  <Heading fontFamily="heading" fontSize={{ base: "2xl", md: "3xl" }} color="white" mb={2} letterSpacing="-0.02em">
                    Refer & Earn!
                  </Heading>
                  <Text color="rgba(255,255,255,0.8)" fontSize="sm" maxW="400px" lineHeight="1.6">
                    Invite your friends to Powerpay and earn rewards when they sign up and start trading.
                  </Text>
                </Box>
              </Box>

              {/* Referral link row */}
              <Box bg="#1B1C20" borderRadius="xl" p={5} mb={4}>
                <Text fontSize="xs" color="#797B89" mb={3} fontWeight="700" letterSpacing="0.08em">YOUR REFERRAL LINK</Text>
                <HStack gap={3}>
                  <Box flex="1" bg="#060809" borderRadius="lg" px={4} py={3} border="1px solid" borderColor="#2a2b30">
                    <Text fontSize="sm" color="#797B89" wordBreak="break-all" fontWeight="500">
                      powerpay.com/signup?ref={profile.referral_code}
                    </Text>
                  </Box>
                  <Button
                    colorPalette="brand"
                    size="sm"
                    onClick={copyReferralCode}
                    px={6}
                    fontWeight="700"
                  >
                    <Icon><FaCopy /></Icon>
                    {copied ? "Copied!" : "Copy link"}
                  </Button>
                </HStack>
              </Box>

              {/* Stats + Share cards */}
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                {/* Details card */}
                <Box bg="#1B1C20" borderRadius="xl" p={5} border="1px solid" borderColor="#2a2b30">
                  <Text fontWeight="800" color="white" mb={4} fontSize="md">Details</Text>
                  <VStack align="stretch" gap={3}>
                    <Flex justify="space-between" align="center">
                      <Text fontSize="sm" color="#797B89">Total Earnings</Text>
                      <Text fontWeight="700" color="brand.400">₦0.00</Text>
                    </Flex>
                    <Box h="1px" bg="#2a2b30" />
                    <Flex justify="space-between" align="center">
                      <Text fontSize="sm" color="#797B89">Total Signups</Text>
                      <Text fontWeight="700" color="white">0</Text>
                    </Flex>
                    <Box h="1px" bg="#2a2b30" />
                    <Flex justify="space-between" align="center">
                      <Text fontSize="sm" color="#797B89">Signups who transacted</Text>
                      <Text fontWeight="700" color="white">0</Text>
                    </Flex>
                  </VStack>
                </Box>

                {/* Share card */}
                <Box bg="#1B1C20" borderRadius="xl" p={5} border="1px solid" borderColor="#2a2b30">
                  <Text fontWeight="800" color="white" mb={4} fontSize="md">Share</Text>
                  <VStack align="stretch" gap={4}>
                    <Box>
                      <Text fontSize="xs" color="#797B89" mb={1}>Referral Code</Text>
                      <Text fontWeight="800" fontSize="xl" color="white" letterSpacing="0.1em">
                        {profile.referral_code}
                      </Text>
                    </Box>
                    <Box h="1px" bg="#2a2b30" />
                    <Box>
                      <Text fontSize="xs" color="#797B89" mb={3}>Invite Friends</Text>
                      <HStack gap={3}>
                        <Button size="sm" bg="#25D366" color="white" _hover={{ bg: "#1da851" }} onClick={shareWhatsApp}>
                          <Icon><FaWhatsapp /></Icon>
                          WhatsApp
                        </Button>
                        <Button size="sm" bg="#383A47" color="white" _hover={{ bg: "#5C5C5C" }} onClick={shareTwitter}>
                          <Icon><FaXTwitter /></Icon>
                          Twitter
                        </Button>
                        <Button size="sm" variant="outline" borderColor="#2a2b30" color="#797B89" _hover={{ bg: "#2a2b30" }} onClick={copyReferralCode}>
                          <Icon><FaCopy /></Icon>
                          Copy
                        </Button>
                      </HStack>
                    </Box>
                  </VStack>
                </Box>
              </SimpleGrid>
            </Box>
          </ScrollReveal>
        )}

        {/* Profile form */}
        <ScrollReveal delay={0.15}>
        <Box as="form" onSubmit={save} bg="white" borderRadius="xl" border="1px solid" borderColor="#e5e5e5" p={{ base: 5, md: 7 }}>
          <VStack align="stretch" gap={5}>
            <Field label="Full name">
              <Input value={form.full_name} onChange={set("full_name")} />
            </Field>
            <Field label="Crypto wallet address" helperText="Where you receive crypto you buy.">
              <Input value={form.wallet_address} onChange={set("wallet_address")} />
            </Field>
            <Box h="1px" bg="#e5e5e5" />
            <Text fontWeight="700" fontSize="sm" color="brand.500" letterSpacing="0.04em">BANK ACCOUNT</Text>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field label="Bank name"><Input value={form.bank_name} onChange={set("bank_name")} /></Field>
              <Field label="Account name"><Input value={form.account_name} onChange={set("account_name")} /></Field>
            </SimpleGrid>
            <Field label="Account number"><Input value={form.account_number} onChange={set("account_number")} /></Field>
            <Button type="submit" colorPalette="brand" size="lg" loading={loading}>Save changes</Button>
          </VStack>
        </Box>
        </ScrollReveal>

        <Button mt={6} variant="outline" colorPalette="red" onClick={signOut}>
          <Icon><FaArrowRightFromBracket /></Icon> Log out
        </Button>
      </Box>
    </DashboardLayout>
  );
}
