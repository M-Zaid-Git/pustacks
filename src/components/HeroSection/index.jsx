import React from 'react';

const HeroSection = () => {
  const [searchParam, setSearchParam] = React.useState('');
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/5 to-pink-400/10 dark:from-indigo-600/20 dark:via-purple-600/10 dark:to-pink-600/20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center animate-fade-in-up">
          {/* Hero Title */}
          <h1 className="text-hero mb-6">
            Welcome to{' '}
            <span className="gradient-text">ZESHO</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-subheading mb-8 max-w-2xl mx-auto">
            A modern educational resource sharing platform where students and educators 
            collaborate to share, discover, and organize academic materials.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative glass-effect rounded-full p-2">
              <div className="flex items-center space-x-4 px-6 py-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search for notes, books, research papers..."
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder-gray-400"
                />
                {searchParam && (
                  <button
                    onClick={() => setSearchParam('')}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-primary px-8 py-4 text-lg">
              Start Exploring
            </button>
            <button className="btn-secondary px-8 py-4 text-lg">
              Upload Resource
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">10,000+</div>
              <div className="text-gray-600">Resources Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">5,000+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">50+</div>
              <div className="text-gray-600">Universities</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
