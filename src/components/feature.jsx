import { Box, Flex, Heading, Text, Icon, Button, Stack,Image } from "@chakra-ui/react";
import Giftcard from '../assets/images/giftcard.svg'
import Crypto from '../assets/images/crypto.svg'


function FeaturesSection() {
  return (
    <Box bg="blue.900" color="white" py={16} px={8} my={5}>
      {/* Title Section */}
      <Box textAlign="center" mb={10}>
        <Text fontSize="sm" color="blue.300" fontWeight="bold" mb={2}>
          WHAT WE OFFER
        </Text>
        <Heading size="lg">Here are our services</Heading>
      </Box>

      {/* Features Grid */}
      <Flex
        justifyContent="center"
        wrap="wrap"
        gap={8}
        maxW="1200px"
        mx="auto"
      >
        {/* Feature 1 */}
        <Box
          bg="blue.800"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          maxW="400px"
        >
            <Box mx='auto' w='fit-content' my={2}>
            <Image src={Giftcard} />
            </Box>
          <Heading size="md" mb={4}>
            Buy & Sell Gift Cards
          </Heading>
          <Text fontSize="sm">
            You can buy gift cards or sell gift cards on Prestmit. Browse our
            extensive gift card catalogue and enjoy the best rates and prices.
          </Text>
        </Box>

        {/* Feature 2 */}
        <Box
          bg="blue.800"
          p={6}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
          maxW="400px"
        >
           <Box mx='auto' w='fit-content' my={2}>
            <Image src={Crypto} />
            </Box>
          <Heading size="md" mb={4}>
            Buy & Sell Cryptocurrencies
          </Heading>
          <Text fontSize="sm">
            You can easily buy and sell Bitcoin, Litecoin, Dogecoin, Ethereum,
            TRON, USDT, and more. All crypto transactions are automatic, safe,
            and secure.
          </Text>
        </Box>

      </Flex>
    </Box>
  );
}

export default FeaturesSection;
