import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

function JoinProject() {
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55"); // Background color for both light and dark modes

  return (
    <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={4} p={8} bg="#070F2B" boxShadow="md" rounded="md" maxWidth="400px" width="100%" color="white">
        <Heading>Join a Project</Heading>
        <FormControl isRequired>
          <FormLabel>Project Code</FormLabel>
          <Input placeholder="Enter project code" />
        </FormControl>
        <Button colorScheme="blue" width="full" mt={4}>
          Join Project
        </Button>
      </VStack>
    </Box>
  );
}

export default JoinProject;
