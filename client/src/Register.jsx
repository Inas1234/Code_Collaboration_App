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
} from "@chakra-ui/react";

function Register() {
  return (
    <>
      <VStack spacing={4} p={8}>
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
    </>
  );
}

export default Register;
