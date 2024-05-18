"use client"
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

const Registration = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassField, setShowPassField] = useState(false);
  const [showConfirmPassField, setShowConfirmPassField] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassField(!showPassField);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassField(!showConfirmPassField);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter a valid name.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email.');
      return;
    }

    if (password.length < 4) {
      toast.error('Please enter a valid password (at least 4 characters).');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error('Please enter a valid phone number (10 digits).');
      return;
    }

    const formData = {
      name: name,
      email: email,
      password: password,
      phone: phone
    };

    try {
      const response = await axios.post('http://localhost:3005/user/registration', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);

      if (response.data === "Registration successful") {
        toast.success('Registration successful');
        Swal.fire({
          icon: 'success',
          title: 'Registration successful',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          router.push('/login');
        });
      }
      
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message); 
      toast.error('Registration failed');
    }
  };

  return (
    <div className="h-lvh"
      style={{
        backgroundImage: "url(reg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer /> 
      
      <div className="flex pt-10">
        <div className="flex-1"></div>
        <div className="flex-auto items-start">
          <form onSubmit={handleRegistration} className="md:w-3/4 lg:w-3/4 mx-auto ">
            <div className="form-control">

              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={name}
                name="name"
                placeholder="name"
                className="input input-bordered"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                name="email"
                placeholder="email"
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassField ? "text" : "password"}
                name="password"
                value={password}
                placeholder="password"
                className="input input-bordered w-full"
                onChange={(e) => {
                    handlePasswordChange(e);
                    setPassword(e.target.value);
                  }}
              />

              <span
                className="absolute top-9 text-2xl right-0 pr-3 pt-3 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassField ? <IoEyeOffSharp /> : <IoEye />}
              </span>
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type={showConfirmPassField ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="confirm password"
                className="input input-bordered w-full"
           
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
              <p className="text-green-500">Passwords match</p>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                value={phone}
                name="phone"
                placeholder="phone"
                className="input input-bordered"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-lg text-white">Register</button>
            </div>
          </form>
          <Link href="/login">
            <p className="md:w-3/4 lg:w-3/4 mx-auto pt-1 text-gray-600">
              Already have an account.?
              <span className="text-blue-500 underline hover:text-green-600"> Login</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;