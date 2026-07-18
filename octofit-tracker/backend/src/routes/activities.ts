import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name email');
  res.json({ activities, message: 'Activities endpoint is ready' });
});

export default router;
