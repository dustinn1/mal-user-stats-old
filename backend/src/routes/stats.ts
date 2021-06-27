import express from 'express';
import { getStats } from '../controllers/animeStatsController';

const router = express.Router();

router.post('/generate', getStats)

export default router;