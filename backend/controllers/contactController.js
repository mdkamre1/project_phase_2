/* eslint-env node */
const db = require("../db/db");

exports.submitMessage = (req, res) => {
	const { name, email, message } = req.body;
	if (!name || !email || !message) {
		return res.status(400).json({ error: "Name, email and message are required" });
	}

	const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
	db.query(sql, [name, email, message], (err, result) => {
		if (err) return res.status(500).json({ error: err.message });
		return res.status(201).json({ id: result.insertId });
	});
};

exports.getAllMessages = (req, res) => {
	const sql = "SELECT * FROM messages ORDER BY created_at DESC";
	db.query(sql, (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		return res.json(results);
	});
};
