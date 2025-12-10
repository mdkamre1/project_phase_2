import db from "../db/db.js";

// Get destinations
export const getAllDestinations = (req, res) => {
  db.query(
    "SELECT * FROM destinations ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Add destination
export const addDestination = (req, res) => {
  const { name, region, description, image_url } = req.body;
  if (!name || !region || !description || !image_url)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO destinations (name, region, description, image_url) VALUES (?, ?, ?, ?)",
    [name, region, description, image_url],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Destination added" });
    }
  );
};
