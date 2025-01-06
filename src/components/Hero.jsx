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
import HeroBg from "../assets/images/hero-bg.svg";
import { Blue } from "../assets/Colors";

export default function Hero() {
  return (
    <>
    <Image src={HeroBg} position="absolute" top="0" right="0" zIndex="1" />
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
        
      <Heading as="h1" py={5} color="gray.700" fontSize={{base: "3xl", md: "4xl"}}>
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
      <Button color="white" bg={Blue.p} fontSize='lg' variant="solid" my={10} p={7}>
        Get Started
      </Button>
      </Container>
      <Box
        position="absolute"
        top="45%"
        left="5%"
        w="320px"
        h="270px"
        opacity="0.23"
        filter="blur(50px)"
        transform="translateY(-45%)"
        background="linear-gradient(74.98deg, #ff6608 -5.38%, #ff8a2d 41.58%, #ffe88f 168.53%)"
      />
      <Box
        position="absolute"
        top="50%"
        right="10%"
        w="320px"
        h="270px"
        opacity="0.23"
        filter="blur(50px)"
        transform="translateY(-50%)"
        background="#7580ef"
      />
      <Image src={Bg} position="absolute" bottom="0" left="0" zIndex="1" />
    </Container>
    </>
  );
}
