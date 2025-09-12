// Simplified Netlify function for ZESHO platform info
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

  // Handle both GET and POST requests
  if (event.httpMethod === 'GET' || event.httpMethod === 'POST') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'ZESHO Platform - Educational Resources Sharing',
        version: '1.0.0',
        features: [
          'Browse educational materials',
          'Admin content management',
          'Cloudinary file storage',
          'Modern responsive design',
        ],
        adminAccess: 'Use secret code "como" to access admin panel',
        timestamp: new Date().toISOString(),
      }),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
};
