import express from "express";
import {
  addEnquiry,
  getEnquiries,
  deleteEnquiry,
} from "../controllers/enquiryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", addEnquiry);        // public
router.get("/", authMiddleware, getEnquiries);
router.delete("/:id", authMiddleware, deleteEnquiry);

export default router;
