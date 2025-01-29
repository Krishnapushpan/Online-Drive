import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import IMG from '../assets/images/img.jpg';
import File from '../assets/images/file.png';
import Fold from '../assets/images/fold.png';

const Home = () => {
  const [isFolderModalOpen, setFolderModalOpen] = useState(false);
  const [createdFolders, setCreatedFolders] = useState([]); // List of created folders
  const [uploadedImages, setUploadedImages] = useState([]); // List of uploaded images
  const [newFolderName, setNewFolderName] = useState(''); // New folder name input
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('loggedInUser'); // Assume the logged-in user's username is stored here

  if (!currentUser) {
 
    navigate('/login'); // Redirect to login if no user is logged in
  }

  // Toggle folder modal
  const toggleFolderModal = () => {
    setFolderModalOpen(!isFolderModalOpen);
  };

  // Handle folder creation
  const handleCreateFolder = () => {
    if (newFolderName.trim() !== '') {
      const newFolder = {
        name: newFolderName,
      };

      setCreatedFolders((prevFolders) => {
        const updatedFolders = [...prevFolders, newFolder];
        saveUserData('createdFolders', updatedFolders);
        return updatedFolders;
      });

      setFolderModalOpen(false); // Close the folder modal
      setNewFolderName(''); // Clear the input
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = {
          name: file.name,
          src: reader.result,
        };

        setUploadedImages((prevImages) => {
          const updatedImages = [...prevImages, newImage];
          saveUserData('uploadedImages', updatedImages);
          return updatedImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save data for the current user in localStorage
  const saveUserData = (key, data) => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    userData[currentUser] = userData[currentUser] || {};
    userData[currentUser][key] = data;
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Load data for the current user from localStorage
  const loadUserData = () => {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const currentUserData = userData[currentUser] || {};
    setCreatedFolders(currentUserData.createdFolders || []);
    setUploadedImages(currentUserData.uploadedImages || []);
  };

  // Handle folder deletion
  const handleDeleteFolder = (index) => {
    setCreatedFolders((prevFolders) => {
      const updatedFolders = prevFolders.filter((_, i) => i !== index);
      saveUserData('createdFolders', updatedFolders);
      return updatedFolders;
    });
  };

  // Handle folder renaming
  const handleRenameFolder = (index) => {
    const newName = prompt('Enter a new name for the folder:', createdFolders[index].name);
    if (newName && newName.trim() !== '') {
      setCreatedFolders((prevFolders) => {
        const updatedFolders = [...prevFolders];
        updatedFolders[index].name = newName.trim();
        saveUserData('createdFolders', updatedFolders);
        return updatedFolders;
      });
    }
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      saveUserData('uploadedImages', updatedImages);
      return updatedImages;
    });
  };

  // Handle image renaming
  const handleRenameImage = (index) => {
    const newName = prompt('Enter a new name for the image:', uploadedImages[index].name);
    if (newName && newName.trim() !== '') {
      setUploadedImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index].name = newName.trim();
        saveUserData('uploadedImages', updatedImages);
        return updatedImages;
      });
    }
  };

  // Load user-specific data on mount
  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Main Section */}
      <div className="flex">
        {/* Sidebar */}
        <div className="h-[900px] w-[270px] bg-[#f1c40f]/30">
          <div className="ml-[50px]">
            <label className="ml-[200px] cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <img src={File} alt="Upload File" className="h-[100px] w-[100px] p-6" />
              <p className="text-xl text-[#a93226] font-bold">Upload File</p>
            </label>
          </div>
          <br />
          <div className="ml-[50px] cursor-pointer" onClick={toggleFolderModal}>
            <img src={Fold} alt="Create Folder" className="h-[100px] w-[100px] p-6" />
            <p className="text-xl text-[#a93226] font-bold">Create Folder</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative">
          <img
            src={IMG}
            alt="Background"
            className="h-[800px] w-full  ml-[80px] justify-center bg-scroll opacity-50"
          />

          {/* Render created folders */}
          {createdFolders.map((folder, index) => (
            <div
              key={index}
              className="absolute flex top-[50px] w-[700px] left-[50px] bg-[#f1c40f] p-2 rounded shadow-lg"
              style={{ transform: `translateY(${index * 80}px)` }}
            >
              <p
                className="text-[#154360] font-bold flex-1 cursor-pointer"
                onClick={() => navigate(`/view-folder?folderName=${folder.name}`)}
              >
                {folder.name}
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-400"
                onClick={() => handleDeleteFolder(index)}
              >
                Delete
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
                onClick={() => handleRenameFolder(index)}
              >
                Rename
              </button>
            </div>
          ))}

          {/* Render uploaded images */}
          {uploadedImages.map((image, index) => (
            <div
              key={index}
              className="absolute flex top-[50px] w-[700px] left-[50px] bg-sky-400/50  p-2 rounded shadow-lg"
              style={{
                transform: `translateY(${(createdFolders.length + index) * 80}px)`,
              }}
            >
              <p
                className="text-[#154360] font-bold flex-1 cursor-pointer"
                onClick={() => navigate(`/view-image?imageName=${image.name}`)}
              >
                {image.name}
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-400"
                onClick={() => handleDeleteImage(index)}
              >
                Delete
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
                onClick={() => handleRenameImage(index)}
              >
                Rename
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Folder Modal */}
      {isFolderModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setFolderModalOpen(false)}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[#154360] font-bold mb-4">Create Folder</h2>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter Folder Name"
            />
            <button
              className="bg-[#154360] text-white py-2 px-6 rounded hover:bg-[#7fb3d5] w-full"
              onClick={handleCreateFolder}
            >
              Create Folder
            </button>
            <button
              className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-400 w-full mt-2"
              onClick={() => setFolderModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
