import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

function JoinProject() {
  const [roomCode, setRoomCode] = useState("");
  const bgColor = useColorModeValue("#1B1A55", "#1B1A55");
  const navigate = useNavigate();

  const handleJoinProject = () => {
    socket.emit("join_room", { roomId: roomCode });
    socket.on("room_joined", (room) => {
      console.log(`Joined room: ${room}`);
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
        <Heading>Join a Project</Heading>
        <FormControl isRequired>
          <FormLabel>Project Code</FormLabel>
          <Input
            placeholder="Enter project code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="full"
          mt="4"
          onClick={handleJoinProject}
        >
          Join Project
        </Button>
      </VStack>
    </Box>
  );
}

export default JoinProject;
