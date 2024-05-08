import React from "react";
import ReactDOM from "react-dom/client";
import CodeCollab from "./CodeCollab.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import CreateProject from "./CreateProject.jsx";
import JoinProject from "./JoinProject.jsx";
import Archive from "./Archive.jsx";
import Navbar from "./components/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/:roomID",
    element: <CodeCollab />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/create-project",
    element: <CreateProject />,
  },
  {
    path: "/join-project",
    element: <JoinProject />,
  },
  {
    path: "/archive",
    element: <Archive />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Navbar />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
