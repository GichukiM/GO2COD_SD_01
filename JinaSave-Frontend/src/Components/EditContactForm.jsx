import { useState, useEffect } from 'react';
import { editContact, deleteContact } from '../utils/contact'; // Import deleteContact function from utils

const EditContactForm = ({ contact, toggleEdit, onUpdate, onDelete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tag, setTag] = useState('');
  const [profile, setProfile] = useState('');
  const [contactList, setContactList] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setTag(contact.tag);
      setProfile(contact.profile || '');
      setContactList(contact.contactList || '');
    }
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedContact = {
      name,
      email,
      phone,
      tag,
      profile: profile || null,
      contactList,
      _id: contact._id,  // Ensure we're sending the contact's ID
    };

    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    setLoading(true); // Set loading state

    try {
      const response = await editContact(token, updatedContact); // Use the editContact function from utils

      alert('Contact updated successfully!');
      onUpdate(response);  // Pass the updated contact to the onUpdate function
      toggleEdit(); // Close the edit form/modal
    } catch (err) {
      setError('Error updating contact. Please try again.'); // Set error message
      console.error('Error:', err); // Log error for debugging
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // Retrieve JWT from local storage
    setLoading(true); // Set loading state

    try {
      const response = await deleteContact(token, contact._id); // Call deleteContact function from utils
      alert('Contact deleted successfully!');
      onDelete(contact._id);  // Notify parent component to remove the contact from its list
      toggleEdit(); // Close the edit form/modal
    } catch (err) {
      setError('Error deleting contact. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-8 mb-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Edit Contact</h2>

      {/* Display error message if exists */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">Tag</label>
          <input
            type="text"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactList">Contact List</label>
          <input
            type="text"
            id="contactList"
            value={contactList}
            onChange={(e) => setContactList(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile">Profile Image (optional)</label>
          <input
            type="text"
            id="profile"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Updating...' : 'Update Contact'}
        </button>
        
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Deleting...' : 'Delete Contact'}
        </button>
        
        <button
          type="button"
          onClick={toggleEdit}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditContactForm;
