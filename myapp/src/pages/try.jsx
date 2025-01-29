import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import IMG from '../assets/images/img.jpg';
import File from '../assets/images/file.png';
import Fold from '../assets/images/fold.png';
import Dot from '../assets/images/3dot.png';

const Home = () => {
  const [isFolderModalOpen, setFolderModalOpen] = useState(false); // For creating folders
  const [isFileModalOpen, setFileModalOpen] = useState(false); // For uploading files
  const [folderName, setFolderName] = useState(''); // Track folder name input
  const [createdFolders, setCreatedFolders] = useState([]); // List of created folders
  const [selectedFolder, setSelectedFolder] = useState(null); // Folder selected for dropdown
  const [uploadedImages, setUploadedImages] = useState([]); // List of uploaded images
  const [renameFolderModalOpen, setRenameFolderModalOpen] = useState(false); // Folder rename modal state
  const [newFolderName, setNewFolderName] = useState(''); // New name for renaming folders

  // Toggle folder modal
  const toggleFolderModal = () => {
    setFolderModalOpen(!isFolderModalOpen);
  };

  // Handle folder creation
  const handleCreateFolder = () => {
    if (folderName.trim() !== '') {
      const newFolder = {
        name: folderName,
        id: Date.now(), // Use a unique id for each folder
        image: Fold, // Use a folder icon for display
      };
      setCreatedFolders((prevFolders) => [...prevFolders, newFolder]);
      setFolderName(''); // Clear the folder name input
      setFolderModalOpen(false); // Close the folder modal
    }
  };

  // Handle file upload modal toggle
  const handleUploadFile = (folder) => {
    setSelectedFolder(folder);
    setFileModalOpen(true); // Open the file upload modal
  };

  // Handle folder rename
  const handleRenameFolder = () => {
    const updatedFolders = createdFolders.map((folder) =>
      folder.id === selectedFolder.id ? { ...folder, name: newFolderName } : folder
    );
    setCreatedFolders(updatedFolders);
    setRenameFolderModalOpen(false); // Close rename modal
    setSelectedFolder(null); // Clear selected folder
  };

  // Handle folder deletion
  const handleDeleteFolder = (folderToDelete) => {
    const updatedFolders = createdFolders.filter(
      (folder) => folder.id !== folderToDelete.id
    );
    setCreatedFolders(updatedFolders);
    setSelectedFolder(null); // Clear selected folder
  };

  return (
    <div>
      <Navbar />

      {/* Main Section */}
      <div className="flex">
        {/* Sidebar */}
        <div className="h-[900px] w-[270px] bg-[#f1c40f]/30">
          <label className="ml-[50px] cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleUploadFile(null, event)}
            />
            <img src={File} alt="Upload File" className="h-[100px] w-[100px] p-6" />
            <p className="text-xl text-[#a93226] font-bold">Upload File</p>
          </label>
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
            className="h-[700px] w-full p-16 ml-[250px] justify-center bg-scroll opacity-50"
          />

          {/* Render created folders */}
          {createdFolders.map((folder, index) => (
            <div
              key={folder.id}
              className="absolute flex top-[50px] w-[300px] left-[50px] bg-[#f7dc6f] p-2 rounded shadow-lg cursor-pointer"
              style={{ transform: `translateY(${index * 100}px)` }}
            >
              <img
                src={folder.image}
                alt="Folder"
                className="h-8 w-8 mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFolder(selectedFolder === folder ? null : folder);
                }}
              />
              <p className="text-[#154360] font-bold">{folder.name}</p>
              {selectedFolder === folder && (
                <div className="absolute top-12 left-[150px] bg-white shadow-lg rounded">
                  <ul>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleUploadFile(folder)}
                    >
                      Upload File
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setRenameFolderModalOpen(true);
                        setNewFolderName(folder.name);
                      }}
                    >
                      Rename Folder
                    </li>
                    <li
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleDeleteFolder(folder)}
                    >
                      Delete Folder
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Folder Creation Modal */}
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
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
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

      {/* Rename Folder Modal */}
      {renameFolderModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setRenameFolderModalOpen(false)}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg w-[90%] max-w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[#154360] font-bold mb-4">Rename Folder</h2>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              className="bg-[#154360] text-white py-2 px-6 rounded hover:bg-[#7fb3d5] w-full"
              onClick={handleRenameFolder}
            >
              Rename
            </button>
            <button
              className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-400 w-full mt-2"
              onClick={() => setRenameFolderModalOpen(false)}
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
