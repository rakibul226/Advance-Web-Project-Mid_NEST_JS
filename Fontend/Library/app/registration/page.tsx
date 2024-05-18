"use client"
import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from 'next/dist/client/components/navigation';


const Registration = () => {
   
  const router = useRouter()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
 
  const [errorMessage, setErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassField, setShowPassField] = useState(false);
  const [showConfirmPassField, setShowConfirmPassField] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
 

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassField(!showPassField);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassField(!showConfirmPassField);
  };

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!name.trim()) {
      setErrorMessage('Please enter a valid name.');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }
  
    if (password.length < 4) {
      setErrorMessage('Please enter a valid password (at least 4 characters).');
      return;
    }
  
    const formData = {
      name: name,
      email: email,
      password: password,
      
    };
  
    try {
      const response = await axios.post('http://localhost:3000/librarian/registration', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response.data); // Log the response
        alert('Registration successful');
        router.push('/login');
       
      
    } catch (error) {
      console.error('Error rgeistration falied'); // Log the error
      setErrorMessage('Registration failed');
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-250 flex items-center justify-center"
    style={{
      backgroundImage: "url(img1.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    
    >
      <div className="flex mt-20">
        <div className="flex-1"></div>
        <div className="flex-auto items-start">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Sign in to your account</h2>
          <form onSubmit={handleRegistration} className="md:w-2/3 lg:w-2/3 mx-auto space-y-4">
            <div>
              <label className="text-blue-500">Name</label>
              <input
                type="text"
                value={name}
                name="name"
                placeholder="Name"
                className="input input-bordered"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-blue-500">Email</label>
              <input
                type="email"
                value={email}
                name="email"
                placeholder="Email"
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="text-blue-500">Password</label>
              <input
                type={showPassField ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Password"
                className="input input-bordered w-full"
                onChange={handlePasswordChange}
              />
              <span
                className="absolute top-9 text-2xl right-0 pr-3 pt-3 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassField ? <IoEyeOffSharp /> : <IoEye />}
              </span>
            </div>
            <div className="relative">
              <label className="text-blue-500">Confirm Password</label>
              <input
                type={showConfirmPassField ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                required
              />
              <span
                className="absolute top-9 text-2xl right-0 pr-3 pt-3 cursor-pointer"
                onClick={handleToggleConfirmPasswordVisibility}
              >
                {showConfirmPassField ? <IoEyeOffSharp /> : <IoEye />}
              </span>
            </div>
            {!passwordMatch && (
              <p className="text-red-500">Passwords do not match</p>
            )}
            {passwordMatch && password && confirmPassword && (
              <p className="text-yellow-500">Passwords match</p>
            )}
            <div>
              <button className="btn btn-primary text-lg text-white">Register</button>
            </div>
          </form>
          <Link href="/login">
            <p className="md:w-3/4 lg:w-3/4 mx-auto pt-1 text-center text-blue-500 underline hover:text-white">
              Already have an account? Login
            </p>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Registration;
