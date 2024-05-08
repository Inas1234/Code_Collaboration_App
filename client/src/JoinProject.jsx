import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";

function JoinProject() {
  return (
    <>
      <VStack spacing={4} p={8}>
        <Heading>Join a Project</Heading>
        <FormControl isRequired>
          <FormLabel>Project Code</FormLabel>
          <Input placeholder="Enter project code" />
        </FormControl>
        <Button colorScheme="blue" width="full" mt={4}>
          Join Project
        </Button>
      </VStack>
    </>
  );
}

export default JoinProject;
