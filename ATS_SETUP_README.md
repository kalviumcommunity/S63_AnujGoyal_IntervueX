# ATS Resume Checker Setup Guide

## Overview
The AI-powered ATS Resume Checker helps users optimize their resumes for Applicant Tracking Systems (ATS) using Google's Gemini AI. It provides:

- Overall ATS compatibility score
- Keyword matching analysis
- Format compatibility check
- Do's and Don'ts recommendations
- Improvement suggestions
- Missing keywords identification

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MongoDB** (local or cloud)
3. **Google Gemini API Key**

## Setup Instructions

### 1. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the generated API key

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd S63_AnujGoyal_IntervueX/backend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Update the `.env` file with your Gemini API key:
```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/intervueX

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Google Gemini AI Configuration
GEMINI_API_KEY=your_actual_gemini_api_key_here

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

1. Navigate to the client directory:
```bash
cd S63_AnujGoyal_IntervueX/client
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Start the frontend server:
```bash
npm run dev
```

## Usage Instructions

### Accessing the ATS Checker

1. **Login/Signup**: Create an account or login to your existing account
2. **Navigate**: Click on "ATS Checker" in the navigation bar
3. **Upload Resume**: 
   - Drag and drop your PDF resume or click to browse
   - Only PDF files are accepted (max 5MB)
4. **Enter Job Description**: Paste the job description you're targeting
5. **Analyze**: Click "Analyze Resume" to get AI-powered insights

### Understanding the Results

#### ATS Scores
- **Overall ATS Score**: General compatibility with ATS systems (0-100%)
- **Keyword Matching**: How well your resume matches job requirements (0-100%)
- **Format Compatibility**: ATS-friendliness of your resume format (0-100%)

#### Recommendations
- **✅ Do's**: Best practices to follow for ATS optimization
- **❌ Don'ts**: Common mistakes to avoid
- **💡 Improvements**: Specific suggestions for your resume
- **Missing Keywords**: Important terms from the job description not in your resume

## API Endpoints

### POST `/api/v1/ats/analyze`
Analyzes uploaded resume against job description.

**Request:**
- `resume`: PDF file (multipart/form-data)
- `jobDescription`: Text string

**Response:**
```json
{
  "success": true,
  "message": "Resume analysis completed successfully",
  "analysis": {
    "atsScore": 85,
    "keywordMatch": 78,
    "formatScore": 92,
    "dos": ["Include specific technical skills..."],
    "donts": ["Don't use graphics or tables..."],
    "improvements": ["Add more keywords related to..."],
    "missingKeywords": ["Python", "Machine Learning"]
  }
}
```

## File Structure

```
backend/
├── controllers/
│   └── ats.controller.js     # ATS analysis logic
├── routes/
│   └── ats.route.js          # ATS API routes
├── uploads/                  # Temporary file storage
└── .env                      # Environment variables

client/
├── src/
│   └── Pages/
│       └── ATSChecker.jsx    # ATS Checker React component
```

## Features

### Resume Analysis
- **PDF Text Extraction**: Extracts text content from uploaded PDF resumes
- **AI-Powered Analysis**: Uses Google Gemini AI for intelligent resume evaluation
- **Keyword Matching**: Compares resume content with job description requirements
- **Format Assessment**: Evaluates ATS compatibility of resume structure

### User Interface
- **Drag & Drop Upload**: Intuitive file upload with visual feedback
- **Real-time Validation**: Instant feedback on file type and size
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Results**: Color-coded scores and categorized recommendations

### Security & Performance
- **File Validation**: Only accepts PDF files up to 5MB
- **Temporary Storage**: Uploaded files are automatically cleaned up
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **API Rate Limiting**: Built-in protection against API abuse

## Troubleshooting

### Common Issues

1. **"Please upload a PDF file only"**
   - Ensure your file is in PDF format
   - Check that file extension is `.pdf`

2. **"Could not extract text from PDF"**
   - PDF might be image-based or corrupted
   - Try converting to a text-based PDF

3. **"Analysis failed"**
   - Check your Gemini API key is correct
   - Ensure you have API quota remaining
   - Verify internet connection

4. **File upload fails**
   - Check file size is under 5MB
   - Ensure `uploads/` directory exists in backend

### API Key Issues

1. **Invalid API Key Error**
   - Verify the API key is correctly copied
   - Check for extra spaces or characters
   - Ensure the API key is active in Google AI Studio

2. **Quota Exceeded**
   - Check your usage in Google AI Studio
   - Wait for quota reset or upgrade your plan

## Development Notes

### Dependencies Added
- `@google/generative-ai`: Google Gemini AI SDK
- `pdf-parse`: PDF text extraction
- `multer`: File upload handling
- `sonner`: Toast notifications (frontend)

### Environment Variables
Make sure all required environment variables are set in the `.env` file:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT token signing
- `CLIENT_URL`: Frontend URL for CORS

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all setup steps are completed correctly
3. Check browser console for error messages
4. Ensure backend server is running on port 8000
5. Ensure frontend server is running on port 5173

## Security Considerations

- Keep your Gemini API key secure and never commit it to version control
- The `.env` file should be added to `.gitignore`
- Uploaded files are automatically deleted after processing
- API endpoints include file type and size validation 