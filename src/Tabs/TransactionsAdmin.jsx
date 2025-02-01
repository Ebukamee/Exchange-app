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
  Tabs,
  TableColumnHeader,
  TableCell,
} from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "../components/ui/data-list";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "../components/ui/dialog"; // Assuming you have a custom Dialog component
import { useEffect, useState } from "react";
import { Blue } from "../assets/Colors";
import TransactionStore from "../Store/TransactionStore";
import useAuthStore from "../Store/userStore";
import { toast } from "../Helper";
import { toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";

export default function TransactionTable() {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const { getTransactions, Transaction, updateStatus } = TransactionStore();
  const { getBankDetails, BankDetails } = useAuthStore();
  useEffect(() => {
    getTransactions();
  }, []);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const statusUpdate = async (id, status) => {
    setLoading(true);
    toast("loading", "Please wait...", "Updating Status");
    try {
      await updateStatus(id, status);
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("success", "Status Updated", "Success");
      setTimeout(() => {
        Navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("error", err(error.message), "An Error Occured");
    }
  };

  const handleViewProof = (transaction) => {
    setSelectedTransaction(transaction);
  };

  // Filter transactions by status
  const pendingTransactions = Transaction.sort(
    (a, b) => b.date - a.date
  ).filter((transaction) => transaction.status === "Pending");
  const confirmedTransactions = Transaction.sort(
    (a, b) => b.date - a.date
  ).filter((transaction) => transaction.status === "Confirmed");
  const rejectedTransactions = Transaction.sort(
    (a, b) => b.date - a.date
  ).filter((transaction) => transaction.status === "Rejected");

  // Render table rows
  const renderTableRows = (transactions, showActions = true) => {
    return transactions.map((transaction, index) => (
      <TableRow key={index}>
        <TableCell>
          <Flex alignItems="center">
            <Image
              src={transaction.Icon}
              w="40px"
              mr={2}
              alt={`${transaction.Name} icon`}
            />
            <Text>{transaction.Type}</Text>
          </Flex>
        </TableCell>
        <TableCell>{transaction.Name}</TableCell>
        <TableCell>{transaction.subCategory || "--"}</TableCell>
        <TableCell>{transaction.Amount}</TableCell>
        <TableCell>
          <Text
            bg={
              transaction.status === "Confirmed"
                ? "green.200"
                : transaction.status === "Pending"
                ? "yellow.200"
                : "red.400"
            }
            color="white"
            rounded="sm"
            textAlign="center"
            p={1}
          >
            {transaction.status}
          </Text>
        </TableCell>
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
                {selectedTransaction?.Images?.length > 0 ? (
                  <Flex direction="column" gap={4}>
                    {selectedTransaction.Images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Proof ${index + 1}`}
                        borderRadius="md"
                        objectFit="cover"
                      />
                    ))}
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
          <DialogRoot>
            <DialogTrigger>
              <Button
                bg={Blue.p}
                size="sm"
                onClick={() => {
                  getBankDetails(transaction.userId);
        // alert(transaction.userId)
                }}
              >
                View User Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <Heading size="md">User Account Details</Heading>
                <DialogCloseTrigger />
              </DialogHeader>
              <DialogBody>
                {BankDetails ? (
                  <DataListRoot orientation="horizontal">
                    <DataListItem
                      label="Bank Name"
                      value={
                        <Text color="gray.600">
                          {BankDetails.BankName || "N/A"}
                        </Text>
                      }
                    />
                    <DataListItem
                      label="Account Number"
                      value={<Text>{BankDetails.AccountNumber || "N/A"}</Text>}
                    />
                    <DataListItem
                      label="Account Name"
                      value={
                        <Text fontWeight="bold" color="green.600">
                          {BankDetails.AccountName || "N/A"}
                        </Text>
                      }
                    />
                  </DataListRoot>
                ) : (
                  <Text>No bank details available.</Text>
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
        {showActions && (
          <TableCell>
            {transaction.status === "Pending" && (
              <Flex gap={4}>
                <Button
                  bg="green"
                  onClick={() => statusUpdate(transaction.id, "Confirmed")}
                >
                  Confirm
                </Button>
                <Button
                  bg="red.700"
                  onClick={() => statusUpdate(transaction.id, "Rejected")}
                >
                  Reject
                </Button>
              </Flex>
            )}
          </TableCell>
        )}
      </TableRow>
    ));
  };

  return (
    <Box p={4}>
      <Flex mb={4} alignItems="center">
        <Heading as="h2" size="lg">
          Transactions
        </Heading>
        <Spacer />
      </Flex>

      <Tabs.Root defaultValue="pending">
        <Tabs.List>
          <Tabs.Trigger value="pending">Pending</Tabs.Trigger>
          <Tabs.Trigger value="confirmed">Confirmed</Tabs.Trigger>
          <Tabs.Trigger value="rejected">Rejected</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="pending">
          <Box overflowX="auto" bg="gray.100">
            <TableRoot>
              <TableHeader>
                <TableRow>
                  <TableColumnHeader>Type</TableColumnHeader>
                  <TableColumnHeader>Name</TableColumnHeader>
                  <TableColumnHeader>SubCategory</TableColumnHeader>
                  <TableColumnHeader>Amount</TableColumnHeader>
                  <TableColumnHeader>Status</TableColumnHeader>
                  <TableColumnHeader></TableColumnHeader>
                  <TableColumnHeader></TableColumnHeader>
                  <TableColumnHeader>Actions</TableColumnHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderTableRows(pendingTransactions, true)}
              </TableBody>
            </TableRoot>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="confirmed">
          <Box overflowX="auto" bg="gray.100">
            <TableRoot>
              <TableHeader>
                <TableRow>
                  <TableColumnHeader>Type</TableColumnHeader>
                  <TableColumnHeader>Name</TableColumnHeader>
                  <TableColumnHeader>SubCategory</TableColumnHeader>
                  <TableColumnHeader>Amount</TableColumnHeader>
                  <TableColumnHeader>Status</TableColumnHeader>
                  <TableColumnHeader></TableColumnHeader>
                  <TableColumnHeader></TableColumnHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderTableRows(confirmedTransactions, false)}
              </TableBody>
            </TableRoot>
          </Box>
        </Tabs.Content>

        <Tabs.Content value="rejected">
          <Box overflowX="auto" bg="gray.100">
            <TableRoot>
              <TableHeader>
                <TableRow>
                  <TableColumnHeader>Type</TableColumnHeader>
                  <TableColumnHeader>Name</TableColumnHeader>
                  <TableColumnHeader>SubCategory</TableColumnHeader>
                  <TableColumnHeader>Amount</TableColumnHeader>
                  <TableColumnHeader>Status</TableColumnHeader>
                  <TableColumnHeader></TableColumnHeader>
                  <TableColumnHeader></TableColumnHeader>
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderTableRows(rejectedTransactions, false)}
              </TableBody>
            </TableRoot>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
