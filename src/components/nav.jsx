import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  IconButton,
  Button,
  //   Image,
  Text,
} from "@chakra-ui/react";
import { Link,useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Blue } from "../assets/Colors";

export default function Nav() {
  let Nav = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Box as="header" bg="white" px={6} py={4} w="100%" display="">
      {/* Desktop Navigation */}
      <Flex
        justify="space-between"
        align="center"
        display={{ base: "none", md: "flex" }}
      >
        {/* Logo */}
        <Heading as="h2" size="3xl" color="teal.500">
          BlixExchange
        </Heading>

        {/* Navigation Links */}
        <HStack spacing={20}>
          <Link to="/">
            <Text fontSize="md" fontWeight="small" mx="10px" color="gray.500">
              Home
            </Text>
          </Link>
          <Link to="/about">
            <Text fontSize="md" fontWeight="small" mx="10px" color="gray.500">
              About
            </Text>
          </Link>
          <Link to="/giftcard-rates">
            <Text fontSize="md" fontWeight="small" mx="10px" color="gray.500">
              Rates
            </Text>
          </Link>
          <Link to="/blog">
            <Text fontSize="md" fontWeight="small" mx="10px" color="gray.500">
              Blog
            </Text>
          </Link>
        </HStack>

        <Flex gap={5}>
          <Link to="/login">
            <Button
              color={Blue.p}
              bg="white"
              onClick={() => { Nav('/login')}}
              variant="solid"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button color="white" bg={Blue.p} variant="solid" onClick={() => { Nav('/signup')}}>
              Signup
            </Button>
          </Link>
        </Flex>
      </Flex>

      {/* Mobile Navigation */}
      <Flex
        justify="space-between"
        align="center"
        display={{ base: "flex", md: "none" }}
      >
        {/* Logo */}
        <Heading as="h1" size="md" color="teal.500">
          BlixExchange
        </Heading>

        {/* Menu Button */}
        <IconButton
          aria-label="Open Menu"
          icon={isMenuOpen ? <FaTimes /> : <FaBars />}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          variant="outline"
          color="black"
          zIndex="3"
        />
      </Flex>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <Box
          bg="white"
          p={4}
          shadow="md"
          rounded="lg"
          mt={2}
          w="100%"
          display={{ base: "flex", md: "none" }}
        >
          <VStack spacing={4} align="start">
            <Link to="/">
              <Text fontSize="md" fontWeight="small">
                Home
              </Text>
            </Link>
            <Link to="/about">
              <Text fontSize="md" fontWeight="small">
                About Us
              </Text>
            </Link>
            <Link to="/contact">
              <Text fontSize="md" fontWeight="small">
                Contact
              </Text>
            </Link>
            <Link to="/blog">
              <Text fontSize="md" fontWeight="small">
                Blog
              </Text>
            </Link>
            <Flex gap={5} my={5}>
              <Button color={Blue.p} bg="white" variant="solid" onClick={() => { Nav('/login')}}>
                Login
              </Button>
              <Button color="white" bg={Blue.p} variant="solid" onClick={() => { Nav('/signup')}}>
                Signup
              </Button>
            </Flex>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
