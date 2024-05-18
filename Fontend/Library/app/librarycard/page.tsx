"use client"
import React, { useState } from 'react';
import axios from 'axios';

const IssueLibraryCard= () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/books/issue_librarycard', {
        firstName,
        lastName,
        email,
      });
      console.log(response.data);
      alert('Library card issued successfully');
    } catch (error) {
      console.error('Error issuing library card:', error);
      setErrorMessage('Failed to issue library card');
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center"
    style={{
      backgroundImage: "url(img2.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Issue Library Card</h2>
   
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600">First Name</label>
            <input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded border border-gray-400 py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block text-gray-600">Last Name</label>
            <input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded border border-gray-400 py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Last Name"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-400 py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Email"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Issue Library Card
            </button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueLibraryCard;
