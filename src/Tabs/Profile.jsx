import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  Text,
  VStack,
  Alert,
  Flex,
} from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Blue } from "../assets/Colors";
import useAuthStore from "../Store/userStore";
import { toast } from "../Helper";
import { toaster } from "../components/ui/toaster";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const Nav = useNavigate()
  const user = useAuthStore((state) => state.user);
  const details = useAuthStore((state) => state.BankDetails);
  const { getBankDetails,updateProfileBankDetails,logout } = useAuthStore()
  useEffect(()=> {
    getBankDetails(user.uid);

  },[user])
  const { ProfileUpdate } = useAuthStore();
  const [name, setName] = useState(user.displayName);
  const [New,setNew] = useState('');
  const [confirm,setConfirm] = useState('');
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);
  const [Bank, setBank] = useState('');
  const [Acctname, setAcctName] = useState('');
  const [No, setNumber] = useState('');
  useEffect(() => {
    if (details) {
      setBank(details.BankName || '');
      setAcctName(details.AccountName || '');
      setNumber(details.AccountNumber || '');
    }
  }, [details]);
  async function UpdateProfile() {
    setLoading(true);
    toast("loading", "Please Wait", "Updating Profile....");
    try {
      await ProfileUpdate(user,name, email);
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("success", "Profile Updated!", "Success");
    } catch (error) {
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("error", error.message, "An Error Occured");
      console.log(error)
    }
  }
  const LogOut = async () => {
    await logout()
    Nav('/')
  }
  const UploadDetails = async () => {
    setLoading(true);
    toast("loading", "Please Wait", "Adding Bank Details");
    try {
      await updateProfileBankDetails(Bank, Acctname, No, user.uid);
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("success", "Uploaded successful", "Success");
    } catch (error) {
      setLoading(false);
      if (!loading) {
        toaster.dismiss();
      }
      toast("error", error.message, "An Error Occured");
    }
  };
  const PasswordUpdate = () => {
    if(New == confirm) {
      
    try {
      updatePassword(user,New)
      toast('success','Password Updated','')
      setNew('');
      setConfirm('')
    } catch (error) {
      toast('error',error.message,'Error')
      setNew('');
      setConfirm('')
    }
  }
  else {
    toast('error','Password must be the same','Error')
  }
  }
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
    <Box mx="auto" mt={10} p={6}>
      <VStack spacing={8} align="stretch">
        {/* Profile Information */}
        <Box borderWidth={1} borderRadius="md" boxShadow="lg" p={5} my={5}>
          <Heading as="h2" size="lg" mb={4}>
            Profile Information
          </Heading>
          <Text mb={4}>
            Update your account's profile information and email address.
          </Text>
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </FormControl>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </FormControl>
          <Button
            bg={Blue.p}
            my={2}
            onClick={UpdateProfile}
          >
            Save
          </Button>
        </Box>

        {/* Update Password */}
        <Box borderWidth={1} borderRadius="md" boxShadow="lg" p={5} my={5}>
          <Heading as="h2" size="lg" mb={4}>
            Update Password
          </Heading>
          <Text mb={4}>
            Ensure your account is using a strong password to stay secure.
          </Text>
          <FormControl id="newPassword" mb={4}>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              name="newPassword"
              defaultValue={New}
              onChange={(e) => setNew(e.target.value)}
              placeholder="Enter new password"
            />
          </FormControl>
          <FormControl id="confirmPassword" mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              name="confirmPassword"
              defaultValue={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
            />
          </FormControl>
          <Button
            bg={Blue.p}
            my={2}
            onClick={PasswordUpdate}
          >
            Save
          </Button>
        </Box>

        {/* Update Account Details */}

        <Box borderWidth={1} borderRadius="md" boxShadow="lg" p={5} my={5}>
          <Heading as="h2" size="lg" mb={4}>
            Update Bank Details
          </Heading>
          <Text mb={4}>Keep your Bank Account Details up-to-date</Text>
          <FormControl mb={4}>
            <FormLabel m={3}>Bank Name</FormLabel>
            <Input
              type="text"
              name="bank"
              placeholder="Enter Bank Name"
              outline="none"
              defaultValue={Bank}
              onChange={(e) => setBank(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel m={3}>Account Name</FormLabel>
            <Input
              type="text"
              name="account"
              placeholder="Enter Account Name"
              outline="none"
              defaultValue={Acctname}
              onChange={(e) => setAcctName(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel m={3}>Account Number</FormLabel>
            <Input
              type="number"
              name="number"
              placeholder="Enter Account Number"
              outline="none"
              defaultValue={No}
              onChange={(e) => setNumber(e.target.value)}
            />
          </FormControl>
          <Button
            bg={Blue.p}
            my={2}
            onClick={UploadDetails}
          >
            Save
          </Button>
        </Box>

        {/* Delete Account */}
        <Box borderWidth={1} borderRadius="md" boxShadow="lg" p={5} my={5}>
          <Heading as="h2" size="lg" mb={4} color="red.600">
            Manage Account
          </Heading>
          {/* <Alert status="error" mb={4}> */}
          {/* <AlertIcon /> */}
          Logout an Delete your Account. Once your account is deleted, all its resources and data will be
          permanently deleted.
          {/* </Alert> */}
          <Flex justifyContent='space-between' maxW='500px'>
          <Button
            bg="white"
            borderColor={Blue.p}
            display="block"
            color={Blue.p}
            my={2}
            onClick={LogOut}
          >
            Logout
          </Button>
          <Button
            bg="red.700"
            display="block"
            my={2}
            // onClick={deleteAccount}
          >
            Delete Account
          </Button>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default ProfilePage;
