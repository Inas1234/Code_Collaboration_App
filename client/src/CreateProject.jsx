import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8080"); // Connect to the server

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55");
  const navigate = useNavigate();

  const handleCreateProject = () => {
    const roomId = Date.now().toString(); // Simple example to generate a room ID
    socket.emit("create_room", { roomId });
    socket.on("room_created", (room) => {
      console.log(`Room created: ${room}`);
      navigate(`/${room}`);
    });
  };

  return (
    <Box
      bg={bgColor}
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        spacing={4}
        p={8}
        bg="#070F2B"
        boxShadow="md"
        rounded="md"
        maxWidth="400px"
        width="100%"
        color="white"
      >
        <Heading>Create New Project</Heading>
        <FormControl isRequired>
          <FormLabel>Project Name</FormLabel>
          <Input
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Describe your project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          width="full"
          mt={4}
          onClick={handleCreateProject}
        >
          Create Project
        </Button>
      </VStack>
    </Box>
  );
}

export default CreateProject;
