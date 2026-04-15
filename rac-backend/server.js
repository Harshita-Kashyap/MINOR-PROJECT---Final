const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
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

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("🚀 Backend Running");
});

// ================= REGISTER =================
app.post("/register", (req, res) => {
  const { name, email, phone, dob, roll, year, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const sql = `
      INSERT INTO users (name, email, phone, dob, roll, year, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, email, phone, dob, roll, year, password], (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "✅ Registered successfully" });
    });
  });
});

// ================= LOGIN =================
app.post("/api/login", (req, res) => {
  const { loginId, password, loginType } = req.body;

  let column = "phone";
  if (loginType === "email") column = "email";
  if (loginType === "identity") column = "roll";

  const sql = `SELECT * FROM users WHERE ${column}=? AND password=?`;

  db.query(sql, [loginId, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      const user = result[0];

      res.json({
        success: true,
        role: user.role,
        userId: user.id,
        name: user.name,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

// ================= VACANCIES =================

// Create
app.post("/api/vacancies", (req, res) => {
  const { title, department, description, eligibility, deadline } = req.body;

  if (!title || !department) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = `
    INSERT INTO vacancies (title, department, description, eligibility, deadline)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, department, description, eligibility, deadline], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "✅ Vacancy created" });
  });
});

// Read
app.get("/api/vacancies", (req, res) => {
  db.query("SELECT * FROM vacancies", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Update
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
      if (err) return res.status(500).json(err);
      res.json({ message: "✅ Vacancy updated" });
    }
  );
});

// Delete
app.delete("/api/vacancies/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM vacancies WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "✅ Vacancy deleted" });
  });
});

// ================= APPLICATION =================

// Apply job (with duplicate check)
app.post("/api/apply", (req, res) => {
  const { user_id, vacancy_id } = req.body;

  if (!user_id || !vacancy_id) {
    return res.status(400).json({ message: "Missing data" });
  }

  // Prevent duplicate apply
  db.query(
    "SELECT * FROM applications WHERE user_id=? AND vacancy_id=?",
    [user_id, vacancy_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        return res.json({ message: "Already applied" });
      }

      const sql = `
        INSERT INTO applications (user_id, vacancy_id)
        VALUES (?, ?)
      `;

      db.query(sql, [user_id, vacancy_id], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "✅ Applied successfully" });
      });
    }
  );
});

// Get all applications (Admin/Selector)
app.get("/api/applications", (req, res) => {
  const sql = `
    SELECT a.id, u.name, u.email, v.title, a.status, a.score
    FROM applications a
    JOIN users u ON a.user_id = u.id
    JOIN vacancies v ON a.vacancy_id = v.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Get applications for specific user
app.get("/api/my-applications/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT a.id, v.title, v.department, a.status, a.applied_at
    FROM applications a
    JOIN vacancies v ON a.vacancy_id = v.id
    WHERE a.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ================= SELECTOR =================

// Update status
app.put("/api/status", (req, res) => {
  const { id, status } = req.body;

  if (!id || !status) {
    return res.status(400).json({ message: "Missing fields" });
  }

  db.query(
    "UPDATE applications SET status=? WHERE id=?",
    [status, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "✅ Status updated" });
    }
  );
});

// ================= SERVER =================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});