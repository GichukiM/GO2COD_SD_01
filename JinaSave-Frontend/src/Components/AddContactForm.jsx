import { useState } from 'react';
import { addContact } from '../utils/contact';

const AddContactForm = ({ toggleModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tag, setTag] = useState('');
  const [profile, setProfile] = useState('');
  const [contactList, setContactList] = useState('');  // Contact list name (not ID)
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const token = localStorage.getItem('token'); // Retrieve JWT from local storage

  // Validate form fields before submitting
  const validateForm = () => {
    if (!name || !email || !phone || !contactList) {
      setError('Name, Email, Phone, and Contact List are required fields.');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Basic phone validation (just checking if it's a number)
    if (!/^\d+$/.test(phone)) {
      setError('Phone number must be a valid number.');
      return false;
    }

    setError(null); // Clear any previous errors
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form before submitting
    if (!validateForm()) return;
  
    const newContact = {
      name,
      email,
      phone,
      tag,
      profile: profile || null,
<<<<<<< HEAD
      contactList,
    };

    console.log('Submitting contact:', newContact); // Debugging log

    try {
      const response = await fetch('http://localhost:3100/api/contacts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        alert('Contact added successfully!');
        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        setTag('');
        setProfile('');
        setContactList('');
        toggleModal();
      } else {
        const errorData = await response.json();
        alert(`Error adding contact: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
=======
      contactList, // Pass the contact list name here
    };
  
    console.log("New Contact:", newContact);  // Log the new contact being sent
  
    setLoading(true); // Set loading state to true
    try {
      const response = await addContact(token, newContact); // Use the utility function to send the request
  
      alert('Contact added successfully!');
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setTag('');
      setProfile('');
      setContactList('');
      toggleModal(); // Close the modal
    } catch (error) {
      setError(error.response?.data?.message || 'Error adding contact. Please try again.');
      console.error("Error adding contact:", error);  // Log error to understand what went wrong
    } finally {
      setLoading(false); // Reset loading state
>>>>>>> 1d4631b (feat: Implement user authentication (login/signup), contact list management (add, edit, delete))
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-8 mb-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Add New Contact</h2>

      {/* Display error message if exists */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
            Tag
          </label>
          <input
            type="text"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactList">
            Contact List
          </label>
          <input
            type="text"
            id="contactList"
            value={contactList}
            onChange={(e) => setContactList(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profile">
            Profile Image (optional)
          </label>
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
          {loading ? 'Adding...' : 'Add Contact'}
        </button>
        <button
          type="button"
          onClick={toggleModal}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddContactForm;
