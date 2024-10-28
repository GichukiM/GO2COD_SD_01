const express = require('express');
const { getAllContactLists } = require('../controllers/contactList.controller.js');
const router = express.Router();

router.get('/', getAllContactLists);

module.exports = router;
