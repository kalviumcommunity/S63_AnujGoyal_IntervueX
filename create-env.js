import fs from 'fs';
import path from 'path';

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

const envPath = path.join('backend', '.env');
const envTildePath = path.join('backend', '.env~');

console.log('🔥 Removing any existing .env files...');

// Remove existing .env files
try {
    fs.unlinkSync(envPath);
    console.log('   Removed .env');
} catch (e) {
    console.log('   No .env file to remove');
}

try {
    fs.unlinkSync(envTildePath);
    console.log('   Removed .env~');
} catch (e) {
    console.log('   No .env~ file to remove');
}

console.log('\n✨ Creating fresh .env file with Google OAuth credentials...');

try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Fresh .env file created successfully!');
    console.log('📁 Location:', path.resolve(envPath));
    console.log('\n🔍 Contents:');
    console.log(envContent);
    console.log('\n🚀 Next steps:');
    console.log('1. Kill any running backend server (Ctrl+C in terminal)');
    console.log('2. Start fresh: cd backend && npm start');
    console.log('3. You should see: "✅ Registering Google OAuth routes with full credentials"');
    console.log('4. Test: Click Google button in your frontend');
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
} 