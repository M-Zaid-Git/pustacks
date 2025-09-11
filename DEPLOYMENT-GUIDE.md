# ZESHO Platform - Deployment Guide 🚀

## Overview
This guide will help you deploy the ZESHO educational resources platform to Netlify with Cloudinary integration.

## Prerequisites
- ✅ GitHub repository set up
- ✅ Cloudinary account created  
- ✅ Cloudinary credentials configured
- ✅ Code ready for deployment

## Step 1: Create Cloudinary Upload Preset

Before deploying, you MUST create an upload preset in Cloudinary:

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Navigate to **Settings** → **Upload**
3. Scroll down to **Upload Presets**
4. Click **Add upload preset**
5. Configure:
   - **Preset name**: `zesho_uploads`
   - **Signing Mode**: `Unsigned` ⚠️ IMPORTANT
   - **Folder**: `zesho-materials` (optional)
   - **Access Mode**: `Public`
   - **Resource Type**: `Auto`
6. Click **Save**

## Step 2: Deploy to Netlify

### Option A: Connect GitHub Repository
1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **New site from Git**
3. Choose **GitHub** and authorize
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **Deploy site**

### Option B: Manual Deployment
1. Run `npm run build` locally
2. Go to [Netlify Dashboard](https://app.netlify.com/)
3. Drag and drop the `dist` folder

## Step 3: Configure Environment Variables

In your Netlify site dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

```
VITE_CLOUDINARY_CLOUD_NAME = ZESHO
VITE_CLOUDINARY_API_KEY = 569935816798767  
VITE_CLOUDINARY_API_SECRET = tOffx6CZ9YwvmTQVGY4eA8y0STM
VITE_CLOUDINARY_UPLOAD_PRESET = zesho_uploads
```

⚠️ **IMPORTANT**: These are your actual Cloudinary credentials. Keep them secure!

## Step 4: Redeploy After Environment Variables

After adding environment variables:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**

## Step 5: Test Your Deployment

1. Visit your Netlify site URL
2. Navigate to `/admin/login`
3. Enter secret code: `como`
4. Test file upload functionality
5. Verify files are uploaded to Cloudinary

## Troubleshooting

### Build Fails
- Check if all dependencies are installed
- Verify environment variables are set
- Check build logs for specific errors

### Upload Preset Not Found
- Ensure preset name is exactly `zesho_uploads`
- Verify signing mode is `Unsigned`
- Check Cloudinary console for preset creation

### File Uploads Fail
- Verify all environment variables are correct
- Check browser console for errors
- Ensure upload preset is created and configured

### Admin Panel Access Issues
- URL should be: `your-site.netlify.app/admin/login`
- Secret code: `como`
- Clear browser cache if needed

## Post-Deployment Checklist

- [ ] Site loads successfully
- [ ] Admin panel accessible at `/admin/login`
- [ ] File uploads work correctly
- [ ] Uploaded files appear in Cloudinary
- [ ] Materials display with proper links
- [ ] All pages render correctly

## Site Features

### For Users:
- Browse educational materials
- Filter by category and type
- Search functionality
- Download resources

### For Admins:
- Add new materials via admin panel
- Upload files to Cloudinary
- Manage resource database
- View upload statistics

## Security Notes

- Admin access protected with secret code
- Files stored securely in Cloudinary
- CSP headers configured for security
- Environment variables properly secured

## Support

If you encounter issues:
1. Check browser console for errors
2. Review Netlify build logs
3. Verify Cloudinary configuration
4. Test locally with `npm run dev`

---

🎉 **Congratulations!** Your ZESHO platform is now live and ready to help students access educational resources!

**Live Admin Panel**: `your-site.netlify.app/admin/login` (Secret: `como`)
