import {
    Box,
    Heading,
    Flex,
    Spacer,
    Button,
    Image,
    Text,
    TableHeader,
    TableRow,
    TableRoot,
    TableBody,
    TableColumnHeader,
    TableCell,
  } from "@chakra-ui/react";
  import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogBody,
    DialogFooter,
    DialogCloseTrigger,
  } from "../components/ui/dialog"; // Assuming you have a custom Dialog component
  import { useState } from "react";
import { Blue } from "../assets/Colors";

  
  export default function AdminDashboard() {
    const [selectedTransaction, setSelectedTransaction] = useState(null);
  
    const transactions = [
      {
        type: "Crypto",
        name: "Bitcoin",
        amount: "0.0034 BTC",
        status: "Completed",
        image: "/path/to/bitcoin-icon.png", // Example icon path
        proofImages: ["/path/to/proof1.png", "/path/to/proof2.png"], // Example proof images
      },
      {
        type: "Giftcard",
        name: "Amazon Gift Card",
        amount: "50 USD",
        status: "Pending",
        image: "/path/to/amazon-icon.png", // Example icon path
        proofImages: ["/path/to/proof3.png"], // Example proof images
      },
      {
        type: "Crypto",
        name: "Ethereum",
        amount: "0.045 ETH",
        status: "Completed",
        image: "/path/to/eth-icon.png", // Example icon path
        proofImages: ["/path/to/proof4.png"], // Example proof images
      },
      {
        type: "Giftcard",
        name: "Netflix Gift Card",
        amount: "25 USD",
        status: "Cancelled",
        image: "/path/to/netflix-icon.png", // Example icon path
        proofImages: ["/path/to/proof5.png"], // Example proof images
      },
      {
        type: "Crypto",
        name: "Tether",
        amount: "100 USDT",
        status: "Pending",
        image: "/path/to/tether-icon.png", // Example icon path
        proofImages: ["/path/to/proof6.png"], // Example proof images
      },
    ];
  
    const handleViewProof = (transaction) => {
      setSelectedTransaction(transaction);
    };
  
    return (
      <Box p={4} bg='gray.50'>
        <Flex mb={4} alignItems="center">
          <Heading as="h2" size="lg">
            Transactions
          </Heading>
          <Spacer />
        </Flex>
  
        <Box overflowX="auto" bg='gray.100'>
          <TableRoot>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>Type</TableColumnHeader>
                <TableColumnHeader>Name</TableColumnHeader>
                <TableColumnHeader>Amount</TableColumnHeader>
                <TableColumnHeader>Status</TableColumnHeader>
                <TableColumnHeader>Actions</TableColumnHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Flex alignItems="center">
                      <Image
                        src={transaction.image}
                        boxSize="20px"
                        mr={2}
                        alt={`${transaction.name} icon`}
                      />
                      <Text>{transaction.type}</Text>
                    </Flex>
                  </TableCell>
                  <TableCell>{transaction.name}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>
                    <DialogRoot>
                      <DialogTrigger>
                        <Button
                          bg={Blue.p}
                          size="sm"
                          onClick={() => handleViewProof(transaction)}
                        >
                          View Proof
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <Heading size="md">Proof Images</Heading>
                          <DialogCloseTrigger />
                        </DialogHeader>
                        <DialogBody>
                          {selectedTransaction?.proofImages?.length > 0 ? (
                            <Flex direction="column" gap={4}>
                              {selectedTransaction.proofImages.map(
                                (image, index) => (
                                  <Image
                                    key={index}
                                    src={image}
                                    alt={`Proof ${index + 1}`}
                                    borderRadius="md"
                                    objectFit="cover"
                                  />
                                )
                              )}
                            </Flex>
                          ) : (
                            <Text>No proof images available.</Text>
                          )}
                        </DialogBody>
                        <DialogFooter>
                          <DialogCloseTrigger asChild>
                            <Button colorScheme="teal">Close</Button>
                          </DialogCloseTrigger>
                        </DialogFooter>
                      </DialogContent>
                    </DialogRoot>
                  </TableCell>
                  <TableCell>
                    <Flex gap={4}>
                    <Button bg='green'>Confirm</Button>
                    <Button bg='red.700'>Reject</Button>
                    </Flex>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableRoot>
        </Box>
      </Box>
    );
  }