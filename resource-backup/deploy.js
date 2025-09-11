// deploy.js - Helper script for Netlify deployment

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Check if Netlify CLI is installed
try {
  execSync('netlify --version', { stdio: 'ignore' });
} catch (error) {
  console.log('Netlify CLI is not installed. Installing...');
  execSync('npm install netlify-cli -g', { stdio: 'inherit' });
}

// Ask if user wants to deploy to production
rl.question('Deploy to production? (y/n): ', (answer) => {
  const isProduction = answer.toLowerCase() === 'y';

  // Check if .env file exists
  if (!fs.existsSync(path.join(__dirname, '.env'))) {
    console.error('ERROR: .env file is missing. Please create one based on .env.example');
    rl.close();
    return;
  }

  try {
    // Build the project
    console.log('Building the project...');
    execSync('npm run build', { stdio: 'inherit' });

    // Deploy to Netlify
    console.log(`Deploying to Netlify (${isProduction ? 'production' : 'draft'})...`);

    if (isProduction) {
      execSync('netlify deploy --prod', { stdio: 'inherit' });
    } else {
      execSync('netlify deploy', { stdio: 'inherit' });
    }

    console.log('Deployment complete!');
  } catch (error) {
    console.error('An error occurred during deployment:', error.message);
  }

  rl.close();
});
