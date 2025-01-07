import { Box, Grid, Heading, Text,Flex,Image } from '@chakra-ui/react';
import X from '../assets/images/x.svg';
import FB from '../assets/images/fb.svg';
import IG from '../assets/images/ig.svg';

export default function Footer() {
  return (
    <Box bg="blue.800" py={16} px={16} mt={20} color='white'>
      <Grid
        templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }}
        gap={8}
      >
        {/* Logo Section */}
        <Box>
          <Heading as="h2" size="3xl" color="teal.300">
                   BlixExchange
                 </Heading>
        </Box>

        {/* Explore Section */}
        <Box>
        <Heading size="xl" fontWeight='bold' color='white' mb={5}>Explore</Heading>
          <Text mb={2} fontSize='lg'>Aboout</Text>
          <Text mb={2} fontSize='lg'>Rates</Text>
          <Text mb={2} fontSize='lg'>Blog</Text>
        </Box>

        {/* Support Section */}
        <Box>
        <Heading size="xl" fontWeight='bold' color='white' mb={5}>Support</Heading>
        <Text mb={2} fontSize='lg'>X(Twitter)</Text>
        <Text mb={2} fontSize='lg'>Whatsapp</Text>
        <Text mb={2} fontSize='lg'>FaceBook</Text>
        <Text mb={2} fontSize='lg'>Instagram</Text>
        </Box>

        {/* Blog Section */}
        <Box gap={5}>
          <Heading size="xl" fontWeight='bold' color='white' mb={5}>Official Blog</Heading>
          <Text mb={2} fontSize='lg'>Official blog</Text>
          <Text mb={2} fontSize='lg'>Engineering blog</Text>
        </Box>
      </Grid>
      <Flex mt={20} gap={5} justify='space-between' flexDirection={{base:'column',lg:'row'}}>
        <Flex gap={3}>
            <Image src={X} />
            <Image src={FB} />
            <Image src={IG} />
        </Flex>
        <Text >© {new Date().getFullYear()} Blixexchange. All Rights Reserved.</Text>
      </Flex>
      
    </Box>
  );
}
