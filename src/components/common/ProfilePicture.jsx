import React, { useState, useRef } from "react";
import { Camera, Upload, Check, X } from "lucide-react";
import api from "@/api/config";
import initialImage from "../../assets/images/profile.jpg";
const ProfilePicture = ({ athleteId }) => {
  const [profileImage, setProfileImage] = useState(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showUploadControls, setShowUploadControls] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size should be less than 5MB");
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("profilePicture", file);

      // Upload image to server
      const response = await api.athletes.uploadProfilePicture(
        athleteId,
        formData
      );

      if (response.data.success) {
        // Update the profile image with the URL returned from server
        setProfileImage(response.data.imageUrl);
        setShowUploadControls(false);
      } else {
        setUploadError(response.data.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      setUploadError("An error occurred during upload. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle trigger for file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Get profile image URL
  const getProfileImageUrl = () => {
    if (profileImage) return profileImage;
    return `/api/placeholder/150/150`;
  };

  // Cancel upload process
  const cancelUpload = () => {
    setShowUploadControls(false);
    setUploadError(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="relative">
      {/* Profile Picture */}
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto mb-2">
        {profileImage || !showUploadControls ? (
          <img
            src={getProfileImageUrl()}
            alt="Athlete Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Camera className="w-10 h-10 text-gray-400" />
          </div>
        )}
      </div>

      {/* Controls */}
      {!showUploadControls ? (
        <button
          onClick={() => setShowUploadControls(true)}
          className="absolute bottom-2 right-0 bg-[#002E25] text-white p-2 rounded-full shadow-md hover:bg-[#003c32] transition-colors"
          title="Change profile picture"
        >
          <Camera className="w-4 h-4" />
        </button>
      ) : (
        <div className="mt-2 flex flex-col items-center">
          <div className="flex space-x-2 mb-2">
            <button
              onClick={triggerFileInput}
              disabled={isUploading}
              className="flex items-center px-3 py-1 bg-[#002E25] text-white rounded-md hover:bg-[#003c32] transition-colors"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Upload className="w-4 h-4 mr-1" />
              )}
              {isUploading ? "Uploading..." : "Select Image"}
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
            <div className="text-red-500 text-xs mt-1">{uploadError}</div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
