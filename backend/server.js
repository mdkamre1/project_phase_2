const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Create storage file if missing
const FILE = "messages.json";
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify([]));
}

// POST /api/contact
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toISOString(),
  };

  // Save to file
  const existing = JSON.parse(fs.readFileSync(FILE));
  existing.push(newMessage);
  fs.writeFileSync(FILE, JSON.stringify(existing, null, 2));

  res.json({ success: true, message: "Message received!" });
});

// GET all messages (optional for admin page later)
app.get("/api/messages", (req, res) => {
  const messages = JSON.parse(fs.readFileSync(FILE));
  res.json(messages);
});

app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);
