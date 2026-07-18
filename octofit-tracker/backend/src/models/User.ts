import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
  joinedAt: { type: Date, default: Date.now },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

const User = mongoose.model('User', userSchema);
export default User;
