import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  IconButton,
  Button,
  Container,
  Image,
  Text,
} from "@chakra-ui/react";
import Bg from "../assets/images/design.svg";

export default function Hero() {
  return (
    <Container>
    <Container
      w="80%"
      maxW="800px"
      bg="white"
      textAlign="center"
      py={10}
      px={12}
      fontWeight="small"
    >
      <Heading as="h1" py={5} color="gray.700" fontSize="4xl">
        Trade your Giftcards and Crypto at
        <Text py={10} color="orange.300">
          Amazing Rates!
        </Text>
      </Heading>
      <Text color="gray.400" fontSize="lg">
        BlixExchange™ redeem gift cards, and exchange cryptocurrencies at the
        best exchange rates and price . Fast payments in Naira via bank
        transfer. Get the most value of gift cards and cryptocurrency now!
      </Text>
      <Button color="white" bg="blue.500" fontSize='lg' variant="solid" my={10} p={7}>
        Get Started
      </Button>
      </Container>
      <Image src={Bg} position="absolute" bottom="0" left="0" zIndex="1" />
    </Container>
  );
}
