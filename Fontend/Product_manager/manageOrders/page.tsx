"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import '../globals.css';

interface Order {
  id: number;
  customerName: string;
  product: string;
  status: string;
}

const ManageOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('http://localhost:3000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${id}/status`, { status });
      fetchOrders(); 
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent orders={orders} handleStatusChange={handleStatusChange} />
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
  orders: Order[];
  handleStatusChange: (id: number, status: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ orders, handleStatusChange }) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Manage Customer Orders</h1>
        <div className="grid grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 bg-white border rounded shadow">
              <h2 className="text-xl font-bold">{order.customerName}</h2>
              <p>{order.product}</p>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className={`mt-2 p-2 rounded ${order.status === 'Shipped' ? 'bg-blue-200' : 'bg-yellow-200'}`}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
              </select>
            </div>
          ))}
        </div>
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

export default ManageOrdersPage;
