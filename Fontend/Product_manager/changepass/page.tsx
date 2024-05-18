"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import '../globals.css';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCurrentPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('The new passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/productmanager/change_password', {
        email,
        currentPassword,
        newPassword
      });

      if (response.data.success) {
        setSuccess('Password changed successfully!');
        setError('');
        // Optionally clear the form
        setEmail('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setError(response.data.message || 'Failed to change password.');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred while changing the password.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent
          email={email}
          handleEmailChange={handleEmailChange}
          currentPassword={currentPassword}
          handleCurrentPasswordChange={handleCurrentPasswordChange}
          newPassword={newPassword}
          handleNewPasswordChange={handleNewPasswordChange}
          confirmNewPassword={confirmNewPassword}
          handleConfirmNewPasswordChange={handleConfirmNewPasswordChange}
          handleSubmit={handleSubmit}
          error={error}
          success={success}
        />
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
        <Link href="/editpro" className="text-gray-300 hover:text-white px-3">Profile</Link>
        <Link href="/notifications" className="text-gray-300 hover:text-white px-3">notifications</Link>
        <Link href="/login" className="text-gray-300 hover:text-white px-3">Logout</Link>
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

interface MainContentProps {
  email: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentPassword: string;
  handleCurrentPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  newPassword: string;
  handleNewPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  confirmNewPassword: string;
  handleConfirmNewPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  success: string;
}

const MainContent: React.FC<MainContentProps> = ({
  email,
  handleEmailChange,
  currentPassword,
  handleCurrentPasswordChange,
  newPassword,
  handleNewPasswordChange,
  confirmNewPassword,
  handleConfirmNewPasswordChange,
  handleSubmit,
  error,
  success
}) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="max-w-md mx-auto mt-10">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {success && <p className="text-green-500 text-xs italic mb-4">{success}</p>}
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Change Password
            </button>
          </div>
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

export default ChangePassword;
