"use client";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "@/src/compat/router";
import { FaArrowRight } from "react-icons/fa6";
import Nav from "../components/nav";
import Hero from "../components/Hero";
import FeaturesSection from "../components/feature";
import BrandMarquee from "../components/BrandMarquee";
import TrustBadges from "../components/TrustBadges";
import Other from "../components/othersection";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

function CTA() {
  const nav = useNavigate();
  return (
    <Box maxW="1200px" mx="auto" px={{ base: 5, md: 8 }} mt={4}>
      <Box
        position="relative"
        overflow="hidden"
        bg="ink.950"
        borderRadius="l3"
        px={{ base: 8, md: 16 }}
        py={{ base: 14, md: 20 }}
        textAlign="center"
        color="white"
      >
        <Box position="absolute" bottom="-120px" left="50%" transform="translateX(-50%)" w="520px" h="420px" bg="brand.500" opacity={0.25} filter="blur(130px)" borderRadius="full" />
        <Heading fontFamily="heading" fontWeight="800" fontSize={{ base: "4xl", md: "6xl" }} letterSpacing="-0.03em" position="relative">
          Ready to trade?
        </Heading>
        <Text mt={4} fontSize={{ base: "md", md: "lg" }} color="ink.300" maxW="560px" mx="auto" position="relative">
          Join thousands of Nigerians getting the best value for their crypto and
          gift cards. It takes less than two minutes to start.
        </Text>
        <Flex justify="center" mt={9} position="relative">
          <Button size="xl" colorPalette="brand" rounded="full" px={8} fontWeight="700" onClick={() => nav("/signup")}>
            Create your free account <FaArrowRight />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Box bg="white">
      <Nav />
      <Hero />
      <FeaturesSection />
      <BrandMarquee />
      <TrustBadges />
      <Other />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </Box>
  );
}

