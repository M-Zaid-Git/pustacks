# ZESHO Platform - Build Configuration
# This file contains build-specific instructions for Netlify

# Dependencies
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build application
COPY . .
RUN npm run build

# Expose port (for local testing)
EXPOSE 3000

# Start application
CMD ["npm", "run", "preview"]
