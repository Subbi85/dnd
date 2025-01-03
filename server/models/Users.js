const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ['player', 'dm'], 
    default: 'player'
  },
  password: { type: String, required: true } 
});

// Hashen des Passworts vor dem Speichern
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); 
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Methode zum Vergleichen von eingegebenem Passwort und gespeichertem Passwort
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);