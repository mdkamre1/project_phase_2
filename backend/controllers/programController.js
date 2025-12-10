import db from "../db/db.js";

// Get all programs
export const getPrograms = (req, res) => {
  db.query("SELECT * FROM programs ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Add program
export const addProgram = (req, res) => {
  const { title, country, description, tuition_fee } = req.body;
  if (!title || !country || !description || !tuition_fee)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO programs (title, country, description, tuition_fee) VALUES (?, ?, ?, ?)",
    [title, country, description, tuition_fee],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Program added" });
    }
  );
};
