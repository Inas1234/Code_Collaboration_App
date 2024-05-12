const cors = require("cors");
const users = require("./routes/users");
const projects = require("./routes/projects");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/projects", projects);

io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  socket.on("create_room", (data) => {
    const room = data.roomId;
    socket.join(room);
    console.log(`Room created: ${room}`);
    socket.emit("room_created", room);
  });

  socket.on("join_room", (data) => {
    const room = data.roomId;
    socket.join(room);
    console.log(`Room joined: ${room}`);
    socket.emit("room_joined", room);
  });

  socket.on("code_change", ({ room, code }) => {
    socket.to(room).emit("code_update", code);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
