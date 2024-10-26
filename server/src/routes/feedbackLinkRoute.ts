import { Router } from "express";
import { createFeedback, getFeedbackLink } from "../controllers/feebackLinkController";

const router = Router();

// Get data through the corresponding controller
router.get("/", getFeedbackLink);
router.post("/", createFeedback);

export default router;