import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";

function Navbar() {
  const bgColor = useColorModeValue("gray.200", "gray.700"); // Light mode dark mode responsive
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Flex
      as="nav"
      minWidth="max-content"
      alignItems="center"
      gap="2"
      p={5}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Box p="2">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Heading size="md" color="teal.600">
            Code Collaboration App
          </Heading>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link href="/login" style={{ textDecoration: "none" }}>
          <Button colorScheme="teal" variant="outline">
            Login
          </Button>
        </Link>
        <Link ml={4} href="/register" style={{ textDecoration: "none" }}>
          <Button colorScheme="orange" variant="solid">
            Sign Up
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
