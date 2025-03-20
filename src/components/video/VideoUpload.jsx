import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Check, Loader, RefreshCcw } from "lucide-react";
import api from "../../api/config";
import VideoAnalyzer from "./VideoAnalysis";

const VideoUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [error, setError] = useState(null);
  const [analysisReport, setAnalysisReport] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const id = JSON.parse(localStorage.getItem("user"))?.id;
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await api.video_analysis.getVideoAnalysis(id);
        if (response.data.success) {
          setAnalysisReport(response.data.data);
          setVideoUrl(response.data.data.videoUrl);
          console.log("Video analysis report:", response.data);
        }
      } catch (err) {
        console.error("Error fetching video analysis report:", err);
        setError("Error fetching video analysis report.");
      }
    };

    if (id) {
      fetchAnalysis(); // ✅ Proper function call
    }
  }, [id]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile) return;

    // Check if the file is a video
    if (!selectedFile.type.startsWith("video/")) {
      setError("Please select a valid video file");
      return;
    }

    setError(null);
    setFile(selectedFile);
    uploadVideo(selectedFile);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    handleFileSelection(e.target.files[0]);
  };

  const uploadVideo = async (videoFile) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    setAnalysisReport(null);
    setError(null);

    try {
      // Simulate upload progress for UI smoothness
      const uploadProgressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(uploadProgressInterval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);

      // ✅ Send only the video file
      const response = await api.video_analysis.postVideo(id, videoFile);

      clearInterval(uploadProgressInterval);

      if (response.status !== 200) {
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        );
      }

      // ✅ Access the response data directly
      const result = response.data;

      setUploadProgress(100);
      setIsUploading(false);
      setUploadComplete(true);
      setAnalysisReport(result);
    } catch (err) {
      console.error("Error uploading video:", err);
      setError(`Failed to upload: ${err.message}`);
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadComplete(false);
    setAnalysisReport(null);
    setError(null);
    setVideoUrl(null);
  };

  return (
    <div className="w-full h-auto mx-auto p-6 bg-white rounded-lg">
      {videoUrl && (
        <>
          <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden">
            <video
              src={videoUrl}
              className="w-full h-full object-fill max-w-3xl mx-auto"
              controls
            />
            {/* Reupload Button */}
            <button
              onClick={resetUpload}
              className="absolute top-4 right-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <span className="flex items-center"><RefreshCcw size={18} /><span className="ml-2"> Reupload</span></span>
            </button>
          </div>
          <div className="mt-6">
            {analysisReport && <VideoAnalyzer report={analysisReport} />}
          </div>
        </>
      )}
      {uploadComplete && analysisReport && (
        <div className="flex justify-end mb-4">
          <button
            onClick={resetUpload}
            className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
          >
            <RefreshCcw size={18} /> Reupload
          </button>
        </div>
      )}
      <div
        className={`w-full mx-auto bg-gray-100 rounded-lg flex flex-col items-center justify-center transition-all ${
          isDragging ? "border-2 border-blue-500 border-dashed" : ""
        } ${videoUrl ? "":"p-20"
        } ${file ? "border border-gray-300" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file && !isUploading && !uploadComplete && !videoUrl ? (
          <>
            <div className="bg-gray-300 rounded-full p-6 mb-4 shadow-lg">
              <Upload className="w-12 h-12 text-blue-900" />
            </div>

            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Video Analyzer
            </h2>
            <p className="text-gray-500 mb-4">Upload a video for analysis</p>

            <button
              onClick={handleButtonClick}
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
            >
              {analysisReport ? "Reupload Video" : "Upload Video"}
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept="video/*"
              className="hidden"
            />

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        ) : (
          !videoUrl && (
            <div className="w-full">
              <div className="max-w-md w-full mx-auto">
                {/* Upload Status */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium truncate max-w-xs">
                    {file ? file.name : "Uploading video..."}
                  </span>

                  {/* Cancel Button */}
                  {!isUploading && !uploadComplete && (
                    <button
                      onClick={resetUpload}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}

                  {/* Upload Complete Icon */}
                  {uploadComplete && (
                    <Check size={20} className="text-green-500" />
                  )}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-300 rounded-full h-2 mb-4 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      uploadComplete ? "bg-green-500" : "bg-blue-900"
                    }`}
                    style={{
                      width: `${uploadProgress}%`,
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>

                {/* Upload Status */}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {isUploading
                      ? "Uploading..."
                      : uploadComplete
                      ? "Upload complete"
                      : "Processing..."}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>

                {/* Loader */}
                {isUploading && (
                  <div className="flex justify-center mt-4">
                    <Loader className="w-8 h-8 text-blue-900 animate-spin" />
                  </div>
                )}
              </div>

              {/* Upload Complete Message & Analysis */}
              {uploadComplete && (
                <div className="mt-4 w-full">
                  <p className="text-green-600 text-center w-full font-medium mb-2">
                    ✅ Video uploaded successfully!
                  </p>
                  {analysisReport ? (
                    <VideoAnalyzer report={analysisReport?.analysis} />
                  ) : (
                    <p className="text-gray-600">⏳ Analysis in progress...</p>
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
