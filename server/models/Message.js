const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  headline:{ type: String, require: true },
  message: { type: String, required: true },
  user: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ["warning", "announcement", "message"], 
    default: "message" 
  }
});

module.exports = mongoose.model("Message", MessageSchema);
