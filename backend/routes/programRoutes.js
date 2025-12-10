import express from "express";
import { getPrograms, addProgram } from "../controllers/programController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPrograms);
router.post("/", authMiddleware, addProgram);

export default router;
