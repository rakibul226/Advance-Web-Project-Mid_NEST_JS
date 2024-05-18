"use client"


import axios from 'axios';
import Link from 'next/link';
import { IoEye, IoEyeOffSharp } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation' 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassField, setShowPassField] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/user/login', {
        email,
        password,
      });
      if (response.data.message === 'Login successful') {
        router.push('/home');
        toast.success('Logged in successfully');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="h-screen" style={{ backgroundImage: 'url(reg2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <ToastContainer />
      <h2 className="text-5xl text-center font-bold">Login</h2>
      <div className="">
        <form className="md:w-3/4 lg:w-1/3 mx-auto" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="email" className="input input-bordered" />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassField ? 'text' : 'password'}
              name="password"
              placeholder="password"
              className="input input-bordered w-full"
            />
            <span
              className="absolute top-9 text-2xl right-0 pr-3 pt-3 cursor-pointer"
              onClick={() => setShowPassField(!showPassField)}
            >
              {showPassField ? <IoEyeOffSharp /> : <IoEye />}
            </span>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary text-white text-lg">
              Login
            </button>
          </div>
        </form>
        <Link href="/registration">
          <p className="md:w-3/4 lg:w-1/3 mx-auto pt-2">
            {"Don't have an account.? "}
            <span className="text-blue-500 pl-4 underline hover:text-green-600">Register now</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
