const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { submitMessage, getAllMessages } = require("../controllers/contactController");

// Simple admin login
router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

// Middleware to protect admin routes
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

// Public route: user contact form
router.post("/contact", submitMessage);

// Protected route: admin messages
router.get("/admin/messages", verifyAdmin, getAllMessages);

module.exports = router;
