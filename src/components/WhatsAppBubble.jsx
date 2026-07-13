"use client";
import { Box, Icon } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppBubble() {
  return (
    <Box
      as="a"
      href="https://wa.me/8168236123"
      target="_blank"
      rel="noopener noreferrer"
      position="fixed"
      bottom={{ base: "24px", md: "32px" }}
      right={{ base: "20px", md: "32px" }}
      zIndex={50}
      w="56px"
      h="56px"
      bg="#25D366"
      borderRadius="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      fontSize="28px"
      boxShadow="0 4px 14px rgba(37,211,102,0.4)"
      transition="transform .2s, box-shadow .2s"
      _hover={{ transform: "scale(1.1)", boxShadow: "0 6px 20px rgba(37,211,102,0.5)" }}
    >
      <Icon><FaWhatsapp /></Icon>
    </Box>
  );
}
