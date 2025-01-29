import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ViewFolder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const folderName = new URLSearchParams(location.search).get('folderName'); // Get folder name from URL
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State for the image modal

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newFile = {
          name: file.name,
          src: reader.result,
        };
        setFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, newFile];
          updateLocalStorage(updatedFiles);
          return updatedFiles;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file deletion
  const handleDelete = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      updateLocalStorage(updatedFiles);
      return updatedFiles;
    });
  };

  // Handle file renaming
  const handleRename = (index) => {
    const newName = prompt('Enter a new name for the file:', files[index].name);
    if (newName && newName.trim() !== '') {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[index].name = newName.trim();
        updateLocalStorage(updatedFiles);
        return updatedFiles;
      });
    }
  };

  // Update localStorage with current files
  const updateLocalStorage = (updatedFiles) => {
    const folderFiles = JSON.parse(localStorage.getItem('folderFiles')) || {};
    folderFiles[folderName] = updatedFiles;
    localStorage.setItem('folderFiles', JSON.stringify(folderFiles));
  };

  // Load files for the folder from localStorage on mount
  useEffect(() => {
    const folderFiles = JSON.parse(localStorage.getItem('folderFiles')) || {};
    if (folderFiles[folderName]) {
      setFiles(folderFiles[folderName]);
    }
  }, [folderName]);

  // Breadcrumb navigation
  const breadcrumbs = [
    { name: 'Home', path: '/HomePage' },
    { name: folderName, path: location.pathname + location.search },
  ];

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <span
                className={`cursor-pointer ${
                  index === breadcrumbs.length - 1 ? 'font-bold' : 'hover:underline'
                }`}
                onClick={() => handleBreadcrumbClick(crumb.path)}
              >
                {crumb.name}
              </span>
              {index < breadcrumbs.length - 1 && <span> / </span>}
            </span>
          ))}
        </nav>

        {/* Folder Header */}
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-[#154360]">Folder: {folderName}</h1>
          <label className="block cursor-pointer ml-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="bg-blue-500 text-white text-center h-12 w-40 pt-2 rounded">
              Upload File
            </div>
          </label>
        </div>

        {/* Uploaded Files */}
        <div>
          <h2 className="text-xl text-[#154360] font-bold">Uploaded Files:</h2>
          {files.map((file, index) => (
            <div key={index} className="mt-2 flex items-center">
              {/* Clickable image */}
              <img
                src={file.src}
                alt={file.name}
                className="h-20 w-20 mr-4 cursor-pointer"
                onClick={() => setSelectedImage(file)} // Open modal with selected image
              />
              <p className="flex-grow">{file.name}</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-400"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
                onClick={() => handleRename(index)}
              >
                Rename
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for viewing image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // Close modal on background click
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
          >
            <img src={selectedImage.src} alt={selectedImage.name} className="max-w-full max-h-[80vh]" />
            <p className="text-center mt-2 font-bold">{selectedImage.name}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4 block mx-auto"
              onClick={() => setSelectedImage(null)} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewFolder;
