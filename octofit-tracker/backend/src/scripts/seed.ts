import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teamA = await Team.create({
      name: 'Velocity Vipers',
      description: 'High-performance athletes focused on endurance and speed training.'
    });

    const teamB = await Team.create({
      name: 'Core Crushers',
      description: 'Team dedicated to strength, flexibility, and functional fitness.'
    });

    const userAlice = await User.create({
      name: 'Alice Morgan',
      email: 'alice.morgan@example.com',
      role: 'member',
      team: teamA._id
    });

    const userNoah = await User.create({
      name: 'Noah Reid',
      email: 'noah.reid@example.com',
      role: 'member',
      team: teamA._id
    });

    const userMaya = await User.create({
      name: 'Maya Chen',
      email: 'maya.chen@example.com',
      role: 'coach',
      team: teamB._id
    });

    teamA.members = [userAlice._id, userNoah._id];
    teamB.members = [userMaya._id];
    await teamA.save();
    await teamB.save();

    await Activity.create([{
      user: userAlice._id,
      type: 'Running',
      durationMinutes: 45,
      caloriesBurned: 420,
      distanceKm: 8.2,
      date: new Date('2026-07-12T07:30:00Z')
    }, {
      user: userNoah._id,
      type: 'Cycling',
      durationMinutes: 60,
      caloriesBurned: 540,
      distanceKm: 22.5,
      date: new Date('2026-07-13T09:00:00Z')
    }, {
      user: userMaya._id,
      type: 'Yoga',
      durationMinutes: 30,
      caloriesBurned: 180,
      distanceKm: 0,
      date: new Date('2026-07-14T06:15:00Z')
    }]);

    await Workout.create([{
      user: userAlice._id,
      title: 'Morning HIIT',
      category: 'Cardio',
      durationMinutes: 30,
      difficulty: 'intermediate',
      scheduledFor: new Date('2026-07-18T06:00:00Z'),
      completed: false
    }, {
      user: userNoah._id,
      title: 'Endurance Ride',
      category: 'Cycling',
      durationMinutes: 75,
      difficulty: 'advanced',
      scheduledFor: new Date('2026-07-18T18:00:00Z'),
      completed: false
    }, {
      user: userMaya._id,
      title: 'Recovery Stretch',
      category: 'Flexibility',
      durationMinutes: 25,
      difficulty: 'beginner',
      scheduledFor: new Date('2026-07-18T10:00:00Z'),
      completed: false
    }]);

    await LeaderboardEntry.create([{
      user: userAlice._id,
      team: teamA._id,
      score: 1420,
      rank: 1,
      period: 'weekly'
    }, {
      user: userNoah._id,
      team: teamA._id,
      score: 1310,
      rank: 2,
      period: 'weekly'
    }, {
      user: userMaya._id,
      team: teamB._id,
      score: 1240,
      rank: 3,
      period: 'weekly'
    }]);

    console.log('Seed data inserted for users, teams, activities, leaderboard, and workouts');
    console.log('Database seeding complete');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
