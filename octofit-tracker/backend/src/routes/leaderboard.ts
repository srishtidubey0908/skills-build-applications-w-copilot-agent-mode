import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .sort({ rank: 1 })
    .populate('user', 'name')
    .populate('team', 'name');

  res.json({ leaderboard, message: 'Leaderboard endpoint is ready' });
});

export default router;
