import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

function Register() {
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55"); // Adjusting for light and dark mode if necessary

  return (
    <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={4} p={8} bg="#070F2B" boxShadow="md" rounded="md" maxWidth="400px" width="100%">
        <Heading size="lg">Register</Heading>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter your email" type="email" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Create a password" type="password" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input placeholder="Confirm your password" type="password" />
        </FormControl>
        <Button colorScheme="orange" width="full" mt={4}>
          Sign Up
        </Button>
        <Text mt={6}>
          Already have an account?{" "}
          <Link color="orange.500" href="/login">
            Log in!
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

export default Register;
