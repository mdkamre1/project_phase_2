import express from "express";
import {
  getAllDestinations,
  addDestination,
} from "../controllers/destinationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDestinations);                 
router.post("/", authMiddleware, addDestination);     

router.delete("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM destinations WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Destination deleted successfully" });
  });
});


export default router;
