const mongoose = require("mongoose");

const ContactListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const ContactList = mongoose.model('ContactList', ContactListSchema);
module.exports = ContactList;
