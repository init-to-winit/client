import React from "react";
import Logo from "../../assets/images/Logo.png";
export default function Navbar() {
  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-4 p-4">
          {/* Left Section: Logo + Nav Links */}
          <div className="flex items-center flex-1">
            <a
              href="https://flowbite.com/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-3xl font-bold whitespace-nowrap text-primary uppercase">
                Vismoh
              </span>
            </a>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center ml-10">
              <ul className="flex space-x-8 font-medium">
                <li>
                  <a
                    href="#"
                    className="block py-1 px-6 md:px-2 text-[#090C10] rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:bg-secondary"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-1 px-6 md:px-2 text-[#090C10] rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:bg-secondary"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-1 px-6 md:px-2 text-[#090C10] rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:bg-secondary"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-1 px-6 md:px-2 text-[#090C10] rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:bg-secondary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section: Sign In/Sign Up */}
          <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
            <div className="flex gap-4">
              <button
                type="button"
                className="text-primary border-primary border bg-white hover:bg-primary hover:text-white focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-4 py-2 text-center"
              >
                Sign in
              </button>
              <button
                type="button"
                className="text-white bg-primary hover:bg-white hover:text-primary hover:border-primary hover:border focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-4 py-2 text-center"
              >
                Sign up for free
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#090C10] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
