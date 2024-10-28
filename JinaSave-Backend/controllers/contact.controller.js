const Contact = require('../models/contact.models.js');
const ContactList = require('../models/contactList.models.js');
const multer = require('multer');
const path = require('path');

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

// CREATE CONTACT
const createContact = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

    try {
        const { name, email, phone, tag, contactList } = req.body;

        // Check if the specified contact list exists; create it if it doesn't
        let list = await ContactList.findOne({ name: contactList });

        if (!list) {
            list = new ContactList({ name: contactList });
            await list.save();
        }

        // Get file path if a profile picture is uploaded

        const profilePath = req.file ? req.file.path : null;

        // Create a new contact and associate it with the found or created list's ID
        const contact = await Contact.create({
            name,
            email,
            phone,
            tag,
            profile: profilePath,
            listId: list._id,
        });

        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
};

// GET ALL CONTACTS

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

// GET SINGLE CONTACT

const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({message: 'Contact not found'});

        res.status(200).json(contact);
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(404).json({message: 'Contact not found'});

        res.status(500).json({message: err.message});
    }
};

// UPDATE CONTACT

const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!contact) return res.status(404).json({message: 'Contact not found'});

        res.status(200).json(contact);
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(404).json({message: 'Contact not found'});

        res.status(500).json({message: err.message});
    }
};

// DELETE CONTACT

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) return res.status(404).json({message: 'Contact not found'});

        res.status(200).json({message: 'Contact deleted'});
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(404).json({message: 'Contact not found'});

        res.status(500).json({message: err.message});
    }
};


module.exports = {
    createContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact,
    upload,
}