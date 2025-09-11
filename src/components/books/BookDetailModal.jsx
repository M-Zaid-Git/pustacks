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
      stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400 text-lg">☆</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300 text-lg">☆</span>);
    }

    return stars;
  };

  const getImageUrl = () => {
    if (imageError) return '/placeholder-book.png';
    return book.images?.large || book.images?.medium || book.thumbnail || '/placeholder-book.png';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white pr-8">
            Book Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 
                       transition-colors duration-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <img
                  src={getImageUrl()}
                  alt={book.title}
                  onError={handleImageError}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
                />
                
                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {book.previewLink && (
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white 
                                 py-3 px-4 rounded-lg text-center font-medium
                                 transition-colors duration-200"
                    >
                      📖 Preview Book
                    </a>
                  )}
                  {book.infoLink && (
                    <a
                      href={book.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gray-600 hover:bg-gray-700 text-white 
                                 py-3 px-4 rounded-lg text-center font-medium
                                 transition-colors duration-200"
                    >
                      ℹ️ More Info
                    </a>
                  )}
                  {book.canonicalVolumeLink && (
                    <a
                      href={book.canonicalVolumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-600 hover:bg-green-700 text-white 
                                 py-3 px-4 rounded-lg text-center font-medium
                                 transition-colors duration-200"
                    >
                      🔗 Google Books
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Subtitle */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <h2 className="text-xl text-gray-600 dark:text-gray-400">
                    {book.subtitle}
                  </h2>
                )}
              </div>

              {/* Authors */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  Authors
                </h3>
                <p className="text-lg text-gray-900 dark:text-white">
                  {formatAuthors(book.authors)}
                </p>
              </div>

              {/* Rating */}
              {book.averageRating > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Rating
                  </h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {getRatingStars(book.averageRating)}
                    </div>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {book.averageRating.toFixed(1)}/5
                    </span>
                    {book.ratingsCount > 0 && (
                      <span className="text-gray-500 dark:text-gray-400">
                        ({book.ratingsCount.toLocaleString()} reviews)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Publication Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Publisher
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {book.publisher || 'Unknown'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Published Date
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {book.publishedDate || 'Unknown'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Pages
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {book.pageCount > 0 ? book.pageCount.toLocaleString() : 'Unknown'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Language
                  </h3>
                  <p className="text-gray-900 dark:text-white uppercase">
                    {book.language || 'Unknown'}
                  </p>
                </div>
              </div>

              {/* Categories */}
              {book.categories && book.categories.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200
                                   rounded-full text-sm font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ISBN */}
              {(book.isbn?.isbn10 || book.isbn?.isbn13) && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    ISBN
                  </h3>
                  <div className="space-y-1">
                    {book.isbn.isbn10 && (
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-medium">ISBN-10:</span> {book.isbn.isbn10}
                      </p>
                    )}
                    {book.isbn.isbn13 && (
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-medium">ISBN-13:</span> {book.isbn.isbn13}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              {book.description && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Description
                  </h3>
                  <div 
                    className="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-sm max-w-none
                               dark:prose-invert"
                    dangerouslySetInnerHTML={{ 
                      __html: book.description.replace(/\n/g, '<br>') 
                    }}
                  />
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Additional Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Print Type:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">{book.printType}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Maturity:</span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
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
  );
};

export default BookDetailModal;
