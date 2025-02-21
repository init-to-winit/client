import React, { useEffect, useState } from "react";
import api from "../api/config";
const NameAvatar = ({ firstName, lastName }) => {
  const firstInitial = firstName ? firstName.charAt(0) : "";
  const lastInitial = lastName ? lastName.charAt(0) : "";
  const initials = (firstInitial + lastInitial).toUpperCase();

  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary text-secondary font-medium text-lg">
      {initials}
    </div>
  );
};

const PersonCard = ({ firstName, lastName, email, phone, sport }) => {
  return (
    <div className="flex items-center bg-gray-100 p-6 rounded-lg mb-8">
      <div className="mr-6">
        <NameAvatar firstName={firstName} lastName={lastName} />
      </div>
      <div className="flex-grow">
        <h3 className="text-primary bg-secondary inline-block px-1 text-xl font-semibold mb-2">
          {firstName} {lastName}
        </h3>
        <p className="text-ptext text-base mb-1">{email}</p>
        <p className="text-ptext text-base mb-1">{phone}</p>
        {sport && (
          <p className=" px-1 inline-block rounded-md font-medium text-lg">
            {sport}
          </p>
        )}
      </div>
      <div className="flex items-center">
        <button className="border border-gray-800 rounded-lg py-2 px-5 text-gray-800 hover:bg-gray-50 transition">
          Connect
        </button>
      </div>
    </div>
  );
};

const SponsorsListing = ({ person }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      let res;
      if (person === "coaches") {
        res = await api.coaches.getAllCoaches();
        setData(res.data.coaches);
      } else {
        res = await api.sponsors.getAllSponsors();
        setData(res.data.sponsors);
      }
      console.log(`${person} data fetched:`, res.data);
    } catch (err) {
      console.error(`Error fetching ${person}:`, err);
      setError(err.response?.data?.message || `Failed to fetch ${person}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [person]);

  if (loading) {
    return <div className="p-6 text-lg text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {person === "coaches" ? "Coaches" : "Sponsors"}
      </h1>
      <div>
        {data.length > 0 ? (
          data.map((item) => <PersonCard key={item.id} {...item} />)
        ) : (
          <p className="text-gray-600 text-lg">No {person} found.</p>
        )}
      </div>
    </div>
  );
};

export default SponsorsListing;
