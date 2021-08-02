import express from "express";
import { getFullStats } from "../controllers/statsController";
//import { getStats } from "../controllers/test";

const router = express.Router();

router.post("/generate", getFullStats);

export default router;
