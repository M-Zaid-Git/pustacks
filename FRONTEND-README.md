# ZESHO - Frontend-Only Resource Sharing Website

This version of ZESHO has been simplified to work as a frontend-only application without requiring a backend server or database. All backend functionality has been replaced with mock implementations.

## Features

- Fully working UI with all components and pages
- Mock authentication system (stored in localStorage)
- Mock data for categories, materials, and user information
- Responsive design for all screen sizes
- Dark mode support

## Setup Instructions

1. Install dependencies:

```
npm install
```

2. Start the development server:

```
npm run dev
```

## Login Information

You can use these credentials to log in:

- Email: demo@example.com
- Password: demo

## Implementation Notes

- All Firebase functionality has been replaced with mock implementations
- User authentication is simulated using localStorage
- Materials and categories are stored as static mock data
- File uploads are simulated (no actual uploads happen)
- Redux is used for state management

## Project Structure

- `src/mockData.js` - Contains all mock data and functions
- `src/apiService.js` - Frontend service that uses mock data
- `Firebase/ClientApp.mjs` - Mock Firebase implementation
- `Firebase/Scripts.mjs` - Mock Firebase utility functions

## Build for Production

To build the project for production:

```
npm run build
```

Then serve the built files using a static file server:

```
npx serve dist
```
