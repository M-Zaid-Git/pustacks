import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchParam, setSearchParam] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchParam.trim()) {
      // Navigate to materials page with search parameter
      navigate(`/materials/all?search=${encodeURIComponent(searchParam.trim())}`);
    } else {
      // If empty search, just go to materials page
      navigate('/materials/all');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  
  return (
    <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
      {/* Modern geometric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-purple-600/5 to-pink-600/5"></div>
      
      {/* Floating elements for modern look */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 rotate-12 animate-pulse"></div>
      <div className="absolute top-40 right-16 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-25 animate-bounce"></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg opacity-30 rotate-45"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Modern Hero Title with better typography */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              🚀 Welcome to the future of learning
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Learn.{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Share.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Excel.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of students and educators collaborating on 
              <span className="font-semibold text-indigo-600 dark:text-indigo-400"> ZESHO</span> - 
              the modern platform for academic excellence.
            </p>
          </div>
          
                    {/* Modern Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-xl">
                  <div className="flex items-center space-x-4 px-6 py-5">
                    <button 
                      type="submit"
                      className="text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                    <input
                      type="text"
                      placeholder="Search notes, books, research papers..."
                      value={searchParam}
                      onChange={(e) => setSearchParam(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                    />
                    {searchParam && (
                      <button
                        type="button"
                        onClick={() => setSearchParam('')}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Modern CTA Buttons - Remove Upload Resource */}
          <div className="flex justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/materials/all')}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
              <span className="relative">Start Exploring</span>
              <svg className="w-5 h-5 ml-2 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          
          {/* Modern Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
              <div className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Resources Shared</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">5K+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Active Students</div>
            </div>
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-slate-700/50">
              <div className="text-3xl font-black bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Universities</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modern scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
