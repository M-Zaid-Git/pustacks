import React, { useState } from 'react';

const BookDetailModal = ({ book, isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !book) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    return authors.join(', ');
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400 text-xl">☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600 text-xl">☆</span>);
    }

    return stars;
  };

  const getImageUrl = () => {
    if (imageError) return '/placeholder-book.svg';
    return book.images?.large || book.images?.medium || book.thumbnail || '/placeholder-book.svg';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* ZESHO-style Modal with gradient border */}
      <div className="relative group max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30"></div>
        
        <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl">
          {/* Header with ZESHO styling */}
          <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 dark:from-indigo-400/10 dark:via-purple-400/10 dark:to-pink-400/10">
            <div className="flex justify-between items-start p-8 border-b border-gray-200/50 dark:border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Book Details
                </h2>
              </div>
              <button
                onClick={onClose}
                className="group relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Book Cover */}
              <div className="lg:col-span-1">
                <div className="sticky top-6">
                  {/* Cover with ZESHO styling */}
                  <div className="relative group mb-8">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                    <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl overflow-hidden">
                      <img
                        src={getImageUrl()}
                        alt={book.title}
                        onError={handleImageError}
                        className="w-full max-w-sm mx-auto rounded-2xl"
                      />
                    </div>
                  </div>
                  
                  {/* Action Buttons with ZESHO styling */}
                  <div className="space-y-4">
                    {book.downloadUrl && (
                      <a
                        href={book.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Book
                      </a>
                    )}
                    {book.solutionUrl && (
                      <a
                        href={book.solutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Solutions
                      </a>
                    )}
                    {book.previewLink && (
                      <a
                        href={book.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Preview Book
                      </a>
                    )}
                    {book.infoLink && (
                      <a
                        href={book.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        More Information
                      </a>
                    )}
                    {book.canonicalVolumeLink && (
                      <a
                        href={book.canonicalVolumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Google Books
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Book Information */}
              <div className="lg:col-span-2 space-y-8">
                {/* Title and Subtitle */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                    {book.title}
                  </h1>
                  {book.subtitle && (
                    <h2 className="text-xl text-gray-600 dark:text-gray-400 font-medium">
                      {book.subtitle}
                    </h2>
                  )}
                </div>

                {/* Authors */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl blur opacity-50"></div>
                  <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700/50">
                    <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-3">
                      Authors
                    </h3>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {formatAuthors(book.authors)}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                {book.averageRating > 0 && (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700/50">
                      <h3 className="text-sm font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide mb-3">
                        Rating
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex">
                          {getRatingStars(book.averageRating)}
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {book.averageRating.toFixed(1)}/5
                        </span>
                        {book.ratingsCount > 0 && (
                          <span className="text-gray-500 dark:text-gray-400 font-medium">
                            ({book.ratingsCount.toLocaleString()} reviews)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Publication Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700/50">
                      <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-3">
                        Publisher
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {book.publisher || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700/50">
                      <h3 className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-3">
                        Published
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {book.publishedDate || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700/50">
                      <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide mb-3">
                        Pages
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {book.pageCount > 0 ? book.pageCount.toLocaleString() : 'Unknown'}
                      </p>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700/50">
                      <h3 className="text-sm font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-3">
                        Language
                      </h3>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white uppercase">
                        {book.language || 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                {book.categories && book.categories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {book.categories.map((category, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold border border-indigo-200 dark:border-indigo-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ISBN */}
                {(book.isbn?.isbn10 || book.isbn?.isbn13) && (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700/50">
                      <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4">
                        ISBN
                      </h3>
                      <div className="space-y-2">
                        {book.isbn.isbn10 && (
                          <p className="text-gray-900 dark:text-white font-mono">
                            <span className="font-semibold">ISBN-10:</span> {book.isbn.isbn10}
                          </p>
                        )}
                        {book.isbn.isbn13 && (
                          <p className="text-gray-900 dark:text-white font-mono">
                            <span className="font-semibold">ISBN-13:</span> {book.isbn.isbn13}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {book.description && (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/20 dark:to-gray-900/20 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-8 rounded-xl border border-white/20 dark:border-slate-700/50">
                      <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-4">
                        Description
                      </h3>
                      <div 
                        className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-lg max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ 
                          __html: book.description.replace(/\n/g, '<br>') 
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl blur opacity-50"></div>
                  <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-white/20 dark:border-slate-700/50">
                    <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-4">
                      Additional Information
                    </h3>
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Print Type:</span>
                        <span className="text-gray-600 dark:text-gray-400">{book.printType}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Maturity:</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {book.maturityRating === 'NOT_MATURE' ? 'All Ages' : book.maturityRating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
