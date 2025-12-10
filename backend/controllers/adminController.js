/* eslint-env node */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db/db.js";
import dotenv from "dotenv";
dotenv.config();

// Generate JWT
const generateToken = (admin) => {
  return jwt.sign(
    { id: admin.id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register Admin (Run ONE time)
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Username and password required" });

    const hash = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO admins (username, password_hash) VALUES (?, ?)",
      [username, hash],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Admin Registered Successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login Admin
export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE username = ? LIMIT 1",
    [username],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Admin not found" });

      const admin = results[0];
      const match = await bcrypt.compare(password, admin.password_hash);
      if (!match) return res.status(401).json({ error: "Invalid password" });

      const token = generateToken(admin);
      res.json({ message: "Login Successful", token });
    }
  );
};
