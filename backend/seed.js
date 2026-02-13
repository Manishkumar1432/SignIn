const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/signindb';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected for seeding');
    const email = 'test@example.com';
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Test user already exists:', email);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('Password123', salt);
    const user = new User({ name: 'Test User', email, password: hashed });
    await user.save();
    console.log('Seed user created: test@example.com / Password123');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seed error', err);
    process.exit(1);
  });