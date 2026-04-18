const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  const { name, email = "", phone, dob, roll, year, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
  name,
  email: (email || "").trim().toLowerCase(),  // 🔥 MUST
  phone,
  dob,
  roll,
  year,
  password: hashedPassword,
});

    res.json({
      success: true,
      message: "Registered Successfully",
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { loginId = "", password = "", loginType } = req.body;

    let user = null;

    // 🔥 HANDLE DIFFERENT LOGIN TYPES
    if (loginType === "email") {
      user = await User.findOne({
        email: loginId.trim().toLowerCase()
      });
    } else if (loginType === "mobile") {
      user = await User.findOne({
        phone: loginId
      });
    } else if (loginType === "identity") {
      user = await User.findOne({
        roll: loginId
      });
    }

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      message: "Login successful",
      user,
      role: "applicant" // adjust later if needed
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
module.exports = router;