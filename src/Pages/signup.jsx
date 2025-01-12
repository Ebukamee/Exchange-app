import React, { useState } from "react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import AuthNav from "../components/AuthNav";
import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { Blue } from "../assets/Colors";
import useAuthStore from "../Store/userStore";
import { toaster } from "../components/ui/toaster";

export default function Signup() {
    const { signup } = useAuthStore();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
 const toast = (type,message,title) => {
    toaster.create({
        title:title,
        description: message,
        type: type,
        
      });
  };
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        toast('loading','Please Wait','Logging In');
        if (password !== confirmPassword) {
            setLoading(false);

             if (!loading) {
                    toaster.dismiss();
                  }
                  toast('error',"Password must be the same",'An Error Occured');
            return;
        }
        try {
             await signup(email, password,fullname);
             setLoading(false);
             if (!loading) {
               toaster.dismiss();
             }
             toast('success','Log in successful','Success');
           } catch (error) {
             setLoading(false);
             if (!loading) {
               toaster.dismiss();
             }
             toast('error',error.message,'An Error Occured');
           }
    };

    return (
        <Box mx="auto" my={10} w="90%" maxW="500px">
            <AuthNav />
            <Heading as="p" fontSize="3xl" fontWeight="bold" m={10} textAlign="center">
                Create Account
            </Heading>
            <form>
                <FormControl isRequired my={20}>
                    <FormLabel m={3}>Full Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Enter Full Name"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired my={20}>
                    <FormLabel m={3}>Email Address</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl isRequired my={20}>
                    <FormLabel m={3}>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        name="confirm_password"
                        placeholder="Enter Password Again"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormControl>
                <Button bg={Blue.p} w="100%" onClick={handleSignup}>
                    Signup
                </Button>
            </form>
        </Box>
    );
}
