import { Box, Container, Button, Text } from "@chakra-ui/react";
import { Blue } from "../assets/Colors";
import useAuthStore from "../Store/userStore";
import { useState } from "react";
import { toast } from "../Helper";
import { toaster } from "../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function VerifyEmail() {
  const { sendVerificationMail } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const user = useAuthStore((state) => state.user);
const Nav = useNavigate()
 
  useEffect(() => {
    if (user && user.emailVerified) {
      Nav("/dashboard");
      console.log('cool')
    }
  }, [])
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
        <Button bg={Blue.p} onClick={sendMail}>Resend</Button>
      </Container>
    </Box>
  );
}
