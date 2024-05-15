import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Button,
  List,
  ListItem,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { languageTemplates } from "../constants";
import Output from "./Output";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CodeEditor() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("cpp");
  const socket = useRef(null);
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const { username, userId } = auth;
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const { roomId } = useParams();
  const { hasCopied, onCopy } = useClipboard(roomId);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/projects/${roomId}/isAdmin/${username}`
        );
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error("Failed to check admin status", error);
      }
    };

    checkAdminStatus();
  }, [roomId, username]);

  useEffect(() => {
    socket.current = io("http://localhost:8080");
    socket.current.emit("join_room", { roomId, userId });

    socket.current.on("code_update", (newCode) => {
      console.log("Received code update:", newCode);
      setValue(newCode);
    });

    socket.current.on("users_update", (updatedUsers) => {
      console.log("Users update:", updatedUsers);
      const uniqueUsers = [
        ...new Set(updatedUsers.filter((user) => user != null)),
      ];
      setUsers(uniqueUsers);
    });

    socket.current.on("session_ended", () => {
      navigate("/");
    });

    socket.current.on("banned", () => {
      navigate("/");
    });

    return () => {
      socket.current.off("code_update");
      socket.current.off("users_update");
      socket.current.off("session_ended");
      socket.current.off("banned");
      socket.current.disconnect();
    };
  }, [roomId, navigate, userId]);

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
    console.log("Editor changed:", newValue);
    setValue(newValue);
    socket.current.emit("code_change", { room: roomId, code: newValue });
  };

  const handleBanUser = (userIdToBan) => {
    socket.current.emit("ban_user", { roomId, userIdToBan });
  };

  const handleEndSession = () => {
    socket.current.emit("end_session", { roomId });
  };

  return (
    <Box>
      <HStack justifyContent="space-between" mb={4}>
        <Text fontSize="lg">Room ID: {roomId}</Text>
        <Button onClick={onCopy}>
          {hasCopied ? "Copied" : "Copy Room ID"}
        </Button>
      </HStack>
      <HStack spacing={4} alignItems="flex-start">
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
        <VStack w="50%">
          <Output editorRef={editorRef} language={language} />
        </VStack>
      </HStack>
      <Box w="100%">
        <List spacing={3}>
          {users.map((user) => (
            <ListItem key={user}>
              {user}
              {isAdmin && userId !== user && (
                <Button
                  ml={4}
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleBanUser(user)}
                >
                  Ban
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      </Box>
      {isAdmin && (
        <Button mt={4} colorScheme="red" onClick={handleEndSession}>
          End Session
        </Button>
      )}
    </Box>
  );
}

export default CodeEditor;
