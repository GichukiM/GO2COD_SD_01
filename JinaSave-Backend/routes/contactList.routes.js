const express = require('express');
const { getAllContactLists, addContactList, deleteContactList, updateContactList } = require('../controllers/contactList.controller.js');
const router = express.Router();

router.get('/', getAllContactLists);
router.post('/', addContactList);
router.delete('/:id', deleteContactList);
router.put('/:id', updateContactList);

module.exports = router;
