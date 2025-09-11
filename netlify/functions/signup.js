// Netlify serverless function for user signup
const { MongoClient } = require('mongodb');
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

  let client = null;

  try {
    // Parse request body
    const { name, email, password } = JSON.parse(event.body);

    // Validate input
    if (!name || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing required fields',
        }),
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid email format',
        }),
      };
    }

    // Password validation - minimum 6 characters
    if (password.length < 6) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Password must be at least 6 characters long',
        }),
      };
    }

    // Connect to MongoDB
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return {
        statusCode: 409,
        body: JSON.stringify({
          message: 'User with this email already exists',
        }),
      };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in MongoDB
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: 'student',
      createdAt: new Date().toISOString(),
    };

    const result = await usersCollection.insertOne(newUser);

    // Generate JWT token
    const user = {
      id: result.insertedId.toString(),
      name,
      email,
      role: 'student',
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '30d' });

    // Return success response
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'User created successfully',
        token,
        user: {
          id: result.insertedId.toString(),
          name,
          email,
          role: 'student',
        },
      }),
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
    };
  }
};
