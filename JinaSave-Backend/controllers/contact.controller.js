const Contact = require('../models/contact.models.js');
const ContactList = require('../models/contactList.models.js');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Multer configuration for uploading contact profiles
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage }).single('profile');


const createContact = async (req, res) => {
    const { name, email, phone, tag, contactList, profile } = req.body;
  
    try {
      // Step 1: Find the contact list by its name and ensure it belongs to the logged-in user
      const contactListDoc = await ContactList.findOne({
        name: contactList, // Match by name provided by the user
        userId: req.user._id // Ensure it belongs to the authenticated user
      });
  
      if (!contactListDoc) {
        return res.status(404).json({ message: 'Contact list not found or not owned by the user' });
      }
  
      // Step 2: Create the new contact and associate it with the found contact list
      const newContact = new Contact({
        name,
        email,
        phone,
        tag,
        contactListId: contactListDoc._id, // Use the actual ObjectId of the contact list
        profile: profile || null
      });
  
      await newContact.save();
  
      // Return the newly created contact
      res.status(200).json(newContact);
  
    } catch (err) {
      console.error('Error creating contact:', err);
      res.status(500).json({ message: err.message });
    }
  };

// GET ALL CONTACTS FOR THE AUTHENTICATED USER

const getContacts = async (req, res) => {
    try {
        // Ensure the user is authenticated
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Find all ContactLists for the authenticated user
        const contactLists = await ContactList.find({ userId: req.user._id });

        if (!contactLists.length) {
            return res.status(404).json({ message: 'No contact lists found for this user.' });
        }

        // Extract the contactListIds from the found ContactLists
        const contactListIds = contactLists.map(list => list._id);

        // Convert contactListIds to ObjectId if they are not ObjectId types
        const contactListObjectIds = contactListIds.map(id => new mongoose.Types.ObjectId(id));

        // Find all contacts where the contactListId matches any of the user's contact lists
        const contacts = await Contact.find({ contactListId: { $in: contactListObjectIds } });

        res.status(200).json(contacts);  // Return the list of contacts
    } catch (err) {
        console.error('Error fetching contacts:', err);
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE CONTACT
const getContactById = async (req, res) => {
    try {
        // Fetch the contact and ensure the associated ContactList's userId matches the authenticated user
        const contact = await Contact.findOne({
            _id: req.params.id,
            contactListId: { $in: await ContactList.find({ userId: req.user.id }).distinct('_id') } // Ensure contact's ContactList belongs to the user
        });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found or not owned by the user' });
        }

        res.status(200).json(contact);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Contact not found' });
        res.status(500).json({ message: err.message });
    }
};

// GET CONTACTS BY LISTID
const getContactsByListId = async (req, res) => {
    const { listId } = req.params; // Extract listId from the URL params

    try {
        // Ensure the listId belongs to a ContactList that belongs to the authenticated user
        const contactList = await ContactList.findOne({
            _id: listId,
            userId: req.user._id // Ensure the contact list belongs to the current user
        });

        // If no such list is found, respond with a 404 error
        if (!contactList) {
            return res.status(404).json({ message: 'Contact list not found or not owned by the user' });
        }

        // Get all contacts associated with the listId
        const contacts = await Contact.find({ contactListId: listId });
        console.log("Found contacts for listId:", listId, contacts); 

        // If no contacts are found, return an empty array
        if (contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found for this list.' });
        }

        // Respond with the list of contacts
        res.status(200).json(contacts);

    } catch (err) {
        console.error('Error fetching contacts by list ID:', err);
        res.status(500).json({ message: 'Error fetching contacts' });
    }
};

// UPDATE CONTACT
const updateContact = async (req, res) => {
    try {
        // First, find the contact, ensuring it belongs to the user's contact list
        const contact = await Contact.findOneAndUpdate(
            {
                _id: req.params.id,
                contactListId: { $in: await ContactList.find({ userId: req.user._id }).distinct('_id') } // Check if contact's list belongs to the user
            },
            req.body,
            { new: true } // Return the updated contact
        );

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found or not owned by the user' });
        }

        res.status(200).json(contact);
    } catch (err) {
        console.error(err);
        if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Contact not found' });
        res.status(500).json({ message: err.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        // Step 1: Ensure the contact belongs to a contact list owned by the authenticated user
        const contact = await Contact.findOneAndDelete({
            _id: req.params.id,
            contactListId: { $in: await ContactList.find({ userId: req.user._id }).distinct('_id') } // Check if contact's list belongs to the user
        });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found or not owned by the user' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting contact', error: err.message });
    }
};

module.exports = {
    createContact,
    getContacts,
    getContactById,
    getContactsByListId,
    updateContact,
    deleteContact,
    upload,
};
