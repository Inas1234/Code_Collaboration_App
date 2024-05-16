import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  List,
  ListItem,
} from "@chakra-ui/react";

const SideMenu = ({
  isOpen,
  onClose,
  users,
  isAdmin,
  userId,
  handleBanUser,
  handleEndSession,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>User List</DrawerHeader>
        <DrawerBody>
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
        </DrawerBody>
        {isAdmin && (
          <DrawerFooter>
            <Button colorScheme="red" onClick={handleEndSession}>
              End Session
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default SideMenu;
