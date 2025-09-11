import React, { useState } from 'react';
import BookDetailModal from './BookDetailModal';

const BookCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const truncateText = (text, maxLength = 150) => {
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
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      );
    }

    return stars;
  };

  const getImageUrl = () => {
    if (imageError) {
      return '/placeholder-book.png'; // Fallback image
    }
    return book.thumbnail || book.images?.thumbnail || '/placeholder-book.png';
  };

  return (
    <>
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                   transition-all duration-300 transform hover:-translate-y-1 
                   border border-gray-200 dark:border-gray-700 cursor-pointer
                   group overflow-hidden"
        onClick={() => setShowModal(true)}
      >
        {/* Book Cover */}
        <div className="relative h-48 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
          <img
            src={getImageUrl()}
            alt={book.title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Overlay with book info on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                          transition-all duration-300 flex items-center justify-center">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-sm font-medium">Click to view details</div>
            </div>
          </div>
          
          {/* Rating badge */}
          {book.averageRating > 0 && (
            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full 
                            px-2 py-1 shadow-md">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {book.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          )}

          {/* Category badge */}
          {book.categories && book.categories.length > 0 && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white rounded-full 
                            px-2 py-1 text-xs font-medium shadow-md">
              {book.categories[0]}
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 
                         line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 
                         transition-colors duration-200">
            {book.title}
          </h3>

          {/* Subtitle */}
          {book.subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
              {book.subtitle}
            </p>
          )}

          {/* Authors */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            <span className="font-medium">By:</span> {formatAuthors(book.authors)}
          </p>

          {/* Publisher and Date */}
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {book.publisher && (
              <span>{book.publisher}</span>
            )}
            {book.publisher && book.publishedDate && <span> • </span>}
            {book.publishedDate && (
              <span>{book.publishedDate}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
            {truncateText(book.description)}
          </p>

          {/* Rating */}
          {book.averageRating > 0 && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex">
                {getRatingStars(book.averageRating)}
              </div>
              {book.ratingsCount > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({book.ratingsCount} reviews)
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
            {/* Page count */}
            {book.pageCount > 0 && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {book.pageCount} pages
              </span>
            )}
            
            {/* Language */}
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 
                           px-2 py-1 rounded uppercase">
              {book.language}
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-3 flex space-x-2">
            {book.previewLink && (
              <a
                href={book.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs 
                           py-2 px-3 rounded-md text-center transition-colors duration-200"
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
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs 
                           py-2 px-3 rounded-md text-center transition-colors duration-200"
              >
                More Info
              </a>
            )}
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
