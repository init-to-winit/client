import React, { useState } from "react";
import runningLogo from "../assets/images/man-running.png";
import logo from "../assets/images/signuplogo.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/config";

const VismohLoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.auth.login(formData);
      console.log("Login Successful:", res.data);

      // Save token (if applicable)
      localStorage.setItem("authToken", res.data.token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen mx-20 my-4">
      {/* Left section - Login Form */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        <div className="mb-16">
          <p className="text-sm text-gray-500 mb-1">Login</p>
          <span className="text-4xl font-bold">
            Welcome to <span className="bg-secondary px-2 py-1 rounded-lg">Vismoh!</span>
          </span>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-gray-100 border-0"
              required
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-gray-100 border-0"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-full font-medium"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-8 text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/signup" className="text-teal-600 font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </div>

      {/* Right section - Marketing content */}
      <div className=" md:flex flex-col hidden md:w-1/2 mt-4">
        {/* Logo */}
        <div className=" py-3 rounded-full">
          <div className="w-12 h-12 text-green-600">
            <img src={logo} alt="logo" className="max-h-full object-cover" />
          </div>
        </div>

        {/* Text overlay */}
        <div className="w-full">
          <h2 className="text-xl font-bold">Log In:</h2>
          <p className="mt-2 font-light text-sm">
            Your success is our top priority. Our dedicated support team is here to assist you every step of the way.
          </p>
        </div>

        {/* Main image */}
        <div className="relative h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={runningLogo}
              alt="Tennis player"
              className="max-h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VismohLoginPage;
