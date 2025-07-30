import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },  phone: String,
  isActive: {
    type: Boolean,
    default: true
  },
  // Kill Count and Stats
  killStats: {
    totalKills: {
      type: Number,
      default: 0
    },
    preferredWeapons: [{
      weaponName: String,
      kills: Number,
      weaponType: String // handgun, rifle, sniper, etc.
    }],
    missionType: {
      type: String,
      enum: ['Assassin', 'Military', 'Law Enforcement', 'Hunter', 'Sport Shooter', 'Other'],
      default: 'Other'
    },
    yearsActive: {
      type: Number,
      default: 0
    },
    location: String,
    rank: String,
    achievements: [String],
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema); 