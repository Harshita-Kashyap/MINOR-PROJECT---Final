const db = require("../config/db");

// Create Vacancy (Admin)
exports.createVacancy = (req, res) => {
  const { title, department, description, eligibility, deadline } = req.body;

  const sql = `
    INSERT INTO vacancies (title, department, description, eligibility, deadline)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, department, description, eligibility, deadline], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Vacancy Created" });
  });
};

// Get All Vacancies
exports.getVacancies = (req, res) => {
  db.query("SELECT * FROM vacancies", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};