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
import { useEffect } from "react";
import TransactionStore from "../Store/TransactionStore";
import { formatDate } from "../Helper";
import useAuthStore from "../Store/userStore";

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

export default function AllTransactions() {
  const { getTransactions,Transaction } = TransactionStore();
  const {user } = useAuthStore();
  useEffect(()=>{
    getTransactions()
  },[]) 
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
              ? Transaction.sort((a,b)=> b.date - a.date).filter((t)=>(t.userId == user.uid))
              : Transaction.filter(
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
                      <Flex justify='space-between' alignItems='center' gap={3}>
                        <Box><Image src={transaction.Icon}  w='40px'/></Box>
                        <Text fontWeight="bold">{transaction.Name}</Text>
                        <Spacer />
                        <Text>₦{transaction.Amount}</Text>
                      </Flex>
                      <Text color="gray.600">
                        {transaction.Type} - {formatDate(transaction.date)}
                      </Text>
                      <Flex justify='space-between' alignItems='center'>
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
                                      {transaction.Name}
                                    </Text>
                                  }
                                />
                                <DataListItem
                                  label="Type"
                                  value={
                                    <Text color="gray.600">
                                      {transaction.Type}
                                    </Text>
                                  }
                                />
                                <DataListItem
                                  label="Date"
                                  value={
                                    <Text color="gray.600">
                                    {formatDate(transaction.date)}
                                  </Text>
                                  }
                                />
                                <DataListItem
                                  label="Amount"
                                  value={
                                    <Text fontWeight="bold" color="green.600">
                                     ₦{transaction.Amount}
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
                                  <DataListItem
                                  label="Description"
                                  value={
                                    <Text color="gray.600">
                                      {transaction.Description}
                                    </Text>
                                  }
                                />
                              </DataListRoot>
                              <Flex gap={4}>
                    {transaction.Images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Uploaded Gift Card ${index + 1}`}
                        w="100px"
                        objectFit="contain"
                        borderRadius="md"
                        display="inline-block"
                        flexShrink={0}
                      />
                    ))}
                  </Flex>
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
