const db = require("../config/db");

// Update status (Selector)
exports.updateStatus = (req, res) => {
  const { id, status } = req.body;

  const sql = "UPDATE applications SET status=? WHERE id=?";

  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Status Updated" });
  });
};