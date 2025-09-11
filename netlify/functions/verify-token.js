// Simplified token verification for ZESHO admin system
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    // Get admin secret from environment or request
    const adminSecret = process.env.VITE_ADMIN_SECRET || 'como';
    
    // Check for token in body or headers
    let token = null;
    
    if (event.body) {
      const body = JSON.parse(event.body);
      token = body.token || body.secret;
    }
    
    if (!token && event.headers.authorization) {
      token = event.headers.authorization.replace('Bearer ', '');
    }

    if (!token) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          message: 'No authentication token provided',
          valid: false 
        }),
      };
    }

    // Simple admin verification
    if (token === adminSecret) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'Admin token is valid',
          valid: true,
          admin: true,
          user: {
            role: 'admin',
            name: 'Admin User',
            email: 'admin@zesho.edu'
          },
          timestamp: new Date().toISOString(),
        }),
      };
    } else {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ 
          message: 'Invalid admin token',
          valid: false 
        }),
      };
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Internal Server Error',
        valid: false 
      }),
    };
  }
};
