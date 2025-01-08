import { Box, Heading, Text, Flex, VStack, Select, Input, Button,Image } from "@chakra-ui/react";
import Nav from "../components/nav";
import Footer from "../components/Footer";
import { FormControl,FormLabel } from "@chakra-ui/form-control";
import RateBg from '../assets/images/rate-bg.svg'
import { Blue } from "../assets/Colors";

export default function RateCalculator() {
  return (
    <Box  minH="100vh">
      {/* Navigation Component */}
      <Nav />

      {/* Rate Calculator Section */}
      <Box maxW="container.lg" mx="auto" py={16} px={4}>
        <Flex
          direction={{ base: "column", md: "row" }}
          bg="white"
          borderRadius="lg"
          shadow="md"
          overflow="hidden"
        >
          {/* Left Section */}
          <Box flex="1" p={8} bg="g">
            <Heading as="h1" size="4xl" color="blue.900" mb={6}>
              Rate Calculator
            </Heading>
            <VStack spacing={6} align="stretch">
              <FormControl>
                <FormLabel>Gift Card Category</FormLabel>
                <select placeholder="Select a category">
                  <option>Category 1</option>
                  <option>Category 2</option>
                  <option>Category 3</option>
                </select>
              </FormControl>
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input type="number" placeholder="Type here" />
              </FormControl>
              <FormControl>
                <FormLabel>Gift Card</FormLabel>
                <select placeholder="Select a card">
                  <option>Card 1</option>
                  <option>Card 2</option>
                  <option>Card 3</option>
                </select>
              </FormControl>
              <Button bg={Blue.p} w='100px' mt={5}>
                SELL NOW!
              </Button>
            </VStack>
          </Box>

          {/* Right Section */}
          <Box flex="1" p={8} bg="gray.100" w='30%' m={5} textAlign="center" rounded='md'>
            <Image src={RateBg} position='absolute' top='0' left='0' />
            <Text fontSize="4xl" color="orange.400" fontWeight="bold">
              ₦0
            </Text>
            <Text fontSize="xl" color="blue.900" fontWeight="semibold" mt={4}>
              Nigerian Naira
            </Text>
            <Text fontSize="md" color="gray.600" mt={2}>
              You will get!
            </Text>
            <Text fontSize="sm" color="gray.500" mt={6}>
              For reference only, please click the button to check the latest price on WhatsApp.
            </Text>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
}
