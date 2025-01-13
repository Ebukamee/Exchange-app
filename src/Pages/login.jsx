import { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import AuthNav from "../components/AuthNav";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Blue } from "../assets/Colors";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";

export default function Login() {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const toast = (type, message, title) => {
    toaster.create({
      title: title,
      description: message,
      type: type,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast("loading", "Please Wait", "Logging In");
    try {
      await login(email, password);
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("success", "Log in successful", "Success");
      setTimeout(() => {
        Navigate("/dashboard");
      }, 1000);
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
      <AuthNav />
      <Heading
        as="p"
        fontSize="3xl"
        fontWeight="bold"
        m={10}
        textAlign="center"
      >
        Welcome Back
      </Heading>
      <Box>
        <FormControl isRequired my={20}>
          <FormLabel m={3}>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            outline="none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired my={20}>
          <FormLabel m={3}>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            outline="none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Flex mb={5}>
          <Link to='/forgot-password'>
          <Text color={Blue.p} textDecoration="underline" fontSize="sm">
            Forgot Password?
          </Text>
        </Link>
        </Flex>
        <Button bg={Blue.p} w="100%" onClick={handleSubmit}>
          Login
        </Button>
      </Box>
    </Box>
  );
}
