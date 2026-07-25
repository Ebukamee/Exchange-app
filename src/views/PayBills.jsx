"use client";
import { useEffect, useState } from "react";
import {
  Box, Flex, Heading, Text, SimpleGrid, VStack, HStack, Icon, Button, Input, Spinner, Badge,
} from "@chakra-ui/react";
import {
  FaBolt, FaWifi, FaPhone, FaCheck, FaCopy, FaClockRotateLeft,
  FaArrowRight, FaWallet, FaCircleCheck, FaRotate,
} from "react-icons/fa6";
import DashboardLayout from "../components/DashboardLayout";
import ScrollReveal from "../components/ScrollReveal";
import { Field } from "../components/ui/field";
import useAuthStore from "../Store/userStore";
import { toast, err, naira, formatDate } from "../Helper";
import {
  buyAirtime, buyData, buyElectricity,
  getDataPlans, verifyMeterNumber, getBillHistory,
} from "@/app/actions/bills";

/* ─── Service categories shown as hero cards ─── */
const SERVICES = [
  {
    key: "airtime",
    label: "Airtime",
    desc: "Recharge any network instantly",
    icon: FaPhone,
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)",
    glow: "rgba(245,158,11,0.35)",
    iconBg: "rgba(255,255,255,0.2)",
  },
  {
    key: "data",
    label: "Data Bundle",
    desc: "Browse without limits",
    icon: FaWifi,
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
    glow: "rgba(139,92,246,0.35)",
    iconBg: "rgba(255,255,255,0.2)",
  },
  {
    key: "electricity",
    label: "Electricity",
    desc: "Pay power bills & get tokens",
    icon: FaBolt,
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
    glow: "rgba(6,182,212,0.35)",
    iconBg: "rgba(255,255,255,0.2)",
  },
];

const TELCO_PROVIDERS = [
  { id: "mtn", name: "MTN", color: "#FFCB05", bg: "linear-gradient(135deg,#FFCB05,#E6B800)", textColor: "#1a1a1a", logo: "/logos/mtn.jpg" },
  { id: "glo", name: "GLO", color: "#50B651", bg: "linear-gradient(135deg,#50B651,#3D8E3E)", textColor: "#fff", logo: "/logos/glo.jpg" },
  { id: "airtel", name: "Airtel", color: "#ED1C24", bg: "linear-gradient(135deg,#ED1C24,#C4161D)", textColor: "#fff", logo: "/logos/airtel.jpg" },
  { id: "etisalat", name: "9mobile", color: "#006B3F", bg: "linear-gradient(135deg,#006B3F,#004D2D)", textColor: "#fff", logo: "/logos/9mobile.jpg" },
];

const DISCO_PROVIDERS = [
  { id: "ikeja-electric", name: "Ikeja Electric", color: "#E8430C", logo: "/logos/ikeja-electric.jpg" },
  { id: "eko-electric", name: "Eko Electric", color: "#1B4F72", logo: "/logos/eko-electric.jpg" },
  { id: "abuja-electric", name: "Abuja Electric", color: "#2E86C1", logo: "/logos/abuja-electric.jpg" },
  { id: "kano-electric", name: "Kano Electric", color: "#27AE60", logo: "/logos/kano-electric.jpg" },
  { id: "portharcourt-electric", name: "PH Electric", color: "#8E44AD", logo: "/logos/portharcourt-electric.jpg" },
  { id: "jos-electric", name: "Jos Electric", color: "#D4AC0D", logo: "/logos/jos-electric.jpg" },
  { id: "kaduna-electric", name: "Kaduna Electric", color: "#CA6F1E", logo: "/logos/kaduna-electric.jpg" },
  { id: "ibadan-electric", name: "Ibadan Electric", color: "#1ABC9C", logo: "/logos/ibadan-electric.jpg" },
  { id: "enugu-electric", name: "Enugu Electric", color: "#2C3E50", logo: "/logos/enugu-electric.jpg" },
  { id: "benin-electric", name: "Benin Electric", color: "#C0392B", logo: "/logos/benin-electric.jpg" },
];

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export default function PayBills() {
  const { profile, getProfile } = useAuthStore();
  const [tab, setTab] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    getBillHistory().then(setHistory).catch(() => {}).finally(() => setLoadingHistory(false));
  }, []);

  const refreshAfter = async () => {
    await getProfile();
    getBillHistory().then(setHistory).catch(() => {});
  };

  return (
    <DashboardLayout>
      <VStack align="stretch" gap={6}>
        {/* Hero header */}
        <ScrollReveal>
          <Box
            style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)" }}
            borderRadius="2xl"
            p={{ base: 5, md: 7 }}
            position="relative"
            overflow="hidden"
            color="white"
          >
            {/* Decorative elements */}
            <Box position="absolute" top="-50px" right="-30px" w="180px" h="180px" bg="white" opacity={0.04} borderRadius="full" />
            <Box position="absolute" bottom="-40px" left="20%" w="140px" h="140px" bg="white" opacity={0.03} borderRadius="full" />
            <Box position="absolute" top="10px" left="-20px" w="80px" h="80px" bg="rgba(139,92,246,0.3)" borderRadius="full" filter="blur(30px)" />
            <Box position="absolute" bottom="10px" right="15%" w="100px" h="100px" bg="rgba(6,182,212,0.2)" borderRadius="full" filter="blur(40px)" />

            <Box position="relative" zIndex={1}>
              <HStack gap={2} mb={1}>
                <Icon fontSize="sm" color="rgba(255,255,255,0.6)"><FaWallet /></Icon>
                <Text fontSize="xs" fontWeight="600" color="rgba(255,255,255,0.6)" letterSpacing="0.08em">BILL PAYMENTS</Text>
              </HStack>
              <Heading fontFamily="heading" fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" mb={1}>
                Pay Bills Instantly
              </Heading>
              <Text fontSize="sm" color="rgba(255,255,255,0.7)">
                Airtime, data & electricity — powered by your Powerpay balance
              </Text>
            </Box>
          </Box>
        </ScrollReveal>

        {/* Service selector cards */}
        {!tab && (
          <SimpleGrid columns={{ base: 1, sm: 3 }} gap={4}>
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.key} delay={i * 0.08}>
                <Box
                  as="button"
                  w="100%"
                  onClick={() => setTab(s.key)}
                  style={{ background: s.gradient }}
                  borderRadius="2xl"
                  p={{ base: 5, md: 6 }}
                  position="relative"
                  overflow="hidden"
                  textAlign="left"
                  color="white"
                  transition="all .3s cubic-bezier(.4,0,.2,1)"
                  _hover={{ transform: "translateY(-6px)", boxShadow: `0 20px 40px -12px ${s.glow}` }}
                >
                  {/* Glow circle */}
                  <Box position="absolute" top="-30px" right="-20px" w="100px" h="100px" bg="white" opacity={0.08} borderRadius="full" />
                  <Box position="absolute" bottom="-20px" left="-10px" w="60px" h="60px" bg="white" opacity={0.05} borderRadius="full" />

                  <Flex
                    w={{ base: "48px", md: "56px" }}
                    h={{ base: "48px", md: "56px" }}
                    bg={s.iconBg}
                    borderRadius="xl"
                    align="center"
                    justify="center"
                    mb={4}
                    backdropFilter="blur(10px)"
                  >
                    <Icon fontSize={{ base: "xl", md: "2xl" }}><s.icon /></Icon>
                  </Flex>
                  <Text fontWeight="800" fontSize={{ base: "lg", md: "xl" }} mb={1}>{s.label}</Text>
                  <Text fontSize="sm" color="rgba(255,255,255,0.8)">{s.desc}</Text>
                  <Flex
                    mt={4}
                    w="32px" h="32px"
                    bg="rgba(255,255,255,0.15)"
                    borderRadius="full"
                    align="center"
                    justify="center"
                    backdropFilter="blur(4px)"
                  >
                    <Icon fontSize="xs"><FaArrowRight /></Icon>
                  </Flex>
                </Box>
              </ScrollReveal>
            ))}
          </SimpleGrid>
        )}

        {/* Active tab content */}
        {tab && (
          <ScrollReveal>
            <Box>
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                mb={4}
                color="ink.500"
                fontWeight="600"
                onClick={() => setTab(null)}
                _hover={{ color: "ink.900" }}
              >
                &larr; All services
              </Button>

              {tab === "airtime" && <AirtimeTab onDone={refreshAfter} />}
              {tab === "data" && <DataTab onDone={refreshAfter} />}
              {tab === "electricity" && <ElectricityTab onDone={refreshAfter} />}
            </Box>
          </ScrollReveal>
        )}

        {/* Bill history */}
        <ScrollReveal delay={0.15}>
          <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="ink.100" overflow="hidden">
            <Flex
              px={{ base: 5, md: 6 }}
              py={4}
              bg="ink.950"
              align="center"
              gap={3}
            >
              <Flex w="32px" h="32px" bg="rgba(255,255,255,0.1)" borderRadius="lg" align="center" justify="center">
                <Icon color="white" fontSize="sm"><FaClockRotateLeft /></Icon>
              </Flex>
              <Heading fontSize="md" color="white" fontFamily="heading">Recent Payments</Heading>
            </Flex>
            <Box px={{ base: 5, md: 6 }} py={4}>
              {loadingHistory ? (
                <Flex justify="center" py={10}><Spinner color="brand.500" /></Flex>
              ) : history.length === 0 ? (
                <Flex direction="column" align="center" py={10} gap={3}>
                  <Flex w="56px" h="56px" bg="ink.50" borderRadius="full" align="center" justify="center">
                    <Icon color="ink.300" fontSize="xl"><FaWallet /></Icon>
                  </Flex>
                  <Text color="ink.400" fontSize="sm">No bill payments yet. Choose a service above to start.</Text>
                </Flex>
              ) : (
                <VStack align="stretch" gap={0}>
                  {history.map((b, idx) => {
                    const meta = billMeta(b.type);
                    const isDelivered = b.vtpass_status === "delivered";
                    const isFailed = b.vtpass_status === "failed";
                    return (
                      <Flex
                        key={b.id}
                        justify="space-between"
                        align="center"
                        py={3}
                        px={2}
                        flexWrap="wrap"
                        gap={2}
                        borderBottom={idx < history.length - 1 ? "1px solid" : "none"}
                        borderColor="ink.100"
                        borderRadius="lg"
                        _hover={{ bg: "ink.50" }}
                        transition="background .15s"
                      >
                        <HStack gap={3}>
                          <Flex
                            w="40px" h="40px" borderRadius="xl" align="center" justify="center"
                            style={{ background: meta.gradient }}
                          >
                            <Icon fontSize="sm" color="white"><meta.icon /></Icon>
                          </Flex>
                          <Box>
                            <Text fontWeight="700" color="ink.900" fontSize="sm" textTransform="capitalize">
                              {b.type} &middot; {b.provider.replace("-", " ")}
                            </Text>
                            <Text fontSize="xs" color="ink.400">{b.phone_or_meter} &middot; {formatDate(b.created_at)}</Text>
                          </Box>
                        </HStack>
                        <HStack gap={2}>
                          <Text fontWeight="800" fontSize="sm" color="ink.900">{naira(b.amount)}</Text>
                          <Badge
                            px={2}
                            py={0.5}
                            borderRadius="full"
                            fontSize="10px"
                            fontWeight="700"
                            bg={isDelivered ? "rgba(16,185,129,0.1)" : isFailed ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)"}
                            color={isDelivered ? "#059669" : isFailed ? "#dc2626" : "#d97706"}
                          >
                            {b.vtpass_status}
                          </Badge>
                        </HStack>
                      </Flex>
                    );
                  })}
                </VStack>
              )}
            </Box>
          </Box>
        </ScrollReveal>
      </VStack>
    </DashboardLayout>
  );
}

function billMeta(type) {
  if (type === "airtime") return { icon: FaPhone, gradient: "linear-gradient(135deg,#f59e0b,#d97706)" };
  if (type === "data") return { icon: FaWifi, gradient: "linear-gradient(135deg,#8b5cf6,#7c3aed)" };
  return { icon: FaBolt, gradient: "linear-gradient(135deg,#06b6d4,#0891b2)" };
}

/* ════════════════════════════════════════════════════════════════════
   AIRTIME TAB
   ════════════════════════════════════════════════════════════════════ */
function AirtimeTab({ onDone }) {
  const [provider, setProvider] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!provider) return toast("error", "Select a network provider", "Error");
    setBusy(true);
    try {
      await buyAirtime({ provider, phone, amount });
      toast("success", `₦${Number(amount).toLocaleString()} airtime sent to ${phone}`, "Airtime Purchased!");
      setDone(true);
      onDone();
    } catch (e) {
      toast("error", err(e.message), "Failed");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <SuccessCard
        title="Airtime Delivered!"
        subtitle={`₦${Number(amount).toLocaleString()} sent to ${phone}`}
        gradient="linear-gradient(135deg,#f59e0b,#d97706)"
        onReset={() => { setDone(false); setPhone(""); setAmount(""); setProvider(""); }}
      />
    );
  }

  return (
    <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="ink.100" overflow="hidden">
      {/* Card header */}
      <Box
        style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}
        px={{ base: 5, md: 7 }}
        py={5}
        color="white"
      >
        <HStack gap={3}>
          <Flex w="44px" h="44px" bg="rgba(255,255,255,0.2)" borderRadius="xl" align="center" justify="center" backdropFilter="blur(8px)">
            <Icon fontSize="xl"><FaPhone /></Icon>
          </Flex>
          <Box>
            <Text fontWeight="800" fontSize="lg">Buy Airtime</Text>
            <Text fontSize="xs" color="rgba(255,255,255,0.8)">Instant recharge to any network</Text>
          </Box>
        </HStack>
      </Box>

      <Box px={{ base: 5, md: 7 }} py={6}>
        {/* Network selector */}
        <Text fontSize="xs" fontWeight="700" color="ink.400" letterSpacing="0.08em" mb={3}>SELECT NETWORK</Text>
        <SimpleGrid columns={4} gap={3} mb={6}>
          {TELCO_PROVIDERS.map((p) => (
            <TelcoCard key={p.id} provider={p} selected={provider === p.id} onClick={() => setProvider(p.id)} />
          ))}
        </SimpleGrid>

        <VStack align="stretch" gap={5}>
          <Field label="Phone number">
            <Input
              placeholder="08012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
              size="lg"
              borderRadius="xl"
              fontSize="md"
              fontWeight="600"
            />
          </Field>

          {/* Amount grid */}
          <Box>
            <Text fontSize="xs" fontWeight="700" color="ink.400" letterSpacing="0.08em" mb={3}>AMOUNT</Text>
            <SimpleGrid columns={3} gap={2}>
              {QUICK_AMOUNTS.map((a) => (
                <Box
                  key={a}
                  as="button"
                  onClick={() => setAmount(String(a))}
                  bg={Number(amount) === a ? "ink.900" : "ink.50"}
                  color={Number(amount) === a ? "white" : "ink.700"}
                  borderRadius="xl"
                  py={3}
                  fontWeight="800"
                  fontSize="sm"
                  textAlign="center"
                  transition="all .2s"
                  border="2px solid"
                  borderColor={Number(amount) === a ? "ink.900" : "transparent"}
                  _hover={{ borderColor: "ink.300", transform: "scale(1.02)" }}
                >
                  ₦{a.toLocaleString()}
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <Field label="Or enter custom amount">
            <Input
              type="number"
              placeholder="₦0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              size="lg"
              borderRadius="xl"
              fontSize="lg"
              fontWeight="700"
            />
          </Field>

          <PayButton loading={busy} onClick={submit} amount={amount} />
        </VStack>
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DATA TAB
   ════════════════════════════════════════════════════════════════════ */
function DataTab({ onDone }) {
  const [provider, setProvider] = useState("");
  const [phone, setPhone] = useState("");
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const pickProvider = async (id) => {
    setProvider(id);
    setSelectedPlan(null);
    setPlans([]);
    setLoadingPlans(true);
    try {
      const p = await getDataPlans(id);
      setPlans(p);
    } catch (e) {
      toast("error", err(e.message), "Failed");
    } finally {
      setLoadingPlans(false);
    }
  };

  const submit = async () => {
    if (!provider) return toast("error", "Select a network provider", "Error");
    if (!selectedPlan) return toast("error", "Select a data plan", "Error");
    setBusy(true);
    try {
      await buyData({ provider, phone, variation_code: selectedPlan.code, amount: selectedPlan.amount });
      toast("success", `${selectedPlan.name} sent to ${phone}`, "Data Purchased!");
      setDone(true);
      onDone();
    } catch (e) {
      toast("error", err(e.message), "Failed");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <SuccessCard
        title="Data Bundle Activated!"
        subtitle={`${selectedPlan?.name} sent to ${phone}`}
        gradient="linear-gradient(135deg,#8b5cf6,#7c3aed)"
        onReset={() => { setDone(false); setPhone(""); setProvider(""); setSelectedPlan(null); setPlans([]); }}
      />
    );
  }

  return (
    <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="ink.100" overflow="hidden">
      <Box
        style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)" }}
        px={{ base: 5, md: 7 }}
        py={5}
        color="white"
      >
        <HStack gap={3}>
          <Flex w="44px" h="44px" bg="rgba(255,255,255,0.2)" borderRadius="xl" align="center" justify="center" backdropFilter="blur(8px)">
            <Icon fontSize="xl"><FaWifi /></Icon>
          </Flex>
          <Box>
            <Text fontWeight="800" fontSize="lg">Buy Data</Text>
            <Text fontSize="xs" color="rgba(255,255,255,0.8)">Get data bundles for any network</Text>
          </Box>
        </HStack>
      </Box>

      <Box px={{ base: 5, md: 7 }} py={6}>
        <Text fontSize="xs" fontWeight="700" color="ink.400" letterSpacing="0.08em" mb={3}>SELECT NETWORK</Text>
        <SimpleGrid columns={4} gap={3} mb={6}>
          {TELCO_PROVIDERS.map((p) => (
            <TelcoCard key={p.id} provider={p} selected={provider === p.id} onClick={() => pickProvider(p.id)} />
          ))}
        </SimpleGrid>

        <VStack align="stretch" gap={5}>
          <Field label="Phone number">
            <Input
              placeholder="08012345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={11}
              size="lg"
              borderRadius="xl"
              fontSize="md"
              fontWeight="600"
            />
          </Field>

          {loadingPlans && (
            <Flex justify="center" py={6} gap={3} align="center">
              <Spinner color="purple.500" size="sm" />
              <Text fontSize="sm" color="ink.400">Loading plans...</Text>
            </Flex>
          )}

          {plans.length > 0 && (
            <Box>
              <Text fontSize="xs" fontWeight="700" color="ink.400" letterSpacing="0.08em" mb={3}>CHOOSE PLAN</Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={2} maxH="320px" overflowY="auto" pr={1}>
                {plans.map((p) => {
                  const sel = selectedPlan?.code === p.code;
                  return (
                    <Box
                      key={p.code}
                      as="button"
                      w="100%"
                      textAlign="left"
                      onClick={() => setSelectedPlan(p)}
                      bg={sel ? "purple.50" : "white"}
                      border="2px solid"
                      borderColor={sel ? "purple.400" : "ink.100"}
                      borderRadius="xl"
                      px={4}
                      py={3}
                      transition="all .2s"
                      _hover={{ borderColor: "purple.300", bg: sel ? "purple.50" : "ink.50" }}
                      position="relative"
                      overflow="hidden"
                    >
                      {sel && (
                        <Flex position="absolute" top="8px" right="8px" w="20px" h="20px" bg="purple.500" borderRadius="full" align="center" justify="center">
                          <Icon fontSize="9px" color="white"><FaCheck /></Icon>
                        </Flex>
                      )}
                      <Text fontSize="xs" fontWeight="600" color="ink.500" mb={0.5} pr={sel ? "24px" : "0"}>{p.name}</Text>
                      <Text fontSize="md" fontWeight="800" color={sel ? "purple.600" : "ink.900"}>{naira(p.amount)}</Text>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Box>
          )}

          {selectedPlan && (
            <Box
              style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(124,58,237,0.12))" }}
              borderRadius="xl"
              p={4}
              border="1px solid"
              borderColor="purple.200"
            >
              <HStack justify="space-between">
                <Box>
                  <Text fontSize="xs" color="purple.500" fontWeight="700">SELECTED PLAN</Text>
                  <Text fontSize="sm" fontWeight="700" color="ink.900">{selectedPlan.name}</Text>
                </Box>
                <Text fontSize="lg" fontWeight="800" color="purple.600">{naira(selectedPlan.amount)}</Text>
              </HStack>
            </Box>
          )}

          <PayButton loading={busy} onClick={submit} amount={selectedPlan?.amount} disabled={!selectedPlan} />
        </VStack>
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   ELECTRICITY TAB
   ════════════════════════════════════════════════════════════════════ */
function ElectricityTab({ onDone }) {
  const [provider, setProvider] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [meterType, setMeterType] = useState("prepaid");
  const [amount, setAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [token, setToken] = useState("");

  const verify = async () => {
    if (!provider) return toast("error", "Select a distribution company", "Error");
    setVerifying(true);
    setVerified(false);
    setCustomerName("");
    try {
      const res = await verifyMeterNumber({ provider, meterNumber, meterType });
      setCustomerName(res.customerName);
      setVerified(true);
      toast("success", `Meter verified: ${res.customerName}`, "Verified");
    } catch (e) {
      toast("error", err(e.message), "Verification Failed");
    } finally {
      setVerifying(false);
    }
  };

  const submit = async () => {
    setBusy(true);
    try {
      const res = await buyElectricity({ provider, meterNumber, meterType, amount });
      if (res.token) setToken(res.token);
      toast("success", "Electricity payment successful!", "Success");
      setDone(true);
      onDone();
    } catch (e) {
      toast("error", err(e.message), "Failed");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="ink.100" overflow="hidden" textAlign="center">
        <Box style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }} py={8} px={6} color="white">
          <Flex w="72px" h="72px" bg="rgba(255,255,255,0.2)" borderRadius="full" align="center" justify="center" mx="auto" mb={4} backdropFilter="blur(8px)">
            <Icon fontSize="2xl"><FaCircleCheck /></Icon>
          </Flex>
          <Heading fontSize="xl" mb={1}>Payment Successful!</Heading>
          <Text fontSize="sm" color="rgba(255,255,255,0.8)">{naira(amount)} electricity payment completed</Text>
        </Box>
        <Box px={6} py={6}>
          {token && (
            <Box
              bg="ink.950"
              borderRadius="2xl"
              p={5}
              my={2}
              position="relative"
              overflow="hidden"
            >
              <Box position="absolute" top="-20px" right="-10px" w="80px" h="80px" bg="cyan.500" opacity={0.1} borderRadius="full" />
              <Text fontSize="10px" color="cyan.400" fontWeight="700" letterSpacing="0.1em" mb={2}>ELECTRICITY TOKEN</Text>
              <Text fontFamily="mono" fontSize={{ base: "xl", md: "2xl" }} fontWeight="800" color="white" letterSpacing="0.08em">{token}</Text>
              <Button
                size="sm"
                mt={3}
                bg="rgba(255,255,255,0.1)"
                color="white"
                borderRadius="lg"
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
                onClick={() => { navigator.clipboard.writeText(token); toast("success", "Token copied!", "Copied"); }}
                gap={2}
              >
                <FaCopy /> Copy token
              </Button>
            </Box>
          )}
          <Button
            mt={4}
            colorPalette="brand"
            borderRadius="xl"
            size="lg"
            w="100%"
            onClick={() => { setDone(false); setProvider(""); setMeterNumber(""); setAmount(""); setVerified(false); setCustomerName(""); setToken(""); }}
          >
            <FaRotate /> Pay another bill
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="ink.100" overflow="hidden">
      <Box
        style={{ background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" }}
        px={{ base: 5, md: 7 }}
        py={5}
        color="white"
      >
        <HStack gap={3}>
          <Flex w="44px" h="44px" bg="rgba(255,255,255,0.2)" borderRadius="xl" align="center" justify="center" backdropFilter="blur(8px)">
            <Icon fontSize="xl"><FaBolt /></Icon>
          </Flex>
          <Box>
            <Text fontWeight="800" fontSize="lg">Pay Electricity</Text>
            <Text fontSize="xs" color="rgba(255,255,255,0.8)">Buy power tokens instantly</Text>
          </Box>
        </HStack>
      </Box>

      <Box px={{ base: 5, md: 7 }} py={6}>
        <Text fontSize="xs" fontWeight="700" color="ink.400" letterSpacing="0.08em" mb={3}>SELECT DISCO</Text>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} gap={3} mb={6}>
          {DISCO_PROVIDERS.map((p) => {
            const sel = provider === p.id;
            return (
              <Box
                key={p.id}
                as="button"
                onClick={() => { setProvider(p.id); setVerified(false); setCustomerName(""); }}
                borderRadius="xl"
                py={3}
                px={2}
                textAlign="center"
                transition="all .2s"
                border="2px solid"
                borderColor={sel ? p.color : "ink.100"}
                bg="white"
                _hover={{ borderColor: p.color, transform: "scale(1.03)", boxShadow: `0 6px 16px ${p.color}20` }}
                position="relative"
                overflow="hidden"
              >
                {sel && (
                  <Box position="absolute" top="0" left="0" right="0" h="3px" bg={p.color} />
                )}
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="lg"
                  overflow="hidden"
                  mx="auto"
                  mb={1.5}
                  border="1px solid"
                  borderColor={sel ? p.color : "ink.100"}
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Text fontSize="xs" fontWeight="700" color={sel ? "ink.900" : "ink.500"}>{p.name}</Text>
                {sel && (
                  <Flex position="absolute" top="6px" right="6px" w="16px" h="16px" bg={p.color} borderRadius="full" align="center" justify="center">
                    <Icon fontSize="7px" color="white"><FaCheck /></Icon>
                  </Flex>
                )}
              </Box>
            );
          })}
        </SimpleGrid>

        <VStack align="stretch" gap={5}>
          <Field label="Meter number">
            <Input
              placeholder="Enter meter number"
              value={meterNumber}
              onChange={(e) => { setMeterNumber(e.target.value); setVerified(false); }}
              size="lg"
              borderRadius="xl"
              fontWeight="600"
            />
          </Field>

          <Box>
            <Text fontSize="xs" fontWeight="700" color="ink.400" letterSpacing="0.08em" mb={3}>METER TYPE</Text>
            <HStack gap={2}>
              {["prepaid", "postpaid"].map((t) => (
                <Box
                  key={t}
                  as="button"
                  flex="1"
                  onClick={() => { setMeterType(t); setVerified(false); }}
                  bg={meterType === t ? "ink.900" : "ink.50"}
                  color={meterType === t ? "white" : "ink.600"}
                  borderRadius="xl"
                  py={3}
                  fontWeight="700"
                  fontSize="sm"
                  textAlign="center"
                  textTransform="capitalize"
                  transition="all .2s"
                  border="2px solid"
                  borderColor={meterType === t ? "ink.900" : "transparent"}
                >
                  {t}
                </Box>
              ))}
            </HStack>
          </Box>

          <Button
            variant="outline"
            colorPalette="cyan"
            borderRadius="xl"
            size="lg"
            onClick={verify}
            loading={verifying}
            disabled={!provider || !meterNumber}
            fontWeight="700"
            gap={2}
          >
            <FaBolt /> Verify meter
          </Button>

          {verified && customerName && (
            <Box
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.12))" }}
              border="1px solid"
              borderColor="green.200"
              borderRadius="xl"
              p={4}
            >
              <HStack gap={3}>
                <Flex w="36px" h="36px" bg="green.100" borderRadius="full" align="center" justify="center">
                  <Icon color="green.600" fontSize="sm"><FaCircleCheck /></Icon>
                </Flex>
                <Box>
                  <Text fontSize="xs" color="green.600" fontWeight="700">VERIFIED CUSTOMER</Text>
                  <Text fontSize="sm" fontWeight="700" color="ink.900">{customerName}</Text>
                </Box>
              </HStack>
            </Box>
          )}

          {verified && (
            <>
              <Field label="Amount">
                <Input
                  type="number"
                  placeholder="₦1,000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  size="lg"
                  borderRadius="xl"
                  fontSize="lg"
                  fontWeight="700"
                />
              </Field>
              <PayButton loading={busy} onClick={submit} amount={amount} />
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SHARED COMPONENTS
   ════════════════════════════════════════════════════════════════════ */

function TelcoCard({ provider, selected, onClick }) {
  return (
    <Box
      as="button"
      onClick={onClick}
      borderRadius="xl"
      py={{ base: 3, md: 4 }}
      px={2}
      textAlign="center"
      transition="all .2s cubic-bezier(.4,0,.2,1)"
      border="2px solid"
      borderColor={selected ? provider.color : "ink.100"}
      bg="white"
      position="relative"
      overflow="hidden"
      _hover={{ borderColor: provider.color, transform: "scale(1.04)", boxShadow: `0 8px 20px ${provider.color}25` }}
    >
      {/* Colored top bar */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h={selected ? "4px" : "0px"}
        style={{ background: provider.bg }}
        transition="height .2s"
      />
      {/* Logo image */}
      <Box
        w="48px"
        h="48px"
        borderRadius="full"
        overflow="hidden"
        mx="auto"
        mb={2}
        border="2px solid"
        borderColor={selected ? provider.color : "ink.100"}
        transition="all .2s"
      >
        <img
          src={provider.logo}
          alt={provider.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Text fontWeight="700" fontSize="xs" color={selected ? "ink.900" : "ink.500"}>
        {provider.name}
      </Text>
      {selected && (
        <Flex position="absolute" bottom="6px" left="50%" transform="translateX(-50%)" w="18px" h="18px" style={{ background: provider.bg }} borderRadius="full" align="center" justify="center">
          <Icon fontSize="8px" color={provider.textColor || "white"}><FaCheck /></Icon>
        </Flex>
      )}
    </Box>
  );
}

function PayButton({ loading, onClick, amount, disabled }) {
  const displayAmt = amount ? naira(amount) : "";
  return (
    <Button
      w="100%"
      size="lg"
      bg="ink.900"
      color="white"
      borderRadius="xl"
      fontWeight="800"
      fontSize="md"
      _hover={{ bg: "ink.800", transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      transition="all .2s"
      loading={loading}
      onClick={onClick}
      disabled={disabled}
      gap={2}
    >
      <FaWallet /> Pay {displayAmt} from balance
    </Button>
  );
}

function SuccessCard({ title, subtitle, gradient, onReset }) {
  return (
    <Box bg="white" borderRadius="2xl" border="1px solid" borderColor="ink.100" overflow="hidden" textAlign="center">
      <Box style={{ background: gradient }} py={8} px={6} color="white">
        <Flex w="72px" h="72px" bg="rgba(255,255,255,0.2)" borderRadius="full" align="center" justify="center" mx="auto" mb={4} backdropFilter="blur(8px)">
          <Icon fontSize="2xl"><FaCircleCheck /></Icon>
        </Flex>
        <Heading fontSize="xl" mb={1}>{title}</Heading>
        <Text fontSize="sm" color="rgba(255,255,255,0.8)">{subtitle}</Text>
      </Box>
      <Box px={6} py={6}>
        <Text color="ink.500" fontSize="sm" mb={4}>Your Powerpay balance has been updated.</Text>
        <Button colorPalette="brand" borderRadius="xl" size="lg" w="100%" onClick={onReset} gap={2}>
          <FaRotate /> Pay another bill
        </Button>
      </Box>
    </Box>
  );
}
