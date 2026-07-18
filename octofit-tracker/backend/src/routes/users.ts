import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().populate('team', 'name');
  res.json({ users, message: 'Users endpoint is ready' });
});

export default router;
