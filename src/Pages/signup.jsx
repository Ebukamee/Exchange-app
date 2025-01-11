import { FormControl, FormLabel } from "@chakra-ui/form-control";
import AuthNav from "../components/AuthNav";
import { Box, Button, Checkbox, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { Blue } from "../assets/Colors";

export default function Signup() {
    return (
        <Box mx='auto' my={10} w='90%' maxW='500px'>
            <AuthNav />
            <Heading as='p' fontSize='3xl' fontWeight='bold' m={10} textAlign='center'>Create Account</Heading>
            <Box>
                <FormControl isRequired my={20}>
                    <FormLabel m={3}>Full Name</FormLabel>
                    <Input type="text" name='name' placeholder='Enter Full Name' outline='none' />
                </FormControl>
                <FormControl isRequired my={20}>
                    <FormLabel m={3}>Email Address</FormLabel>
                    <Input type="email" name='email' placeholder='Enter Email Address' outline='none' />
                </FormControl>
                <FormControl isRequired my={20}>
                    <FormLabel m={3}>Password</FormLabel>
                    <Input type="password" name='password' placeholder='Enter Password' outline='none' />
                </FormControl>
                <FormControl isRequired my={20}>
                    <FormLabel m={3}>Confirm Password</FormLabel>
                    <Input type="password" name='confirm_password' placeholder='Enter Password Again' outline='none' />
                </FormControl>
                <Button bg={Blue.p} w='100%'>Signup</Button>

            </Box>
        </Box>
    )
}