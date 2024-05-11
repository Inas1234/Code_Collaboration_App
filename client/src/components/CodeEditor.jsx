import React, { useEffect, useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { languageTemplates } from "../constants";
import Output from "./Output";
import io from "socket.io-client";

// Assuming your room ID is passed as a prop to the CodeEditor
function CodeEditor({ roomId }) {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("cpp");
  const socket = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.current = io("http://localhost:8080");

    // Emit an event to join the room
    socket.current.emit("join_room", { roomId });

    // Setup event listener for receiving code updates
    socket.current.on("code_update", (newCode) => {
      setValue(newCode);
    });

    // Clean up the effect
    return () => {
      socket.current.disconnect();
    };
  }, [roomId]);

  const onSelect = (language) => {
    setLanguage(language);
    const template = languageTemplates[language];
    setValue(template);
    socket.current.emit("code_change", { room: roomId, code: template });
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    socket.current.emit("code_change", { room: roomId, code: newValue });
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            onMount={onMount}
            value={value}
            onChange={handleEditorChange}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
}

export default CodeEditor;
