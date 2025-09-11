// Netlify serverless function for user login
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize MongoDB client
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'unishare';
let cachedDb = null;

// JWT secret for token generation
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';

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
    // Parse request body
    const { email, password } = JSON.parse(event.body);

    // Validate input
    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Email and password are required',
        }),
      };
    }

    // Connect to MongoDB
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Email not registered. Please check your email or sign up.',
        }),
      };
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Incorrect password. Please try again.',
        }),
      };
    }

    // Generate JWT token
    const userData = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || 'student',
    };

    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '30d' });

    // Return success response with token
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login successful',
        token,
        user: userData,
      }),
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    };
  }
};
