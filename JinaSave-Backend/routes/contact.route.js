const express = require('express');
const router = express.Router();
const { createContact, getContacts, getContactById, updateContact, deleteContact, getContactsByListId } = require('../controllers/contact.controller.js');

    router.post('/', createContact);
    router.get('/', getContacts);
    router.get('/:id', getContactById);
    router.put('/:id', updateContact);
    router.delete('/:id', deleteContact);
    router.get('/list/:listId', getContactsByListId);

    module.exports = router;