#!/bin/bash

echo "🔥 Removing any existing .env files..."
rm -f backend/.env backend/.env~

echo "✨ Creating fresh .env file with Google OAuth credentials..."

cat > backend/.env << 'EOF'
MONGO_URI=mongodb+srv://IntervueX:IntervueX23@intervuex.i9pvfdu.mongodb.net/intervueX
SECRET_KEY=intervuex-jwt-secret-key-2024
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SESSION_SECRET=intervuex-session-secret-2024
GEMINI_API_KEY=AIzaSyD0pZilC4ZpEGf6Im3FRbvybqfeoygb3jM

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
EOF

echo "✅ .env file created successfully!"
echo "📁 Location: $(pwd)/backend/.env"
echo ""
echo "🔍 Contents:"
cat backend/.env
echo ""
echo "🚀 Now restart your backend server:"
echo "   cd backend && npm start"
echo ""
echo "You should see: ✅ Registering Google OAuth routes with full credentials" 