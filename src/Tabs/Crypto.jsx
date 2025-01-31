import {
  Box,
  Container,
  Image,
  Tabs,
  Text,
  VStack,
  Flex,
  Spacer,
  DialogHeader,
  Heading,
  DialogCloseTrigger,
  Button,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogBody,
} from "../components/ui/dialog";
import { DataListRoot, DataListItem } from "../components/ui/data-list";
import No from "../assets/images/no-history.svg";

const mockTransactions = [
  {
    id: 1,
    name: "Bitcoin",
    type: "Crypto",
    date: "2025-01-30",
    amount: "₦500,000",
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Ethereum",
    type: "Crypto",
    date: "2025-01-28",
    amount: "₦300,000",
    status: "Pending",
  },
  {
    id: 3,
    name: "Tether",
    type: "Crypto",
    date: "2025-01-27",
    amount: "₦150,000",
    status: "Rejected",
  },
];

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
          <Tabs.Trigger value="confirmed">Confirmed</Tabs.Trigger>
          <Tabs.Trigger value="rejected">Rejected</Tabs.Trigger>
        </Tabs.List>

        {["all", "pending", "confirmed", "rejected"].map((status) => {
          const filteredTransactions =
            status === "all"
              ? mockTransactions
              : mockTransactions.filter(
                  (t) => t.status.toLowerCase() === status
                );

          return (
            <Tabs.Content key={status} value={status} p={4}>
              {filteredTransactions.length > 0 ? (
                <VStack spacing={4} w="100%">
                  {filteredTransactions.map((transaction) => (
                    <Box
                      key={transaction.id}
                      p={4}
                      w="100%"
                      borderWidth="1px"
                      borderRadius="md"
                      bg="gray.50"
                    >
                      <Flex>
                        <Text fontWeight="bold">{transaction.name}</Text>
                        <Spacer />
                        <Text>{transaction.amount}</Text>
                      </Flex>
                      <Text color="gray.600">
                        {transaction.type} - {transaction.date}
                      </Text>
                      <Flex justify='space-between'>
                      <Text
                            color={
                              transaction.status === "Confirmed"
                                ? "green.500"
                                : transaction.status === "Pending"
                                ? "orange.500"
                                : "red.500"
                            }
                            cursor="pointer"
                          >
                            {transaction.status}
                          </Text>
                      {/* <Divider my={2} /> */}
                      <DialogRoot>
                        <DialogTrigger>
                      <Button bg='green'>View</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <Heading size="md">Transaction Summary</Heading>
                            <DialogCloseTrigger />
                          </DialogHeader>
                          <DialogBody>
                            <VStack spacing={4} align="stretch">
                              <DataListRoot orientation="horizontal">
                                <DataListItem
                                  label="Name"
                                  value={
                                    <Text fontWeight="medium">
                                      {transaction.name}
                                    </Text>
                                  }
                                />
                                <DataListItem
                                  label="Type"
                                  value={
                                    <Text color="gray.600">
                                      {transaction.type}
                                    </Text>
                                  }
                                />
                                <DataListItem
                                  label="Date"
                                  value={
                                    <Text color="gray.600">
                                      {transaction.date}
                                    </Text>
                                  }
                                />
                                <DataListItem
                                  label="Amount"
                                  value={
                                    <Text fontWeight="bold" color="green.600">
                                      {transaction.amount}
                                    </Text>
                                  }
                                />
                                <DataListItem
                                  label="Status"
                                  value={
                                    <Text color="gray.600">
                                      {transaction.status}
                                    </Text>
                                  }
                                />
                              </DataListRoot>
                            </VStack>
                          </DialogBody>
                        </DialogContent>
                      </DialogRoot>
                      </Flex>
                    </Box>
                  ))}
                </VStack>
              ) : (
                <Container
                  maxW="500px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  h="50vh"
                >
                  <Image src={No} alt="no transaction record" />
                  <Text
                    textAlign="center"
                    mt={4}
                    color="gray.700"
                    fontSize="sm"
                  >
                    No Transaction Record
                  </Text>
                </Container>
              )}
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </Box>
  );
}
