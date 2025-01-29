import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Userlogo from '../assets/images/user.png';

const Navbar = () => {
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle user modal
  const toggleUserModal = () => {
    setUserModalOpen(!isUserModalOpen);
  };

  // Handle logout
  const handleLogout = () => {
    // Remove only the login details from localStorage
    localStorage.removeItem('loginDetails');
    // Redirect to the login page
    navigate('/');
  };

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem('loggedInUser')) || {
    username: 'Guest',
    email: 'guest@example.com',
  };

  return (
    <>
      {/* Header Section */}
      <div className="w-full h-[80px] bg-[#154360] shadow-lg flex gap-1">
        <img src={logo} alt="Logo" className="p-2 h-[80px] w-[80px] ml-[10px]" />
        <p className="text-white text-5xl p-4 font-bold">Drive</p>
        <div className="flex justify-center ml-4">
          <p className='text-white tracking-wide font-bold text-lg ml-8 mt-6 font-mono'>Where Memories and Files Meet the Cloud.</p>
        </div>
        <img
          src={Userlogo}
          alt="User"
          className="p-4 ml-[1000px] cursor-pointer"
          onClick={toggleUserModal}
        />
      </div>

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[300px]">
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-400"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded mt-4 hover:bg-gray-400 ml-4"
              onClick={toggleUserModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
