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

function Login() {
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55"); // Adjusting for light and dark mode if necessary

  return (
    <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={4} p={8} bg="#070F2B" boxShadow="md" rounded="md" maxWidth="400px" width="100%">
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
    </Box>
  );
}

export default Login;
