import React from 'react';
import BookSearch from '../components/books/BookSearch';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BackToTop from '../components/backtotop';

const Books = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-all duration-300">
      <NavBar />
      
      {/* Modern seamless layout without harsh padding */}
      <main className="pt-16 md:pt-20">
        <BookSearch />
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Books;
