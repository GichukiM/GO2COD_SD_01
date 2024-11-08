const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Signup route (no authentication required)
router.post('/signup', userController.signup);

// Login route (no authentication required)
router.post('/login', userController.login);

// Get all users (could be protected, depending on use case)
router.get('/', authMiddleware, userController.getAllUsers);

// Get user info (protected route)
router.get('/me', authMiddleware, userController.getUserInfo); 

// Get contact lists for the authenticated user
router.get('/contact-lists', authMiddleware, userController.getUserContactLists);

// Optional: Update user profile (requires authentication)
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
