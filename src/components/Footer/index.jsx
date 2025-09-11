import React from 'react';
import { Link } from 'react-router-dom';

const socials = [
  {
    name: 'Portfolio',
    svgPath:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z M12 7c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5m0-2C8.13 5 5 8.13 5 12s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z',
    viewBox: '0 0 24 24',
    link: 'https://zaidx.me',
  },
  {
    name: 'Github',
    svgPath:
      'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z',
    viewBox: '0 0 16 16',
    link: 'https://github.com/M-Zaid-Git/',
  },
  {
    name: 'LinkedIn',
    svgPath:
      'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
    viewBox: '0 0 448 512',
    link: 'https://www.linkedin.com/in/zaidx/',
  },
  {
    name: 'Instagram',
    svgPath:
      'M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z',
    viewBox: '0 0 448 512',
    link: 'https://www.instagram.com/zaidx.me',
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 backdrop-blur-xl">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-sm"></div>
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-15 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-3/4 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-5 blur-3xl animate-pulse delay-2000"></div>
      
      <div className="relative z-10 container mx-auto px-8 py-24">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 mt-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <div>
                <span className="text-4xl font-bold gradient-text block">ZESHO</span>
                <span className="text-sm text-gray-400 mt-1 block">Educational Excellence Platform</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 max-w-lg text-lg">
              Empowering students worldwide with cutting-edge educational resources. 
              ZESHO is your gateway to collaborative learning, knowledge sharing, and academic success. 
              Built by M Zaid, a Computer Science student at Punjab University, passionate about democratizing education through technology.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl flex items-center justify-center text-white hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/10"
                  title={`Follow us on ${social.name}`}
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox={social.viewBox}
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d={social.svgPath} clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/materials/all" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Browse Resources
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Categories
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Books
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Admin
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support & Legal */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6 relative">
              Support & Legal
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Contact Support
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 block py-2 px-3 rounded-lg hover:bg-white/10 backdrop-blur-sm group">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    Terms of Service
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div className="text-center md:text-left md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-300">Get the latest educational resources and platform updates delivered to your inbox.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:flex-shrink-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-2">
                © 2024 ZESHO Platform. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Built with ❤️ for the future of education
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400 hover:text-white transition-colors duration-300 cursor-default">
                🚀 Empowering Students Worldwide
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
