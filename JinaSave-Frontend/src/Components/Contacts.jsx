import React, { useEffect, useState } from 'react';
import { FaPen, FaUserPlus, FaFilter } from 'react-icons/fa6';
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiUpload } from "react-icons/ti";
import axios from 'axios';
import AddContactForm from './AddContactForm';
import EditContactForm from './EditContactForm';

function Contacts({ listId, selectedListName, onDeleteContact }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContact, setEditingContact] = useState(null); // New state for the editing contact

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const toggleEdit = (contact) => {
    setEditingContact(contact);
    setIsEditing(prev => !prev);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3100/api/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (listId) {
      const fetchListContacts = async () => {
        try {
          const response = await axios.get(`http://localhost:3100/api/contacts/list/${listId}`);
          setSelectedContacts(response.data);
        } catch (error) {
          console.error('Error fetching list contacts:', error);
        }
      };

      fetchListContacts();
    }
  }, [listId]);

  const handleDelete = async (contactId) => {
    await onDeleteContact(contactId); // Call delete handler from props
    setContacts(contacts.filter(contact => contact._id !== contactId));
    setSelectedContacts(selectedContacts.filter(contact => contact._id !== contactId));
  };

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700 mt-14">
          <h1 className='text-xl font-bold'>{selectedListName}</h1>

          <div className="flex flex-wrap items-center justify-between pb-4 pt-4 space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-auto">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-300 w-full focus:ring-black focus:border-black"
                  placeholder="Search for items"
                />
              </div>
              <button className="flex items-center justify-center space-x-1 border border-black p-2 rounded-xl w-full sm:w-auto">
                <FaFilter /> <span>Filter</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-auto">
              <button className="flex items-center justify-center space-x-1 border border-black p-2 rounded-xl w-full sm:w-auto">
                <TiUpload /> <span>Upload</span> 
              </button>
              <button
                onClick={toggleModal}
                className="flex items-center justify-center space-x-1 border p-2 rounded-xl bg-[#7CB9E8] w-full sm:w-auto"
              >
                <FaUserPlus /> <span>Add New</span>
              </button>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                  <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone</th>
                  <th scope="col" className="px-6 py-3">Tags</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {(listId ? selectedContacts : contacts).map((contact) => (
                  <tr key={contact._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="w-10 h-10 rounded-full" src={contact.profile || "../../public/logo.webp"} alt="Profile" />
                      <div className="ps-3">
                        <div className="text-base font-semibold">{contact.name}</div>
                      </div>
                    </th>
                    <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                    <td className="px-6 py-4">{contact.tag}</td>
                    <td className="px-6 py-4 flex space-x-2 items-center">
                      <FaPen onClick={() => toggleEdit(contact)} className="text-green-600 text-lg cursor-pointer" />
                      <RiDeleteBin5Line onClick={() => handleDelete(contact._id)} className="text-red-600 text-lg cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={toggleModal}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3" onClick={(e) => e.stopPropagation()}>
              <AddContactForm toggleModal={toggleModal} />
            </div>
          </div>
        )}

        {isEditing && editingContact && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={toggleEdit}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3" onClick={(e) => e.stopPropagation()}>
              <EditContactForm
                contact={editingContact}
                onSave={(updatedContact) => {
                  setContacts(contacts.map(c => (c._id === updatedContact._id ? updatedContact : c)));
                  setIsEditing(false);
                  setEditingContact(null);
                }}
                onCancel={() => {
                  setIsEditing(false);
                  setEditingContact(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Contacts;
