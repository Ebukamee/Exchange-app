import { Box, Heading, Button, Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useState } from "react";
import { Blue } from "../assets/Colors";
import useAuthStore from "../Store/userStore";
import { toast } from "../Helper";
import { toaster } from "../components/ui/toaster";

export default function BankDetails() {
  const { user, updateBankDetails } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [Bank, setBank] = useState("");
  const [Name, setName] = useState("");
  const [No, setNumber] = useState("");

  const UploadDetails = async () => {
    setLoading(true);
    toast("loading", "Please Wait", "Adding Bank Details");
    try {
      await updateBankDetails(Bank, Name, No, user.uid);
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("success", "Uploaded successful", "Success");
    } catch (error) {
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("error", error.message, "An Error Occured");
    }
  };
  return (
    <Box mx="auto" my={10} w="90%" maxW="500px">
      <Heading
        as="p"
        fontSize="3xl"
        fontWeight="bold"
        m={10}
        textAlign="center"
      >
        Enter Your Bank Account Details
      </Heading>
      <Box>
        <FormControl isRequired my={20}>
          <FormLabel m={3}>Bank Name</FormLabel>
          <Input
            type="text"
            name="bank"
            placeholder="Enter Bank Name"
            outline="none"
            value={Bank}
            onChange={(e) => setBank(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired my={20}>
          <FormLabel m={3}>Account Name</FormLabel>
          <Input
            type="text"
            name="account"
            placeholder="Enter Account Name"
            outline="none"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired my={20}>
          <FormLabel m={3}>Account Number</FormLabel>
          <Input
            type="text"
            name="number"
            placeholder="Enter Account Number"
            outline="none"
            value={No}
            onChange={(e) => setNumber(e.target.value)}
          />
        </FormControl>
        <Button bg={Blue.p} w="100%" onClick={UploadDetails}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
