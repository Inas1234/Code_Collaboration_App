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

let rooms = {};

io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  socket.on("create_room", (data) => {
    const { roomId, userId } = data;
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = { users: {}, code: "" };
    }
    rooms[roomId].users[socket.id] = userId;
    console.log(`Room created: ${roomId}`);
    socket.emit("room_created", roomId);
    io.to(roomId).emit("users_update", Object.values(rooms[roomId].users));
  });

  socket.on("join_room", (data) => {
    const { roomId, userId } = data;
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = { users: {}, code: "" };
    }
    rooms[roomId].users[socket.id] = userId;
    console.log(`Room joined: ${roomId}`);
    socket.emit("room_joined", roomId);

    socket.emit("code_update", rooms[roomId].code);
    io.to(roomId).emit("users_update", Object.values(rooms[roomId].users));
  });

  socket.on("code_change", ({ room, code }) => {
    if (rooms[room]) {
      console.log(`Code change in room ${room}: ${code}`);
      rooms[room].code = code;
      io.to(room).emit("code_update", code);
    }
  });

  socket.on("ban_user", ({ roomId, userIdToBan }) => {
    const socketIdToBan = Object.keys(rooms[roomId].users).find(
      (id) => rooms[roomId].users[id] === userIdToBan
    );
    if (socketIdToBan) {
      io.sockets.sockets.get(socketIdToBan).emit("banned");
      io.sockets.sockets.get(socketIdToBan).disconnect();
      delete rooms[roomId].users[socketIdToBan];
      io.to(roomId).emit("users_update", Object.values(rooms[roomId].users));
    }
  });

  socket.on("end_session", ({ roomId }) => {
    if (rooms[roomId]) {
      Object.keys(rooms[roomId].users).forEach((socketId) => {
        io.sockets.sockets.get(socketId).emit("session_ended");
        io.sockets.sockets.get(socketId).disconnect();
      });
      delete rooms[roomId];
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
    for (const roomId in rooms) {
      if (rooms[roomId].users[socket.id]) {
        delete rooms[roomId].users[socket.id];
        io.to(roomId).emit("users_update", Object.values(rooms[roomId].users));
        break;
      }
    }
  });
});

server.listen(8080, () => {
  console.log("Server listening on port 8080");
});
