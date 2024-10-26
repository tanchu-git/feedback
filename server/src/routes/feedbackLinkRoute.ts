import { Router } from "express";
import { getFeedbackLink } from "../controllers/feebackLinkController";

const router = Router();

// Get data through the corresponding controller
router.get("/", getFeedbackLink);

export default router;