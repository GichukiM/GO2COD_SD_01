import { useState, useEffect } from 'react';
import { FaPlus, FaPen } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaTimes, FaBars } from 'react-icons/fa';
import Contacts from './Contacts';
import AddContactListForm from './AddContactListForm';
import EditContactListForm from './EditContactListForm';
import axios from 'axios';
import SignupModal from './signup';
import LoginModal from './signin';
import { deleteContact } from '../utils/contact';
import { getUserInfo } from '../utils/user';  // Import the getUserInfo function

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactLists, setContactLists] = useState([]);
  const [totalContactsCount, setTotalContactsCount] = useState(0);
  const [listId, setListId] = useState(null);
  const [selectedListName, setSelectedListName] = useState("All Contacts");
  const [contacts, setContacts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);  // Initialize user state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  // Fetch contact lists and total contacts on component mount
  useEffect(() => {
    const fetchContactLists = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Token: ", token);
        const response = await axios.get('http://localhost:3100/api/contactLists', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContactLists(response.data);

        // Fetch contacts count
        const contactsResponse = await axios.get('http://localhost:3100/api/contacts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTotalContactsCount(contactsResponse.data.length);
      } catch (e) {
        console.error('Error fetching contact lists:', e);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();  // Fetch user info from backend
        if (userInfo) {
          setUser(userInfo);  // Set the user data in state
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Optionally, you could handle the case where the user is not logged in or token is invalid
      }
    };

    fetchContactLists();
    fetchUserInfo();  // Fetch user info when component mounts
  }, []);

  const handleDeleteContact = async (contactId) => {
    const token = localStorage.getItem('token');
    try {
      await deleteContact(token, contactId); // Delete contact from backend
      // Update the contact list state in the parent component
      setContacts(prevContacts => prevContacts.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Optionally, show an error message here
    }
  };

  // Update contact handler in the parent
  const handleUpdateContact = (updatedContact) => {
    setContacts(prevContacts =>
      prevContacts.map(contact =>
        contact._id === updatedContact._id ? updatedContact : contact
      )
    );
  };

  // Handle adding a new contact list
  const handleAddContactList = (newList) => {
    setContactLists([...contactLists, newList]);
  };

  // Handle editing an existing contact list
  const handleEditContactList = (list) => {
    setIsEditFormOpen(true);
    setSelectedListName(list.name);
    setListId(list._id);  // Ensure the list ID is set for updating
  };

  // Handle updating an existing contact list in the parent state
  const handleUpdateContactList = (updatedList) => {
    setContactLists(prevLists => 
      prevLists.map(list => (list._id === updatedList._id ? updatedList : list))
    );
    setIsEditFormOpen(false); // Close the edit form modal after updating
  };

  // Handle deleting a contact list
  const handleDeleteContactList = async (list) => {
    if (list.contactCount > 0) {
      alert("Cannot delete a list that contains contacts.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3100/api/contactLists/${list._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContactLists(contactLists.filter(l => l._id !== list._id));
    } catch (error) {
      console.error('Error deleting contact list:', error);
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-label="Toggle Sidebar"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex ms-2 md:me-24">
                <img
                  src="/logo.webp"
                  className="h-8 me-3"
                  alt="Contact Manager Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">JinaSave</span>
              </a>
            </div>
            <div className="hidden sm:flex items-center ms-2 md:me-24 justify-center w-2/5">
              <a href="/" rel="noopener noreferrer" className='self-center uppercase font-semibold'>Contacts</a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">{user ? user.name : 'Loading...'}</p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">{user ? user.email : 'Loading...'}</p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <button 
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setSignupOpen(true)}
                      >
                        Sign up
                      </button>
                    </li>
                    <li>
                      <button 
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setLoginOpen(true)}
                      >
                        Log In
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-0 z-50 p-2 bg-blue-500 text-white rounded-r-md transition-transform hover:bg-blue-600 hidden md:visible md:block"
          aria-label="Toggle Sidebar"
          style={{ transform: isOpen ? 'translateX(60%)' : 'none' }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <aside
          id="logo-sidebar"
          className={`fixed top-10 left-0 z-40 w-64 h-screen pt-20 pb-10 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <button
                  className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="flex-1 whitespace-nowrap font-bold text-2xl">Contact Lists</span>
                  <FaPlus 
                    className="inline-flex items-center justify-center w-6 h-6 p-1 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300" 
                    onClick={() => setIsFormOpen(true)}
                  />
                </button>
              </li>
              <li onClick={() => { setListId(null); setSelectedListName("All Contacts") }}>
                <a
                  href="#"
                  className="flex flex-col p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className="font-bold">All Contacts</span>
                  <span className="text-gray-500 text-sm">{totalContactsCount.toLocaleString()} contacts</span>
                </a>
              </li>
              {contactLists.map((list) => (
                <li key={list._id} onClick={() => {
                  setListId(list._id);
                  setSelectedListName(list.name);
                }}>
                  <div className="flex flex-col p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{list.name}</span>
                      <div className="flex space-x-2">
                        <FaPen 
                          className="text-green-600 text-lg cursor-pointer" 
                          onClick={() => handleEditContactList(list)}
                        />
                        <RiDeleteBin5Line 
                          className="text-red-600 text-lg cursor-pointer" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteContactList(list);
                          }} 
                        />
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{list.contactCount ? list.contactCount.toLocaleString() : 0} contacts</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-0' : 'md:ml-[-15rem]'} p-4`}>
          <Contacts
            listId={listId}
            selectedListName={selectedListName}
            contacts={contacts}
            onDeleteContact={handleDeleteContact}
            onUpdate={handleUpdateContact}
            onClose={() => setIsEditFormOpen(false)}
          />
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={toggleModal}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3" onClick={(e) => e.stopPropagation()}>
              <AddContactListForm 
                onClose={() => setIsFormOpen(false)} 
                onAdd={handleAddContactList} 
                existingListName={selectedListName} 
                listId={listId} 
              />
            </div>
          </div>
        )}

        {isEditFormOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3" onClick={(e) => e.stopPropagation()}>
              <EditContactListForm 
                listId={listId}
                existingListName={selectedListName}
                onClose={() => setIsEditFormOpen(false)}
                onUpdate={handleUpdateContactList}  // Pass the handler here
              />
            </div>
          </div>
        )}
      </div>

      <SignupModal isOpen={isSignupOpen} onClose={() => setSignupOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}

export default Navbar;
