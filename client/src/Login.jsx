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

function Login() {
  return (
    <>
      <VStack spacing={4} p={8}>
        <Heading size="lg">Login</Heading>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Enter your email" type="email" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Enter your password" type="password" />
        </FormControl>
        <Button colorScheme="teal" width="full" mt={4}>
          Log In
        </Button>
        <Text mt={6}>
          Don't have an account?{" "}
          <Link color="teal.500" href="/register">
            Sign up!
          </Link>
        </Text>
      </VStack>
    </>
  );
}

export default Login;
