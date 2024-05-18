"use client"
import React, { useState } from 'react';
import axios from 'axios';
import '../globals.css';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post('/api/password-reset', { email });
            setMessage(response.data.message); 
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.error || 'An unexpected error occurred.');
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 px-4 py-8 border rounded-lg shadow bg-white">
            <h2 className="text-lg font-semibold text-center mb-6">Forgot Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Send Reset Link
                    </button>
                </div>
                {message && <p className="text-sm text-green-600">{message}</p>}
                {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
