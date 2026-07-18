import { Router } from 'express';
import Team from '../models/Team.js';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members', 'name email');
  res.json({ teams, message: 'Teams endpoint is ready' });
});

export default router;
