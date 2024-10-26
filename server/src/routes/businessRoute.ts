import { Router } from "express";
import { createBusiness, getBusiness } from "../controllers/businessController";

const router = Router();

// Get data through the corresponding controller
router.get("/", getBusiness);
// Post new data
router.post("/", createBusiness);

export default router;