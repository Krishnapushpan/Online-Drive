import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/loginpic.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.username || !formData.email || !formData.password) {
      alert('Please fill out all fields.');
      return;
    }

    // Retrieve existing signup data from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('signupData')) || [];

    // Check if the username or email already exists
    const userExists = existingUsers.some(
      (user) =>
        user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      alert('Username or Email already exists. Please try a different one.');
      return;
    }

    // Append new user data to the existing users array
    const updatedUsers = [...existingUsers, formData];

    // Save updated users array back to localStorage
    localStorage.setItem('signupData', JSON.stringify(updatedUsers));

    alert('Signup successful! You can now log in.');

    // Navigate to login page
    navigate('/');
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="h-[500px] w-[500px] flex items-center justify-center  bg-[#f1c40f] shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <p className="text-5xl font-bold text-white mb-6 text-center">
            Sign Up
          </p>

          <label
            htmlFor="username"
            className="block text-[#154360] font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter Username"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b241c]"
          />

          <label
            htmlFor="email"
            className="block text-[#154360] font-semibold mb-2"
          >
            Email ID
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email ID"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b241c]"
          />

          <label
            htmlFor="password"
            className="block text-[#154360] font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b241c]"
          />

          <button
            type="submit"
            className="w-full bg-[#154360] text-white font-semibold py-2 rounded-lg hover:bg-[#7b241c]/40 transition duration-300"
          >
            Sign Up
          </button>

          <div className="mt-8">
            <p className="mt-4 text-gray-600 text-center">
              Already have an account?{' '}
              <Link
                to="/"
                className="text-[#154360] font-semibold hover:text-lg hover:scale-105 transition-transform duration-300"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="h-[500px] w-[500px] bg-[#f4d03f]">
        <img src={logo} alt="Login Illustration" />
      </div>
    </div>
  );
};

export default Signup;
