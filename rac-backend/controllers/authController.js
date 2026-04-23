// controllers\authControllers.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Remove sensitive fields before sending user data
const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.passwordHash;
  return userObj;
};

// REGISTER (Applicant only)
exports.register = async (req, res) => {
  const { name, email = "", phone = "", password } = req.body;

  try {
    const normalizedName = name?.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    if (!normalizedName || !password) {
      return res.status(400).json({
        success: false,
        message: "Name and password are required",
      });
    }

    if (!normalizedEmail && !normalizedPhone) {
      return res.status(400).json({
        success: false,
        message: "Either email or phone is required",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is missing in environment variables",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
        ...(normalizedPhone ? [{ phone: normalizedPhone }] : []),
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      phone: normalizedPhone,
      passwordHash: hashedPassword,
      role: "applicant",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { loginId = "", password = "", loginType } = req.body;

    const normalizedLoginId = loginId.trim();

    if (!normalizedLoginId || !password || !loginType) {
      return res.status(400).json({
        success: false,
        message: "loginId, password, and loginType are required",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT_SECRET is missing in environment variables",
      });
    }

    let user = null;

    if (loginType === "email") {
      user = await User.findOne({
        email: normalizedLoginId.toLowerCase(),
      });
    } else if (loginType === "mobile") {
      user = await User.findOne({
        phone: normalizedLoginId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid login type",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};