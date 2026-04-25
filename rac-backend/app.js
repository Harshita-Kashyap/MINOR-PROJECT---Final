// app.js

const express = require("express");
const cors = require("cors");

const app = express();

// ========================
// 🧩 Middlewares
// ========================
app.use(
  cors({
    origin: "*", // later restrict to frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================
// 🧪 Health Check
// ========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

// ========================
// 📌 Routes
// ========================
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/applicant", require("./routes/applicantRoutes"));
app.use("/api/profile", require("./routes/applicantProfileRoutes"));

app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/vacancies", require("./routes/vacancyRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/selector", require("./routes/selectorRoutes"));

// ========================
// ❗ 404 Handler
// ========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ========================
// ⚠️ Global Error Handler
// ========================
app.use((err, req, res, next) => {
  console.error("❌ App Error:", err.message);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
