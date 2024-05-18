"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../globals.css';
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Manual validation
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    if (password.length < 4) {
      setErrorMessage('Please enter a valid password (at least 4 characters).');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/Productmanager/login', { email, password }); 
      localStorage.setItem('token', response.data.token); 
      router.push('/dashboard'); 
    } catch (error) {
      setErrorMessage('Login failed. Please check your email and pass.');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleLogin} noValidate>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
            <span
              className="absolute top-9 right-3 text-gray-700 cursor-pointer"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <IoEyeOffSharp /> : <IoEye />}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
           
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register
          </Link><br></br>
          <Link href="/forgotpass" className="text-blue-500 hover:underline">
            forgot_pass!!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
