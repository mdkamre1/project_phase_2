import db from "../db/db.js";

export const getDashboardStats = (req, res) => {
  const stats = {};

  const queries = [
    { key: "enquiries", sql: "SELECT COUNT(*) AS total FROM enquiries" },
    { key: "programs", sql: "SELECT COUNT(*) AS total FROM programs" },
    { key: "destinations", sql: "SELECT COUNT(*) AS total FROM destinations" },
    { key: "testimonials", sql: "SELECT COUNT(*) AS total FROM testimonials" }
  ];

  let completed = 0;

  queries.forEach((queryObj) => {
    db.query(queryObj.sql, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      stats[queryObj.key] = result[0].total;
      completed++;

      if (completed === queries.length) {
        db.query(
          "SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 5",
          (err2, latest) => {
            if (err2) return res.status(500).json({ error: err2.message });

            stats.latestEnquiries = latest;
            res.json(stats);
          }
        );
      }
    });
  });
};
