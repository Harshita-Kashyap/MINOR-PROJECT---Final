const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: String,
  roll: String,
  year: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "selector", "applicant"],
    default: "applicant"
  }
});

module.exports = mongoose.model("User", userSchema, "users");