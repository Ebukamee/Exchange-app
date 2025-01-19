import { Box,Heading,Button,Input } from "@chakra-ui/react"
import { FormControl,FormLabel } from "@chakra-ui/form-control"
import { useState } from "react"
import { Blue } from "../assets/Colors"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firesbase/firebase"
import { toast } from "../Helper"

export default function UpdatePassword() {
const [email,setEmail] =useState('')
const sendPasswordResetMail = async  () => {
  try {
    await sendPasswordResetEmail(auth,email);
    toast(
      "success",
      "Password Reset Email have been sent to you",
      "Success"
    );
  } catch (error) {
    toast("error", error.message, "An Error Occured");
  }
}
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
         onClick={sendPasswordResetMail}
        >
          Send Email
        </Button>
      </Box>
    </Box>
    )
}