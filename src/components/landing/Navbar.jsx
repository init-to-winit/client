import React from 'react';
import Logo from '../../assets/images/Logo.png';
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="bg-white border-gray-200 fixed w-full z-50 shadow-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-4 p-4">
          {/* Left Section: Logo + Nav Links */}
          <div className="flex items-center flex-1">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-8" alt="Vismoh Logo" />
              <span className="self-center text-3xl font-bold whitespace-nowrap text-primary uppercase">
                Vismoh
              </span>
            </a>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center ml-10">
              <ul className="flex space-x-8 font-medium">
                {['home', 'about', 'services', 'FAQ'].map((section) => (
                  <li key={section}>
                    <Link
                      activeClass="active"
                      to={section}
                      spy={true}
                      smooth={true}
                      offset={-80} // Offset for fixed navbar
                      duration={500}
                      className="block py-1 px-6 md:px-2 text-[#090C10] rounded-md hover:bg-gray-100 md:hover:bg-transparent cursor-pointer active:text-primary active:bg-gray-50 transition-all duration-300"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section: Sign In/Sign Up */}
          <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
            <div className="flex gap-4">
              <button
                type="button"
                className="text-primary border-primary border bg-white hover:bg-primary hover:text-white focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-4 py-2 text-center transition-all duration-300"
                onClick={() => navigate('/login')}
              >
                Sign in
              </button>
              <button
                type="button"
                className="text-white bg-primary hover:bg-white hover:text-primary hover:border-primary hover:border focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-4 py-2 text-center transition-all duration-300"
                onClick={() => navigate('/signup')}
              >
                Sign up for free
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
