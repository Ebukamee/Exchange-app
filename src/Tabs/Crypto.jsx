import { Box, Container, Image, Tabs, Text } from "@chakra-ui/react";
import No from "../assets/images/no-history.svg";

export default function CryptoTransactions() {
  return (
    <Box>
      <Tabs.Root defaultValue="all" w="100%" my={10} variant="enclosed">
        <Tabs.List
          display="flex"
          w="100%"
          justifyContent="space-between"
          color="white"
          py={3}
        >
          <Tabs.Trigger value="all">All</Tabs.Trigger>
          <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
          <Tabs.Trigger value="confirmed">Confirmed </Tabs.Trigger>
          <Tabs.Trigger value="rejected">Rejected </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all" p={20} py={0}>
          <Container
            maxW="500px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="50vh"
          >
            <Image src={No} alt="no transaction record" />
            <Text textAlign="center" mt={4} color='gray.700' fontSize="sm">No Crypto Transaction Record</Text>
          </Container>
        </Tabs.Content>
        <Tabs.Content value="pending" p={20} py={0}>
          <Container
            maxW="500px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="50vh"
          >
            <Image src={No} alt="no transaction record" />
            <Text textAlign="center" mt={4} color='gray.700' fontSize="sm">No Pending Crypto Transaction Record</Text>
          </Container>
        </Tabs.Content>
        <Tabs.Content value="confirmed" p={20} py={0}>
          <Container
            maxW="500px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="50vh"
          >
            <Image src={No} alt="no transaction record" />
            <Text textAlign="center" mt={4} color='gray.700' fontSize="sm">No Confirmed Crypto Transaction Record</Text>
          </Container>
        </Tabs.Content>
        <Tabs.Content value="rejected" p={20} py={0}>
          <Container
            maxW="500px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="50vh"
          >
            <Image src={No} alt="no transaction record" />
            <Text textAlign="center" mt={4} color='gray.700' fontSize="sm">No Rejected Crypto Transaction Record</Text>
          </Container>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
