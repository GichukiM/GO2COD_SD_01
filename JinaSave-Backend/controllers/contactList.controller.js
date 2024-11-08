const ContactList = require('../models/contactList.models.js');
const Contact = require('../models/contact.models.js'); 

const mongoose = require('mongoose');  // Import mongoose to use ObjectId conversion

const getAllContactLists = async (req, res) => {
    try {

        // Convert req.user._id to ObjectId and match in the aggregation
        const contactLists = await ContactList.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user._id)  // Convert to ObjectId for comparison
                }
            },
            {
                $lookup: {
                    from: 'contacts',
                    localField: '_id',             // Match with _id of contact list
                    foreignField: 'contactListId', // Match with contactListId field in contacts
                    as: 'contacts'
                }
            },
            {
                $project: {
                    name: 1,
                    contactCount: { $size: '$contacts' } // Count contacts in each list
                }
            }
        ]);

        res.status(200).json(contactLists);
    } catch (err) {
        console.error('Error retrieving contact lists:', err); // Log any error
        res.status(500).json({ message: 'Error retrieving contact lists', error: err.message });
    }
};

// Get a specific contact list by ID
const getContactList = async (req, res) => {
    try {
        const contactList = await ContactList.findOne({ _id: req.params.id, userId: req.user.id }); // Check for user ownership using `userId`

        if (!contactList) return res.status(404).json({ message: 'Contact list not found' });

        res.status(200).json(contactList);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving contact list', error: err.message });
    }
};

// Add a new contact list for the authenticated user
const addContactList = async (req, res) => {
  // Ensure the user is authenticated
  if (!req.user || !req.user._id) {  // Check if the user ID exists
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Convert user._id to ObjectId (in case it's a string)
  const userId = new mongoose.Types.ObjectId(req.user._id);  // Convert to ObjectId

  // Create a new contact list
  const newList = new ContactList({
    name: req.body.name,
    userId: userId,  // Use the converted ObjectId
  });

  try {
    // Save the new contact list to the database
    const savedList = await newList.save();
    res.status(200).json(savedList);
  } catch (err) {
    console.error('Error saving contact list:', err);  // Log error for debugging
    res.status(400).json({ message: err.message });
  }
};
  
// Delete a contact list by ID
const deleteContactList = async (req, res) => {
    try {
        const contactList = await ContactList.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); // Check for user ownership using `userId`

        if (!contactList) return res.status(404).json({ message: 'Contact list not found' });

        res.status(200).json({ message: 'Contact list deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting contact list', error: err.message });
    }
};

// Update a contact list by ID
const updateContactList = async (req, res) => {
    try {
        const updatedList = await ContactList.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id }, // Check for user ownership using `userId`
            req.body,
            { new: true }
        );

        if (!updatedList) return res.status(404).json({ message: 'Contact list not found' });
        res.status(200).json(updatedList);
    } catch (err) {
        res.status(500).json({ message: 'Error updating contact list', error: err.message });
    }
};

module.exports = { getAllContactLists, addContactList, deleteContactList, updateContactList, getContactList };
