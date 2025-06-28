# Google OAuth Setup Guide for IntervueX

This guide will help you set up Google OAuth authentication for your IntervueX MERN stack application.

## 🚀 Quick Start

Your application already has the complete Google OAuth implementation! You just need to configure the Google credentials.

## 📋 Prerequisites

- Google Account
- Access to Google Cloud Console

## 🔧 Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account

### 1.2 Create a New Project (or select existing)
1. Click on the project dropdown at the top
2. Click "New Project"
3. Enter project name: `IntervueX`
4. Click "Create"

### 1.3 Enable Google+ API
1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

### 1.4 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. If prompted, configure OAuth consent screen first:
   - Choose "External" user type
   - Fill in required fields:
     - App name: `IntervueX`
     - User support email: Your email
     - Developer contact: Your email
   - Add authorized domains: `localhost` (for development)
   - Save and continue through all steps

4. Now create OAuth client ID:
   - Application type: "Web application"
   - Name: `IntervueX Client`
   - Authorized JavaScript origins:
     - `http://localhost:5173` (Frontend URL)
     - `http://localhost:8000` (Backend URL)
   - Authorized redirect URIs:
     - `http://localhost:8000/api/v1/user/auth/google/callback`
   - Click "Create"

### 1.5 Copy Credentials
1. Copy the `Client ID` and `Client Secret`
2. Keep these safe - you'll need them for environment variables

## 🔧 Step 2: Configure Environment Variables

### 2.1 Backend Environment Setup
1. Navigate to your backend directory: `cd S63_AnujGoyal_IntervueX/backend`
2. Create a `.env` file (if it doesn't exist):

```bash
# Database Configuration
MONGO_URI=mongodb://localhost:27017/IntervueX

# JWT Secret
SECRET_KEY=your-super-secret-jwt-key-here

# Server Configuration
PORT=8000
NODE_ENV=development

# Client URL (Frontend)
CLIENT_URL=http://localhost:5173

# Session Secret
SESSION_SECRET=your-session-secret-key-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

3. Replace the placeholder values:
   - `GOOGLE_CLIENT_ID`: Paste your Google Client ID
   - `GOOGLE_CLIENT_SECRET`: Paste your Google Client Secret
   - `SECRET_KEY`: Generate a random secret key
   - `SESSION_SECRET`: Generate another random secret key

## 🚀 Step 3: Start Your Application

### 3.1 Start Backend
```bash
cd S63_AnujGoyal_IntervueX/backend
npm run dev
```

### 3.2 Start Frontend
```bash
cd S63_AnujGoyal_IntervueX/client
npm run dev
```

## ✅ Step 4: Test Google OAuth

1. Open your browser and go to `http://localhost:5173`
2. Navigate to Login or Signup page
3. Click the "Google" button
4. You should be redirected to Google's OAuth consent screen
5. After successful authentication, you'll be redirected back to your app

## 🎯 Features Implemented

### ✅ Backend Features
- **Google OAuth Strategy**: Configured using passport-google-oauth20
- **JWT Token Generation**: Creates secure tokens for authenticated users
- **User Management**: Automatically creates new users or logs in existing ones
- **Secure Routes**: Protected routes with proper authentication
- **Error Handling**: Proper error handling for OAuth failures

### ✅ Frontend Features
- **Google Login Button**: Available on both Login and Signup pages
- **Token Management**: Automatic token storage and session management
- **Redirect Handling**: Smooth redirection after authentication
- **Error Handling**: User-friendly error messages for OAuth failures
- **Loading States**: Proper loading indicators during authentication

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored securely
- **JWT Tokens**: Short-lived tokens for session management
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Session Management**: Secure session handling with express-session

## 🛠️ Troubleshooting

### Common Issues:

1. **"Error: The origin http://localhost:5173 is not allowed by the service"**
   - Solution: Add `http://localhost:5173` to authorized JavaScript origins in Google Console

2. **"redirect_uri_mismatch"**
   - Solution: Ensure redirect URI in Google Console matches exactly: `http://localhost:8000/api/v1/user/auth/google/callback`

3. **OAuth button not working**
   - Check if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in .env
   - Verify backend server is running on port 8000

4. **Token not being received**
   - Check browser network tab for any CORS errors
   - Verify CLIENT_URL in backend .env matches your frontend URL

## 📱 Production Setup

For production deployment:

1. **Update OAuth Credentials**:
   - Add your production domain to authorized origins
   - Add production callback URL to authorized redirect URIs

2. **Update Environment Variables**:
   - Set `NODE_ENV=production`
   - Update `CLIENT_URL` to your production frontend URL
   - Use secure secrets for JWT and session

3. **Security Headers**:
   - Enable HTTPS
   - Set secure cookie options
   - Configure proper CORS origins

## 🎉 Congratulations!

Your Google OAuth authentication system is now fully implemented! Users can now:
- Sign up using their Google account
- Log in using their Google account
- Have their profile automatically created with Google information
- Enjoy seamless authentication experience

## 📞 Support

If you encounter any issues, check:
1. Google Cloud Console credentials
2. Environment variables are correctly set
3. Both backend and frontend servers are running
4. Browser console for any JavaScript errors 