import React from 'react';
import { X } from 'lucide-react';

const SponsorModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  formData,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-[#002E25]">
            Sponsor Verification
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Aadhaar Number
            </label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={onChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002E25]"
              placeholder="Enter Aadhar number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              CIN Number
            </label>
            <input
              type="text"
              name="cinNumber"
              value={formData.cinNumber}
              onChange={onChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002E25]"
              placeholder="Enter years of experience"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sponsored Teams
            </label>
            <input
              type="text"
              name="sponsoredTeams"
              value={formData.sponsoredTeams}
              onChange={onChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002E25]"
              placeholder="Enter team affiliation"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              companyWebsite
            </label>
            <input
              type="text"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={onChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#002E25]"
              placeholder="Enter license number"
            />
          </div>

          <div className="flex justify-end pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#002E25] text-white rounded-md hover:bg-[#003c32] focus:outline-none"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SponsorModal;
