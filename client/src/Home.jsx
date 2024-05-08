import React from "react";
import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box>
      <VStack spacing={8} mt={10} p={5}>
        <Heading>Welcome to the Code Collaboration App!</Heading>
        <Text>Start collaborating with your team now.</Text>
        <Link to="/create-project" style={{ textDecoration: "none" }}>
          <Button colorScheme="green" size="lg">
            Create a Project
          </Button>
        </Link>
        <Link to="/join-project" style={{ textDecoration: "none" }}>
          <Button colorScheme="blue" size="lg">
            Join a Project
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}

export default Home;
