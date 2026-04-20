const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTER
exports.register = async (req, res) => {
  const { name, email = "", phone, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.trim().toLowerCase(),
      phone,
      passwordHash: hashedPassword,
      role: "applicant",
    });

    res.json({
      success: true,
      message: "Registered Successfully",
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { loginId = "", password = "", loginType } = req.body;

    let user = null;

    if (loginType === "email") {
      user = await User.findOne({
        email: loginId.trim().toLowerCase(),
      });
    } else if (loginType === "mobile") {
      user = await User.findOne({
        phone: loginId,
      });
    }

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};