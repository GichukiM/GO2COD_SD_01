const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: 'Contact with this email already exists for the user',
    },
    phone: {
      type: String,
      required: true,
      unique: 'Contact with this phone number already exists for the user',
    },
    tag: {
      type: String,
      required: true,
    },
    contactListId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactList',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', ContactSchema);
