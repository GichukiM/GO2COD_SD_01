import React, { useState, useEffect } from 'react';
import { FaBell, FaPlus } from "react-icons/fa6";
import { FaTimes, FaBars } from 'react-icons/fa';
import Contacts from './Contacts';
import axios from 'axios';

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [contactLists, setContactLists] = useState([]);
  const [totalContactsCount, setTotalContactsCount] = useState(0);
  const [listId, setListId] = useState(null);
  const [selectedListName, setSelectedListName] = useState("All Contacts");
  const [contacts, setContacts] = useState([]);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchContactLists = async () => {
      try {
        const response = await axios.get('http://localhost:3100/api/contactLists');
        setContactLists(response.data);
        const contactsResponse = await axios.get('http://localhost:3100/api/contacts');
        setTotalContactsCount(contactsResponse.data.length);
      } catch (e) {
        console.error('Error Fetching contact lists:', e);
      }
    };
    fetchContactLists();
  }, []);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleDeleteContact = async (id) => {
    try {
      await fetch(`http://localhost:3100/api/contacts/${id}`, {
        method: 'DELETE',
      });
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleEditContact = (updatedContact) => {
    setContacts(contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    ));
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                  src="../../public/logo.webp"
                  className="h-8 me-3"
                  alt="FlowBite Logo"
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
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                  <div className="px-4 py-3" role="none">
                    <p className="text-sm text-gray-900 dark:text-white" role="none">Neil Sims</p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">neil.sims@flowbite.com</p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
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
        className={`fixed top-10 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className="sm:hidden">
              <a href="/" rel="noopener noreferrer" className='self-center flex flex-col p-2 uppercase font-semibold'>Contacts</a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="flex-1 whitespace-nowrap font-bold text-2xl">Contact Lists</span>
                <FaPlus className="inline-flex items-center justify-center w-6 h-6 p-1 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300" />
              </a>
            </li>
            <li onClick={() => {setListId(null); setSelectedListName("All Contacts")}}>
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
              <a
                href="#"
                className="flex flex-col p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <span className="font-bold">{list.name}</span>
                <p className="text-gray-500 text-sm">{list.contactCount.toLocaleString()} contacts</p>
              </a>
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
            // onEditContact={handleEditContact} 
         />
      </div>
    </div>
    </>
  );
}

export default Navbar;
