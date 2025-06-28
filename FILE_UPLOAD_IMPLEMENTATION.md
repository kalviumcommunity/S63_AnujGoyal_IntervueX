# Resume File Upload Implementation

## Overview
This document outlines the complete implementation of resume file upload functionality for the IntervueX profile section using Multer for backend file handling and a modern React frontend interface.

## Backend Implementation

### 1. Multer Configuration (`backend/middlewares/multer.js`)
- **File Storage**: Files are stored in the `./uploads/` directory
- **File Naming**: Unique filenames with format `resume-timestamp-randomnumber.extension`
- **File Filtering**: Only PDF, DOC, and DOCX files are allowed
- **File Size Limit**: Maximum 5MB per file
- **Export**: `singleUpload` middleware for single file uploads

### 2. Updated User Controller (`backend/controllers/user.controllers.js`)
- **updateProfile**: Enhanced to handle file uploads via multer middleware
- **uploadResume**: Dedicated function for resume uploads
- **downloadResume**: Function to download uploaded resumes
- **File Management**: Automatically deletes old resume files when new ones are uploaded
- **Error Handling**: Comprehensive error handling with file cleanup

### 3. Updated Routes (`backend/routes/user.route.js`)
- `PUT /api/v1/user/profile/update` - Profile update with optional file upload
- `POST /api/v1/user/resume/upload` - Dedicated resume upload endpoint
- `GET /api/v1/user/resume/download` - Resume download endpoint
- All routes include authentication and multer middleware

### 4. Enhanced Authentication Middleware (`backend/middlewares/isAuthenticated.js`)
- Supports both cookie-based and Authorization header authentication
- Handles `Bearer` token format for API requests
- Improved error handling for JWT verification

## Frontend Implementation

### 1. Updated Profile Component (`client/src/Pages/Profile.jsx`)
- **File Upload UI**: Modern drag-and-drop style interface
- **File Validation**: Client-side validation for file type and size
- **Upload/Download States**: Loading indicators for better UX
- **Toast Notifications**: Success/error messages using Sonner
- **Responsive Design**: Works on mobile and desktop devices

### 2. Key Features
- **File Selection**: Hidden input with custom trigger button
- **Upload Progress**: Visual feedback during file upload
- **Resume Status**: Shows whether a resume is uploaded or not
- **Download Option**: Direct download of uploaded resume
- **Replace Functionality**: Easy replacement of existing resume
- **Error Handling**: User-friendly error messages

## API Endpoints

### Resume Upload
```
POST /api/v1/user/resume/upload
Headers: Authorization: Bearer <token>
Body: FormData with 'resume' file field
Response: Updated user object with resume information
```

### Resume Download
```
GET /api/v1/user/resume/download
Headers: Authorization: Bearer <token>
Response: File stream with appropriate headers
```

### Profile Update (with optional resume)
```
PUT /api/v1/user/profile/update
Headers: Authorization: Bearer <token>
Body: FormData with profile fields and optional 'resume' file
Response: Updated user object
```

## File Validation

### Backend Validation
- **File Types**: PDF (.pdf), DOC (.doc), DOCX (.docx)
- **File Size**: Maximum 5MB
- **MIME Type Checking**: Validates both extension and MIME type
- **Error Handling**: Proper error messages for validation failures

### Frontend Validation
- **File Type**: JavaScript validation before upload
- **File Size**: Client-side size checking
- **User Feedback**: Immediate error messages for invalid files

## Security Features

1. **Authentication Required**: All endpoints require valid JWT token
2. **File Type Restriction**: Only document formats allowed
3. **File Size Limits**: Prevents large file uploads
4. **File Cleanup**: Old files are automatically deleted
5. **Path Security**: Files stored outside web-accessible directory

## Setup Instructions

### Backend Setup
1. Ensure multer is installed: `npm install multer`
2. Create uploads directory: `mkdir uploads` in backend root
3. Set up environment variables in `.env`:
   ```
   PORT=8000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/intervuex
   SECRET_KEY=your_jwt_secret_key
   CLIENT_URL=http://localhost:5173
   ```

### Frontend Setup
1. Ensure required packages are installed:
   - `axios` (for API calls)
   - `sonner` (for toast notifications)
   - `react-icons` (for icons)
   - `framer-motion` (for animations)

2. Start the development server: `npm run dev`

## Usage Flow

1. **User navigates to Profile page**
2. **Resume Upload Section displays**:
   - If no resume: Shows upload interface
   - If resume exists: Shows download/replace options
3. **File Selection**: User clicks "Choose File" or "Replace Resume"
4. **Validation**: File type and size are validated
5. **Upload**: File is uploaded with progress indicator
6. **Success**: User sees success message and updated UI
7. **Download**: User can download their uploaded resume anytime

## Error Handling

### Common Error Scenarios
- **Invalid file type**: "Please upload only PDF, DOC, or DOCX files"
- **File too large**: "File size should be less than 5MB"
- **Network error**: "Failed to upload resume"
- **Authentication error**: "User not authenticated"
- **File not found**: "Resume not found to download"

## File Storage Structure

```
backend/
├── uploads/
│   ├── resume-1751100570187-266237547.pdf
│   ├── resume-1751100575897-132962713.pdf
│   └── ... (other uploaded resumes)
```

## Database Schema

The User model includes resume information in the profile object:
```javascript
profile: {
  resume: String,           // File path to uploaded resume
  resumeOrignalName: String // Original filename for download
  // ... other profile fields
}
```

## Testing

### Manual Testing Steps
1. Start backend server: `npm run dev`
2. Start frontend server: `npm run dev`
3. Login/Register as a user
4. Navigate to Profile page
5. Test file upload with different file types
6. Test file size limits
7. Test download functionality
8. Test resume replacement

### File Type Testing
- ✅ PDF files (.pdf)
- ✅ DOC files (.doc)
- ✅ DOCX files (.docx)
- ❌ Images (.jpg, .png)
- ❌ Text files (.txt)
- ❌ Other formats

## Future Enhancements

1. **Resume Preview**: PDF preview in browser
2. **Multiple File Support**: Support for cover letters, portfolios
3. **Cloud Storage**: Integration with AWS S3 or similar
4. **File Versioning**: Keep multiple versions of resumes
5. **Resume Analysis**: Integration with ATS scoring system
6. **Bulk Operations**: Upload multiple documents at once 