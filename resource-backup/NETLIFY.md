# Netlify Build Instructions

This file contains instructions for deploying this application to Netlify.

## Connecting to GitHub

1. Push your repository to GitHub if you haven't already.
2. Sign in to Netlify at https://app.netlify.com/
3. Click "New site from Git"
4. Select GitHub as your Git provider
5. Authorize Netlify to access your GitHub repositories if prompted
6. Select your repository from the list

## Build Settings

Configure the following settings:

- **Branch to deploy**: `main` (or your primary branch)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

## Environment Variables

In the Netlify Dashboard, go to:
Site settings > Build & Deploy > Environment variables

Add the following environment variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional)
- `VITE_ADMIN_EMAIL`

## Deploy Triggers

Netlify will automatically deploy your site when you push to your connected GitHub repository.

## Custom Domain (Optional)

1. In the Netlify Dashboard, go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow the instructions to set up your domain

## Troubleshooting

If you encounter issues with routing, make sure:

- The `_redirects` file is in your `/public` directory
- The `netlify.toml` file has the correct redirects configuration

For build errors, check:

- The Netlify build logs
- That all environment variables are correctly set
- Your Firebase project is properly configured
