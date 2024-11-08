// utils/contactList.js
import axios from 'axios';

const API_URL = 'https://jinasave-backend.onrender.com';  // Make sure this is the correct base URL for your backend

// Fetch all contact lists
export const getContactLists = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/contactLists`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;  // Return the list of contact lists
  } catch (error) {
    console.error('Error fetching contact lists:', error);
    throw error;
  }
};

// Add a new contact list
export const createContactList = async (newList, token) => {
  try {
    const response = await axios.post(`${API_URL}/contactLists`, newList, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;  // Return the newly added contact list
  } catch (error) {
    console.error('Error adding contact list:', error);
    throw error;
  }
};


// Delete a contact list
export const deleteContactList = async (token, listId) => {
  try {
    const response = await axios.delete(`${API_URL}/contactLists/${listId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;  // Return the response data (deleted list or confirmation)
  } catch (error) {
    console.error('Error deleting contact list:', error);
    throw error;
  }
};

// Edit a contact list
export const editContactList = async (token, updatedList) => {
  try {
    const response = await axios.put(`${API_URL}/contactLists/${updatedList._id}`, updatedList, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;  // Return the updated contact list
  } catch (error) {
    console.error('Error editing contact list:', error);
    throw error;
  }
};
  
