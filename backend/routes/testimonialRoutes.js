import express from "express";
import {
  getTestimonials,
  addTestimonial,
} from "../controllers/testimonialController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);                   // Public
router.post("/", authMiddleware, addTestimonial);   // Admin only


router.delete("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM testimonials WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Testimonial deleted successfully" });
  });
});

export default router;
