const mongoose = require("mongoose");

const ContactListSchema = new mongoose.Schema(
  {
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contact',
    }
  ]
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('ContactList', ContactListSchema);
