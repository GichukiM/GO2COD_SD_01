// utils/user.js
import axios from 'axios';

const API_URL = 'https://jinasave-backend.onrender.com'; // Make sure this is the correct base URL for your backend

// Login user and return token
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return the response data (token, user, etc.)
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Signup user and return token
export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });

    // Assuming the response includes a JWT token and user object
    const { token, user } = response.data;

    // Optionally store the token in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data; // Return the response data (token, user, etc.)
  } catch (error) {
    console.error('Error signing up:', error);
    throw error; // Rethrow error to be caught in the SignupModal component
  }
};

// Update User Profile
export const updateUser = async (userId, userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in the request header
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Get User Info (name, email, etc.) for the logged-in user
export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Pass token in the Authorization header
      },
    });

    return response.data;  // Return the user data (name, email, etc.)
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;  // Rethrow error if fetching user info fails
  }
};
