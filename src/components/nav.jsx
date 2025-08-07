// src/components/Navbar.js
import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useDisclosure,
  Collapse,
  Link,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Nav= () => {
  const { isOpen, onToggle } = useDisclosure();
  
  // Brand colors
  const brandBlue = "#1E6DEA"; // Primary brand blue
  const brandPink = "#E83D84"; // Secondary brand pink
  const lightBlue = "#E6F0FF"; // Light blue for backgrounds
  const darkBlue = "#0A3D91"; // Dark blue for hover states

  const navItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Technology", href: "#" },
    { label: "Team", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <Box as="header" position="sticky" top={0} zIndex={100} boxShadow="sm">
      <Flex
        bg="white"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            color={brandBlue}
          />
        </Flex>
        
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex align="center">
            <Box
              w="12px"
              h="40px"
              bg={brandBlue}
              mr={2}
              borderRadius="full"
            />
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={brandBlue}
              fontWeight="bold"
              fontSize="xl"
            >
              Princeton Dental & Lab
            </Text>
          </Flex>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Stack direction={"row"} spacing={6}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={"gray.600"}
                  position="relative"
                  _hover={{
                    color: brandBlue,
                    textDecoration: "none",
                    _after: {
                      content: '""',
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      height: "2px",
                      bg: brandBlue,
                      transform: "scaleX(1)",
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={3}
        >
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={brandBlue}
            href={"#"}
            _hover={{
              bg: darkBlue,
            }}
          >
            Request Quote
          </Button>
          
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={brandBlue}
            bg={"white"}
            border={"1px solid"}
            borderColor={brandBlue}
            href={"#"}
            _hover={{
              bg: lightBlue,
            }}
          >
            Contact Us
          </Button>
        </Stack>
      </Flex>

      {/* Mobile navigation */}
      <Collapse in={isOpen} animateOpacity>
        <Stack
          bg="white"
          p={4}
          display={{ md: "none" }}
          borderBottom="1px"
          borderColor="gray.200"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              py={2}
              href={item.href}
              fontSize="md"
              fontWeight="500"
              color="gray.600"
              borderBottom="1px"
              borderColor="gray.100"
              _hover={{
                color: brandBlue,
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          
          <Flex direction="column" gap={3} mt={4}>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={brandBlue}
              href={"#"}
              _hover={{
                bg: darkBlue,
              }}
            >
              Request Quote
            </Button>
            
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={600}
              color={brandBlue}
              bg={"white"}
              border={"1px solid"}
              borderColor={brandBlue}
              href={"#"}
              _hover={{
                bg: lightBlue,
              }}
            >
              Contact Us
            </Button>
          </Flex>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Nav;
