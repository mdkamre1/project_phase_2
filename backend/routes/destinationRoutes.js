import express from "express";
import {
  getAllDestinations,
  addDestination,
} from "../controllers/destinationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDestinations);                 
router.post("/", authMiddleware, addDestination);     

export default router;
