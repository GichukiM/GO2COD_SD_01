import axios from 'axios';

const API_URL = 'https://jinasave-backend.onrender.com';  // Make sure this is the correct base URL for your backend

// Fetch all contacts or fetch contacts by listId
export const getContacts = async (token, listId = null) => {
  try {
    // Determine the URL based on whether a listId is provided or not
    const url = listId ? `${API_URL}/contacts/list/${listId}` : `${API_URL}/contacts`;
    
    // Send GET request with Authorization header containing the token
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Return the contacts data
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;  // Re-throw the error to be handled by the caller
  }
};

// Add a new contact
export const addContact = async (token, newContact) => {
  try {
    const response = await axios.post(`${API_URL}/contacts`, newContact, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;  // Return the newly added contact
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

// Edit a contact
export const editContact = async (token, updatedContact) => {
  try {
    const response = await axios.put(`${API_URL}/contacts/${updatedContact._id}`, updatedContact, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;  // Return the updated contact
  } catch (error) {
    console.error('Error editing contact:', error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (token, contactId) => {
  try {
    const response = await axios.delete(`${API_URL}/contacts/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;  // Return the response data (deleted contact or confirmation)
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

