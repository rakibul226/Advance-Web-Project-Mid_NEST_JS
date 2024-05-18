"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import '../globals.css';

const SendMessage = () => {
  const [recipient, setRecipient] = useState('admin'); 
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('/api/send-message', {
        recipient,
        subject,
        body
      });
      setMessage('Message sent successfully!');
    } catch (error: any) {
      setError('Failed to send message: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent recipient={recipient} setRecipient={setRecipient} subject={subject} setSubject={setSubject} body={body} setBody={setBody} handleSubmit={handleSubmit} message={message} error={error} />
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
        <Link href="/login" className="text-gray-300 hover:text-white px-3">Logout</Link> </nav>
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
        <Link href="/manageOrders" className="text-gray-700 hover:bg-gray-200 p-2 rounded">manageOrders</Link> </nav>
    </aside>
  );
};

interface MainContentProps {
  recipient: string;
  setRecipient: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
  body: string;
  setBody: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  message: string;
  error: string;
}

const MainContent: React.FC<MainContentProps> = ({ recipient, setRecipient, subject, setSubject, body, setBody, handleSubmit, message, error }) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="max-w-md mx-auto mt-10 px-4 py-8 border rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold text-center mb-6">Send Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient</label>
            <select
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter message subject"
            />
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your message here"
              rows={4}
            />
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Send Message
            </button>
          </div>
          {message && <p className="text-sm text-green-600">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
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

export default SendMessage;
