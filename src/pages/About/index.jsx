import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <NavBar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 dark:from-violet-600/20 dark:to-purple-600/20"></div>
        <div className="relative container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              About ZESHO
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering students worldwide with cutting-edge educational resources and collaborative learning experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                At ZESHO, we believe that education should be accessible, collaborative, and engaging for everyone. 
                Our platform bridges the gap between students and quality educational resources, creating a global 
                community of learners and educators.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                We're committed to democratizing education by providing a space where students can share knowledge, 
                access premium resources, and learn from each other across geographical boundaries.
              </p>
            </div>
            <div className="floating-card p-8 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">10K+</div>
                  <div className="text-violet-100">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">5K+</div>
                  <div className="text-violet-100">Resources Shared</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-violet-100">Universities</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">25+</div>
                  <div className="text-violet-100">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              What Makes ZESHO Special
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the features that make our platform the perfect choice for modern education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="floating-card p-8 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Vast Resource Library</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Access thousands of study materials, notes, and resources across multiple subjects and disciplines.
              </p>
            </div>

            <div className="floating-card p-8 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Collaborative Learning</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Connect with peers, share knowledge, and learn together in our vibrant student community.
              </p>
            </div>

            <div className="floating-card p-8 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quality Assured</h3>
              <p className="text-gray-700 dark:text-gray-300">
                All content is verified and reviewed to ensure high-quality educational materials for effective learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              The passionate individuals working to revolutionize education through technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="floating-card p-8 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">M</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">M Zaid</h3>
              <p className="text-violet-600 dark:text-violet-400 font-medium mb-4">Founder & Developer</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Computer Science student at Punjab University, passionate about democratizing education through innovative technology solutions.
              </p>
              <a 
                href="https://zaidx.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors duration-300"
              >
                <span className="mr-2">🌐</span>
                Visit Portfolio
              </a>
            </div>

            <div className="floating-card p-8 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">T</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Tech Team</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">Development</p>
              <p className="text-gray-700 dark:text-gray-300">
                Dedicated developers building the future of educational technology platforms.
              </p>
            </div>

            <div className="floating-card p-8 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">C</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Community</h3>
              <p className="text-green-600 dark:text-green-400 font-medium mb-4">Student Body</p>
              <p className="text-gray-700 dark:text-gray-300">
                Our amazing community of students and educators from around the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden p-12 text-center bg-gradient-to-br from-violet-600 to-purple-600 text-white rounded-3xl shadow-2xl">
            {/* Gradient Overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/90 to-purple-600/90 rounded-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Join the ZESHO Community?
              </h2>
              <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
                Start your journey today and become part of a global network of learners and educators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-secondary px-8 py-4 !bg-white !text-violet-700 hover:bg-gray-100 hover:!text-violet-800 font-semibold shadow-lg">
                  Learn More
                </button>
                <button className="btn-primary px-8 py-4 bg-violet-700 hover:bg-violet-800 border border-violet-500 !text-white font-semibold shadow-lg">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
