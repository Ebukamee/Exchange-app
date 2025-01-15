import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  Alert,
} from "@chakra-ui/react";

import { FormControl,FormLabel } from "@chakra-ui/form-control";
import { Blue } from "../assets/Colors";

const ProfilePage = () => {
  // const [profile, setProfile] = useState({ name: "", email: "" });
  // const [passwords, setPasswords] = useState({
  //   currentPassword: "",
  //   newPassword: "",
  //   confirmPassword: "",
  // });

  // const handleProfileChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile({ ...profile, [name]: value });
  // };

  // const handlePasswordChange = (e) => {
  //   const { name, value } = e.target;
  //   setPasswords({ ...passwords, [name]: value });
  // };

  // const saveProfile = () => {
  //   console.log("Saving profile...", profile);
  //   // Add API integration here
  // };

  // const updatePassword = () => {
  //   console.log("Updating password...", passwords);
  //   // Add password update logic here
  // };

  // const deleteAccount = () => {
  //   console.log("Deleting account...");
  //   // Add account deletion logic here
  // };

  return (
    <Box  mx="auto" mt={10} p={6}>
      <VStack spacing={8} align="stretch">
        {/* Profile Information */}
        <Box borderWidth={1} borderRadius="md" boxShadow="lg" p={5} my={5}>
          <Heading as="h2" size="lg" mb={4}>
            Profile Information
          </Heading>
          <Text mb={4}>Update your account's profile information and email address.</Text>
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              // value={profile.name}
              // onChange={handleProfileChange}
              placeholder="Enter your name"
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              // value={profile.email}
              // onChange={handleProfileChange}
              placeholder="Enter your email"
            />
          </FormControl>
          <Button bg={Blue.p} my={2}
          // onClick={saveProfile}
          >
            Save
          </Button>
        </Box>

        {/* Update Password */}
        <Box borderWidth={1} borderRadius="md" boxShadow="lg" p={5} my={5}>
          <Heading as="h2" size="lg" mb={4}>
            Update Password
          </Heading>
          <Text mb={4}>Ensure your account is using a strong password to stay secure.</Text>
          <FormControl id="currentPassword" mb={4}>
            <FormLabel>Current Password</FormLabel>
            <Input
              type="password"
              name="currentPassword"
              // value={passwords.currentPassword}
              // onChange={handlePasswordChange}
              placeholder="Enter current password"
            />
          </FormControl>
          <FormControl id="newPassword" mb={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              name="newPassword"
              // value={passwords.newPassword}
              // onChange={handlePasswordChange}
              placeholder="Enter new password"
            />
          </FormControl>
          <FormControl id="confirmPassword" mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              // value={passwords.confirmPassword}
              // onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
          </FormControl>
          <Button  bg={Blue.p} my={2}
          // onClick={updatePassword}
          >
            Save
          </Button>
        </Box>

        {/* Update Account Details */}

        <Box borderWidth={1} borderRadius="md" boxShadow="lg" p={5} my={5}>
          <Heading as="h2" size="lg" mb={4}>
            Update Password
          </Heading>
          <Text mb={4}>Ensure your account is using a strong password to stay secure.</Text>
          <FormControl  mb={4}>
          <FormLabel m={3}>Bank Name</FormLabel>
          <Input
            type="text"
            name="bank"
            placeholder="Enter Bank Name"
            outline="none"
          />
        </FormControl>
        <FormControl  mb={4}>
          <FormLabel m={3}>Account Name</FormLabel>
          <Input
            type="text"
            name="account"
            placeholder="Enter Account Name"
            outline="none"
          />
        </FormControl>
        <FormControl  mb={4}>
          <FormLabel m={3}>Account Number</FormLabel>
          <Input
            type="number"
            name="number"
            placeholder="Enter Account Number"
            outline="none"
          />
        </FormControl>
          <Button  bg={Blue.p} my={2}
          // onClick={updatePassword}
          >
            Save
          </Button>
        </Box>

        {/* Delete Account */}
        <Box borderWidth={1} borderRadius="md" boxShadow="lg" p={5} my={5}>
          <Heading as="h2" size="lg" mb={4} color="red.600">
            Delete Account
          </Heading>
          {/* <Alert status="error" mb={4}> */}
            {/* <AlertIcon /> */}
            Once your account is deleted, all its resources and data will be permanently deleted.
          {/* </Alert> */}
          <Button bg='red.700' display='block' my={2}
          // onClick={deleteAccount}
          >
            Delete Account
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProfilePage;
