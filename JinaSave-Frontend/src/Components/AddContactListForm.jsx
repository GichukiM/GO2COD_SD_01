import { useState, useEffect } from 'react';
import { createContactList, editContactList } from '../utils/contactList'; // Import the add/update functions

const AddContactListForm = ({ onClose, onAdd, listId = null }) => {
  const [listName, setListName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token'); // Retrieve JWT from local storage

  // Clear error when listName changes
  useEffect(() => {
    setError(null);
  }, [listName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous errors
    setLoading(true); // Set loading state to true while the request is being processed
  
    try {
      if (listId) {
        // Update existing contact list
        const updatedList = await editContactList(listId, { name: listName }, token);
        onAdd(updatedList); // Callback to pass the updated list
      } else {
        // Add new contact list
        const newList = await createContactList({ name: listName }, token);
        onAdd(newList); // Callback to pass the newly created list
      }
      onClose(); // Close the modal after successful operation
    } catch (err) {
      console.error('Error while adding/updating list:', err);
      setError(err.response?.data?.message || 'Error while adding/updating list');
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-8 mb-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">{listId ? 'Edit' : 'Add New'} Contact List</h2>
      
      {/* Display error message if exists */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">List Name</label>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
          className="border rounded w-full py-2 px-3"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          className="mr-2 bg-gray-300 py-2 px-4 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Saving...' : listId ? 'Update List' : 'Add List'}
        </button>
      </div>
    </form>
  );
};

export default AddContactListForm;
