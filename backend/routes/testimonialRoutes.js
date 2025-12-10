import express from "express";
import {
  getTestimonials,
  addTestimonial,
} from "../controllers/testimonialController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", authMiddleware, addTestimonial);

export default router;
