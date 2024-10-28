const ContactList = require('../models/contactList.models.js');
const Contact = require('../models/contact.models.js');

const getAllContactLists = async (req, res) => {
    try {
        const contactLists = await ContactList.aggregate([
            {
                $lookup: {
                    from: 'contacts',           // Collection to join (contacts)
                    localField: '_id',          // Field from ContactList
                    foreignField: 'listId',     // Field from Contact
                    as: 'contacts'              // Alias for the joined documents
                }
            },
            {
                $project: {
                    name: 1,
                    contactCount: { $size: '$contacts' } // Count the number of contacts in each list
                }
            }
        ]);
        res.status(200).json(contactLists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllContactLists };
