import dotenv from 'dotenv';
import path from 'path';

console.log('🔍 Testing Environment Variable Loading\n');

// Test the exact same loading logic as backend/index.js
console.log('Current working directory:', process.cwd());
console.log('Testing from:', path.resolve('./backend/.env'));

// Load environment variables exactly like index.js does
console.log('\n1️⃣ Loading .env file...');
const result = dotenv.config({ path: './backend/.env' });

if (result.error) {
    console.log('❌ Error loading .env:', result.error.message);
    
    console.log('\n2️⃣ Trying fallback .env~ file...');
    const fallbackResult = dotenv.config({ path: './backend/.env~' });
    
    if (fallbackResult.error) {
        console.log('❌ Error loading .env~:', fallbackResult.error.message);
    } else {
        console.log('✅ Loaded .env~ file');
    }
} else {
    console.log('✅ Loaded .env file successfully');
}

console.log('\n🔍 Environment Variables Check:');
const vars = {
    'MONGO_URI': process.env.MONGO_URI,
    'SECRET_KEY': process.env.SECRET_KEY, 
    'GOOGLE_CLIENT_ID': process.env.GOOGLE_CLIENT_ID,
    'GOOGLE_CLIENT_SECRET': process.env.GOOGLE_CLIENT_SECRET,
    'CLIENT_URL': process.env.CLIENT_URL,
    'SESSION_SECRET': process.env.SESSION_SECRET,
    'NODE_ENV': process.env.NODE_ENV
};

Object.entries(vars).forEach(([key, value]) => {
    if (value) {
        console.log(`✅ ${key}: ${value.substring(0, 20)}...`);
    } else {
        console.log(`❌ ${key}: Missing`);
    }
});

console.log('\n🎯 Google OAuth Credential Check:');
const hasGoogleCredentials = process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET && 
    process.env.GOOGLE_CLIENT_SECRET !== 'YOUR_GOOGLE_CLIENT_SECRET_HERE';

console.log('Has Google Client ID:', !!process.env.GOOGLE_CLIENT_ID);
console.log('Has Google Client Secret:', !!process.env.GOOGLE_CLIENT_SECRET);
console.log('Secret not placeholder:', process.env.GOOGLE_CLIENT_SECRET !== 'YOUR_GOOGLE_CLIENT_SECRET_HERE');
console.log('Routes should register:', hasGoogleCredentials);

if (hasGoogleCredentials) {
    console.log('\n🎉 Google OAuth should work!');
} else {
    console.log('\n❌ Google OAuth will NOT work');
    console.log('Missing variables:');
    if (!process.env.GOOGLE_CLIENT_ID) console.log('  - GOOGLE_CLIENT_ID');
    if (!process.env.GOOGLE_CLIENT_SECRET) console.log('  - GOOGLE_CLIENT_SECRET');
    if (process.env.GOOGLE_CLIENT_SECRET === 'YOUR_GOOGLE_CLIENT_SECRET_HERE') {
        console.log('  - GOOGLE_CLIENT_SECRET is placeholder');
    }
} 