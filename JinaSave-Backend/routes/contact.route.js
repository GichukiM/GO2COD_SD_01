const express = require('express');
const {
    createContact,
    getContacts,
    getContactById,
    getContactsByListId,
    updateContact,
    deleteContact,
} = require('../controllers/contact.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js'); // Authentication middleware
const router = express.Router();

// Authentication middleware applied to all routes that need user authorization
router.post('/', authMiddleware, createContact); // Add a new contact
router.get('/', authMiddleware, getContacts); // Get all contacts for authenticated user
router.get('/:id', authMiddleware, getContactById); // Get a single contact by ID
router.get('/list/:listId', authMiddleware, getContactsByListId); // Get contacts by list ID
router.put('/:id', authMiddleware, updateContact); // Update a contact by ID
router.delete('/:id', authMiddleware, deleteContact); // Delete a contact by ID

module.exports = router;
