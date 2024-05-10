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
  useColorModeValue,
} from "@chakra-ui/react";

function CreateProject() {
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55"); // Set the background color for both modes if necessary

  return (
    <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={4} p={8} bg="#070F2B" boxShadow="md" rounded="md" maxWidth="400px" width="100%" color="white">
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
    </Box>
  );
}

export default CreateProject;
