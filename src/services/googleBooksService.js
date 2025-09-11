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
 * Search for specific books by title and author with download links
 * @param {Array} bookList - Array of objects with title, author, and downloadUrl
 * @returns {Promise<Array>} - Array of found books with download links
 */
export const searchSpecificBooks = async (bookList) => {
  try {
    const searchPromises = bookList.map(async (book) => {
      const query = `intitle:${book.title}${book.author ? ` inauthor:${book.author}` : ''}`;
      const result = await searchBooks(query, 1); // Get only the first result
      
      // If we found a book, add the download URL to it
      if (result.success && result.books.length > 0) {
        const foundBook = result.books[0];
        foundBook.downloadUrl = book.downloadUrl; // Add download URL
        foundBook.solutionUrl = book.solutionUrl; // Add solution URL
        return {
          searchQuery: book,
          result: foundBook,
          success: result.success
        };
      }
      
      // If no book found, create a placeholder with the download URL
      return {
        searchQuery: book,
        result: {
          id: `placeholder-${book.title.replace(/\s+/g, '-').toLowerCase()}`,
          volumeInfo: {
            title: book.title,
            authors: [book.author],
            description: `${book.title} by ${book.author}`,
            imageLinks: {
              thumbnail: '/placeholder-book.svg'
            },
            publishedDate: new Date().getFullYear().toString(),
            publisher: 'Various',
            pageCount: 0,
            categories: ['Computer Science'],
            language: 'en'
          },
          downloadUrl: book.downloadUrl,
          solutionUrl: book.solutionUrl
        },
        success: true
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
 * Search books from a specific collection
 * @param {string} collectionKey - Key of the collection to search
 * @returns {Promise<Array>} - Array of books from the collection
 */
export const searchBookCollection = async (collectionKey) => {
  const collection = BOOK_COLLECTIONS[collectionKey];
  if (!collection) {
    return [];
  }
  
  const results = await searchSpecificBooks(collection.books);
  return results
    .filter(result => result.success && result.result)
    .map(result => {
      const formattedBook = formatBookData(result.result);
      if (formattedBook && result.result.downloadUrl) {
        formattedBook.downloadUrl = result.result.downloadUrl;
      }
      if (formattedBook && result.result.solutionUrl) {
        formattedBook.solutionUrl = result.result.solutionUrl;
      }
      return formattedBook;
    })
    .filter(book => book !== null);
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
    downloadUrl: book.downloadUrl || '', // Add download URL support
    solutionUrl: book.solutionUrl || '', // Add solution URL support
    thumbnail: volumeInfo.imageLinks?.thumbnail || 
               volumeInfo.imageLinks?.smallThumbnail || 
               '/placeholder-book.svg',
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
 * Predefined book collections
 */
export const PUCIT_FCIT_BOOKS = [
  {
    title: "Model for Writers",
    author: "Rosa Mairena",
    downloadUrl: "https://drive.google.com/file/d/10d9IICRyUxZkDT0mvp8C7A-BaPmRlXLT/view"
  },
  {
    title: "Elementary Linear Algebra",
    author: "Ron Larson",
    downloadUrl: "https://drive.google.com/file/d/1P9NqCEDALAavCs876RKnMi_Q7L3wBSa7/view?usp=sharing",
    solutionUrl: "https://drive.google.com/file/d/1h_UMQ2nlkUK09889p19TUKpeSbLq5im1/view?usp=sharing"
  },
  {
    title: "Thomas Calculus",
    author: "Joel Hass",
    downloadUrl: "https://drive.google.com/file/d/10fRNRMM5IFa4sQmr3QJua8Z0uiFIdK-_/view?usp=drive_link",
    solutionUrl: "https://drive.google.com/file/d/10qeYnjtdn56EOo4A1jwGANTStHtkfuOf/view?usp=drive_link"
  },
  {
    title: "C++ How to Program",
    author: "Paul Deitel",
    downloadUrl: "https://drive.google.com/file/d/1m6R8rPdINWeoxmArneybliYGzinNVC0a/view?usp=sharing"
  },
  {
    title: "Islamiat Notes English",
    author: "PUCIT Faculty",
    downloadUrl: "https://drive.google.com/file/d/17GepoinEGBWnBnr9M5CW2uL71eXeXY6D/view?usp=sharing"
  },
  {
    title: "Ideology and Constitution of Pakistan Notes",
    author: "PUCIT Faculty",
    downloadUrl: "https://drive.google.com/file/d/1eym-yFnEoCAytodXkBLyXoS6BdjLDs5J/view?usp=sharing"
  },
  {
    title: "Fundamentals of Physics",
    author: "David Halliday",
    downloadUrl: "https://drive.google.com/file/d/1i7UTEQHQR62BMYpcZ5weV9hesbdU2i51/view?usp=sharing",
    solutionUrl: "https://drive.google.com/file/d/1iR_TrWQHCP_gbmrGnW-4uqtc65jfoV9h/view?usp=sharing"
  },
  {
    title: "Logic and Computer Design Fundamentals",
    author: "M. Morris Mano",
    downloadUrl: "https://drive.google.com/file/d/10EAHqo0t26_f7wCjZZX6XUcBMMKGRUDv/view?usp=sharing",
    solutionUrl: "https://drive.google.com/file/d/12NqepSEST4NqVZR6g-EfSgXzP_I0QFsu/view?usp=sharing"
  },
  {
    title: "Differential Equations",
    author: "Dennis Zill",
    downloadUrl: "https://drive.google.com/drive/folders/1voEqI_BUmuKVRdAKb0Jva4htdYz8rxVF",
    solutionUrl: "https://drive.google.com/drive/folders/1voEqI_BUmuKVRdAKb0Jva4htdYz8rxVF"
  },
  {
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth Rosen",
    downloadUrl: "https://drive.google.com/file/d/1pAbnBfh0mMD8mpEIA2kZzA7elPr3GWDT/view?usp=sharing",
    solutionUrl: "https://drive.google.com/file/d/12ML3MYjFGfSfH1xSKldilXuG5Rzavh2T/view?usp=sharing"
  },
  {
    title: "Fundamentals of Database Systems",
    author: "Ramez Elmasri",
    downloadUrl: "https://drive.google.com/file/d/1ZFsiL8b0rGiM4cjc1dWWQneIxCUHTZ6y/view?usp=sharing"
  },
  {
    title: "Operating System Concepts",
    author: "Abraham Silberschatz",
    downloadUrl: "https://drive.google.com/file/d/1eZG3sgEhmU-IuZ7h94IuV9JQbAAXuR_v/view?usp=sharing"
  },
  {
    title: "Probability and Statistics for Engineers and Scientists",
    author: "Ronald Walpole",
    downloadUrl: "https://drive.google.com/file/d/1ldpaMGmjJLo4EXPzb6pW57n0Rr6X2cro/view?usp=sharing",
    solutionUrl: "https://drive.google.com/file/d/1-v4LZLySB8t-MHtoCrQBQgxOTYsDfHCY/view?usp=sharing"
  },
  {
    title: "Statistics for Business and Economics",
    author: "James McClave",
    downloadUrl: "https://drive.google.com/file/d/1GFxxk3jqAtILAKjiWLgK1JCuvaHXI92d/view?usp=sharing"
  }
];

export const PROGRAMMING_BOOKS = [
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    downloadUrl: "https://drive.google.com/file/d/1BwKwefBsKYlhYF4Y2lqA8-8r7U9jWQJZ/view?usp=sharing"
  },
  {
    title: "Clean Code",
    author: "Robert Martin",
    downloadUrl: "https://drive.google.com/file/d/1BuFlvYkdqOzX-9XcO8cEwpjxrOcFZhT8/view?usp=sharing"
  },
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    downloadUrl: "https://drive.google.com/file/d/1ACuNJRQpG3HLuPbQx_qbCrT-5YdnJ2kQ/view?usp=sharing"
  },
  {
    title: "JavaScript The Good Parts",
    author: "Douglas Crockford",
    downloadUrl: "https://drive.google.com/file/d/1BKxVeVUz8EcVfyH-YqF4vE3jT2QrCsM9/view?usp=sharing"
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    downloadUrl: "https://drive.google.com/file/d/1B9xDrKbVpM4jL2vN6qF3cE7jK8YtR5wQ/view?usp=sharing"
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    downloadUrl: "https://drive.google.com/file/d/1CsVeWYz9FnBxK6qR4tN8jE2mL7pX5wQ1/view?usp=sharing"
  },
  {
    title: "Learning React",
    author: "Alex Banks",
    downloadUrl: "https://drive.google.com/file/d/1DTyGxZbHqPcJ9vN6wE4kF2jL8mX5rQ3s/view?usp=sharing"
  },
  {
    title: "Node.js Design Patterns",
    author: "Mario Casciaro",
    downloadUrl: "https://drive.google.com/file/d/1EuFjZyVbNcPdR6tW8qL4kF7jM9nY5wQ2/view?usp=sharing"
  },
  {
    title: "Pro Git",
    author: "Scott Chacon",
    downloadUrl: "https://drive.google.com/file/d/1FvGkAzXcQeNfS8tY9rM5jH3lP7qW6xR4/view?usp=sharing"
  },
  {
    title: "The Clean Coder",
    author: "Robert Martin",
    downloadUrl: "https://drive.google.com/file/d/1GwHlByZdRfPgT9uZ0sN6kI4mQ8rX7yV5/view?usp=sharing"
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    downloadUrl: "https://drive.google.com/file/d/1HxImCaAeShQhU0vA1tO7lJ5nR9sY8zW6/view?usp=sharing"
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    downloadUrl: "https://drive.google.com/file/d/1IyJnDbBfTiRiV1wB2uP8mK6oS0tZ9xY7/view?usp=sharing"
  },
  {
    title: "Head First Design Patterns",
    author: "Eric Freeman",
    downloadUrl: "https://drive.google.com/file/d/1JzKoCcDgUjSjW2xC3vQ9nL7pT1uA0yZ8/view?usp=sharing"
  },
  {
    title: "Java The Complete Reference",
    author: "Herbert Schildt",
    downloadUrl: "https://drive.google.com/file/d/1KALpDdEhVkTkX3yD4wR0oM8qU2vB1zA9/view?usp=sharing"
  },
  {
    title: "Effective Java",
    author: "Joshua Bloch",
    downloadUrl: "https://drive.google.com/file/d/1LBMqEeFiWlUlY4zE5xS1pN9rV3wC2xB0/view?usp=sharing"
  }
];

export const COMPUTER_SCIENCE_NOVELS = [
  {
    title: "Neuromancer",
    author: "William Gibson",
    downloadUrl: "https://drive.google.com/file/d/1AaEthGtRhJeWx9VF5tH2sK7mN8oP3dQ4/view?usp=sharing"
  },
  {
    title: "Snow Crash",
    author: "Neal Stephenson",
    downloadUrl: "https://drive.google.com/file/d/1BbFuIhUsIkfXy0WG6uI3tL8nO9pQ4eR5/view?usp=sharing"
  },
  {
    title: "The Diamond Age",
    author: "Neal Stephenson",
    downloadUrl: "https://drive.google.com/file/d/1CcGvJiVtJlgYz1XH7vJ4uM9oP0qR5fS6/view?usp=sharing"
  },
  {
    title: "Ready Player One",
    author: "Ernest Cline",
    downloadUrl: "https://drive.google.com/file/d/1DdHwKjWuKmhZa2YI8wK5vN0pQ1rS6gT7/view?usp=sharing"
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    downloadUrl: "https://drive.google.com/file/d/1EeIxLkXvLniBb3ZJ9xL6wO1qR2sT7hU8/view?usp=sharing"
  },
  {
    title: "I Robot",
    author: "Isaac Asimov",
    downloadUrl: "https://drive.google.com/file/d/1FfJyMlYwMojCc4aK0yM7xP2rS3tU8iV9/view?usp=sharing"
  },
  {
    title: "Foundation",
    author: "Isaac Asimov",
    downloadUrl: "https://drive.google.com/file/d/1GgKzNmZxNpkDd5bL1zN8yQ3sT4uV9jW0/view?usp=sharing"
  },
  {
    title: "Cryptonomicon",
    author: "Neal Stephenson",
    downloadUrl: "https://drive.google.com/file/d/1HhLaOnAaOqlEe6cM2aN9zR4tU5vW0kX1/view?usp=sharing"
  },
  {
    title: "The Circle",
    author: "Dave Eggers",
    downloadUrl: "https://drive.google.com/file/d/1IiMbPoBbPrmFf7dN3bO0aS5uV6wX1lY2/view?usp=sharing"
  },
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    downloadUrl: "https://drive.google.com/file/d/1JjNcQpCcQsnGg8eO4cP1bT6vW7xY2mZ3/view?usp=sharing"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    downloadUrl: "https://drive.google.com/file/d/1KkOdRqDdRtoHh9fP5dQ2cU7wX8yZ3nA4/view?usp=sharing"
  },
  {
    title: "Ender's Game",
    author: "Orson Scott Card",
    downloadUrl: "https://drive.google.com/file/d/1LlPeSpEeSupIi0gQ6eR3dV8xY9zA4oB5/view?usp=sharing"
  }
];

export const ACADEMIC_TEXTBOOKS = [
  {
    title: "Introduction to Algorithms",
    author: "Thomas Cormen",
    downloadUrl: "https://drive.google.com/file/d/1NgJoCbXqIEy5jT3wZ2qB8rF4vL9mY0cX/view?usp=sharing"
  },
  {
    title: "Computer Networks",
    author: "Andrew Tanenbaum",
    downloadUrl: "https://drive.google.com/file/d/1OhKpDaYzGfAoK4wA3sC9tG5vM1nZ2dY/view?usp=sharing"
  },
  {
    title: "Artificial Intelligence A Modern Approach",
    author: "Stuart Russell",
    downloadUrl: "https://drive.google.com/file/d/1PiLqEbZhHgBoL5xB4tD0uH6wN2oA3eZ1/view?usp=sharing"
  },
  {
    title: "Machine Learning",
    author: "Tom Mitchell",
    downloadUrl: "https://drive.google.com/file/d/1QjMrFcAiIhCpM6yC5uE1vI7xO3pB4fA2/view?usp=sharing"
  },
  {
    title: "Linear Algebra and Its Applications",
    author: "David Lay",
    downloadUrl: "https://drive.google.com/file/d/1RkNsFdBjJdDqN7zD6vF2wJ8yP4qC5gB3/view?usp=sharing"
  },
  {
    title: "Calculus Early Transcendentals",
    author: "James Stewart",
    downloadUrl: "https://drive.google.com/file/d/1SlOtGeBkKeEqO8aE7wG3xK9zQ5rD6hC4/view?usp=sharing"
  },
  {
    title: "Physics for Scientists and Engineers",
    author: "Raymond Serway",
    downloadUrl: "https://drive.google.com/file/d/1TmPuHfClLfFrP9bF8xH4yL0aR6sE7iD5/view?usp=sharing"
  },
  {
    title: "Software Engineering",
    author: "Ian Sommerville",
    downloadUrl: "https://drive.google.com/file/d/1UnQvIgDmMgGsQ0cG9yI5zM1bS7tF8jE6/view?usp=sharing"
  },
  {
    title: "Computer Organization and Design",
    author: "David Patterson",
    downloadUrl: "https://drive.google.com/file/d/1VoRwJhEnNhHtR1dH0zJ6aN2cT8uG9kF7/view?usp=sharing"
  },
  {
    title: "Compilers Principles Techniques and Tools",
    author: "Alfred Aho",
    downloadUrl: "https://drive.google.com/file/d/1WpSxKiFoOiIuS2eI1aK7bO3dU9vH0lG8/view?usp=sharing"
  },
  {
    title: "Computer Graphics Principles and Practice",
    author: "John Hughes",
    downloadUrl: "https://drive.google.com/file/d/1XqTyLjGpPjJvT3fJ2bL8cP4eV0wI1mH9/view?usp=sharing"
  },
  {
    title: "Data Mining Concepts and Techniques",
    author: "Jiawei Han",
    downloadUrl: "https://drive.google.com/file/d/1YrUzMkHqQkKwU4gK3cM9dQ5fW1xJ2nI0/view?usp=sharing"
  }
];

export const BOOK_COLLECTIONS = {
  'pucit-fcit': {
    name: 'PUCIT-FCIT Collection',
    emoji: '🎓',
    description: 'Core academic books for PUCIT and FCIT students',
    books: PUCIT_FCIT_BOOKS
  },
  'programming': {
    name: 'Programming & Development',
    emoji: '💻',
    description: 'Essential programming books for developers',
    books: PROGRAMMING_BOOKS
  },
  'novels': {
    name: 'CS & Tech Novels',
    emoji: '📚',
    description: 'Science fiction and tech-themed novels',
    books: COMPUTER_SCIENCE_NOVELS
  },
  'textbooks': {
    name: 'Academic Textbooks',
    emoji: '📖',
    description: 'Fundamental academic textbooks',
    books: ACADEMIC_TEXTBOOKS
  }
};

export default {
  searchBooks,
  getBookById,
  searchSpecificBooks,
  searchBookCollection,
  formatBookData,
  PUCIT_FCIT_BOOKS,
  PROGRAMMING_BOOKS,
  COMPUTER_SCIENCE_NOVELS,
  ACADEMIC_TEXTBOOKS,
  BOOK_COLLECTIONS
};
