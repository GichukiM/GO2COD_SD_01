import React, { useState } from 'react';
import axios from 'axios';

const Signin = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            const response = await axios.post('http://localhost:3100/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            alert('Logged in successfully');
            onClose();
        } catch (error) {
            setError(error.response?.data?.message || 'Error logging in');
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded p-8 mb-4 max-w-md mx-auto shadow-md z-10">
                <h2 className="text-lg font-bold mb-4">Sign In</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default Signin;
