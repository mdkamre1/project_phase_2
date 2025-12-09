/* eslint-env node */
const db = require("../db/db");

exports.saveEnquiry = (req, res) => {
  const { full_name, email, phone, nationality, program, message } = req.body;

  if (!full_name || !email || !phone || !nationality || !program || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO enquiries (full_name, email, phone, nationality, program, message) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [full_name, email, phone, nationality, program, message], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json({ success: true, message: "Enquiry submitted successfully!" });
  });
};
