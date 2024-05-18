"use client"
import React from 'react';
import Link from 'next/link';
import '../globals.css';

interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
}

const UserProfile = () => {
  
  const users: User[] = [
    {
      id: "1",
      name: "rakib",
      email: "rakibgmail.com",
      profilePictureUrl: "https://rakib.com",
      bio: "Teacher with over 10 years of experience in the industry, specializing in developing user-centric software solutions."
    },
    {
      id: "2",
      name: "John",
      email: "john@gmail.com",
      profilePictureUrl: "https://pic.com",
      bio: "Software engineer with a keen interest in data sciences and evolving technology trends."
    },
    {
      id: "3",
      name: "rahul",
      email: "rahul999@gmail.com",
      profilePictureUrl: "https://pic.com",
      bio: "Digital marketer and content creator, passionate about brand building and advertising."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent users={users} />
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
  users: User[];
}

const MainContent: React.FC<MainContentProps> = ({ users }) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="space-y-8">
        {users.map((user) => (
          <div key={user.id} className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 mt-10">
            <img className="object-cover object-center w-full h-56" src={user.profilePictureUrl} alt="User profile" />
            <div className="px-6 py-4">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{user.name}</h1>
              <p className="py-2 text-gray-700 dark:text-gray-400">Email: {user.email}</p>
              <p className="py-2 text-gray-700 dark:text-gray-400">Bio: {user.bio}</p>
            </div>
          </div>
        ))}
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

export default UserProfile;
