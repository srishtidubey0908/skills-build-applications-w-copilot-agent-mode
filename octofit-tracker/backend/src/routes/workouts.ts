import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('user', 'name');
  res.json({ workouts, message: 'Workouts endpoint is ready' });
});

export default router;
