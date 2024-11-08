import { useState, useEffect } from 'react';
import { editContactList } from '../utils/contactList'; // Import editContactList function

const EditContactListForm = ({ listId, existingListName, onClose, onUpdate }) => {
  const [listName, setListName] = useState(existingListName);
  const [error, setError] = useState(null); // Error handling state
  const [loading, setLoading] = useState(false); // Loading state

  // Set list name when existingListName changes
  useEffect(() => {
    setListName(existingListName);
  }, [existingListName]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true); // Set loading state to true during the API request

    if (!listName.trim()) {
      setError('List name is required');
      setLoading(false);
      return;
    }

    try {
      // Call the API to update the contact list
      const updatedList = await editContactList(localStorage.getItem('token'), {
        _id: listId,
        name: listName,
      });

      // Pass the updated list back to the parent component
      onUpdate(updatedList);
      onClose(); // Close the modal after the update
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating contact list');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-8 mb-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Edit Contact List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="listName">
          List Name
        </label>
        <input
          type="text"
          id="listName"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
          placeholder="List Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Updating...' : 'Update List'}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditContactListForm;
