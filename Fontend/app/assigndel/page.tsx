"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import '../globals.css';

interface Product {
  id: string;
  name: string;
}

interface DeliveryPerson {
  id: string;
  name: string;
}

const AssignDelivery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [deliveryPeople, setDeliveryPeople] = useState<DeliveryPerson[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchDeliveryPeople();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchDeliveryPeople = async () => {
    try {
      const response = await axios.get('/api/delivery-personnel');
      setDeliveryPeople(response.data);
    } catch (error) {
      console.error('Failed to fetch delivery people:', error);
    }
  };

  const handleAssign = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('/api/assign-delivery', {
        productId: selectedProduct,
        deliveryPersonId: selectedDeliveryPerson,
        address: deliveryAddress
      });
      setMessage('Delivery assigned successfully!');
    } catch (error: any) {
      setError('Failed to assign delivery: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent
          products={products}
          deliveryPeople={deliveryPeople}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedDeliveryPerson={selectedDeliveryPerson}
          setSelectedDeliveryPerson={setSelectedDeliveryPerson}
          deliveryAddress={deliveryAddress}
          setDeliveryAddress={setDeliveryAddress}
          handleAssign={handleAssign}
          message={message}
          error={error}
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
        <Link href="/login" className="text-gray-300 hover:text-white px-3">Logout</Link>  </nav>
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
        <Link href="/manageOrders" className="text-gray-700 hover:bg-gray-200 p-2 rounded">manageOrders</Link></nav>
    </aside>
  );
};

interface MainContentProps {
  products: Product[];
  deliveryPeople: DeliveryPerson[];
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  selectedDeliveryPerson: string;
  setSelectedDeliveryPerson: (value: string) => void;
  deliveryAddress: string;
  setDeliveryAddress: (value: string) => void;
  handleAssign: (event: React.FormEvent<HTMLFormElement>) => void;
  message: string;
  error: string;
}

const MainContent: React.FC<MainContentProps> = ({
  products,
  deliveryPeople,
  selectedProduct,
  setSelectedProduct,
  selectedDeliveryPerson,
  setSelectedDeliveryPerson,
  deliveryAddress,
  setDeliveryAddress,
  handleAssign,
  message,
  error
}) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="max-w-md mx-auto mt-10 px-4 py-8 border rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold text-center mb-6">Assign Delivery</h2>
        <form onSubmit={handleAssign} className="space-y-4">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700">Select Product</label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="deliveryPerson" className="block text-sm font-medium text-gray-700">Select Delivery Person</label>
            <select
              id="deliveryPerson"
              value={selectedDeliveryPerson}
              onChange={(e) => setSelectedDeliveryPerson(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a delivery person</option>
              {deliveryPeople.map(person => (
                <option key={person.id} value={person.id}>{person.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address</label>
            <input
              type="text"
              id="address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter delivery address"
            />
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Assign Delivery
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

export default AssignDelivery;
