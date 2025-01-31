import {
    Box,
    Heading,
    Flex,
    Spacer,
    Button,
    TableRoot,
    TableHeader,
    TableRow,
    TableColumnHeader,
    TableBody,
    TableCell,
    TableFooter,
  } from "@chakra-ui/react";
  // Assuming you have a custom Table component
  import { useEffect, useState } from "react";
  import useAuthStore from "../Store/userStore";
  
  export default function Users() {
    const { getAllUsers } = useAuthStore;
    const fetchUsers = async () => {
        try {
          const user = await getAllUsers();
          // setUsers(usersData);
          console.log(user);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        } finally {
          // setLoading(false);
        }
      };
    useEffect(() => {
      fetchUsers();
    }, []);
    const users = [
      {
        userId: "001",
        name: "John Doe",
        email: "john.doe@example.com",
        dateCreated: "2023-01-15",
        lastLogin: "2023-10-05",
      },
      {
        userId: "001",
        name: "John Doe",
        email: "john.doe@example.com",
        dateCreated: "2023-01-15",
        lastLogin: "2023-10-05",
      },
      {
        userId: "002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        dateCreated: "2023-02-20",
        lastLogin: "2023-10-04",
      },
      {
        userId: "003",
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        dateCreated: "2023-03-10",
        lastLogin: "2023-10-03",
      },
      {
        userId: "004",
        name: "Bob Brown",
        email: "bob.brown@example.com",
        dateCreated: "2023-04-25",
        lastLogin: "2023-10-02",
      },
      {
        userId: "005",
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        dateCreated: "2023-05-30",
        lastLogin: "2023-10-01",
      },
    ];
  
    return (
      <Box p={4}>
        <Flex mb={4} alignItems="center">
          <Heading as="h2" size="lg">
            Users
          </Heading>
          <Spacer />
          <Button colorScheme="teal">Add User</Button>
        </Flex>
  
        <Box overflowX="auto">
          <TableRoot>
            <TableHeader>
              <TableRow>
                <TableColumnHeader>User ID</TableColumnHeader>
                <TableColumnHeader>Name</TableColumnHeader>
                <TableColumnHeader>Email</TableColumnHeader>
                <TableColumnHeader>Date Created</TableColumnHeader>
                <TableColumnHeader>Last Login</TableColumnHeader>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.dateCreated}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5} textAlign="center">
                  Total Users: {users.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </TableRoot>
        </Box>
      </Box>
    );
  }
  