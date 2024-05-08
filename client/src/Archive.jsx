import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

function Archive() {
  const archivedProjects = [
    {
      id: 1,
      name: "Project Alpha",
      description: "This is a completed project about X.",
    },
    {
      id: 2,
      name: "Project Beta",
      description: "This is a completed project about Y.",
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "This is a completed project about Z.",
    },
  ];

  return (
    <VStack spacing={4} p={8}>
      <Heading>Archived Projects</Heading>
      <Text>
        If you need to revisit old projects, here’s a list of what you’ve
        completed.
      </Text>
      <List spacing={3}>
        {archivedProjects.map((project) => (
          <ListItem key={project.id} p={4} boxShadow="md">
            <ListIcon as={MdCheckCircle} color="green.500" />
            <strong>{project.name}</strong> - {project.description}
            <Button size="sm" colorScheme="blue" ml="4">
              View Details
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
}

export default Archive;
