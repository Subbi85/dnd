const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const mongoose = require("mongoose");

// Neue Benutzer anlegen
router.post("/", async (req, res) => {
    try {
      const { username, password, gold, inventory, role } = req.body;
  
      // Überprüfen, ob der Benutzername bereits existiert
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Benutzername bereits vergeben" });
      }
  
      // Einen neuen Benutzer erstellen
      const newUser = new User({
        username,
        password, 
        gold: gold || 100,
        inventory: inventory || [],
        role: role || 'player'
      });
  
      // Benutzer speichern
      const savedUser = await newUser.save();
  
      // Erfolgsantwort
      res.status(201).json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Fehler beim Anlegen des Benutzers" });
    }
  });

// Alle Benutzer anzeigen
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Fehler beim Abrufen der Benutzer" });
    }
});

// Nutzer löschen
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Ungültige ID" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User nicht gefunden" });
    }

    res.json({ message: "User wurde gelöscht", deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Spielerinventar abrufen
router.get("/:id/inventory", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("inventory.item");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gegenstand kaufen
router.post("/:id/buy", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const item = await Item.findById(req.body.itemId);

    if (!user || !item) return res.status(404).json({ error: "User or Item not found" });
    if (user.gold < item.price) return res.status(400).json({ error: "Not enough gold" });

    user.gold -= item.price;
    const inventoryItem = user.inventory.find((i) => i.item.equals(item._id));
    if (inventoryItem) inventoryItem.quantity += 1;
    else user.inventory.push({ item: item._id, quantity: 1 });

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;