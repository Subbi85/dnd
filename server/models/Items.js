const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  category:{type: String, default: ""},
  price: { type: Number, required: true, default: 200 },
  rarity: { type: String, required: true },
  stock: { type: Number, default: 1 },
});

module.exports = mongoose.model("Item", itemSchema);