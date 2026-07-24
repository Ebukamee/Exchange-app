"use client";
import { useEffect, useState } from "react";
import {
  Box, Flex, Heading, Text, SimpleGrid, VStack, HStack, Icon, Button, Input, Spinner, Badge,
} from "@chakra-ui/react";
import {
  FaBolt, FaWifi, FaPhone, FaCheck, FaCopy, FaClockRotateLeft,
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

const TABS = [
  { key: "airtime", label: "Airtime", icon: FaPhone, color: "#f59e0b" },
  { key: "data", label: "Data", icon: FaWifi, color: "#8b5cf6" },
  { key: "electricity", label: "Electricity", icon: FaBolt, color: "#06b6d4" },
];

const TELCO_PROVIDERS = [
  { id: "mtn", name: "MTN", color: "#FFCB05", textColor: "#1a1a1a" },
  { id: "glo", name: "GLO", color: "#50B651", textColor: "#fff" },
  { id: "airtel", name: "Airtel", color: "#ED1C24", textColor: "#fff" },
  { id: "etisalat", name: "9mobile", color: "#006B3F", textColor: "#fff" },
];

const DISCO_PROVIDERS = [
  { id: "ikeja-electric", name: "Ikeja Electric", color: "#E8430C" },
  { id: "eko-electric", name: "Eko Electric", color: "#1B4F72" },
  { id: "abuja-electric", name: "Abuja Electric", color: "#2E86C1" },
  { id: "kano-electric", name: "Kano Electric", color: "#27AE60" },
  { id: "portharcourt-electric", name: "PH Electric", color: "#8E44AD" },
  { id: "jos-electric", name: "Jos Electric", color: "#D4AC0D" },
  { id: "kaduna-electric", name: "Kaduna Electric", color: "#CA6F1E" },
  { id: "ibadan-electric", name: "Ibadan Electric", color: "#1ABC9C" },
  { id: "enugu-electric", name: "Enugu Electric", color: "#2C3E50" },
  { id: "benin-electric", name: "Benin Electric", color: "#C0392B" },
];

const QUICK_AMOUNTS = [100, 200, 500, 1000, 2000, 5000];

export default function PayBills() {
  const { profile, getProfile } = useAuthStore();
  const [tab, setTab] = useState("airtime");
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
        <ScrollReveal>
          <Box>
            <Heading fontFamily="heading" fontSize={{ base: "xl", md: "2xl" }} color="ink.900" mb={1}>
              Pay Bills
            </Heading>
            <Text color="ink.500" fontSize="sm">Buy airtime, data bundles, and pay electricity bills instantly.</Text>
          </Box>
        </ScrollReveal>

        {/* Tab selector */}
        <ScrollReveal delay={0.05}>
          <HStack gap={2} flexWrap="wrap">
            {TABS.map((t) => (
              <Button
                key={t.key}
                size="sm"
                variant={tab === t.key ? "solid" : "outline"}
                colorPalette={tab === t.key ? "brand" : "gray"}
                borderRadius="full"
                onClick={() => setTab(t.key)}
                gap={2}
              >
                <Icon color={tab === t.key ? "white" : t.color}><t.icon /></Icon>
                {t.label}
              </Button>
            ))}
          </HStack>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {tab === "airtime" && <AirtimeTab onDone={refreshAfter} />}
          {tab === "data" && <DataTab onDone={refreshAfter} />}
          {tab === "electricity" && <ElectricityTab onDone={refreshAfter} />}
        </ScrollReveal>

        {/* Bill history */}
        <ScrollReveal delay={0.15}>
          <Box bg="white" borderRadius="xl" border="1px solid" borderColor="ink.100" p={{ base: 5, md: 6 }}>
            <HStack gap={2} mb={4}>
              <Icon color="ink.400"><FaClockRotateLeft /></Icon>
              <Heading fontSize="lg" color="ink.900" fontFamily="heading">Recent Bills</Heading>
            </HStack>
            {loadingHistory ? (
              <Flex justify="center" py={10}><Spinner color="brand.500" /></Flex>
            ) : history.length === 0 ? (
              <Text color="ink.400" textAlign="center" py={8} fontSize="sm">No bill payments yet.</Text>
            ) : (
              <VStack align="stretch" gap={0} divideY="1px" divideColor="ink.100">
                {history.map((b) => (
                  <Flex key={b.id} justify="space-between" align="center" py={3} flexWrap="wrap" gap={2}>
                    <HStack gap={3}>
                      <Flex
                        w="36px" h="36px" borderRadius="lg" align="center" justify="center"
                        bg={b.type === "airtime" ? "rgba(245,158,11,0.1)" : b.type === "data" ? "rgba(139,92,246,0.1)" : "rgba(6,182,212,0.1)"}
                      >
                        <Icon fontSize="sm" color={b.type === "airtime" ? "#f59e0b" : b.type === "data" ? "#8b5cf6" : "#06b6d4"}>
                          {b.type === "airtime" ? <FaPhone /> : b.type === "data" ? <FaWifi /> : <FaBolt />}
                        </Icon>
                      </Flex>
                      <Box>
                        <Text fontWeight="600" color="ink.900" fontSize="sm" textTransform="capitalize">
                          {b.type} • {b.provider}
                        </Text>
                        <Text fontSize="xs" color="ink.400">{b.phone_or_meter} • {formatDate(b.created_at)}</Text>
                      </Box>
                    </HStack>
                    <HStack gap={2}>
                      <Text fontWeight="700" fontSize="sm" color="ink.900">{naira(b.amount)}</Text>
                      <Badge colorPalette={b.vtpass_status === "delivered" ? "green" : b.vtpass_status === "failed" ? "red" : "yellow"}>
                        {b.vtpass_status}
                      </Badge>
                    </HStack>
                  </Flex>
                ))}
              </VStack>
            )}
          </Box>
        </ScrollReveal>
      </VStack>
    </DashboardLayout>
  );
}

/* ──────────── Airtime Tab ──────────── */
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

  if (done) return <SuccessCard message="Airtime delivered!" onReset={() => { setDone(false); setPhone(""); setAmount(""); setProvider(""); }} />;

  return (
    <Box bg="white" borderRadius="xl" border="1px solid" borderColor="ink.100" p={{ base: 5, md: 7 }}>
      <Text fontWeight="800" color="ink.900" mb={4}>Buy Airtime</Text>

      <Text fontSize="sm" fontWeight="600" color="ink.600" mb={2}>Select network</Text>
      <SimpleGrid columns={4} gap={3} mb={5}>
        {TELCO_PROVIDERS.map((p) => (
          <ProviderCard key={p.id} provider={p} selected={provider === p.id} onClick={() => setProvider(p.id)} />
        ))}
      </SimpleGrid>

      <VStack align="stretch" gap={4}>
        <Field label="Phone number">
          <Input placeholder="08012345678" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={11} />
        </Field>

        <Box>
          <Text fontSize="sm" fontWeight="600" color="ink.600" mb={2}>Quick amount</Text>
          <SimpleGrid columns={3} gap={2}>
            {QUICK_AMOUNTS.map((a) => (
              <Button
                key={a}
                size="sm"
                variant={Number(amount) === a ? "solid" : "outline"}
                colorPalette={Number(amount) === a ? "brand" : "gray"}
                borderRadius="lg"
                onClick={() => setAmount(String(a))}
              >
                ₦{a.toLocaleString()}
              </Button>
            ))}
          </SimpleGrid>
        </Box>

        <Field label="Or enter amount">
          <Input type="number" placeholder="₦100" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>

        <Button colorPalette="brand" size="lg" borderRadius="xl" loading={busy} onClick={submit}>
          Pay from balance
        </Button>
      </VStack>
    </Box>
  );
}

/* ──────────── Data Tab ──────────── */
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

  if (done) return <SuccessCard message="Data bundle delivered!" onReset={() => { setDone(false); setPhone(""); setProvider(""); setSelectedPlan(null); setPlans([]); }} />;

  return (
    <Box bg="white" borderRadius="xl" border="1px solid" borderColor="ink.100" p={{ base: 5, md: 7 }}>
      <Text fontWeight="800" color="ink.900" mb={4}>Buy Data</Text>

      <Text fontSize="sm" fontWeight="600" color="ink.600" mb={2}>Select network</Text>
      <SimpleGrid columns={4} gap={3} mb={5}>
        {TELCO_PROVIDERS.map((p) => (
          <ProviderCard key={p.id} provider={p} selected={provider === p.id} onClick={() => pickProvider(p.id)} />
        ))}
      </SimpleGrid>

      <VStack align="stretch" gap={4}>
        <Field label="Phone number">
          <Input placeholder="08012345678" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={11} />
        </Field>

        {loadingPlans && <Flex justify="center" py={4}><Spinner color="brand.500" size="sm" /></Flex>}

        {plans.length > 0 && (
          <Box>
            <Text fontSize="sm" fontWeight="600" color="ink.600" mb={2}>Select plan</Text>
            <VStack align="stretch" gap={2} maxH="240px" overflowY="auto">
              {plans.map((p) => (
                <Box
                  key={p.code}
                  as="button"
                  w="100%"
                  textAlign="left"
                  onClick={() => setSelectedPlan(p)}
                  bg={selectedPlan?.code === p.code ? "brand.50" : "ink.50"}
                  border="1px solid"
                  borderColor={selectedPlan?.code === p.code ? "brand.200" : "transparent"}
                  borderRadius="lg"
                  px={4}
                  py={3}
                  transition="all .15s"
                  _hover={{ borderColor: "brand.200" }}
                >
                  <Flex justify="space-between" align="center">
                    <Text fontSize="sm" fontWeight="600" color="ink.800">{p.name}</Text>
                    <Text fontSize="sm" fontWeight="700" color="brand.600">{naira(p.amount)}</Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        {selectedPlan && (
          <Box bg="brand.50" borderRadius="lg" p={3}>
            <Text fontSize="sm" color="brand.700" fontWeight="600">
              Selected: {selectedPlan.name} — {naira(selectedPlan.amount)}
            </Text>
          </Box>
        )}

        <Button colorPalette="brand" size="lg" borderRadius="xl" loading={busy} onClick={submit} disabled={!selectedPlan}>
          Pay from balance
        </Button>
      </VStack>
    </Box>
  );
}

/* ──────────── Electricity Tab ──────────── */
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
      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="ink.100" p={{ base: 5, md: 7 }} textAlign="center">
        <Flex w="64px" h="64px" bg="green.50" borderRadius="full" align="center" justify="center" mx="auto" mb={4}>
          <Icon color="green.500" fontSize="2xl"><FaCheck /></Icon>
        </Flex>
        <Heading fontSize="lg" color="ink.900" mb={2}>Payment Successful!</Heading>
        {token && (
          <Box bg="cyan.50" border="1px solid" borderColor="cyan.200" borderRadius="xl" p={4} my={4}>
            <Text fontSize="xs" color="cyan.600" fontWeight="600" mb={1}>YOUR ELECTRICITY TOKEN</Text>
            <Text fontFamily="mono" fontSize="xl" fontWeight="800" color="cyan.800" letterSpacing="0.05em">{token}</Text>
            <Button
              size="xs"
              variant="ghost"
              colorPalette="cyan"
              mt={2}
              onClick={() => { navigator.clipboard.writeText(token); toast("success", "Token copied!", "Copied"); }}
            >
              <FaCopy /> Copy token
            </Button>
          </Box>
        )}
        <Button colorPalette="brand" borderRadius="xl" onClick={() => { setDone(false); setProvider(""); setMeterNumber(""); setAmount(""); setVerified(false); setCustomerName(""); setToken(""); }}>
          Pay another bill
        </Button>
      </Box>
    );
  }

  return (
    <Box bg="white" borderRadius="xl" border="1px solid" borderColor="ink.100" p={{ base: 5, md: 7 }}>
      <Text fontWeight="800" color="ink.900" mb={4}>Pay Electricity</Text>

      <Text fontSize="sm" fontWeight="600" color="ink.600" mb={2}>Select distribution company</Text>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} gap={2} mb={5}>
        {DISCO_PROVIDERS.map((p) => (
          <Box
            key={p.id}
            as="button"
            onClick={() => { setProvider(p.id); setVerified(false); setCustomerName(""); }}
            bg={provider === p.id ? p.color : "ink.50"}
            color={provider === p.id ? "white" : "ink.700"}
            borderRadius="lg"
            px={3}
            py={2.5}
            fontSize="xs"
            fontWeight="700"
            textAlign="center"
            border="2px solid"
            borderColor={provider === p.id ? p.color : "transparent"}
            transition="all .15s"
            _hover={{ borderColor: p.color }}
          >
            {p.name}
          </Box>
        ))}
      </SimpleGrid>

      <VStack align="stretch" gap={4}>
        <Field label="Meter number">
          <Input placeholder="Enter meter number" value={meterNumber} onChange={(e) => { setMeterNumber(e.target.value); setVerified(false); }} />
        </Field>

        <Box>
          <Text fontSize="sm" fontWeight="600" color="ink.600" mb={2}>Meter type</Text>
          <HStack gap={2}>
            {["prepaid", "postpaid"].map((t) => (
              <Button
                key={t}
                size="sm"
                variant={meterType === t ? "solid" : "outline"}
                colorPalette={meterType === t ? "brand" : "gray"}
                borderRadius="lg"
                onClick={() => { setMeterType(t); setVerified(false); }}
                textTransform="capitalize"
              >
                {t}
              </Button>
            ))}
          </HStack>
        </Box>

        <Button
          variant="outline"
          colorPalette="brand"
          borderRadius="xl"
          onClick={verify}
          loading={verifying}
          disabled={!provider || !meterNumber}
        >
          Verify meter
        </Button>

        {verified && customerName && (
          <Box bg="green.50" border="1px solid" borderColor="green.200" borderRadius="lg" p={3}>
            <HStack gap={2}>
              <Icon color="green.500"><FaCheck /></Icon>
              <Text fontSize="sm" fontWeight="600" color="green.700">{customerName}</Text>
            </HStack>
          </Box>
        )}

        {verified && (
          <>
            <Field label="Amount">
              <Input type="number" placeholder="₦1,000" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Field>
            <Button colorPalette="brand" size="lg" borderRadius="xl" loading={busy} onClick={submit}>
              Pay from balance
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
}

/* ──────────── Shared Components ──────────── */
function ProviderCard({ provider, selected, onClick }) {
  return (
    <Box
      as="button"
      onClick={onClick}
      bg={selected ? provider.color : "ink.50"}
      color={selected ? (provider.textColor || "white") : "ink.700"}
      borderRadius="xl"
      py={3}
      textAlign="center"
      fontWeight="800"
      fontSize="sm"
      border="2px solid"
      borderColor={selected ? provider.color : "transparent"}
      transition="all .15s"
      _hover={{ borderColor: provider.color }}
    >
      {provider.name}
    </Box>
  );
}

function SuccessCard({ message, onReset }) {
  return (
    <Box bg="white" borderRadius="xl" border="1px solid" borderColor="ink.100" p={{ base: 5, md: 7 }} textAlign="center">
      <Flex w="64px" h="64px" bg="green.50" borderRadius="full" align="center" justify="center" mx="auto" mb={4}>
        <Icon color="green.500" fontSize="2xl"><FaCheck /></Icon>
      </Flex>
      <Heading fontSize="lg" color="ink.900" mb={2}>{message}</Heading>
      <Text color="ink.500" fontSize="sm" mb={4}>Your balance has been updated.</Text>
      <Button colorPalette="brand" borderRadius="xl" onClick={onReset}>Pay another bill</Button>
    </Box>
  );
}
