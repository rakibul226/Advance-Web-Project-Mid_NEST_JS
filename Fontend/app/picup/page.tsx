"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import '../globals.css';

const ProductPicUpload: React.FC = () => {
  const [productname, setProductname] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleProductnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductname(event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('productname', productname);
    formData.append('myfile', file);

    try {
      const response = await axios.post('http://localhost:3000/products/Productpic', formData);
      setMessage('File uploaded successfully.');
    } catch (error) {
      setMessage('Failed to upload file.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent
          productname={productname}
          handleProductnameChange={handleProductnameChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          message={message}
        />
      </div>
      <Footer />
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Ever-Neighbour</div>
      <nav>
        <Link href="/editpro" className="text-gray-300 hover:text-white px-3">Profile</Link>
        <Link href="/notifications" className="text-gray-300 hover:text-white px-3">Notifications</Link>
        <Link href="/login" className="text-gray-300 hover:text-white px-3">Logout</Link>
      </nav>
    </header>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-60 bg-gray-100 p-4">
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Dashboard</Link>
        <Link href="/userprof" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Members</Link>
        <Link href="/notice" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Notice</Link>
        <Link href="/productadd" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Add Product</Link>
        <Link href="/salesrepo" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Sales Report</Link>
        <Link href="/sendmsg" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Send Message</Link>
        <Link href="/assigndel" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Assign Delivery</Link>
        <Link href="/picup" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Products pic upload</Link>
        <Link href="/inventory" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Inventory</Link>
        <Link href="/manageOrders" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Manage Orders</Link>
      </nav>
    </aside>
  );
};

interface MainContentProps {
  productname: string;
  handleProductnameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  message: string;
}

const MainContent: React.FC<MainContentProps> = ({
  productname,
  handleProductnameChange,
  handleFileChange,
  handleSubmit,
  message,
}) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="max-w-md mx-auto px-4 py-8 border rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold text-center mb-6">Upload Product Picture</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productname" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="productname"
              name="productname"
              value={productname}
              onChange={handleProductnameChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">Product Picture</label>
            <input
              type="file"
              id="file"
              name="myfile"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full text-sm text-gray-700"
            />
          </div>
          {message && <p className="text-sm italic text-center">{message}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Upload Picture
          </button>
        </form>
      </div>
    </main>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      &copy; 2024 Your Company. All rights reserved.
    </footer>
  );
};

export default ProductPicUpload;
