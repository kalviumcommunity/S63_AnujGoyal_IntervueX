import dotenv from 'dotenv';
import path from 'path';

console.log('🔍 Environment Variables Test\n');

// Test loading from the correct .env file
const envPath = path.join('backend', '.env');
console.log('📁 Loading .env from:', path.resolve(envPath));

const result = dotenv.config({ path: envPath });

if (result.error) {
    console.log('❌ Error loading .env file:', result.error.message);
} else {
    console.log('✅ .env file loaded successfully');
}

console.log('\n🔍 Environment Variables:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing');
console.log('CLIENT_URL:', process.env.CLIENT_URL || '❌ Missing');
console.log('SECRET_KEY:', process.env.SECRET_KEY ? '✅ Set' : '❌ Missing');
console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Missing');

console.log('\n🎯 Google OAuth Status:');
const hasGoogleCredentials = process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET && 
    process.env.GOOGLE_CLIENT_SECRET !== 'YOUR_GOOGLE_CLIENT_SECRET_HERE' &&
    process.env.GOOGLE_CLIENT_SECRET.startsWith('GOCSPX-');

if (hasGoogleCredentials) {
    console.log('✅ Google OAuth credentials are valid');
    console.log('✅ Routes should be registered');
} else {
    console.log('❌ Google OAuth credentials are invalid');
    console.log('Details:');
    console.log('  Client ID:', process.env.GOOGLE_CLIENT_ID ? 'Present' : 'Missing');
    console.log('  Client Secret:', process.env.GOOGLE_CLIENT_SECRET ? 'Present' : 'Missing');
    console.log('  Secret format:', process.env.GOOGLE_CLIENT_SECRET?.startsWith('GOCSPX-') ? 'Valid' : 'Invalid');
}

console.log('\n📋 Raw Values (first 20 chars):');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET?.substring(0, 20) + '...'); 