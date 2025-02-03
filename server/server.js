require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// API Route imports
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const messageRoutes = require("./routes/messages");
const characterRoutes = require("./routes/characters");

// Def Websockets
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes and Functions
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/characters", characterRoutes);

// MongoDB-Verbindung
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test-Route
app.get("/", (req, res) => {
  res.send("DnD Marktplatz Backend läuft!");
});

// Socket.io Test Functions
const userSockets = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  // You can assign a custom UID here (e.g., from a database or generate it)
  const userUID = "user-" + socket.id; // Simple example of generating a UID using socket.id
  
  userSockets[socket.id] = userUID; // Store the user UID with the socket ID
  
  // Emit the UID back to the client or use it in other logic
  socket.emit("userUID", { uid: userUID });

  socket.on("testEvent", (data) => {
    console.log("Received testEvent with data:", data);
    socket.emit("testResponse", { message: "Test successful!", receivedData: data });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Optionally remove user UID from the userSockets object on disconnect
    delete userSockets[socket.id];
  });
});

server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
