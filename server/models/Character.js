const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  attributes: {
    type: Object,
    required: true,
    default: {
      strength: 10,
      dexterity: 10, 
      constitution: 10, 
      intelligence: 10,
      wisdpm: 10, 
      charisma: 10, 
    },
  },
  inventory: {
    type: Array,
    default: [],
  },
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  desc: { type: String, required: true },
  level:{ type: Number, default: 1 },
  userid: { type: Number, default: 1, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model("Character", CharacterSchema);