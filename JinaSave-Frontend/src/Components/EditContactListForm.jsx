import React, { useState, useEffect } from 'react';

const EditContactListForm = ({ listId, existingListName, onClose, onUpdate }) => {
  const [listName, setListName] = useState(existingListName);

  useEffect(() => {
    setListName(existingListName);
  }, [existingListName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3100/api/contactLists/${listId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: listName }),
      });
      onUpdate({ _id: listId, name: listName }); // Update the list in the parent component
      onClose(); // Close the form
    } catch (error) {
      console.error('Error updating contact list:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded p-8 mb-4 max-w-md mx-auto">
  <h2 className="text-lg font-bold mb-4">Edit Contact List</h2>

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="listName">List Name</label>
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
    >
      Update List
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
