const express = require('express');
const {
  getAllContactLists,
  addContactList,
  deleteContactList,
  updateContactList,
  getContactList,
} = require('../controllers/contactList.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js'); // Add the middleware
const router = express.Router();

// Apply the authMiddleware to each route that needs user authorization
router.get('/', authMiddleware, getAllContactLists); // Get all contact lists for the authenticated user
router.post('/', authMiddleware, addContactList); // Add a new contact list for the authenticated user
router.delete('/:id', authMiddleware, deleteContactList); // Delete a contact list by ID (for the authenticated user)
router.put('/:id', authMiddleware, updateContactList); // Update a contact list by ID (for the authenticated user)
router.get('/:id', authMiddleware, getContactList); // Get a specific contact list (for the authenticated user)

module.exports = router;
