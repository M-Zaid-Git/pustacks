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
  const [searchType, setSearchType] = useState('preset'); // Start with preset to show FAST-NUCES books
  const [presetBooks, setPresetBooks] = useState([]);
  const [loadingPreset, setLoadingPreset] = useState(true);

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
    <section className="relative min-h-screen overflow-hidden">
      {/* ZESHO-style background with floating elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-purple-600/5 to-pink-600/5"></div>
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 rotate-12 animate-pulse"></div>
      <div className="absolute top-40 right-16 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-25 animate-bounce"></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg opacity-30 rotate-45"></div>
      <div className="absolute top-1/3 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-gradient-to-br from-indigo-400/10 to-pink-500/10 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-6 relative z-10 py-16 md:py-20">
        {/* ZESHO-style Hero Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            📚 Discover Amazing Books
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Digital</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Explore millions of books from Google Books API, or browse our curated collection of 
            FAST-NUCES academic resources. Find your next great read or study material.
          </p>
        </div>

        {/* Modern Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search Input with ZESHO styling */}
          <div className="relative group mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4 p-6">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <svg className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for books by title, author, or ISBN..."
                    className="w-full pl-14 pr-6 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-0 focus:ring-0 focus:outline-none text-lg"
                  />
                </div>
                <button
                  onClick={() => handleSearch()}
                  disabled={loading || !searchQuery.trim()}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="small" color="white" />
                      <span className="ml-2">Searching...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Search Books
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ZESHO-style Toggle Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSearchType('preset')}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                searchType === 'preset'
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80'
              }`}
            >
              📖 FAST-NUCES Collection ({presetBooks.length})
            </button>
            <button
              onClick={() => setSearchType('general')}
              className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                searchType === 'general'
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80'
              }`}
            >
              🌐 Google Books Search
            </button>
          </div>
        </div>

        {/* Error Message with ZESHO styling */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-25"></div>
              <div className="relative bg-red-50 dark:bg-red-900/20 backdrop-blur-sm p-6 rounded-2xl border border-red-200 dark:border-red-500/50">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Info with ZESHO styling */}
        {searchType === 'general' && totalResults > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-full text-sm font-semibold border border-indigo-200 dark:border-indigo-800">
                ✨ Found {totalResults.toLocaleString()} results for "{searchQuery}"
              </div>
            </div>
          </div>
        )}

        {/* Collection Header for FAST-NUCES */}
        {searchType === 'preset' && !loadingPreset && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-700 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800">
              🎓 FAST-NUCES Academic Collection ({presetBooks.length} books)
            </div>
          </div>
        )}

        {/* Loading State with ZESHO styling */}
        {isLoading && (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchType === 'preset' ? 'Loading FAST-NUCES Collection...' : 'Searching Books...'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchType === 'preset' 
                  ? 'Fetching curated academic resources from Google Books'
                  : 'Exploring millions of books for you'
                }
              </p>
            </div>
          </div>
        )}

        {/* Books Grid with ZESHO styling */}
        {!isLoading && displayBooks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
            {displayBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {/* No Results with ZESHO styling */}
        {!isLoading && searchType === 'general' && books.length === 0 && searchQuery && !error && (
          <div className="text-center py-20">
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-3xl blur opacity-25"></div>
              <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-12 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-xl">
                <div className="text-6xl mb-6">📚</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  No books found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  We couldn't find any books matching "{searchQuery}". 
                  Try adjusting your search terms or browse our FAST-NUCES collection.
                </p>
                <button
                  onClick={() => setSearchType('preset')}
                  className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="mr-2">🎓</span>
                  Browse FAST-NUCES Collection
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination with ZESHO styling */}
        {searchType === 'general' && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      pageNum === currentPage
                        ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                        : 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80'
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
              className="px-4 py-2 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-slate-700/50 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookSearch;
