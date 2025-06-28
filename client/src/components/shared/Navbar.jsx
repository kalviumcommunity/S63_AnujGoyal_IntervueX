import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Intervue<span className="text-[#F83002]">X</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                className="text-gray-900 hover:text-[#F83002] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-900 hover:text-[#F83002] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
              <Link 
                to="/about" 
                className="text-gray-900 hover:text-[#F83002] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About
              </Link>
              <Link 
                to="/jobs" 
                className="text-gray-900 hover:text-[#F83002] px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Jobs
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-900 hover:text-[#F83002] px-4 py-2 text-sm font-medium border border-gray-300 rounded-md hover:border-[#F83002] transition-colors duration-200"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-[#F83002] text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-[#e02900] transition-colors duration-200"
              >
                Signup
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F83002]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <Link 
            to="/" 
            className="text-gray-900 hover:text-[#F83002] block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-900 hover:text-[#F83002] block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Contact
          </Link>
          <Link 
            to="/about" 
            className="text-gray-900 hover:text-[#F83002] block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            About
          </Link>
          <Link 
            to="/jobs" 
            className="text-gray-900 hover:text-[#F83002] block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Jobs
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3 space-x-3">
              <Link 
                to="/login" 
                className="text-gray-900 hover:text-[#F83002] block px-3 py-2 text-base font-medium border border-gray-300 rounded-md hover:border-[#F83002] transition-colors duration-200 text-center"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-[#F83002] text-white block px-3 py-2 text-base font-medium rounded-md hover:bg-[#e02900] transition-colors duration-200 text-center"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


