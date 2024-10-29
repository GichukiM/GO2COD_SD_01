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

const addContactList = async (req, res) => {
    const newList = new ContactList({
        name: req.body.name,
    });

    try {
        const savedList = await newList.save();
        res.status(200).json(savedList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteContactList = async (req, res) => {
    try {
        const contactList = await ContactList.findByIdAndDelete(req.params.id);

        if (!contactList) return res.status(404).json({ message: 'Contact list not found' });

        res.status(200).json({message: 'Contact deleted successfully'});
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(404).json({message: 'Contact not found'});

        res.status(500).json({message: err.message});
    }
};

const updateContactList = (req, res) => {
    ContactList.findByIdAndUpdate(req.params.id, req.body, { new: true })
       .then(updatedList => {
            if (!updatedList) return res.status(404).json({ message: 'Contact list not found' });
            res.status(200).json(updatedList);
        })
       .catch(err => {
            if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Contact list not found' });
            res.status(500).json({ message: err.message });
        });
};


module.exports = { getAllContactLists, addContactList, deleteContactList, updateContactList };
