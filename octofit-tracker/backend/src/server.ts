import express from 'express';
import mongoose from 'mongoose';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to OctoFit Tracker backend' });
});

mongoose.connection.once('open', () => {
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
