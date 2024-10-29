import React, { useState } from 'react';

const AddContactListForm = ( { onClose, onAdd, existingListName = '', listId = null }) => {
  const [listName, setListName] = useState(existingListName);

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (listId) {
      // Handle update
      // Make a PUT request to update the contact list
      await fetch(`http://localhost:3100/api/contactLists/${listId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: listName }),
      });
    } else {
      // Handle add
      await fetch('http://localhost:3100/api/contactLists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: listName }),
      });
    }

    onAdd(listId ? { ...existingList, name: listName } : { name: listName });
    onClose();
  };

  return (
        <form onSubmit={handleSubmit} className='bg-white rounded p-8 mb-4 max-w-md mx-auto'>
        <h2 className="text-lg font-bold mb-4">Add New Contact List</h2>
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
            >
              Add List
            </button>
          </div>
        </form>
  );
};

export default AddContactListForm;
