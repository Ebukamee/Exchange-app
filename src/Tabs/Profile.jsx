import React from 'react';
import {
  Box,
  Container,
  Flex,
  Image,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
} from '@chakra-ui/react';

const ProfilePage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      {/* Main Layout */}
      <Flex gap={6}>
        {/* Left Sidebar */}
        <Box w="25%" bg="white" p={4} borderRadius="lg" boxShadow="sm">
          <VStack align="start" spacing={4}>
            <Heading size="sm">Settings</Heading>
            <Text>General Settings</Text>
            <Text>Security Settings</Text>
            <Text>Tutorials</Text>
            <Text>Rate Alert Settings</Text>
            <Text>Services Status</Text>
            <Text color="red.500">Delete User Account</Text>
          </VStack>
        </Box>

        {/* Right Content */}
        <Box flex={1} bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <Flex justify="space-between" align="center" mb={4}>
            <HStack spacing={4}>
              <Image
                src="/path/to/profile-picture.png"
                alt="Profile"
                borderRadius="full"
                boxSize="60px"
              />
              <VStack align="start" spacing={0}>
                <Heading size="sm">Update Your Profile</Heading>
                <Text fontSize="sm" color="gray.500">
                  Share your birthday for a personalized surprise!
                </Text>
              </VStack>
            </HStack>
            <Button colorScheme="blue" size="sm">
              Update Birthday
            </Button>
          </Flex>

          <Box my={4} />

          {/* Profile Details */}
          <VStack align="start" spacing={4}>
            <HStack>
              <Text fontWeight="bold">Email Address:</Text>
              <Text>jameskalu12@gmail.com</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Unique ID:</Text>
              <Text>Prest701126</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Phone Number:</Text>
              <Text>+23408078270053</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Country:</Text>
              <Text>Nigeria</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">KYC Settings:</Text>
              <Text color="blue.500">Add KYC details for verification</Text>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
