import express from "express";
import { getFullStats } from "../controllers/stats/statsController";

const router = express.Router();

router.post("/generate", getFullStats);

export default router;
