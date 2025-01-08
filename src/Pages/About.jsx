import { Box, Heading, Text, VStack, Flex,Image } from "@chakra-ui/react";
import Nav from "../components/nav";
import Footer from "../components/Footer";
import Crypto from "../assets/images/crypto.webp";
import Giftcard from "../assets/images/giftcard.png";
import { Blue } from "../assets/Colors";

export default function About() {
  return (
    <Box>
      {/* Navigation Component */}
      <Nav />

      {/* About Section */}
      <Box py={16} px={8} color="gray.800">
        <VStack spacing={8} maxW="container.lg" mx="auto">
          <Heading as="h1" size="2xl" textAlign="center" color="blue.900">
            About Us
          </Heading>
          <Text fontSize="lg" textAlign="center" color="gray.600">
            Welcome to our platform! We specialize in providing a seamless
            experience for cryptocurrency trading and gift card redemption.
            Learn how to trade crypto or redeem your gift cards with us below.
          </Text>
        </VStack>
      </Box>

      {/* Crypto Trade Section */}
      <Box bg={Blue.bg} py={16} px={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-evenly"
          maxW="container.lg"
          mx="auto"
          gap={8}
        >
          <Box flex="1">
                <Heading as="h2" size="xl" mt={4} mb={2} color="blue.900">
                  How to Trade Crypto
                </Heading>
                <Text fontSize="md" color="gray.600" mt={4}>
                  Trading cryptocurrency on our platform is fast and easy.
                  Here's how:
                </Text>
                <VStack align="start" mt={4} spacing={2}>
                  <Text>
                    1. Create an account or log in to your existing account.
                  </Text>
                  <Text>2. Choose the cryptocurrency you want to trade.</Text>
                  <Text>3. Enter the amount and confirm your transaction.</Text>
                  <Text>
                    4. Track your transaction in real-time through your
                    dashboard.
                  </Text>
                </VStack>
          </Box>
          <Image src={Crypto} rounded='md' alt='crypto-image' w={{base:'100%',lg :'40%'}} />
        </Flex>
      </Box>

      {/* Giftcard Redeem Section */}
      <Box bg="gray.50" py={16} px={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          maxW="container.lg"
          mx="auto"
          gap={8}
        >
             <Image src={Giftcard} alt='giftcard-image' w={{base:'100%',lg :'40%'}} />
          <Box flex="1">
            <Heading as="h2" size="xl" mt={4} mb={2} color="blue.900">
              How to Redeem Gift Cards
            </Heading>
            <Text fontSize="md" color="gray.600" mt={4}>
              Redeeming gift cards is simple and convenient. Follow these steps:
            </Text>
            <VStack align="start" mt={4} spacing={2}>
              <Text>1. Select the gift card brand you want to redeem.</Text>
              <Text>2. Upload the gift card details or enter the code.</Text>
              <Text>3. Verify the balance and proceed with redemption.</Text>
              <Text>
                4. Get your payment instantly to your preferred account.
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Box>

      {/* Footer Component */}
      <Footer />
    </Box>
  );
}
