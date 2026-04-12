app.post("/login", (req, res) => {
  const { loginId, password, loginType } = req.body;
  
  // Determine which column to check based on loginType
  let column = "";
  if (loginType === "mobile") column = "phone";
  else if (loginType === "email") column = "email";
  else column = "roll"; // or a composite check for identity

  const sql = `SELECT * FROM users WHERE ${column} = ? AND password = ?`;
  
  db.query(sql, [loginId, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (results.length > 0) {
      // Data found and matches
      res.status(200).json({ success: true, user: results[0] });
    } else {
      // No match found
      res.status(401).json({ success: false, message: "Invalid credentials or User not registered." });
    }
  });
});