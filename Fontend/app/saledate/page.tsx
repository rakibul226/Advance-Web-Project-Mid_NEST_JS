"use client";

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import '../globals.css';

interface SalesReport {
  totalSales: number;
  reportStartDate: string;
  reportEndDate: string;
}

const SalesReportPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [report, setReport] = useState<SalesReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGenerateReport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setReport(null);

    if (!startDate || !endDate) {
      setErrorMessage('Please select both start and end dates.');
      return;
    }

    try {
      const response = await axios.post<SalesReport>('http://localhost:3000/products/report', {
        startDate,
        endDate,
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
      setErrorMessage('Failed to generate report.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleGenerateReport={handleGenerateReport}
          report={report}
          errorMessage={errorMessage}
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
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleGenerateReport: (e: React.FormEvent<HTMLFormElement>) => void;
  report: SalesReport | null;
  errorMessage: string;
}

const MainContent: React.FC<MainContentProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleGenerateReport,
  report,
  errorMessage,
}) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Sales Report</h1>
        <form onSubmit={handleGenerateReport} className="mb-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">Generate Report</button>
        </form>
        {errorMessage && <div className="bg-red-100 text-red-700 p-2 mb-4">{errorMessage}</div>}
        {report && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Report</h2>
            <p>Total Sales: ${report.totalSales}</p>
            <p>Report Start Date: {new Date(report.reportStartDate).toLocaleDateString()}</p>
            <p>Report End Date: {new Date(report.reportEndDate).toLocaleDateString()}</p>
          </div>
        )}
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

export default SalesReportPage;
