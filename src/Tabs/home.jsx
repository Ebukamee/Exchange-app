import { Box, Text, Heading, Flex,Image } from "@chakra-ui/react";
import { Blue } from "../assets/Colors";
import eye from '../assets/images/eye.svg'

export default function Home() {
  return (
    <Box p={10} color="gray.800">
      <Box mb={10}>
        <Text>
          <span style={{ fontSize: "30px", fontWeight: "600" }}>
            Welcome 👋🏼,{" "}
          </span>
          Chukwuebuka
        </Text>
      </Box>
      <Box bg={Blue.p} color="white" p={5} rounded="md" mb={10}>
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
      <Box>
        <Text fontSize='sm' color='gray.700' >
            Quick Actions
        </Text>
        <Box my={5} p={5} rounded='md' bg={Blue.bg}>
            <Heading as='p' fontSize='xl'>Trade Giftcards</Heading>
        </Box>
        <Box my={5} rounded="md">

        </Box>
      </Box>
    </Box>
  );
}
