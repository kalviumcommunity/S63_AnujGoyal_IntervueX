import http from 'http';

console.log('🔍 Testing Google OAuth Route...\n');

const options = {
    hostname: 'localhost',
    port: 8000,
    path: '/api/v1/user/auth/google',
    method: 'GET'
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);
    
    if (res.statusCode === 302) {
        console.log('\n✅ SUCCESS! Google OAuth route is working!');
        console.log('🔗 Redirecting to:', res.headers.location);
        console.log('\n🎉 Your Google authentication is now ready!');
        console.log('💡 Now test it in your frontend by clicking the Google button');
    } else if (res.statusCode === 404) {
        console.log('\n❌ Route not found - Google OAuth routes not registered');
        console.log('💡 Check if backend server started with the right .env file');
    } else {
        console.log('\n⚠️  Unexpected response');
    }
});

req.on('error', (err) => {
    console.log('❌ Connection failed:', err.message);
    console.log('💡 Make sure backend server is running: cd backend && npm start');
});

req.setTimeout(5000, () => {
    console.log('❌ Request timeout');
    req.destroy();
});

req.end(); 