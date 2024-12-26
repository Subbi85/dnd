const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Alle Messages abrufen
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Neue Message anlegen
router.post("/", async (req, res) => {
    const { headline, message, user, type = "message" } = req.body; 
    const messageContent = new Message({ headline, message, user, type });
    try {
      const newMessage = await messageContent.save();
      res.status(201).json(newMessage);
    } catch (err) {
      res.status(400).json({ "message": err.message });
    }
  });
  

// Message löschen
router.delete("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message nicht gefunden" });
    }

    await message.remove();
    res.status(200).json({ message: "Message gelöscht" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
