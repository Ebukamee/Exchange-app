import { Box, Text, Heading, Flex,Image, Container } from "@chakra-ui/react";
import { Blue } from "../assets/Colors";
import eye from '../assets/images/eye.svg'
import Amazon from '../assets/images/giftcard.svg'
import Bitcoin from '../assets/images/bitcoin.png'

export default function Home() {
  return (
    <Box p={10} color="gray.800">
      <Box bg={Blue.p} color="white" p={7} rounded="md" mb={10}>
        <Flex justifyContent='space-between'fontSize="12px">
          <Text color="gray.200">Total Trasanction Value</Text>
          <Image src={eye} alt='peep eye' />
        </Flex>
        <Heading as="h1" fontSize="3xl" my={4}>
          <Text as="span" color="gray.200" mr={2}>
            ₦
          </Text>
          0.00
        </Heading>
      </Box>
      <Container maxW='700px'>
        <Text fontSize='sm' color='gray.700' fontWeight='500' >
            Quick Actions
        </Text>
        <Box my={5} p={5} rounded='lg' bg="orange.100" maxW='700px'>
            <Flex justifyContent="space-between" alignItems='center'color='gray.500'>
                <Box>
                <Heading as='p' fontSize='lg' mb={4}>Trade Giftcards</Heading>
                <Text fontSize='sm'>
                      Exchange your Giftcards and receive instant cash
                    </Text> 
                </Box>
                <Image src={Amazon} alt="giftcard" w="100px" />
            </Flex>
        </Box>
        <Box my={5} p={5} rounded='lg' bg={Blue.bg} maxW='700px'>
            <Flex justifyContent="space-between" alignItems='center' color='gray.500'>
                <Box>
                <Heading as='p' fontSize='lg' mb={4}>Trade Crypto</Heading>
                <Text fontSize='sm'>
                      Send in Cryptocurrencies to our wallet and recieve your money worth instantly 
                    </Text> 
                </Box>
                <Image src={Bitcoin} alt="giftcard" w="100px" />
            </Flex>
        </Box>
      </Container>
    </Box>
  );
}
