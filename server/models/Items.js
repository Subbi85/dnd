const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  rarity: { type: String, required: true }, 
  stock: { type: Number, default: 10 },
});

module.exports = mongoose.model("Item", itemSchema);