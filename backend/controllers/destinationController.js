const db = require("../db/db");

exports.getDestinations = (req, res) => {
  const sql = "SELECT * FROM destinations ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
