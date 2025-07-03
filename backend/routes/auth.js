const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const LoginLog = require('../models/LoginLog');

const router = express.Router();

// 📌 Register User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    // Create and save new user
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 📌 Login User (email + password)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      await LoginLog.create({ email, status: 'failure' });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await LoginLog.create({ email, status: 'failure' });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    await LoginLog.create({ email, status: 'success' });
    res.json({ message: 'Login successful', user });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// 📌 Google Login
router.post('/google-login', async (req, res) => {
  const { email, username } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        username,
        password: 'google_oauth_user' // placeholder password
      });
      await user.save();
    }

    await LoginLog.create({ email, status: 'success' });

    res.status(200).json({ message: 'Google login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
