const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "authdb",
});

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database");
    connection.release();
  }
});


// ================= REGISTER ROUTE =================
app.post("/register", (req, res) => {
  const { name, email, phone, dob, roll, year, password } = req.body;

  console.log("📩 Register Data:", req.body);

  // Check required fields
  if (!name || !email || !phone || !password) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  // Check Email
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, emailResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB Error" });
    }

    if (emailResult.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Check Phone
    db.query("SELECT * FROM users WHERE phone = ?", [phone], (err, phoneResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB Error" });
      }

      if (phoneResult.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Phone already registered",
        });
      }

      // Check Roll
      db.query("SELECT * FROM users WHERE roll = ?", [roll], (err, rollResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "DB Error" });
        }

        if (rollResult.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Roll already registered",
          });
        }

        // Insert User
        const insertQuery = `
          INSERT INTO users (name, email, phone, dob, roll, year, password)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          insertQuery,
          [name, email, phone, dob, roll, year, password],
          (err, result) => {
            if (err) {
              console.error("❌ Insert Error:", err);
              return res.status(500).json({
                success: false,
                message: "Insert failed",
              });
            }

            console.log("✅ User Registered Successfully");
            res.status(201).json({
              success: true,
              message: "Registration successful",
            });
          }
        );
      });
    });
  });
});


// ================= LOGIN ROUTE =================
app.post("/api/login", (req, res) => {
  const { loginId, password, loginType } = req.body;

  console.log("🔐 Login Attempt:", { loginId, loginType });

  let column = "phone";
  if (loginType === "email") column = "email";
  if (loginType === "identity") column = "roll";

  const sql = `SELECT * FROM users WHERE ${column} = ? AND password = ?`;

  db.query(sql, [loginId, password], (err, result) => {
    if (err) {
      console.error("❌ Login Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (result.length > 0) {
      console.log("✅ Login Successful");

     const user = result[0];

res.status(200).json({
  success: true,
  message: "Login successful",
  role: user.role,   // 🔥 VERY IMPORTANT
  name: user.name
});
    } else {
      console.log("❌ Invalid credentials");

      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  });
});


// ================= SERVER START =================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});