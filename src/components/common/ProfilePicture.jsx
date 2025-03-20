import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, CheckCircle } from 'lucide-react';
import api from '@/api/config';
import initialImage from '../../assets/images/profile.jpg';

const ProfilePicture = ({
  userId: propUserId,
  role: propRole,
  size = 'md',
}) => {
  const [profileImage, setProfileImage] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showUploadControls, setShowUploadControls] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Get user data from props or localStorage
  const userId = propUserId || JSON.parse(localStorage.getItem('user'))?.id;
  const role = propRole || JSON.parse(localStorage.getItem('user'))?.role;

  // Size classes mapping
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };

  // Fetch profile photo on component mount
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await api.user.getProfilePhoto(userId, { role });
        if (response.status === 200 && response.data.profilePhoto) {
          setProfileImage(response.data.profilePhoto);
        } else {
          setProfileImage(initialImage); // Fallback to dummy image if no photo exists
        }
      } catch (error) {
        console.error('Error fetching profile photo:', error);
        setProfileImage(initialImage); // Fallback to dummy image on error
      }
    };

    if (userId && role) {
      fetchProfilePhoto();
    }
  }, [userId, role]);

  // Handle file selection and upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    setUploadError(null);
    setIsUploading(true);
    setUploadSuccess(false);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('role', role);

      // Upload image to server
      const response = await api.user.uploadProfilePicture(userId, formData);

      if (response.status === 200) {
        // Update the profile image with the URL returned from server
        setProfileImage(response.data.profilePhoto);
        setUploadSuccess(true);

        // Hide upload controls after a short delay to show success state
        setTimeout(() => {
          setShowUploadControls(false);
          setUploadSuccess(false);
        }, 1500);
      } else {
        setUploadError(response.data.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setUploadError('An error occurred during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    setShowUploadControls(true);
    fileInputRef.current.click();
  };

  // Get profile image URL with fallback to dummy image
  const getProfileImageUrl = () => {
    return profileImage || 'https://via.placeholder.com/150';
  };

  // Cancel upload process
  const cancelUpload = () => {
    setShowUploadControls(false);
    setUploadError(null);
    setUploadSuccess(false);
    fileInputRef.current.value = '';
  };

  return (
    <div className="relative">
      {/* Profile Picture */}
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-2`}
      >
        <img
          src={getProfileImageUrl()}
          alt="Profile"
          className="w-full h-full object-cover"
        />

        {/* Upload progress overlay */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="absolute w-12 h-12 border-4 border-white border-opacity-25 rounded-full"></div>
              <div className="absolute w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white text-xs font-medium">Uploading</span>
            </div>
          </div>
        )}

        {/* Success overlay */}
        {uploadSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
            <div className="text-center">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto animate-pulse" />
              <span className="text-white text-xs block mt-1">Uploaded!</span>
            </div>
          </div>
        )}
      </div>

      {/* Edit button (only visible when not uploading) */}
      {!showUploadControls && !isUploading && (
        <button
          onClick={triggerFileInput}
          className="absolute bottom-2 right-0 bg-[#002E25] text-white p-2 rounded-full shadow-md hover:bg-[#003c32] transition-colors"
          title="Change profile picture"
        >
          <Camera className="w-4 h-4" />
        </button>
      )}

      {/* Upload controls */}
      {showUploadControls && !isUploading && !uploadSuccess && (
        <div className="mt-2 flex flex-col items-center">
          <div className="flex space-x-2 mb-2">
            <button
              onClick={triggerFileInput}
              className="flex items-center px-3 py-1 bg-[#002E25] text-white rounded-md hover:bg-[#003c32] transition-colors"
            >
              <Upload className="w-4 h-4 mr-1" />
              Select Image
            </button>
            <button
              onClick={cancelUpload}
              className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </button>
          </div>

          {uploadError && (
            <div className="text-red-500 text-xs mt-1 max-w-xs text-center">
              {uploadError}
            </div>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default ProfilePicture;
