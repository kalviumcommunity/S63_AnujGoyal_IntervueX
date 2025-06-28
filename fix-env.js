import fs from 'fs';

const envContent = `MONGO_URI=mongodb+srv://IntervueX:IntervueX23@intervuex.i9pvfdu.mongodb.net/intervueX
SECRET_KEY=intervuex-jwt-secret-key-2024
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SESSION_SECRET=intervuex-session-secret-2024
GEMINI_API_KEY=AIzaSyD0pZilC4ZpEGf6Im3FRbvybqfeoygb3jM

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here`;

console.log('🔧 Writing complete .env file...');

try {
    fs.writeFileSync('backend/.env', envContent);
    console.log('✅ Complete .env file created!');
    console.log('\n📝 Contents:');
    console.log(envContent);
    
    console.log('\n🔍 Verification:');
    const readBack = fs.readFileSync('backend/.env', 'utf8');
    const lines = readBack.split('\n');
    
    const googleClientId = lines.find(line => line.startsWith('GOOGLE_CLIENT_ID='));
    const googleClientSecret = lines.find(line => line.startsWith('GOOGLE_CLIENT_SECRET='));
    
    console.log('✅ GOOGLE_CLIENT_ID:', googleClientId ? 'Present' : 'Missing');
    console.log('✅ GOOGLE_CLIENT_SECRET:', googleClientSecret ? 'Present' : 'Missing');
    console.log('✅ Total lines:', lines.length);
    
} catch (error) {
    console.error('❌ Error:', error.message);
} 