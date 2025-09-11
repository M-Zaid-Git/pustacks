/**
 * Google Books API Service
 * Handles all interactions with Google Books API
 */

import axios from 'axios';

const GOOGLE_BOOKS_API_BASE = 'https://www.googleapis.com/books/v1';

/**
 * Search for books using Google Books API
 * @param {string} query - Search query (title, author, ISBN, etc.)
 * @param {number} maxResults - Maximum number of results (default: 20)
 * @param {number} startIndex - Starting index for pagination (default: 0)
 * @returns {Promise<Object>} - API response with books data
 */
export const searchBooks = async (query, maxResults = 20, startIndex = 0) => {
  try {
    if (!query || query.trim() === '') {
      throw new Error('Search query is required');
    }

    const response = await axios.get(`${GOOGLE_BOOKS_API_BASE}/volumes`, {
      params: {
        q: query,
        maxResults: Math.min(maxResults, 40), // Google Books API limit
        startIndex,
        projection: 'full',
        printType: 'books',
        orderBy: 'relevance'
      },
      timeout: 10000 // 10 second timeout
    });

    return {
      success: true,
      data: response.data,
      totalItems: response.data.totalItems || 0,
      books: response.data.items || []
    };
  } catch (error) {
    console.error('Error searching books:', error);
    return {
      success: false,
      error: error.message || 'Failed to search books',
      data: null,
      totalItems: 0,
      books: []
    };
  }
};

/**
 * Get book details by ID
 * @param {string} bookId - Google Books volume ID
 * @returns {Promise<Object>} - Book details
 */
export const getBookById = async (bookId) => {
  try {
    if (!bookId) {
      throw new Error('Book ID is required');
    }

    const response = await axios.get(`${GOOGLE_BOOKS_API_BASE}/volumes/${bookId}`, {
      timeout: 10000
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch book details',
      data: null
    };
  }
};

/**
 * Search for specific books by title and author
 * @param {Array} bookList - Array of objects with title and author
 * @returns {Promise<Array>} - Array of found books
 */
export const searchSpecificBooks = async (bookList) => {
  try {
    const searchPromises = bookList.map(async (book) => {
      const query = `intitle:${book.title}${book.author ? ` inauthor:${book.author}` : ''}`;
      const result = await searchBooks(query, 1); // Get only the first result
      return {
        searchQuery: book,
        result: result.success && result.books.length > 0 ? result.books[0] : null,
        success: result.success
      };
    });

    const results = await Promise.all(searchPromises);
    return results;
  } catch (error) {
    console.error('Error searching specific books:', error);
    return [];
  }
};

/**
 * Format book data for consistent display
 * @param {Object} book - Raw book data from Google Books API
 * @returns {Object} - Formatted book data
 */
export const formatBookData = (book) => {
  if (!book || !book.volumeInfo) {
    return null;
  }

  const { volumeInfo } = book;
  
  return {
    id: book.id,
    title: volumeInfo.title || 'Unknown Title',
    authors: volumeInfo.authors || ['Unknown Author'],
    publisher: volumeInfo.publisher || 'Unknown Publisher',
    publishedDate: volumeInfo.publishedDate || 'Unknown Date',
    description: volumeInfo.description || 'No description available',
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || [],
    averageRating: volumeInfo.averageRating || 0,
    ratingsCount: volumeInfo.ratingsCount || 0,
    language: volumeInfo.language || 'en',
    previewLink: volumeInfo.previewLink || '',
    infoLink: volumeInfo.infoLink || '',
    canonicalVolumeLink: volumeInfo.canonicalVolumeLink || '',
    thumbnail: volumeInfo.imageLinks?.thumbnail || 
               volumeInfo.imageLinks?.smallThumbnail || 
               '/placeholder-book.png',
    images: {
      thumbnail: volumeInfo.imageLinks?.thumbnail || '',
      small: volumeInfo.imageLinks?.small || '',
      medium: volumeInfo.imageLinks?.medium || '',
      large: volumeInfo.imageLinks?.large || '',
      extraLarge: volumeInfo.imageLinks?.extraLarge || ''
    },
    isbn: {
      isbn10: volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier || '',
      isbn13: volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || ''
    },
    subtitle: volumeInfo.subtitle || '',
    printType: book.volumeInfo?.printType || 'BOOK',
    maturityRating: book.volumeInfo?.maturityRating || 'NOT_MATURE'
  };
};

/**
 * Predefined book list from FAST-NUCES Books collection
 */
export const FAST_NUCES_BOOKS = [
  {
    title: "Models for Writers",
    author: "Alfred Rosa"
  },
  {
    title: "Elementary Linear Algebra",
    author: "Howard Anton"
  },
  {
    title: "Thomas Calculus",
    author: "Thomas Finney"
  },
  {
    title: "C++ How to Program",
    author: "Deitel"
  },
  {
    title: "Fundamentals of Physics",
    author: "Halliday Resnick Walker"
  },
  {
    title: "Logic and Computer Design Fundamentals",
    author: "Mano"
  },
  {
    title: "Differential Equations with Modeling Applications",
    author: "Dennis Zill"
  },
  {
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth Rosen"
  },
  {
    title: "Fundamentals of Database Systems",
    author: "Elmasri Navathe"
  },
  {
    title: "Operating System Concepts",
    author: "Silberschatz"
  },
  {
    title: "Probability and Statistics for Engineers and Scientists",
    author: "Walpole Myers"
  },
  {
    title: "Statistics for Business and Economics",
    author: "Anderson Sweeney Williams"
  }
];

export default {
  searchBooks,
  getBookById,
  searchSpecificBooks,
  formatBookData,
  FAST_NUCES_BOOKS
};
