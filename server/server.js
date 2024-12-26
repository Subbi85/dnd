require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const itemRoutes = require("./routes/items")
const userRoutes = require("./routes/users")
const loginRoutes = require("./routes/login")
const messageRoutes = require("./routes/messages")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/messages", messageRoutes);

// MongoDB-Verbindung
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test-Route
app.get("/", (req, res) => {
  res.send("DnD Marktplatz Backend läuft!");
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});