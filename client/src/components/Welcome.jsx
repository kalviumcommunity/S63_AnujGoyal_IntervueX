import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';

const Welcome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-800">Welcome to Intervuex</h1>
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/login');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUser className="text-blue-600 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.fullname}</h2>
            <p className="text-blue-600 mt-1 capitalize">{user.role}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-gray-700">
              <FaEnvelope className="text-blue-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <FaPhone className="text-blue-500" />
              <span>{user.phoneNumber}</span>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg transition duration-150 flex items-center justify-center">
                {user.role === 'student' ? 'Browse Jobs' : 'Post a Job'}
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg transition duration-150 flex items-center justify-center">
                {user.role === 'student' ? 'Update Profile' : 'View Applications'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
