import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
} from "@chakra-ui/react";

function CreateProject() {
  return (
    <>
      <VStack spacing={4} p={8}>
        <Heading>Create New Project</Heading>
        <FormControl isRequired>
          <FormLabel>Project Name</FormLabel>
          <Input placeholder="Enter project name" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea placeholder="Describe your project" />
        </FormControl>
        <Button colorScheme="teal" width="full" mt={4}>
          Create Project
        </Button>
      </VStack>
    </>
  );
}

export default CreateProject;
