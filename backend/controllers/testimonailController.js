import db from "../db/db.js";

// Get testimonials
export const getTestimonials = (req, res) => {
  db.query(
    "SELECT * FROM testimonials ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Add testimonial
export const addTestimonial = (req, res) => {
  const { name, country, testimonial, image_url } = req.body;
  if (!name || !country || !testimonial || !image_url)
    return res.status(400).json({ error: "All fields required" });

  db.query(
    "INSERT INTO testimonials (name, country, testimonial, image_url) VALUES (?, ?, ?, ?)",
    [name, country, testimonial, image_url],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Testimonial added" });
    }
  );
};
