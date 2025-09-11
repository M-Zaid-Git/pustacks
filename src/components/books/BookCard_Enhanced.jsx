import React, { useState } from 'react';
import BookDetailModal from './BookDetailModal';

const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const formatAuthors = (authors) => {
    if (!authors || authors.length === 0) return 'Unknown Author';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' & ');
    return `${authors[0]} & ${authors.length - 1} others`;
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">☆</span>);
    }
    
    return stars;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageUrl = () => {
    if (imageError) {
      return '/placeholder-book.svg';
    }
    return book.thumbnail || book.images?.thumbnail || '/placeholder-book.svg';
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    if (book.downloadUrl) {
      window.open(book.downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSolutionDownload = (e) => {
    e.stopPropagation();
    if (book.solutionUrl) {
      window.open(book.solutionUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div 
        className="book-card group cursor-pointer relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-slate-800 dark:via-slate-750 dark:to-slate-700 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90 hover:bg-opacity-100 dark:hover:bg-opacity-100 hover:border-indigo-200 dark:hover:border-indigo-700 hover:scale-[1.02]"
        onClick={() => setShowModal(true)}
        style={{ height: '530px' }}
      >
        <div className="h-full flex flex-col relative">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-400/10 dark:via-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          
          {/* Enhanced floating particles animation */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping"></div>
            <div className="absolute top-20 right-16 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse delay-100"></div>
            <div className="absolute bottom-16 left-12 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-bounce delay-200"></div>
          </div>
          
          {/* Image Section - Enhanced with better proportions */}
          <div className="relative h-56 overflow-hidden rounded-t-3xl bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 dark:from-slate-700 dark:via-slate-650 dark:to-slate-600 flex items-center justify-center shadow-inner">
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            {/* Enhanced fallback when no image */}
            <div className="w-full h-full flex items-center justify-center" style={{ display: book.thumbnail ? 'none' : 'flex' }}>
              <div className="text-center p-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">No Cover Available</p>
              </div>
            </div>
            
            {/* Enhanced Quick Download Button Overlay */}
            {book.downloadUrl && (
              <button
                onClick={handleDownload}
                className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-3 rounded-2xl shadow-2xl transform scale-0 group-hover:scale-100 transition-all duration-300 z-20 hover:rotate-12 hover:shadow-green-500/50"
                title="Quick Download PDF"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            )}
            
            {/* Enhanced Rating badge with glow effect */}
            {book.averageRating > 0 && (
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-2xl border border-white/30 dark:border-slate-700/50 transform group-hover:scale-110 transition-all duration-300 hover:shadow-yellow-500/30">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500 text-lg animate-pulse">⭐</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {book.averageRating.toFixed(1)}
                  </span>
                </div>
              </div>
            )}

            {/* Enhanced Download Available Badge with pulse */}
            {book.downloadUrl && (
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white px-4 py-2.5 rounded-2xl text-sm font-bold shadow-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 hover:shadow-green-500/50">
                <span className="animate-bounce inline-block mr-1">📥</span>
                <span className="font-extrabold">PDF</span>
              </div>
            )}

            {/* Enhanced Category badge with better styling */}
            {book.categories && book.categories.length > 0 && (
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl px-4 py-2.5 text-sm font-bold shadow-2xl transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 hover:shadow-indigo-500/50">
                <span className="font-extrabold">
                  {book.categories[0].length > 10 ? book.categories[0].substring(0, 10) + '...' : book.categories[0]}
                </span>
              </div>
            )}

            {/* New: Solution Available Badge with special animation */}
            {book.solutionUrl && (
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-2 rounded-2xl text-sm font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 hover:shadow-blue-500/50">
                <span className="animate-pulse mr-1">🔧</span>
                <span className="font-extrabold">Solutions</span>
              </div>
            )}

            {/* Enhanced hover overlay with beautiful gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-t-3xl">
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  ✨ Click for details
                </div>
              </div>
            </div>
          </div>

          {/* Book Details Section - Enhanced typography and spacing */}
          <div className="p-5 flex-1 flex flex-col relative z-10">
            {/* Title - Enhanced with better font and hover effects */}
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 h-14 leading-7">
              {book.title}
            </h3>

            {/* Authors - Enhanced styling */}
            <div className="mb-3 h-6">
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-1">By:</span> 
                <span className="font-medium">{formatAuthors(book.authors)}</span>
              </p>
            </div>

            {/* Publisher and Date - Enhanced with better badges */}
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4 space-x-2 h-6">
              {book.publisher && (
                <span className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 px-3 py-1.5 rounded-full font-semibold border border-gray-200 dark:border-slate-600 line-clamp-1">
                  {book.publisher.length > 12 ? book.publisher.substring(0, 12) + '...' : book.publisher}
                </span>
              )}
              {book.publishedDate && (
                <span className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-full font-semibold border border-indigo-200 dark:border-indigo-700">
                  {book.publishedDate}
                </span>
              )}
            </div>

            {/* Description - Enhanced readability */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed h-16 font-medium">
              {truncateText(book.description, 120)}
            </p>

            {/* Rating - Enhanced with stars */}
            {book.averageRating > 0 && (
              <div className="flex items-center space-x-2 mb-4 h-6">
                <div className="flex items-center space-x-1">
                  {getRatingStars(book.averageRating)}
                </div>
                {book.ratingsCount > 0 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-full">
                    ({book.ratingsCount} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Spacer to push footer to bottom */}
            <div className="flex-1"></div>

            {/* Footer - Enhanced with better layout */}
            <div className="space-y-4 mt-auto">
              {/* Info row with enhanced styling */}
              <div className="flex justify-between items-center text-xs">
                {book.pageCount > 0 && (
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-3 py-2 rounded-full">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-bold">{book.pageCount}p</span>
                  </div>
                )}
                
                <span className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-2 rounded-full uppercase font-bold border border-indigo-200 dark:border-indigo-700">
                  {book.language || 'EN'}
                </span>
              </div>

              {/* Enhanced Action buttons with better gradients and animations */}
              <div className="space-y-3">
                {/* Priority Download button with enhanced styling */}
                {book.downloadUrl && (
                  <button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 text-white text-sm font-bold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-green-500/50 flex items-center justify-center group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <svg className="w-5 h-5 mr-2 group-hover:animate-bounce relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="relative z-10">Download Book</span>
                  </button>
                )}

                {/* Enhanced Solution button */}
                {book.solutionUrl && (
                  <button
                    onClick={handleSolutionDownload}
                    className="w-full bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:via-indigo-700 hover:to-purple-700 text-white text-sm font-bold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <svg className="w-5 h-5 mr-2 group-hover:animate-bounce relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="relative z-10">Solutions Manual</span>
                  </button>
                )}

                {/* Enhanced secondary action buttons */}
                <div className="flex space-x-2">
                  {book.previewLink && (
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold py-2.5 px-3 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-indigo-500/50"
                    >
                      📖 Preview
                    </a>
                  )}
                  {book.infoLink && (
                    <a
                      href={book.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white text-sm font-bold py-2.5 px-3 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-gray-500/50"
                    >
                      ℹ️ Info
                    </a>
                  )}
                  {/* Enhanced fallback button */}
                  {!book.previewLink && !book.infoLink && !book.downloadUrl && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-bold py-2.5 px-3 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-indigo-500/50"
                    >
                      👁️ View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Book Detail Modal */}
      {showModal && (
        <BookDetailModal 
          book={book} 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};

export default BookCard;
