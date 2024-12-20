const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();

// Login Route
router.post("/login", async (req, res) => {

  console.log("Login registriert")

  try {
    const { username, password } = req.body;

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
    const token = jwt.sign({ id: user._id, username: user.username }, "deinGeheimerSchlüssel", {
      expiresIn: "1h", 
    });

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler beim Login" });
  }
});

module.exports = router;