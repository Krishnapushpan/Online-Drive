import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewImage = () => {
  const [image, setImage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const imageName = new URLSearchParams(location.search).get('imageName');
  const currentUser = localStorage.getItem('loggedInUser'); // Get the logged-in user

  useEffect(() => {
    if (currentUser) {
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
      const currentUserData = userData[currentUser] || {};
      const storedImages = currentUserData.uploadedImages || [];
      const foundImage = storedImages.find((img) => img.name === imageName);
      if (foundImage) {
        setImage(foundImage.src);
      }
    }
  }, [imageName, currentUser]);

  return (
    <div className="p-4">
      {/* Breadcrumbs */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => navigate('/HomePage')}>
            Home
          </span>{' '}
          /{' '}
          <span className="cursor-pointer text-blue-500 hover:underline" onClick={() => navigate(-1)}>
            Previous
          </span>{' '}
          / <span className="text-gray-700">View Image</span>
        </p>
      </div>

      {/* Image Section */}
      <div className="flex flex-col items-center">
        {image ? (
          <img src={image} alt={imageName} className="max-w-full max-h-[80vh] mb-4" />
        ) : (
          <p>Image not found</p>
        )}

        {/* Back to Home Button */}
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400"
          onClick={() => navigate('/HomePage')}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ViewImage;
