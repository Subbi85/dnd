const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const User = require ("../models/Users")

// Login Route
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Überprüfen, ob der Benutzer existiert
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Benutzer nicht gefunden" });
    }

    // Überprüfen, ob das Passwort korrekt ist
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Ungültiges Passwort" });
    }

    // Erstellen eines JWT-Tokens
    const token = jwt.sign(
      { id: user._id, username: user.username },
      "deinGeheimerSchlüssel",
      { expiresIn: "1h" }
    );

    // Passwort aus dem Benutzerobjekt entfernen, bevor es zurückgegeben wird
    const userData = {
      id: user._id,
      username: user.username,
      gold: user.gold,
      role: user.role,
      inventory: user.inventory,
      token: token
    };

    // Antwort mit Token und Benutzerobjekt
    res.json({ user: userData });
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Login" });
  }
});


module.exports = router;