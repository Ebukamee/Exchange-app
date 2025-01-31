import { Box,  Button,  Flex, Heading,Text } from "@chakra-ui/react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/userStore";
import { Blue } from "../assets/Colors";

const AdminDashboard = () => {
    const { logout } = useAuthStore();
    const Navigate = useNavigate()
    const SignOut = async() => {
        await logout();
        Navigate('/')
    }
  return (
    <Box w='100%'>
      <Flex justify='space-between' m={2} mx={5}>
        <Heading as="h1" size="xl" my={10} color="teal.500" >
          BlixExchange
        </Heading>
        <Button color={Blue.p} my={10}  borderColor={Blue.p} bg={'white'} onClick={SignOut}>Logout</Button>
      </Flex>
      <Heading as="h1" textAlign='center' size="3xl" my={10} >
          Administrator Dashboard
        </Heading>
      <Box  borderWidth="1px" borderBottomColor='white' borderColor="gray.200"  rounded='xl' mx={2}>
      <Flex justify='space-between' p={5} pt={0}>
            <NavLink to='/admin/dashboard/transactions' className={({isActive}) => isActive ? 'auth_blue' : 'auth'}><Text textAlign='center' >Transactions</Text></NavLink>
            <NavLink to='/admin/dashboard/users'className={({isActive}) => isActive ? 'auth_blue' : 'auth'}><Text textAlign='center' >Users</Text></NavLink>
            <NavLink to='/admin/dashboard/manage-giftcards'className={({isActive}) => isActive ? 'auth_blue' : 'auth'}><Text textAlign='center' >Manage GiftCards</Text></NavLink>
        </Flex>
        <Outlet />
      </Box>
    </Box>
  );
};
export default AdminDashboard;
