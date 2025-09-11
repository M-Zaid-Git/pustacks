# 🔥 Cloudinary Setup Instructions for ZESHO

## ⚠️ IMPORTANT: Create Upload Preset

Before your admin dashboard can upload files, you need to create an "Upload Preset" in Cloudinary:

### Step 1: Go to Cloudinary Console
1. Visit [cloudinary.com/console](https://cloudinary.com/console)
2. Log in with your account

### Step 2: Create Upload Preset
1. **Navigate to Settings:**
   - Click on the gear icon (⚙️) in the top right
   - Or go to Settings → Upload

2. **Create Upload Preset:**
   - Scroll down to "Upload presets" section
   - Click "Add upload preset"

3. **Configure Preset:**
   - **Preset name:** `zesho_uploads`
   - **Signing Mode:** Select "Unsigned" (Important!)
   - **Folder:** `zesho-materials` (optional, for organization)
   - **Resource type:** "Auto" 
   - **Access mode:** "Public"

4. **Save the preset**

### Step 3: Verify Your Credentials
Your current credentials in the project:
```
Cloud Name: ZESHO
API Key: 569935816798767
API Secret: tOffx6CZ9YwvmTQVGY4eA8y0STM
Upload Preset: zesho_uploads (needs to be created)
```

### Step 4: Test Upload
1. Start your development server: `npm run dev`
2. Go to Admin Panel: http://localhost:5176/admin/login
3. Enter secret code: `como`
4. Try uploading a PDF file

### Step 5: For Netlify Deployment
Add these environment variables in Netlify Dashboard:
```
VITE_CLOUDINARY_CLOUD_NAME = ZESHO
VITE_CLOUDINARY_API_KEY = 569935816798767
VITE_CLOUDINARY_API_SECRET = tOffx6CZ9YwvmTQVGY4eA8y0STM
VITE_CLOUDINARY_UPLOAD_PRESET = zesho_uploads
VITE_ADMIN_SECRET = como
VITE_APP_NAME = ZESHO
```

## 🎯 How It Works
1. **Admin uploads file** → CloudinaryUpload component
2. **File goes to Cloudinary** → Stored in your cloud
3. **Cloudinary returns URL** → Permanent link to file
4. **Material saved** → With Cloudinary URL in localStorage
5. **Users can access** → Files load from Cloudinary CDN

## ✅ Benefits
- ✅ **Persistent Storage:** Files survive across deployments
- ✅ **Fast Loading:** Cloudinary CDN worldwide
- ✅ **Professional:** No file size limits on Netlify
- ✅ **Secure:** Direct upload to cloud storage
- ✅ **Free Tier:** 25GB storage, generous limits

## 🚨 Troubleshooting
If upload fails:
1. Check upload preset exists and is "Unsigned"
2. Verify cloud name is exactly "ZESHO"
3. Check browser console for errors
4. Ensure file is under 100MB

Your ZESHO platform now has professional cloud storage! 🚀
