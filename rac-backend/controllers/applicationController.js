const db = require("../config/db");

// Apply for job
exports.applyJob = (req, res) => {
  const { user_id, vacancy_id } = req.body;

  const sql = `
    INSERT INTO applications (user_id, vacancy_id)
    VALUES (?, ?)
  `;

  db.query(sql, [user_id, vacancy_id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Applied Successfully" });
  });
};

// Get applications (Admin + Selector)
exports.getApplications = (req, res) => {
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
};