import express from "express";
import {
  getTestimonials,
  addTestimonial,
} from "../controllers/testimonialController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);                   // Public
router.post("/", authMiddleware, addTestimonial);   // Admin only

export default router;
