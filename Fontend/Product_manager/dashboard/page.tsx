"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import '../globals.css';

interface ToggleableSectionProps {
  title: string;
  children: React.ReactNode;
}

function ToggleableSection({ title, children }: ToggleableSectionProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="bg-white p-4 rounded shadow">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
      >
        {isVisible ? `Hide ${title}` : `Show ${title}`}
      </button>
      {isVisible && children}
    </div>
  );
}

function ActivityFeed() {
  return (
    <ToggleableSection title="Activity Feed">
      <p>Activity Feed Component</p>
    </ToggleableSection>
  );
}

function BlogPosts() {
  return (
    <ToggleableSection title="Blog Posts">
      <p>Blog Posts Component</p>
    </ToggleableSection>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Ever-Neighbour</div>
      <nav>
        <Link href="/editpro" className="text-gray-300 hover:text-white px-3">Profile</Link>
        <Link href="/notifications" className="text-gray-300 hover:text-white px-3">notifications</Link>
        <Link href="/login" className="text-gray-300 hover:text-whitde px-3">Logout</Link>
      </nav>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="w-60 bg-gray-100 p-4">
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Dashboard</Link>
        <Link href="/userprof" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Members</Link>
        <Link href="/notice" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Notice</Link>
        <Link href="/productadd" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Add-Product</Link>
        <Link href="/salesrepo" className="text-gray-700 hover:bg-gray-200 p-2 rounded">SalesReport</Link>
        <Link href="/sendmsg" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Send-Message</Link>
        <Link href="/assigndel" className="text-gray-700 hover:bg-gray-200 p-2 rounded">assign-del</Link>
        <Link href="/picup" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Products pic upload</Link>
        <Link href="/inventory" className="text-gray-700 hover:bg-gray-200 p-2 rounded">inventory</Link>
        <Link href="/manageOrders" className="text-gray-700 hover:bg-gray-200 p-2 rounded">manageOrders</Link>
        
      </nav>
    </aside>
  );
}

function MainContent() {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <ActivityFeed />
      <BlogPosts />
    </main>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      &copy; 2024 Your Company. All rights reserved.
    </footer>
  );
}

export default Dashboard;
