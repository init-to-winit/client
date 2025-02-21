import React, { useState } from "react";
import tennisPlayer from "../assets/images/TennisPlayer.png";
import logo from "../assets/images/signuplogo.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/config";
import { useAuth } from "../components/auth/AuthProvider"; 

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
   const { login } = useAuth();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    role: "",
    phone: "",
    position: "",
    sport: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+\d{10,15}$/; // E.164 format
    return phoneRegex.test(phone);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validatePhoneNumber(formData.phone)) {
      setError("Phone number must be in E.164 format (e.g., +1234567890).");
      setLoading(false);
      return;
    }

    try {
      const res = await api.auth.register(formData);
      console.log("Login Successful:", res.data);

      const userData = {
        token: res.data.token,
        role: res.data.role,
      };

      login(userData); // Pass navigate to login()
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen mx-32">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-20 md:p-12 flex flex-col justify-center ">
        <div className=" text-sm mb-1 text-gray-600">Sign Up</div>
        <span className="text-4xl font-bold mb-10 text-gray-900">
          Welcome to{" "}
          <span className="bg-secondary px-2 py-1 rounded-lg">Vismoh!</span>
        </span>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="FName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <input
              type="text"
              name="lastName"
              placeholder="LName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <input
              type="date"
              name="dob"
              placeholder="DOB"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone (e.g., +1234567890)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
            />
          </div>

          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg appearance-none focus:outline-none"
            >
              <option value="" disabled>
                Role
              </option>
              <option value="Athlete">Athlete</option>
              <option value="Sponsor">Sponsor</option>
              <option value="Coach">Coach</option>
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
                ></path>
              </svg>
            </div>
          </div>
          {(formData.role === "Athlete" || formData.role === "Coach") && (
            <div>
              <input
                type="text"
                name="sport"
                placeholder="Sport"
                value={formData.sport}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
              />
            </div>
          )}

          {formData.role === "Athlete" && (
            <div>
              <input
                type="text"
                name="position"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 rounded-lg focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors focus:outline-none"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Right side - Image */}
      <div className=" md:flex flex-col hidden md:w-1/2 mt-4">
        {/* Logo */}
        <div className=" py-3 rounded-full">
          <div className="w-12 h-12 text-green-600">
            <img src={logo} alt="logo" className="max-h-full object-cover" />
          </div>
        </div>

        {/* Text overlay */}
        <div className="w-full">
          <h2 className="text-xl font-bold">Sign Up:</h2>
          <p className="mt-2 font-light text-sm">
            Your success is our top priority. Our dedicated support team is here
            to assist you every step of the way.
          </p>
        </div>

        {/* Main image */}
        <div className="relative h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={tennisPlayer}
              alt="Tennis player"
              className="max-h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
