import express from "express";
import { getPrograms, addProgram } from "../controllers/programController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPrograms);             // public
router.post("/", authMiddleware, addProgram); // admin protected

router.delete("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM programs WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Program deleted successfully" });
  });
});


export default router;
