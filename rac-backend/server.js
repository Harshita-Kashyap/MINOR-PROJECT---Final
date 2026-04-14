const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE CONNECTION =================
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Krishna@780",
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

// =======================================================
// ================= AUTH ROUTES ==========================
// =======================================================

// REGISTER
app.post("/api/register", (req, res) => {
  const { name, email, phone, dob, roll, year, password } = req.body;

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
      return res.status(400).json({ message: "Email already exists" });
    }

    // Insert User
    const insertQuery = `
      INSERT INTO users (name, email, phone, dob, roll, year, password, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [name, email, phone, dob, roll, year, password, "applicant"],
      (err) => {
        if (err) {
          console.error("❌ Insert Error:", err);
          return res.status(500).json({ message: "Insert failed" });
        }

        res.json({
          success: true,
          message: "Registered successfully",
        });
      }
    );
  });
});

// ================= LOGIN (FIXED) =================
app.post("/api/login", (req, res) => {
  const { loginId, password, loginType } = req.body;

  let column = "phone";
  if (loginType === "email") column = "email";
  if (loginType === "identity") column = "roll";

  const sql = `SELECT * FROM users WHERE ${column} = ?`;

  db.query(sql, [loginId], (err, result) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result[0];

    // 🔐 Password check
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    console.log("✅ Login Success:", user.email);

    res.json({
      success: true,
      user, // includes role
    });
  });
});

// =======================================================
// ================= VACANCY ROUTES =======================
// =======================================================

// GET ALL VACANCIES
app.get("/api/vacancies", (req, res) => {
  db.query("SELECT * FROM vacancies ORDER BY created_at DESC", (err, result) => {
    if (err) {
      console.error("❌ Fetch Error:", err);
      return res.status(500).json({ message: "Error fetching vacancies" });
    }

    res.json(result);
  });
});

// CREATE VACANCY
app.post("/api/vacancies", (req, res) => {
  const { title, department, description, eligibility, deadline } = req.body;

  if (!title || !department) {
    return res.status(400).json({
      message: "Title and Department are required",
    });
  }

  const sql = `
    INSERT INTO vacancies (title, department, description, eligibility, deadline)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, department, description, eligibility, deadline],
    (err) => {
      if (err) {
        console.error("❌ Insert Vacancy Error:", err);
        return res.status(500).json({ message: "Error creating vacancy" });
      }

      res.json({
        success: true,
        message: "Vacancy created successfully",
      });
    }
  );
});

// UPDATE VACANCY
app.put("/api/vacancies/:id", (req, res) => {
  const { id } = req.params;
  const { title, department, description, eligibility, deadline } = req.body;

  const sql = `
    UPDATE vacancies
    SET title=?, department=?, description=?, eligibility=?, deadline=?
    WHERE id=?
  `;

  db.query(
    sql,
    [title, department, description, eligibility, deadline, id],
    (err) => {
      if (err) {
        console.error("❌ Update Error:", err);
        return res.status(500).json({ message: "Error updating vacancy" });
      }

      res.json({
        success: true,
        message: "Vacancy updated successfully",
      });
    }
  );
});

// DELETE VACANCY
app.delete("/api/vacancies/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM vacancies WHERE id=?", [id], (err) => {
    if (err) {
      console.error("❌ Delete Error:", err);
      return res.status(500).json({ message: "Error deleting vacancy" });
    }

    res.json({
      success: true,
      message: "Vacancy deleted successfully",
    });
  });
});

// =======================================================
// ================= SERVER START =========================
// =======================================================

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});