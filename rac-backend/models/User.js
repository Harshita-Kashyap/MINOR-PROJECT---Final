const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: String,
  roll: String,
  year: String,
  password: String,
});

// 🔥 FORCE collection name = "users"
module.exports = mongoose.model("User", userSchema, "users");