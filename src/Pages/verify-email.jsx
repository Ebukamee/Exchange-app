import { Box, Container, Button, Text, Spinner } from "@chakra-ui/react";
import { Blue } from "../assets/Colors";
import useAuthStore from "../Store/userStore";
import { useState } from "react";
import { checkBankDetails, toast } from "../Helper";
import { toaster } from "../components/ui/toaster";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";


export default function VerifyEmail() {
  const { sendVerificationMail } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner size="xl" color={Blue.p} />
      </Box>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user && user.emailVerified === false) {
    if (checkBankDetails(user.uid)) {
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/Bank-Details" />;
    }
  }
  const sendMail = async () => {
    setLoading(true);
    toast("loading", "Please Wait", "Sending Verification Mail");
    try {
      await sendVerificationMail();
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast(
        "success",
        "Email  Verification Link have been sent to you",
        "Success"
      );
    } catch (error) {
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("error", error.message, "An Error Occured");
    }
  };
  return (
    <Box maxH="100vh">
      <Container
        shadow="md"
        w="90%"
        maxW="600px"
        p={7}
        textAlign="center"
        my="30vh"
      >
        <Text color="gray.700" as="p" m={3}>
          {`We have Sent a Verification Email to your Email ${user.email} `}
        </Text>
        <Text color="gray.700" as="p" m={3}>
          Didnt Recieve It?
        </Text>
        <Button bg={Blue.p} onClick={sendMail}>
          Resend
        </Button>
      </Container>
    </Box>
  );
}
