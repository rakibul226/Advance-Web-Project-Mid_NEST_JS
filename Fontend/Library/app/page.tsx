import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <Link href="/">
              <p className="text-white">Home</p>
            </Link>
            <Link href="/login">
              <p className="text-white">Login</p>
            </Link>
            <Link href="/registration">
              <p className="text-white">Registration</p>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-250">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 text-blue-500">Welcome to Home Page</h1>
        </div>
      </div>
    </div>
  );
}
