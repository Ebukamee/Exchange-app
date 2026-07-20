"use client";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Input, Textarea, Button, SimpleGrid, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import ScrollReveal from "../components/ScrollReveal";
import Nav from "../components/nav";
import Footer from "../components/Footer";
import WhatsAppBubble from "../components/WhatsAppBubble";
import { Field } from "../components/ui/field";
import { toast } from "../Helper";
import { getWhatsapp } from "@/app/actions/catalog";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [waNumber, setWaNumber] = useState("8168236123");
  useEffect(() => {
    getWhatsapp().then((v) => { if (v?.number) setWaNumber(v.number); }).catch(() => {});
  }, []);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    toast("success", "Thanks — we'll get back to you shortly.", "Message sent");
  };
  return (
    <Box bg="white">
      <Nav />
      <Box maxW="1100px" mx="auto" px={{ base: 5, md: 8 }} py={16}>
        <ScrollReveal>
          <Box textAlign="center" mb={12}>
            <Text fontSize="sm" color="ink.400" fontWeight="700" letterSpacing="0.1em" mb={3}>
              CONTACT US
            </Text>
            <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "6xl" }} color="ink.900" letterSpacing="-0.03em">
              We'd love to hear from you
            </Heading>
            <Text mt={4} color="ink.500">
              Questions about a trade, rates or your account? Reach out anytime.
            </Text>
          </Box>
        </ScrollReveal>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <ScrollReveal direction="left">
          <VStack align="stretch" gap={5}>
            <ContactRow icon={FaEnvelope} label="Email" value="powermindfx@gmail.com" />
            <ContactRow icon={FaPhone} label="Phone" value="+234 816 8236 123" />
            <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer">
              <ContactRow icon={FaWhatsapp} label="WhatsApp" value="Chat with us" />
            </a>
            <ContactRow icon={FaLocationDot} label="Address" value="Lagos, Nigeria" />
            <Box bg="ink.950" color="white" borderRadius="l2" p={6}>
              <Heading fontSize="lg" mb={2}>Support hours</Heading>
              <Text color="ink.300" fontSize="sm">Our team is online 24/7 to help with any trade or question.</Text>
            </Box>
          </VStack>
          </ScrollReveal>

          <ScrollReveal direction="right">
          <Box as="form" onSubmit={submit} bg="white" border="1px solid" borderColor="ink.100" borderRadius="l2" p={7}>
            <VStack align="stretch" gap={4}>
              <Field label="Full name">
                <Input placeholder="Your name" required />
              </Field>
              <Field label="Email">
                <Input type="email" placeholder="you@email.com" required />
              </Field>
              <Field label="Message">
                <Textarea rows={5} placeholder="How can we help?" required />
              </Field>
              <Button type="submit" colorPalette="ink" rounded="full" size="lg" disabled={sent}>
                {sent ? "Message sent" : "Send message"}
              </Button>
            </VStack>
          </Box>
          </ScrollReveal>
        </SimpleGrid>
      </Box>
      <Footer />
      <WhatsAppBubble />
    </Box>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <HStack gap={4} bg="ink.50" borderRadius="l2" p={5}>
      <Icon color="brand.500" fontSize="lg">{<icon />}</Icon>
      <Box>
        <Text fontSize="sm" color="ink.500">{label}</Text>
        <Text fontWeight="600" color="ink.900">{value}</Text>
      </Box>
    </HStack>
  );
}

