import React, { useState } from 'react';
import BookDetailModal from './BookDetailModal';

const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
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
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">☆</span>
      );
    }

    return stars;
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
        className="group relative cursor-pointer h-[500px] flex flex-col"
        onClick={() => setShowModal(true)}
      >
        {/* ZESHO-style card with gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
        
        <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
          
          {/* Book Cover Section - Fixed height */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex-shrink-0">
            <img
              src={getImageUrl()}
              alt={book.title}
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Click to view details
                </div>
              </div>
            </div>
            
            {/* Download Button Overlay */}
            {book.downloadUrl && (
              <button
                onClick={handleDownload}
                className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow-lg transform scale-0 group-hover:scale-100 transition-all duration-200 z-20"
                title="Download PDF"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
            )}
            
            {/* Rating badge */}
            {book.averageRating > 0 && (
              <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-white/20 dark:border-slate-700/50">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">
                    {book.averageRating.toFixed(1)}
                  </span>
                </div>
              </div>
            )}

            {/* Download Available Badge */}
            {book.downloadUrl && (
              <div className="absolute bottom-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                📥 PDF
              </div>
            )}

            {/* Category badge */}
            {book.categories && book.categories.length > 0 && (
              <div className="absolute bottom-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg">
                {book.categories[0]}
              </div>
            )}
          </div>

          {/* Book Details Section - Flexible content area */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title - Fixed height */}
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200 h-12 leading-6">
              {book.title}
            </h3>

            {/* Authors - Fixed height */}
            <div className="mb-2 h-5">
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">By:</span> {formatAuthors(book.authors)}
              </p>
            </div>

            {/* Publisher and Date - Fixed height */}
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-2 h-6">
              {book.publisher && (
                <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md font-medium line-clamp-1">
                  {book.publisher.length > 15 ? book.publisher.substring(0, 15) + '...' : book.publisher}
                </span>
              )}
              {book.publishedDate && (
                <span className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md font-medium">
                  {book.publishedDate}
                </span>
              )}
            </div>

            {/* Description - Fixed height with overflow */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3 leading-relaxed h-16">
              {truncateText(book.description, 100)}
            </p>

            {/* Rating - Fixed height */}
            {book.averageRating > 0 && (
              <div className="flex items-center space-x-2 mb-3 h-5">
                <div className="flex">
                  {getRatingStars(book.averageRating)}
                </div>
                {book.ratingsCount > 0 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    ({book.ratingsCount} reviews)
                  </span>
                )}
              </div>
            )}

            {/* Spacer to push footer to bottom */}
            <div className="flex-1"></div>

            {/* Footer - Fixed at bottom */}
            <div className="space-y-3 mt-auto">
              {/* Info row */}
              <div className="flex justify-between items-center text-xs">
                {book.pageCount > 0 && (
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium">{book.pageCount}p</span>
                  </div>
                )}
                
                <span className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md uppercase font-semibold">
                  {book.language}
                </span>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                {/* Download button - Priority if available */}
                {book.downloadUrl && (
                  <button
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <svg className="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Book
                  </button>
                )}

                {/* Solution button if available */}
                {book.solutionUrl && (
                  <button
                    onClick={handleSolutionDownload}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    <svg className="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Solutions
                  </button>
                )}

                {/* Other action buttons row */}
                <div className="flex space-x-2">
                  {book.previewLink && (
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold py-2 px-2 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                      className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white text-xs font-semibold py-2 px-2 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      ℹ️ Info
                    </a>
                  )}
                  {/* If no preview/info links and no download, show view details button */}
                  {!book.previewLink && !book.infoLink && !book.downloadUrl && (
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-semibold py-2 px-2 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

      {/* Book Detail Modal */}
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
