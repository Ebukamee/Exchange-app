import { FormControl, FormLabel } from "@chakra-ui/form-control";
import AuthNav from "../components/AuthNav";
import { Box, Button, Checkbox, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Form } from "react-router-dom";
import { Blue } from "../assets/Colors";

export default function Login() {
    return (
        <Box mx='auto' my={10} w='90%' maxW='500px'>
        <AuthNav />
        <Heading as='p' fontSize='3xl' fontWeight='bold' m={10} textAlign='center'>Welcome Back</Heading>
        <Box>
            <FormControl isRequired my={20}>
                <FormLabel m={3}>Email Address</FormLabel>
                <Input type="email" name='email' placeholder='Enter Email Address' outline='none'/>
            </FormControl>
            <FormControl isRequired my={20}>
                <FormLabel m={3}>Password</FormLabel>
                <Input type="password" name='password' placeholder='Enter Password' outline='none' />
            </FormControl>
            <Flex mb={5}>
               <Text color={Blue.p} textDecoration='underline' fontSize='sm'>Forgot Password?</Text>
            </Flex>
            <Button bg={Blue.p} w='100%'>Login</Button>

        </Box>
        </Box>
    )
}