// src/components/Nav.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Technology', path: '/technology' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4' // Made transparent when at top
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              {/* Image logo referencing the public folder */}
              <img
                className="h-14 w-auto" // Adjusted height for visibility
                src="/IMG-20250824-WA0014.jpg"
                alt="Princeton Dental Logo"
              />
              <div className="ml-3">
                <span className={`font-bold text-xl ${
                  scrolled ? 'text-blue-900' : 'text-white'
                }`}>
                  Princeton Dental
                </span>
                <p className={`text-xs italic ${
                  scrolled ? 'text-blue-700' : 'text-pink-200'
                }`}>
                  Behind every perfect smile...
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-colors duration-300 ${
                    scrolled 
                      ? 'text-blue-800 hover:text-blue-600' 
                      : 'text-white hover:text-pink-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact">
                <button className={`px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 ${
                  scrolled
                    ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white hover:from-blue-800 hover:to-blue-950'
                    : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                }`}>
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                scrolled 
                  ? 'text-blue-800 hover:text-blue-600' 
                  : 'text-white hover:text-pink-300'
              }`}
            >
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 rounded-b-lg shadow-xl ${
          scrolled ? 'bg-white' : 'bg-blue-900'
        }`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-md font-medium ${
                scrolled 
                  ? 'text-blue-800 hover:bg-blue-50' 
                  : 'text-white hover:bg-blue-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/contact" className="block w-full">
            <button className={`w-full text-left ml-3 mt-2 px-4 py-2 rounded-full font-medium shadow-lg ${
              scrolled
                ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white'
                : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
            }`} onClick={() => setIsOpen(false)}>
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
