import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DarkMode from '../DarkMode';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-gray-200/20 dark:border-slate-700/30 shadow-xl">
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Simplified Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300">
              ZESHO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300 relative group"
            >
              Home
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
            </Link>
            <Link 
              to="/materials/all" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300 relative group"
            >
              Browse
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
            </Link>
            <Link 
              to="/categories" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300 relative group"
            >
              Categories
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
            </Link>
            <Link 
              to="/about" 
              className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 rounded-xl hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-300 relative group"
            >
              About
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <DarkMode />
            
            {/* Admin Button */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/admin/login">
                <button className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Admin
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-6 py-6 border-t border-gray-200/20 dark:border-slate-700/50 backdrop-blur-xl bg-white/90 dark:bg-slate-900/95 rounded-b-2xl">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 font-medium transition-all duration-300 px-4 py-3 rounded-xl hover:bg-violet-50/50 dark:hover:bg-violet-900/20 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/materials/all" 
                className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 font-medium transition-all duration-300 px-4 py-3 rounded-xl hover:bg-violet-50/50 dark:hover:bg-violet-900/20 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
              <Link 
                to="/categories" 
                className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 font-medium transition-all duration-300 px-4 py-3 rounded-xl hover:bg-violet-50/50 dark:hover:bg-violet-900/20 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400 font-medium transition-all duration-300 px-4 py-3 rounded-xl hover:bg-violet-50/50 dark:hover:bg-violet-900/20 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="pt-4 border-t border-gray-200/20 dark:border-slate-700/50">
                <div className="flex flex-col space-y-3">
                  <Link to="/admin/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Admin
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
