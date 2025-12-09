/* eslint-env node */
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { submitMessage, getAllMessages } = require("../controllers/contactController");
const { saveEnquiry } = require("../controllers/enquiryController");

// ------------------ Public Routes ------------------
router.post("/contact", submitMessage);
router.post("/enquiry", saveEnquiry);

// ------------------ Admin Login ------------------
router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

// ------------------ Middleware Protection ------------------
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const [, token] = authHeader.split(" ");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  });
}

// ------------------ Admin Protected Routes ------------------
router.get("/admin/messages", verifyAdmin, getAllMessages);

router.get("/enquiry-list", verifyAdmin, (req, res) => {
  const db = require("../db/db");
  db.query("SELECT * FROM enquiries ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ------------------ DESTINATIONS CRUD (ADMIN) ------------------

// ➕ Add New Destination
router.post("/destinations", verifyAdmin, (req, res) => {
  const db = require("../db/db");
  const { name, region, description, image_url } = req.body;

  if (!name || !region || !description || !image_url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO destinations (name, region, description, image_url) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, region, description, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, id: result.insertId });
  });
});

// ✏ Update Destination
router.put("/destinations/:id", verifyAdmin, (req, res) => {
  const db = require("../db/db");
  const { name, region, description, image_url } = req.body;
  const id = req.params.id;

  const sql = `
    UPDATE destinations 
    SET name=?, region=?, description=?, image_url=? 
    WHERE id=?`;

  db.query(sql, [name, region, description, image_url, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Destination updated successfully" });
  });
});

// ❌ Delete Destination
router.delete("/destinations/:id", verifyAdmin, (req, res) => {
  const db = require("../db/db");
  const id = req.params.id;

  db.query("DELETE FROM destinations WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Destination deleted successfully" });
  });
});

// 🌍 Public Get All Destinations
router.get("/destinations", (req, res) => {
  const db = require("../db/db");
  const sql = "SELECT * FROM destinations ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
// ================== REVIEWS (Ratings + Comments) ==================

// ➕ Add Review
router.post("/destinations/:id/reviews", (req, res) => {
  const db = require("../db/db");
  const destinationId = req.params.id;
  const { rating, comment } = req.body;

  if (!rating) {
    return res.status(400).json({ error: "Rating is required" });
  }

  const sql = "INSERT INTO reviews (destination_id, rating, comment) VALUES (?, ?, ?)";
  db.query(sql, [destinationId, rating, comment || ""], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, id: result.insertId });
  });
});

// 📌 Get All Reviews for One Destination
router.get("/destinations/:id/reviews", (req, res) => {
  const db = require("../db/db");
  const destinationId = req.params.id;

  const sql = `
    SELECT rating, comment, DATE_FORMAT(created_at,'%d-%m-%Y %H:%i') AS date
    FROM reviews WHERE destination_id = ? ORDER BY created_at DESC`;

  db.query(sql, [destinationId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
// ✏ Update Review
router.put("/reviews/:id", (req, res) => {
  const db = require("../db/db");
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  if (!rating) {
    return res.status(400).json({ error: "Rating is required" });
  }

  const sql = "UPDATE reviews SET rating=?, comment=? WHERE id=?";
  db.query(sql, [rating, comment || "", reviewId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Review updated successfully" });
  });
});
// ❌ Delete Review
router.delete("/reviews/:id", (req, res) => {
  const db = require("../db/db");
  const reviewId = req.params.id;

  db.query("DELETE FROM reviews WHERE id=?", [reviewId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: "Review deleted successfully" });
  });
});

module.exports = router;
