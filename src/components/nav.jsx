import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  IconButton,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

// Brand colors
const brandColors = {
  blue: "#1E6DEA",   // Primary blue
  pink: "#E83D84",   // Accent pink
  dark: "#2D3748",   // For text
  light: "#718096",  // Secondary text
};

export default function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Technology", path: "/technology" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <Box as="header" bg="white" px={{ base: 4, md: 8 }} py={4} w="100%" boxShadow="sm">
      {/* Desktop Navigation */}
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <Flex align="center">
          <Heading 
            as="h1" 
            size="lg" 
            color={brandColors.blue}
            fontFamily="heading"
            letterSpacing="tight"
          >
            Princeton Dental & Lab
          </Heading>
          <Text 
            fontSize="xs" 
            ml={2} 
            color={brandColors.pink}
            fontWeight="medium"
            display={{ base: "none", lg: "block" }}
          >
            Behind every perfect smile...
          </Text>
        </Flex>

        {/* Navigation Links - Hidden on mobile */}
        <HStack 
          spacing={{ base: 4, md: 6, lg: 8 }}
          display={{ base: "none", md: "flex" }}
        >
          {navItems.map((item) => (
            <Link to={item.path} key={item.label}>
              <Text 
                fontSize="md" 
                fontWeight="medium" 
                color={brandColors.dark}
                _hover={{ color: brandColors.blue }}
              >
                {item.label}
              </Text>
            </Link>
          ))}
        </HStack>

        {/* CTA Button */}
        <Button
          color="white"
          bg={brandColors.blue}
          _hover={{ bg: "#1553c9" }}
          size={isMobile ? "sm" : "md"}
          onClick={() => navigate("/contact")}
          display={{ base: "none", md: "block" }}
        >
          Get a Quote
        </Button>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Toggle menu"
          icon={isMenuOpen ? <FaTimes /> : <FaBars />}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          display={{ md: "none" }}
          variant="ghost"
          color={brandColors.dark}
          size="lg"
        />
      </Flex>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <Box
          bg="white"
          p={4}
          shadow="md"
          rounded="md"
          mt={2}
          w="100%"
          position="absolute"
          left={0}
          zIndex={10}
        >
          <VStack spacing={4} align="stretch">
            {navItems.map((item) => (
              <Link 
                to={item.path} 
                key={`mobile-${item.label}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Text 
                  fontSize="lg" 
                  fontWeight="medium" 
                  color={brandColors.dark}
                  py={2}
                  borderBottom="1px"
                  borderColor="gray.100"
                >
                  {item.label}
                </Text>
              </Link>
            ))}
            <Button
              color="white"
              bg={brandColors.blue}
              _hover={{ bg: "#1553c9" }}
              mt={4}
              onClick={() => {
                navigate("/contact");
                setIsMenuOpen(false);
              }}
            >
              Get a Quote
            </Button>
          </VStack>
        </Box>
      )}
    </Box>
  );
          }
