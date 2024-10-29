const ContactList = require('../models/contactList.models.js');
const Contact = require('../models/contact.models.js');

const getAllContactLists = async (req, res) => {
    try {
        const contactLists = await ContactList.aggregate([
            {
                $lookup: {
                    from: 'contacts',           
                    localField: '_id',          
                    foreignField: 'listId',     
                    as: 'contacts'              
                }
            },
            {
                $project: {
                    name: 1,
                    contactCount: { $size: '$contacts' } 
                }
            }
        ]);
        res.status(200).json(contactLists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllContactLists };
