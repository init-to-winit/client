import React, { useState } from 'react';
import tennisPlayer from '../assets/images/TennisPlayer.png';
import logo from '../assets/images/signuplogo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../api/config';

import CommonFields from '@/components/Form/CommonFields';
import AthleteFields from '@/components/Form/AthleteFields';
import CoachFields from '@/components/Form/CoachFields';
import SponsorFields from '@/components/Form/SponsorFields';

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const mail = location.state?.email || '';
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: mail,
    password: '',
    dob: '',
    role: '',
    phone: '',
    position: '',
    sport: '',
    latitude: '',
    longitude: '',
    address: '',
    country: '',
    bloodGroup: '',
    gender: '',
    experienceLevel: '',
    companyName: '',
    sponsorshipType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+\d{10,15}$/; // E.164 format
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validatePhoneNumber(formData.phone)) {
      setError('Phone number must be in E.164 format (e.g., +1234567890).');
      setLoading(false);
      return;
    }

    try {
      const res = await api.auth.register(formData);
      console.log('Registration Successful:', res.data);
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen mx-32">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-20 md:p-12 flex flex-col justify-center">
        <div className="text-sm mb-1 text-gray-600">Sign Up</div>
        <span className="text-4xl font-bold mb-10 text-gray-900">
          Welcome to{' '}
          <span className="bg-secondary px-2 py-1 rounded-lg">Vismoh!</span>
        </span>

        {/* Role selection at the top */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2">
            I am registering as:
          </label>
          <div className="relative">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-4 bg-gray-100 rounded-lg appearance-none focus:outline-none"
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="Athlete">Athlete</option>
              <option value="Coach">Coach</option>
              <option value="Sponsor">Sponsor</option>
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
        </div>

        {formData.role && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common fields for all roles */}
            <CommonFields
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData} // Pass setFormData here
            />

            {/* Role-specific fields */}
            {formData.role === 'Athlete' && (
              <AthleteFields formData={formData} handleChange={handleChange} />
            )}
            {formData.role === 'Coach' && (
              <CoachFields formData={formData} handleChange={handleChange} />
            )}
            {formData.role === 'Sponsor' && (
              <SponsorFields formData={formData} handleChange={handleChange} />
            )}

            {error && <div className="text-red-500 text-sm py-2">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors focus:outline-none"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="md:flex flex-col hidden md:w-1/2 mt-4">
        {/* Logo */}
        <div className="py-3 rounded-full">
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
