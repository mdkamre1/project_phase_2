import db from "../db/db.js";

// Add enquiry
export const addEnquiry = (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO enquiries (name, email, message) VALUES (?, ?, ?)",
    [name, email, message],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Enquiry submitted successfully" });
    }
  );
};

// Read enquiries
export const getEnquiries = (req, res) => {
  db.query(
    "SELECT * FROM enquiries ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Delete
export const deleteEnquiry = (req, res) => {
  db.query("DELETE FROM enquiries WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Enquiry deleted successfully" });
  });
};
