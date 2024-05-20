import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, VStack, HStack, Text } from "@chakra-ui/react";
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
import { useParams } from 'react-router-dom';

const ChatComponent = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(null);
  const { auth } = useAuth();
  const { username } = auth;
  const { roomId } = useParams();

  useEffect(() => {
    socket.current = io('http://localhost:8080');
    socket.current.emit('join_chat', { roomId, username });

    socket.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.current.off('message');
      socket.current.disconnect();
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = { username, text: newMessage, roomId };
      socket.current.emit('send_message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <Box position="fixed" bottom="0" right="0" width="300px" height="80vh" bg="gray.700" p={4} borderRadius="md" boxShadow="lg">
      <VStack spacing={4} align="stretch" height="100%">
        <Box display="flex" justifyContent="space-between" width="100%">
          <Text fontSize="lg" fontWeight="bold" color="white">Chat</Text>
          <Button size="sm" onClick={onClose}>X</Button>
        </Box>
        <Box flex="1" overflowY="auto" bg="gray.800" p={2} borderRadius="md">
          {messages.map((msg, index) => (
            <HStack key={index} spacing={2}>
              <Text fontWeight="bold" color="white">{msg.username}:</Text>
              <Text color="white">{msg.text}</Text>
            </HStack>
          ))}
        </Box>
        <HStack>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatComponent;
