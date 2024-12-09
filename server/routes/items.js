const express = require("express");
const router = express.Router();
const Item = require("../models/Items");

// Alle Gegenstände abrufen
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Neuen Gegenstand hinzufügen (Admin)
router.post("/", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Items löschen

// Itempreis anpassen

// Item

module.exports = router;
