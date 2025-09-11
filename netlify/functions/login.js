// Simplified Netlify function for ZESHO admin authentication
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse request body
    const { secret } = JSON.parse(event.body);

    // Get admin secret from environment variables
    const adminSecret = process.env.VITE_ADMIN_SECRET || 'como';

    // Validate input
    if (!secret) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: 'Admin secret is required',
          success: false,
        }),
      };
    }

    // Check if secret matches
    if (secret === adminSecret) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Admin authentication successful',
          success: true,
          admin: true,
          timestamp: new Date().toISOString(),
        }),
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({
          message: 'Invalid admin secret',
          success: false,
        }),
      };
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: 'Internal Server Error',
        success: false,
      }),
    };
  }
};
