import React, { useState, useEffect } from 'react';
import { searchBooks, searchSpecificBooks, formatBookData, FAST_NUCES_BOOKS } from '../../services/googleBooksService';
import BookCard from './BookCard';
import LoadingSpinner from '../common/LoadingSpinner';

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState('general'); // 'general' or 'preset'
  const [presetBooks, setPresetBooks] = useState([]);
  const [loadingPreset, setLoadingPreset] = useState(false);

  const BOOKS_PER_PAGE = 12;

  // Load FAST-NUCES books on component mount
  useEffect(() => {
    loadPresetBooks();
  }, []);

  const loadPresetBooks = async () => {
    setLoadingPreset(true);
    try {
      const results = await searchSpecificBooks(FAST_NUCES_BOOKS);
      const foundBooks = results
        .filter(result => result.success && result.result)
        .map(result => formatBookData(result.result))
        .filter(book => book !== null);
      
      setPresetBooks(foundBooks);
    } catch (error) {
      console.error('Error loading preset books:', error);
    } finally {
      setLoadingPreset(false);
    }
  };

  const handleSearch = async (query = searchQuery, page = 1) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const startIndex = (page - 1) * BOOKS_PER_PAGE;
      const result = await searchBooks(query, BOOKS_PER_PAGE, startIndex);
      
      if (result.success) {
        const formattedBooks = result.books
          .map(book => formatBookData(book))
          .filter(book => book !== null);
        
        setBooks(formattedBooks);
        setTotalResults(result.totalItems);
        setCurrentPage(page);
        setSearchType('general');
      } else {
        setError(result.error || 'Failed to search books');
        setBooks([]);
        setTotalResults(0);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (newPage) => {
    if (searchType === 'general' && searchQuery.trim()) {
      handleSearch(searchQuery, newPage);
    }
  };

  const totalPages = Math.ceil(totalResults / BOOKS_PER_PAGE);

  const displayBooks = searchType === 'preset' ? presetBooks : books;
  const isLoading = searchType === 'preset' ? loadingPreset : loading;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📚 Book Search
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover books from Google Books API or browse our FAST-NUCES collection
        </p>
      </div>

      {/* Search Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for books by title, author, or ISBN..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => handleSearch()}
            disabled={loading || !searchQuery.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400
                       text-white font-medium rounded-lg transition-colors duration-200
                       disabled:cursor-not-allowed min-w-[120px]"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Search Type Toggle */}
        <div className="flex gap-4">
          <button
            onClick={() => setSearchType('general')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              searchType === 'general'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            General Search
          </button>
          <button
            onClick={() => setSearchType('preset')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              searchType === 'preset'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            FAST-NUCES Books ({presetBooks.length})
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-500 rounded-lg">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Results Info */}
      {searchType === 'general' && totalResults > 0 && (
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Found {totalResults.toLocaleString()} results for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="large" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            {searchType === 'preset' ? 'Loading FAST-NUCES books...' : 'Searching books...'}
          </span>
        </div>
      )}

      {/* Books Grid */}
      {!isLoading && displayBooks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && searchType === 'general' && books.length === 0 && searchQuery && !error && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No books found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or browse our FAST-NUCES collection
          </p>
        </div>
      )}

      {/* Pagination */}
      {searchType === 'general' && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                       hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNum = Math.max(1, currentPage - 2) + index;
              if (pageNum > totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 rounded-lg ${
                    pageNum === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                       hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
