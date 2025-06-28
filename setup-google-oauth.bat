@echo off
echo Setting up Google OAuth credentials...

cd backend

echo MONGO_URI=mongodb+srv://IntervueX:IntervueX23@intervuex.i9pvfdu.mongodb.net/intervueX > .env
echo SECRET_KEY=intervuex-jwt-secret-key-2024 >> .env
echo PORT=8000 >> .env
echo NODE_ENV=development >> .env
echo CLIENT_URL=http://localhost:5173 >> .env
echo SESSION_SECRET=intervuex-session-secret-2024 >> .env
echo GEMINI_API_KEY=AIzaSyD0pZilC4ZpEGf6Im3FRbvybqfeoygb3jM >> .env
echo. >> .env
echo # Google OAuth Credentials >> .env
echo GOOGLE_CLIENT_ID=your-google-client-id-here >> .env
echo GOOGLE_CLIENT_SECRET=your-google-client-secret-here >> .env

echo ✅ Google OAuth credentials have been set up!
echo 🚀 Now you can start the servers:
echo.
echo Backend: cd backend && npm start
echo Frontend: cd client && npm run dev
echo.
echo Then test: http://localhost:5173
pause 