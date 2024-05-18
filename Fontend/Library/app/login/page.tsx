"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { IoEye, IoEyeOffSharp } from 'react-icons/io5';
import { useRouter } from 'next/dist/client/components/navigation';



 const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassField, setShowPassField] = useState(false); 
  
  const handleTogglePasswordVisibility = () => {
    setShowPassField(!showPassField);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/librarian/login', {
        email,
        password,
      });
      console.log(response.data); // Log the response
      alert('Login successful');
      router.push('/navigation');
    } catch (error) {
      console.error('Error logging in:', error); // Log the error
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" 
    style={{
      backgroundImage: "url(img1.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
  
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign in to your account</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div>
            <label className="block text-gray-600">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-gray-400 py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Email address"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-600">Password</label>
            <input
              id="password"
              name="password"
              type={showPassField ? "text" : "password"} // Dynamically set input type
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-400 py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Password"
            />
            <span
              className="absolute bottom-1 right-3 cursor-pointer"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassField ? <IoEyeOffSharp className="text-gray-600" /> : <IoEye className="text-gray-600" />}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
        <Link href="/registration">
          <p className="text-center mt-4 text-blue-500 hover:underline">
            Don't have an account? Register
          </p>
        </Link>
      </div>
      
    </div>
  );
};

export default Login;
