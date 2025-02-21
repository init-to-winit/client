import React from "react";
import api from "../api/config";
import { useEffect, useState } from "react";
const SponsorCard = ({ branch, address, city, pincode, phone }) => {
  return (
    <div className="flex bg-gray-100 mb-6">
      <div className="w-1/3 p-8 flex items-center justify-center">
        <h3 className="text-gray-700 font-medium text-lg">{branch}</h3>
      </div>
      <div className="w-2/3 py-6 px-4">
        <h3 className="text-gray-800 text-lg mb-2">Lisy Store</h3>
        <p className="text-gray-600 mb-1">{address}</p>
        <p className="text-gray-600 mb-1">
          {city} - {pincode}
        </p>
        <p className="text-gray-600 mb-1">{phone}</p>
      </div>
      <div className="flex items-center pr-4">
        <button className="border border-gray-800 rounded py-2 px-6 text-gray-800 hover:bg-gray-50">
          Connect
        </button>
      </div>
    </div>
  );
};

const SponsorsListing = ({ person }) => {
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    try {
      const res = await api.coaches.getAllCoaches();
      console.log("Login Successful:", res.data);

      // const userData = {
      //   token: res.data.token,
      //   role: res.data.userData.role,
      //   name: res.data.userData.name,
      // };
      // console.log("User Data:", userData);

      // login(userData);
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };
  useEffect(() => {
    handleSubmit();
  }, []);
  const sponsors = [
    {
      branch: "Singanallur Branch",
      address: "1A/Krihnarajapuram, 3 rd street sulur",
      city: "Coimbatore",
      pincode: "6313403",
      phone: "044- 653578",
    },
    {
      branch: "Slur Branch",
      address: "54 Ramani colony, 3 rd street sulur",
      city: "Coimbatore",
      pincode: "63133452",
      phone: "044- 653763",
    },
    {
      branch: "Gaandipuram Branch",
      address: "32/ Venkatasamy layout, 3 rd street sulur",
      city: "Coimbatore",
      pincode: "6313403",
      phone: "044- 653578",
    },
    {
      branch: "Gaandipuram Branch",
      address: "32/ Venkatasamy layout, 3 rd street sulur",
      city: "Coimbatore",
      pincode: "6313403",
      phone: "044- 653578",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {person === "coaches" ? "Coaches" : "Sponsors"}
      </h1>
      <div>
        {sponsors.map((sponsor, index) => (
          <SponsorCard key={index} {...sponsor} />
        ))}
      </div>
    </div>
  );
};

export default SponsorsListing;
