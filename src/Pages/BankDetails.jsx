import { Box,Heading,Button,Input } from "@chakra-ui/react"
import { FormControl,FormLabel } from "@chakra-ui/form-control"
import { useState } from "react"
import { Blue } from "../assets/Colors"

export default function BankDetails() {
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
          />
        </FormControl>
        <FormControl isRequired my={20}>
          <FormLabel m={3}>Account Name</FormLabel>
          <Input
            type="text"
            name="account"
            placeholder="Enter Account Name"
            outline="none"
          />
        </FormControl>
        <FormControl isRequired my={20}>
          <FormLabel m={3}>Account Number</FormLabel>
          <Input
            type="number"
            name="number"
            placeholder="Enter Account Number"
            outline="none"
          />
        </FormControl>
        <Button bg={Blue.p} w="100%">
          Save
        </Button>
      </Box>
    </Box>
    )
}