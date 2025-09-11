// netlify/plugins/environment-plugin/index.js
module.exports = {
  onPreBuild: ({ utils }) => {
    // Check for required environment variables
    const requiredEnvVars = ['FAUNA_SECRET_KEY', 'JWT_SECRET', 'VITE_ADMIN_EMAIL'];

    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
      utils.build.failBuild(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    } else {
      console.log('✅ All required environment variables are set');
    }
  },
};
