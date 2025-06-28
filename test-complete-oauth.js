// Complete Google OAuth Test Script
import dotenv from 'dotenv';
import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const http = require('http');

// Load environment variables
dotenv.config({ path: './backend/.env' });

console.log('🔍 Complete Google OAuth System Test\n');

// Test 1: Environment Variables
console.log('=== 1. Environment Variables ===');
const checks = {
    'GOOGLE_CLIENT_ID': process.env.GOOGLE_CLIENT_ID,
    'GOOGLE_CLIENT_SECRET': process.env.GOOGLE_CLIENT_SECRET,
    'CLIENT_URL': process.env.CLIENT_URL,
    'SECRET_KEY': process.env.SECRET_KEY,
    'MONGO_URI': process.env.MONGO_URI
};

Object.entries(checks).forEach(([key, value]) => {
    if (value && value !== 'YOUR_GOOGLE_CLIENT_SECRET_HERE') {
        console.log(`✅ ${key}: Set correctly`);
    } else {
        console.log(`❌ ${key}: Missing or placeholder`);
    }
});

// Test 2: Google Credentials Validation
console.log('\n=== 2. Google Credentials Validation ===');
const hasValidGoogleCreds = process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET && 
    process.env.GOOGLE_CLIENT_SECRET !== 'YOUR_GOOGLE_CLIENT_SECRET_HERE' &&
    process.env.GOOGLE_CLIENT_SECRET.startsWith('GOCSPX-');

if (hasValidGoogleCreds) {
    console.log('✅ Google OAuth credentials are properly configured');
    console.log(`   Client ID: ${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...`);
    console.log(`   Client Secret: ${process.env.GOOGLE_CLIENT_SECRET.substring(0, 15)}...`);
} else {
    console.log('❌ Google OAuth credentials are incomplete');
}

// Test 3: Server Route Test
console.log('\n=== 3. Server Route Test ===');

function testServer() {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 8000,
            path: '/api/v1/user/auth/google',
            method: 'GET',
            timeout: 5000
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });

        req.on('error', (err) => {
            resolve({ error: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ error: 'Timeout - server not responding' });
        });

        req.end();
    });
}

// Test server connection
setTimeout(async () => {
    console.log('Testing server connection...');
    const result = await testServer();
    
    if (result.error) {
        console.log(`❌ Server test failed: ${result.error}`);
        console.log('\n🛠️  To fix:');
        console.log('1. Run: cd backend && npm start');
        console.log('2. Wait for "Server is running" message');
        console.log('3. Then rerun this test');
    } else if (result.status === 200 && hasValidGoogleCreds) {
        console.log('✅ Server is running and Google OAuth should redirect to Google');
    } else if (result.status === 200) {
        console.log('✅ Server is running with debug endpoint');
        console.log('📝 Debug response:', result.data);
    } else {
        console.log(`⚠️  Server responded with status: ${result.status}`);
        console.log('Response:', result.data);
    }

    // Summary
    console.log('\n=== 📊 SUMMARY ===');
    
    if (hasValidGoogleCreds && !result.error) {
        console.log('🎉 Google OAuth is READY!');
        console.log('\n🚀 To test:');
        console.log('1. Start backend: cd backend && npm start');
        console.log('2. Start frontend: cd client && npm run dev');
        console.log('3. Visit: http://localhost:5173');
        console.log('4. Click "Continue with Google" button');
        console.log('5. You should be redirected to Google for authentication');
    } else {
        console.log('⚠️  Setup incomplete');
        console.log('\n🔧 Next steps:');
        if (!hasValidGoogleCreds) {
            console.log('1. Run the setup script: setup-google-oauth.bat');
        }
        if (result.error) {
            console.log('2. Start the backend server: cd backend && npm start');
        }
        console.log('3. Rerun this test');
    }
}, 1000);

console.log('⏳ Testing server connection in 1 second...'); 