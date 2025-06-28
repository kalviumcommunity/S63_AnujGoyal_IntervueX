import http from 'http';

// Test the debug endpoint to see what the server sees
const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/api/v1/user/register', // First test a basic route
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

console.log('🔍 Testing server status...\n');

// Test 1: Basic server connection
const req1 = http.request(options, (res) => {
    console.log('✅ Server is responding');
    console.log('Status:', res.statusCode);
    
    // Test 2: Check Google OAuth route
    console.log('\n🎯 Testing Google OAuth route...');
    
    const oauthOptions = {
        hostname: 'localhost',
        port: 8000,
        path: '/api/v1/user/auth/google',
        method: 'GET'
    };
    
    const req2 = http.request(oauthOptions, (res2) => {
        console.log('Google OAuth Status:', res2.statusCode);
        
        let data = '';
        res2.on('data', chunk => data += chunk);
        res2.on('end', () => {
            if (res2.statusCode === 302) {
                console.log('✅ SUCCESS! Google OAuth is working!');
                console.log('🔗 Redirecting to:', res2.headers.location);
            } else if (res2.statusCode === 404) {
                console.log('❌ Google OAuth routes NOT registered');
                console.log('\n🔧 Debugging steps:');
                console.log('1. Check backend console for startup messages');
                console.log('2. Kill all node processes: taskkill /F /IM node.exe');
                console.log('3. Restart: cd backend && npm start');
                console.log('4. Look for: "✅ Registering Google OAuth routes"');
            } else if (res2.statusCode === 200) {
                console.log('⚠️  Development debug route active');
                console.log('Response:', data);
            }
        });
    });
    
    req2.on('error', (err) => {
        console.log('❌ OAuth test failed:', err.message);
    });
    
    req2.end();
});

req1.on('error', (err) => {
    console.log('❌ Server not running:', err.message);
    console.log('💡 Start server: cd backend && npm start');
});

req1.end('{}'); 