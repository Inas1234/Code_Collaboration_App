import React from "react";
import { Image } from '@chakra-ui/react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spacer,
  chakra,
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
      backgroundColor="rgb(7, 15, 43)"
    >
      <Box p="2">
        <Link href="/" style={{ textDecoration: "none" }}>
          <div className="logocontainer">
            <Heading  fontWeight="bold">CodeCrew</Heading>
          </div>
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
          <Button colorScheme="teal" variant="solid">
            Sign Up
          </Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
