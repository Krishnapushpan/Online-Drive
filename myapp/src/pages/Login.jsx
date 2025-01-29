import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/loginpic.jpg';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the signup data (array) from localStorage
    const storedData = JSON.parse(localStorage.getItem('signupData')) || [];

    // Check if the entered username and password match any user in the array
    const loggedInUser = storedData.find(
      (user) =>
        user.username === loginData.username &&
        user.password === loginData.password
    );

    if (loggedInUser) {
      // Store the logged-in user in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

      alert(`Logged in as ${loggedInUser.username}`);
      navigate('/HomePage'); // Navigate to the home page
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="h-[500px] w-[500px] bg-[#f4d03f]">
        <img src={logo} alt="Login Illustration" />
      </div>
      <div className="h-[500px] w-[500px] flex items-center justify-center bg-[#f1c40f] shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <p className="text-5xl font-bold text-white mb-6 text-center">Login</p>

          <label
            htmlFor="username"
            className="block text-[#154360] font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={loginData.username}
            onChange={handleChange}
            placeholder="Enter Username"
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
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7b241c]"
          />

          <button
            type="submit"
            className="w-full bg-[#154360] text-white font-semibold py-2 rounded-lg hover:bg-[#7fb3d5] hover:text-white transition duration-300"
          >
            Login
          </button>

          <div className="mt-8">
            <p className="mt-4 text-gray-600 text-center">
              Don't have an account?{' '}
              <Link
                to="/SignupPage"
                className="text-[#154360] font-semibold hover:text-lg hover:scale-105 transition-transform duration-300"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
