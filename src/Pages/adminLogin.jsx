import { useEffect, useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import AuthNav from "../components/AuthNav";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Blue } from "../assets/Colors";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";
import { toast, err} from "../Helper";

export default function AdminLogin() {
    const { login, user, logout } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate();
    const id = "hvtZq5cDMsUCwBp8A1scXsaYlTG2";
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      toast("loading", "Please Wait", "Logging In");
    
      try {
        await login(email, password);
        setLoading(false);
        toaster.dismiss();
      } catch (error) {
        setLoading(false);
        toaster.dismiss();
        toast("error", error.message, "An Error Occurred");
      }
    };
    // **Wait for `user` to update before checking UID**
    useEffect(() => {
      if (user) {
        if (user.uid === id) {
          toast("success", "Log in successful", "Success");
          setTimeout(() => {
            Navigate("/admin/dashboard");
          }, 1000);
        } else {
          toast("error", "Unauthorized User", "An Error Occurred");
          logout();
        }
      }
    }, [user, logout, Navigate]); // Run when `user` changes
    
  return (
    <Box mx="auto" my={10} w="90%" maxW="500px">
      <Heading
        as="p"
        fontSize="3xl"
        fontWeight="bold"
        m={10}
        textAlign="center"
      >
        Log In to Admin Dashboard
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
