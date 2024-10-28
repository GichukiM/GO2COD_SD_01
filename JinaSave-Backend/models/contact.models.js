const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    tag: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: false,
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ContactList',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
