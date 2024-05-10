import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  List,
  ListItem,
  ListIcon,
  Button,
  HStack,
  Tag
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

function Archive() {
  const archivedProjects = [
    { id: 1, name: "Project Alpha", description: "This is a completed project about X.", category: "Recent", auditors: "John, Jane", language: "JavaScript" },
    { id: 2, name: "Project Beta", description: "This is a completed project about Y.", category: "My Projects", auditors: "Alice, Bob", language: "Python" },
    { id: 3, name: "Project Gamma", description: "This is a completed project about Z.", category: "Shared with Me", auditors: "Charlie, Dave", language: "Java" }
  ];

  const filters = ["Recent", "My Projects", "Shared with Me"];

  return (
    <VStack spacing={4} p={8}>
      <Heading>Archived Projects</Heading>
      <Text>
        If you need to revisit old projects, here’s a list of what you’ve
        completed.
      </Text>
      <HStack spacing={4}>
        {filters.map(filter => (
          <Button key={filter} colorScheme="blue">
            {filter}
          </Button>
        ))}
      </HStack>
      <Input placeholder="Filter projects..." my={4} />

      <List spacing={3} width="full">
        {archivedProjects.map((project) => (
          <ListItem key={project.id} p={4} boxShadow="md" bg="#070F2B">
            <HStack spacing={4} alignItems="center">
              <ListIcon as={MdCheckCircle} color="green.500" />
              <Box flex="1">
                <Text fontWeight="bold">{project.name}</Text>
                <Text fontSize="sm">{project.description}</Text>
                <Tag size="sm" colorScheme="gray" mr={2}>{project.language}</Tag>
                <Tag size="sm" colorScheme="cyan">{project.auditors}</Tag>
              </Box>
              <Button size="sm" colorScheme="blue">
                View Details
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
}

export default Archive;
