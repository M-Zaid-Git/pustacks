// Verify a user's JWT token
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';

// Initialize MongoDB client
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'unishare';
let cachedDb = null;

// Helper function to connect to MongoDB
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Validate MongoDB URI
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  // Connect to MongoDB
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  cachedDb = db;

  return db;
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Get the token from the request body
    const { token } = JSON.parse(event.body);

    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Authentication token required' }),
      };
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return the decoded user data
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Token is valid',
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        },
      }),
    };
  } catch (error) {
    console.error('Token verification error:', error);

    // Return appropriate error based on JWT error
    if (error.name === 'TokenExpiredError') {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Token expired' }),
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Invalid token' }),
    };
  }
};
