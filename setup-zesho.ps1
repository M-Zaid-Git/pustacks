# ZESHO Platform Setup Script
# Run this script to set up the complete database and server infrastructure

Write-Host "🚀 Setting up ZESHO Educational Platform..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm detected: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed. Please install npm." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Install dependencies
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ .env file created! Please edit it with your configuration." -ForegroundColor Green
    Write-Host ""
    Write-Host "🔧 Important: Please update the following in your .env file:" -ForegroundColor Cyan
    Write-Host "   - MONGODB_URI (your MongoDB connection string)" -ForegroundColor White
    Write-Host "   - JWT_SECRET (a secure random string)" -ForegroundColor White
    Write-Host "   - CLOUDINARY_* (your Cloudinary credentials)" -ForegroundColor White
    Write-Host "   - EMAIL_* (your email service credentials)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "✅ .env file already exists." -ForegroundColor Green
}

# Check if MongoDB is running (optional)
Write-Host "🔍 Checking MongoDB connection..." -ForegroundColor Yellow

# Create uploads directory
if (-not (Test-Path "uploads")) {
    New-Item -ItemType Directory -Path "uploads"
    Write-Host "✅ Created uploads directory." -ForegroundColor Green
}

Write-Host ""
Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow

# Run database setup
node setup-enhanced-database.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Database setup encountered issues. Please check your MongoDB connection." -ForegroundColor Yellow
    Write-Host "   Make sure MongoDB is running and the connection string in .env is correct." -ForegroundColor White
} else {
    Write-Host "✅ Database setup completed successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 ZESHO Platform setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Edit your .env file with your actual configuration" -ForegroundColor White
Write-Host "   2. Start the development server: npm run dev:full" -ForegroundColor White
Write-Host "   3. Or start frontend only: npm run dev" -ForegroundColor White
Write-Host "   4. Or start backend only: npm run server:dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend API: http://localhost:5000/api" -ForegroundColor White
Write-Host "   Health Check: http://localhost:5000/health" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Default Admin Account:" -ForegroundColor Cyan
Write-Host "   Email: admin@zesho.edu" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host "   (Please change this password after first login!)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
