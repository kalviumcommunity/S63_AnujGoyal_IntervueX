# 💼 Making Interview Easy

**Making Interview Easy** is a MERN stack-based platform that transforms the traditional hiring process by offering a seamless experience for both **recruiters** and **candidates**. The platform is built to simplify job applications, enhance recruiter workflows, and bridge communication gaps in the hiring journey.

---

## 📖 Project Description

### 🎥 A Story of Struggles

- **Recruiters** often face challenges handling hundreds of applications, scheduling interviews, and giving timely feedback.
- **Candidates** apply to jobs, hoping for a response, but often face silence, unclear processes, or missed opportunities.

**Making Interview Easy** solves these problems by providing an intuitive, smart, and scalable platform for both sides of the hiring ecosystem.

---

## 🎯 Core Purpose

> "Simplifying Hiring, Empowering Careers"

The platform provides:

✅ For **Recruiters**:
- Post/manage jobs
- Review candidates
- Schedule interviews (Google Calendar Integration)
- Provide feedback

✅ For **Candidates**:
- Manage resumes & profiles
- Search & apply to jobs/internships
- Explore resume tips
- Share/read interview blogs
- Leave interview reviews

---

## 🛠 Tech Stack

- **Frontend**: React (Vite) + Axios
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT
- **APIs**: Google Calendar API
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 🛣️ First 10 Days Roadmap

| Day  | Task Description                                                                 |
|------|----------------------------------------------------------------------------------|
## 🚀 First 10 Days Roadmap

| Day | Task                                                                 |
|-----|----------------------------------------------------------------------|
| 1   | Finalize project idea, features, and roadmap                         |
| 2   | Set up backend (Express.js, MongoDB connection)                      |
| 3   | Set up frontend (Vite + React + Tailwind CSS)                        |
| 4   | Create basic folder structure (frontend & backend)                   |
| 5   | Implement JWT-based authentication (Login/Signup APIs)              |
| 6   | Build Login/Signup pages with form validation                       |
| 7   | Setup role-based routing for candidate and recruiter dashboards     |
| 8   | Design and build Landing Page with Navbar                           |
| 9   | Create static placeholders for dashboards (Candidate/Recruiter)     |
| 10  | Connect authentication frontend with backend using Axios            |

### DEPLOYMENT LINK
---
https://bucolic-sorbet-ea70eb.netlify.app/

# Intervuex - Interview Management Platform

## Overview
Intervuex is a modern web application that connects students and recruiters for interview management. This platform provides authentication, user management, and interview coordination features.

## Features
- **User Authentication**: Secure signup and login for both students and recruiters
- **Modern UI**: Clean, responsive design with blue and white theme
- **Role-based Access**: Different features for students vs recruiters
- **Social Authentication**: Google and LinkedIn integration (configurable)
- **Password Security**: Encrypted passwords with bcrypt
- **JWT Authentication**: Secure token-based authentication

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Hot Toast for notifications
- React Icons for UI icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Passport.js for OAuth (Google/LinkedIn)
- Multer for file uploads
- CORS for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- Git

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with the following variables:
   ```env
   PORT=8000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/intervuex
   SECRET_KEY=intervuex_jwt_secret_key_2024
   SESSION_SECRET=intervuex_session_secret_2024
   CLIENT_URL=http://localhost:5173
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Authentication Flow

### Signup Process
1. User fills signup form with:
   - Full Name
   - Email Address
   - Phone Number
   - Password
   - Confirm Password
   - Role selection (Student/Recruiter checkbox)

2. Frontend validates:
   - All required fields
   - Email format
   - Phone number format (10 digits)
   - Password strength (min 6 characters)
   - Password confirmation match

3. Data sent to `POST /api/v1/user/register`
4. Backend creates user with hashed password
5. Success redirects to login page

### Login Process
1. User enters:
   - Email
   - Password
   - Role (Student/Recruiter)

2. Data sent to `POST /api/v1/user/login`
3. Backend validates credentials and role
4. Returns JWT token and user data
5. Frontend stores token and user info
6. Redirects to dashboard

### Social Authentication (Optional)
- Google OAuth integration
- LinkedIn OAuth integration
- Automatic account creation for new social users
- Token-based authentication flow

## API Endpoints

### User Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `PUT /api/v1/user/profile/update` - Update user profile

### OAuth (Optional)
- `GET /api/v1/user/auth/google` - Google OAuth
- `GET /api/v1/user/auth/google/callback` - Google callback
- `GET /api/v1/user/auth/linkedin` - LinkedIn OAuth
- `GET /api/v1/user/auth/linkedin/callback` - LinkedIn callback

## Database Schema

### User Model
```javascript
{
  fullname: String (required),
  email: String (required, unique),
  phonenumber: String (required),
  password: String (required),
  role: String (enum: ["student", "recruiter"]),
  profile: {
    bio: String,
    skills: [String],
    resume: String,
    resumeOrignalName: String,
    company: ObjectId,
    profilePhoto: String
  },
  timestamps: true
}
```

## Project Structure

```
intervuex/
├── backend/
│   ├── controllers/
│   │   └── user.controllers.js
│   ├── models/
│   │   └── user.model.js
│   ├── routes/
│   │   └── user.route.js
│   ├── middlewares/
│   │   └── isAuthenticated.js
│   ├── utils/
│   │   ├── db.js
│   │   └── passport.js
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── auth/
│   │   │       ├── Login.jsx
│   │   │       └── Signup.jsx
│   │   └── utils/
│   │       └── constant.js
│   └── package.json
└── README.md
```

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies for token storage
- CORS configuration
- Input validation and sanitization
- Role-based access control

## Troubleshooting

### Common Issues
1. **CORS Error**: Ensure backend CORS is configured for `http://localhost:5173`
2. **Database Connection**: Verify MongoDB is running and connection string is correct
3. **JWT Error**: Check if SECRET_KEY is set in environment variables
4. **Social Auth**: Ensure OAuth credentials are properly configured

### Development Tips
- Use browser dev tools to check network requests
- Check backend console for error logs
- Verify API endpoints match between frontend and backend
- Test authentication flow with different user roles

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the MIT License.
