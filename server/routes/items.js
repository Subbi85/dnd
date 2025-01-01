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

//Neues Item in den Shop
router.post("/", async (req, res) => {
  var category = "";
  try {

    if (Array.isArray(req.body.desc)) {
      category = req.body.desc[0]
      req.body.desc = req.body.desc.slice(1).join("\n");
    }

    if (typeof req.body.rarity === "object" && req.body.rarity.name) {
      req.body.rarity = req.body.rarity.name;
    }

    if (category) {
      category = category.split(",")[0]; 
      category = category.replace(/\s?\(.*\)/, ""); 
      req.body.category = category;
    }

    const newItem = new Item(req.body);
    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Fehler beim Speichern:", err);
  }
});

// Items löschen
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Itemnicht gefunden" });
    }
    res.json({ message: "Item gelöscht", deletedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Itempreis anpassen
router.patch("/:id/price/:price", async (req, res) => {
  try {
    const { id, price } = req.params;

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({ error: "Auf das Preisformat achten" });
    }

    // Aktualisierung des Items
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { price: parsedPrice },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item nicht gefunden" });
    }

    res.json({ message: "Neuer Preis hinterlegt", updatedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Itemanzahl ändern
router.patch("/:id/stock/:stock", async (req, res) => {
  try {
    const { id, stock } = req.params;

    // Validierung und Konvertierung von `stock`
    const parsedStock = parseInt(stock, 10);
    if (isNaN(parsedStock) || parsedStock < 0) {
      return res.status(400).json({ error: "Gültige Anzahl (stock) erforderlich" });
    }

    // Aktualisierung der Anzahl
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { stock: parsedStock },
      { new: true } 
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item nicht gefunden" });
    }

    res.json({ message: "Die Anzahl des Items wurde angepasst", updatedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;