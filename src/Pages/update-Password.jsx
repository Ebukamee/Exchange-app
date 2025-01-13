import { Box,Heading,Button,Input } from "@chakra-ui/react"
import { FormControl,FormLabel } from "@chakra-ui/form-control"
import { useState } from "react"
import { Blue } from "../assets/Colors"

export default function UpdatePassword() {
const [email,setEmail] =useState('')
    return (
        <Box mx="auto" my={10} w="90%" maxW="500px">
      <Heading
        as="p"
        fontSize="3xl"
        fontWeight="bold"
        m={10}
        textAlign="center"
      >
        Forgot Password
      </Heading>
      <Box>
        <FormControl isRequired my={20}>
          <FormLabel m={3}>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            outline="none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
         
        <Button bg={Blue.p} w="50%"
        //  onClick={handleSubmit}
        >
          Send Email
        </Button>
      </Box>
    </Box>
    )
}