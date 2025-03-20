import React, { useState, useEffect } from 'react';
import api from '@/api/config';
import { useParams } from 'react-router-dom';
import {
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  Briefcase,
  UserX,
  Flag,
  User,
} from 'lucide-react';
import ProfilePicture from '@/components/common/ProfilePicture';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function SponsorProfile() {
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const disableUpload = currentUser.id !== id;
  const role = 'Sponsor';

  const fetchSponsorData = async () => {
    if (!id) {
      setError('No Sponsor ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.user.getUser(id, role);

      if (response.data.success) {
        setSponsor(response.data.user);
      } else {
        setError(response.data.message || 'Failed to fetch sponsor data');
        setSponsor(null);
      }
    } catch (error) {
      console.error('Error fetching sponsor data:', error);
      setError(
        'An error occurred while fetching sponsor data. Please try again later.'
      );
      setSponsor(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsorData();
  }, [id]);

  // Error state component
  const ErrorState = () => (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto mt-20 text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Data Not Available
      </h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>
        <button
          onClick={fetchSponsorData}
          className="flex items-center px-4 py-2 bg-[#002E25] text-white rounded-md hover:bg-[#003c32] transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    </div>
  );

  // Loading state component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[#002E25] rounded-full animate-spin mb-4"></div>
      <p className="text-lg text-gray-600">Loading sponsor profile...</p>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto mt-20 text-center">
      <UserX className="h-12 w-12 text-gray-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        No Sponsor Found
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn't find any sponsor data with the provided ID.
      </p>
      <button
        onClick={() => window.history.back()}
        className="flex items-center px-4 py-2 bg-[#002E25] text-white rounded-md hover:bg-[#003c32] transition-colors mx-auto"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Go Back
      </button>
    </div>
  );

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;
  if (!sponsor) return <EmptyState />;

  // Calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center">
              <ProfilePicture userId={id} disableUpload={disableUpload} />

              <div className="ml-4">
                <h1 className="text-3xl font-bold text-[#002E25]">
                  {sponsor.firstName} {sponsor.lastName}
                </h1>
                <div className="flex items-center mt-2">
                  <span className="text-[#002E25]/80">{sponsor.role}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="px-4 py-2 bg-[#002E25] text-white rounded-md">
                {sponsor.isVerified
                  ? 'Verified Sponsor'
                  : 'Verification Pending'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center p-4 border-t">
          <div
            className={`w-3 h-3 rounded-full ${
              sponsor.isVerified ? 'bg-green-500' : 'bg-yellow-500'
            } mr-2`}
          ></div>
          <span className="font-medium text-[#002E25]">
            Status: {sponsor.isVerified ? 'Verified' : 'Pending Verification'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Basic Info */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <User className="text-[#002E25]" />
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-[#002E25] mt-0.5 mr-3" />
                <div>
                  <div className="text-gray-500 text-sm">Date of Birth</div>
                  <div className="font-medium">
                    {new Date(sponsor.dob).toLocaleDateString()}
                    <span className="text-gray-500 ml-2">
                      ({calculateAge(sponsor.dob)} years)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-5 h-5 text-[#002E25] mt-0.5 mr-3" />
                <div>
                  <div className="text-gray-500 text-sm">Email</div>
                  <div className="font-medium">{sponsor.email}</div>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-[#002E25] mt-0.5 mr-3" />
                <div>
                  <div className="text-gray-500 text-sm">Phone</div>
                  <div className="font-medium">{sponsor.phone}</div>
                </div>
              </div>

              <div className="flex items-start">
                <Globe className="w-5 h-5 text-[#002E25] mt-0.5 mr-3" />
                <div>
                  <div className="text-gray-500 text-sm">Country</div>
                  <div className="font-medium">{sponsor.country}</div>
                </div>
              </div>

              <div className="flex items-start">
                <Flag className="w-5 h-5 text-[#002E25] mt-0.5 mr-3" />
                <div>
                  <div className="text-gray-500 text-sm">Gender</div>
                  <div className="font-medium capitalize">{sponsor.gender}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Sponsor Information</h2>
              <Briefcase className="text-blue-600" />
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 capitalize">
                  Sponsor
                </div>
                <div className="text-sm text-gray-600 mt-1">Role</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-gray-500 text-sm">Member Since</div>
              <div className="font-medium">
                {new Date(sponsor.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Location & Additional Info */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Location</h2>
              <MapPin className="text-red-600" />
            </div>
            <div className="mb-4">
              <div className="text-gray-500 text-sm mb-1">Address</div>
              <div className="font-medium">{sponsor.address}</div>
            </div>

            {/* Leaflet Map */}
            <div className="bg-gray-100 rounded-lg overflow-hidden h-64 relative">
              {sponsor.latitude && sponsor.longitude ? (
                <MapContainer
                  center={[sponsor.latitude, sponsor.longitude]}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[sponsor.latitude, sponsor.longitude]}>
                    <Popup>
                      {sponsor.firstName} {sponsor.lastName}'s Location
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-500">
                    Map location not available
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 text-sm">Latitude</div>
                <div className="font-medium">{sponsor.latitude || 'N/A'}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Longitude</div>
                <div className="font-medium">{sponsor.longitude || 'N/A'}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Medical Information</h2>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-red-600">
                    {sponsor.bloodGroup}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-sm text-gray-600">Blood Group</div>
                  <div className="font-medium">{sponsor.bloodGroup}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
