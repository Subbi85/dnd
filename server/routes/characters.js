const express = require("express");
const router = express.Router();
const Character = require("../models/Character");

//Neuen Character erstellen
router.post("/", async (req, res) => {
    console.log(req.body)

  try {
    const { name, class: charClass, race, attributes, username, userId, desc } = req.body;

    if (!name || !charClass || !username) {
      return res.status(400).json({ error: "Name, class, and username are required." });
    }
    const newCharacter = new Character({
      name,
      class: charClass,
      race: race || "", 
      attributes: attributes || undefined,
      desc: desc || "",
      username,
      userid: userId || 1, 
    });

    await newCharacter.save();

    res.status(200).json({ message: "Charakter erfolgreich übermittelt!", character: newCharacter });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred while creating the character." });
  }
});

// Alle Characters abrufen
router.get("/", async (req, res) => {
  try {
    const characters = await Character.find();
    if (characters.length === 0) {
      return res.status(404).json({ message: "Keine Charaktere gefunden" });
    }
    res.status(200).json({ message: "Charaktere erfolgreich abgerufen", characters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ein Fehler ist aufgetreten" });
  }
});

//Character suchen per id
router.get("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Charakter nicht gefunden" });
    }
    res.status(200).json({ message: "Charakter erfolgreich abgerufen", character });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ein Fehler ist aufgetreten" });
  }
});

//Character löschen
router.delete("/:id", async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Charakter nicht gefunden" });
    }
    await character.deleteOne();
    res.status(200).json({ message: "Charakter erfolgreich gelöscht" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ein Fehler ist aufgetreten" });
  }
});

// Charakter-Inventar aktualisieren
router.put("/:id/inventory", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Kein gültiges Inventar angegeben" });
    }

    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: "Charakter nicht gefunden" });
    }

    character.inventory = character.inventory.concat(items);

    await character.save();

    res.status(200).json({
      message: "Inventar erfolgreich aktualisiert",
      character,
    });
  } catch (error) {
    console.error("Fehler beim Aktualisieren des Inventars:", error);
    res.status(500).json({ error: "Ein Fehler ist aufgetreten" });
  }
});


module.exports = router;