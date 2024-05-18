"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../globals.css';

interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  phoneNumber: string; 
}

interface MainContentProps {
  user: User;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const EditProfile = () => {

  const [user, setUser] = useState<User>({
    id: "1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    profilePictureUrl: "https://pic.com",
    bio: "Product manager with over 10 years of experience.",
    phoneNumber: "1111111111",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/ProductManager/${user.id}`, {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        bio: user.bio,
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent user={user} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
      </div>
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Ever-Neighbour</div>
      <nav>
        <Link href="/changepass" className="text-red-700 hover:bg-gray-200 p-2 rounded">Change-Password</Link>
        <Link href="/settings" className="text-gray-300 hover:text-white px-3">Settings</Link>
        <Link href="/logout" className="text-gray-300 hover:text-white px-3">Logout</Link>
      </nav>
    </header>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-100 p-4">
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Dashboard</Link>
        <Link href="/userprof" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Members</Link>
        <Link href="/notice" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Notice</Link>
        <Link href="/productadd" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Add-Product</Link>
        <Link href="/salesrepo" className="text-gray-700 hover:bg-gray-200 p-2 rounded">SalesReport</Link>
        <Link href="/sendmsg" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Send-Message</Link>
        <Link href="/assigndel" className="text-gray-700 hover:bg-gray-200 p-2 rounded">assigndel</Link>
        <Link href="/picup" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Products pic upload</Link>
        <Link href="/inventory" className="text-gray-700 hover:bg-gray-200 p-2 rounded">inventory</Link>
        <Link href="/manageOrders" className="text-gray-700 hover:bg-gray-200 p-2 rounded">manageOrders</Link>
      </nav>
    </aside>
  );
};

const MainContent: React.FC<MainContentProps> = ({ user, handleInputChange, handleSubmit }) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="max-w-md mx-auto px-4 py-8 border rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold text-center mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={user.bio}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Profile
          </button>
        </form>
      </div>
    </main>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      &copy; 2024 Your Company. All rights reserved.
    </footer>
  );
};

export default EditProfile;
