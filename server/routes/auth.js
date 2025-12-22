const express = require('express');
const router = express.Router();

// Mock Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // In a real app, validate credentials here
  res.json({
    success: true,
    user: {
      id: '123',
      name: 'Test User',
      email: email
    },
    token: 'mock-jwt-token'
  });
});

// Mock Signup
router.post('/signup', (req, res) => {
    res.json({
        success: true,
        message: 'User registered successfully'
    });
});

module.exports = router;
