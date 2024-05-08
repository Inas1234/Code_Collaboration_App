import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";

function CodeCollab() {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor />
    </Box>
  );
}

export default CodeCollab;