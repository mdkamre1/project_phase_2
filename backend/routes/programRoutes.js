import express from "express";
import { getPrograms, addProgram } from "../controllers/programController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPrograms);             // public
router.post("/", authMiddleware, addProgram); // admin protected

export default router;
