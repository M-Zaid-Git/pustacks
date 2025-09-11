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
        className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
        onClick={() => setShowModal(true)}
        style={{ height: '420px' }}
      >
        <div className="h-full flex flex-col">
          {/* Clean Image Section */}
          <div className="relative h-48 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-slate-700">
            {book.thumbnail ? (
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            {/* Simple fallback */}
            <div className="w-full h-full flex items-center justify-center" style={{ display: book.thumbnail ? 'none' : 'flex' }}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">No Cover</p>
              </div>
            </div>
            
            {/* Simple rating badge */}
            {book.averageRating > 0 && (
              <div className="absolute top-3 right-3 bg-white dark:bg-slate-800 rounded-lg px-2 py-1 shadow-sm">
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500 text-sm">★</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">
                    {book.averageRating.toFixed(1)}
                  </span>
                </div>
              </div>
            )}

            {/* Simple download indicator */}
            {book.downloadUrl && (
              <div className="absolute top-3 left-3 bg-green-500 text-white rounded-lg px-2 py-1">
                <span className="text-xs font-medium">PDF</span>
              </div>
            )}
          </div>

          {/* Clean Content Section */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-2 line-clamp-2 leading-5 h-10">
              {book.title}
            </h3>

            {/* Authors */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
              {formatAuthors(book.authors)}
            </p>

            {/* Simple meta info */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
              {book.pageCount > 0 && (
                <span>{book.pageCount} pages</span>
              )}
              {book.publishedDate && (
                <span>{book.publishedDate}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed flex-1">
              {truncateText(book.description, 100)}
            </p>

            {/* Clean Action Buttons */}
            <div className="space-y-2 mt-auto">
              {book.downloadUrl && (
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>
              )}

              {book.solutionUrl && (
                <button
                  onClick={handleSolutionDownload}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Solutions
                </button>
              )}

              <div className="flex space-x-2">
                {book.previewLink && (
                  <a
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-3 rounded-lg text-center transition-colors duration-200"
                  >
                    Preview
                  </a>
                )}
                {book.infoLink && (
                  <a
                    href={book.infoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-3 rounded-lg text-center transition-colors duration-200"
                  >
                    Info
                  </a>
                )}
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
