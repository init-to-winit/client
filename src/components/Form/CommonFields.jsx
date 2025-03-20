import React, { useEffect, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const countries = [
  "India",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Brazil",
  "Japan",
  "China",
  "South Africa",
];

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const MapUpdater = ({ position }) => {
  const map = useMap();
  if (position) {
    map.setView(position, map.getZoom());
  }
  return null;
};

const LocationMarker = ({ setFormData, formData }) => {
  const [position, setPosition] = React.useState(
    formData.latitude && formData.longitude
      ? [formData.latitude, formData.longitude]
      : null
  );

  const map = useMap();

  const fetchAddress = useCallback(
    async (lat, lng) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        if (data && data.display_name) {
          setFormData((prevData) => ({
            ...prevData,
            address: data.display_name,
          }));
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    },
    [setFormData]
  );

  useEffect(() => {
    if (formData.latitude && formData.longitude) {
      setPosition([formData.latitude, formData.longitude]);
      map.setView([formData.latitude, formData.longitude], 13);
    }
  }, [formData.latitude, formData.longitude, map]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setFormData((prevData) => ({
        ...prevData,
        latitude: lat,
        longitude: lng,
      }));
      fetchAddress(lat, lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        Selected location: {position[0].toFixed(4)}, {position[1].toFixed(4)}
      </Popup>
    </Marker>
  );
};

const CommonFields = ({ formData, handleChange, setFormData }) => {
  useEffect(() => {
    if (
      "geolocation" in navigator &&
      !formData.latitude &&
      !formData.longitude
    ) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          fetchAddress(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [setFormData]);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setFormData((prevData) => ({
          ...prevData,
          address: data.display_name,
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const position =
    formData.latitude && formData.longitude
      ? [formData.latitude, formData.longitude]
      : [51.505, -0.09];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone (e.g., +1234567890)"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <div className="relative">
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="relative">
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <input
        type="text"
        name="address"
        placeholder="Address (Click on map to autofill)"
        value={formData.address}
        onChange={handleChange}
        className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <div className="relative">
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Select Your Location</h3>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapUpdater position={position} />
          <LocationMarker setFormData={setFormData} formData={formData} />
        </MapContainer>
      </div>
    </div>
  );
};

export default CommonFields;
