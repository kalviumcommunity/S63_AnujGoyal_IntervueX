import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

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
          <h1 className="text-3xl font-bold text-blue-800">Intervuex</h1>
          
          {/* Profile Button */}
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all duration-200"
          >
            <img 
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullname}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-5xl font-bold text-blue-900 animate-fade-in">
            Welcome to Intervuex
          </h2>
          <p className="text-xl text-blue-600 max-w-2xl mx-auto">
            Your gateway to seamless interview experiences and career opportunities
          </p>
          <button 
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-blue-600 rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => navigate('/browse')}
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative">Explore Opportunities</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => navigate(user.role === 'student' ? '/browse-jobs' : '/post-job')}
            className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-4 group-hover:text-blue-600 transition-colors">
              {user.role === 'student' ? 'Browse Jobs' : 'Post a Job'}
            </h3>
            <p className="text-gray-600">
              {user.role === 'student' 
                ? 'Explore available job opportunities and find your perfect match'
                : 'Create a new job listing and find the perfect candidate'}
            </p>
          </div>
          <div 
            onClick={() => navigate(user.role === 'student' ? '/profile' : '/applications')}
            className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <h3 className="text-xl font-semibold text-blue-900 mb-4 group-hover:text-blue-600 transition-colors">
              {user.role === 'student' ? 'Update Profile' : 'View Applications'}
            </h3>
            <p className="text-gray-600">
              {user.role === 'student'
                ? 'Keep your profile up to date to attract better opportunities'
                : 'Review and manage incoming job applications'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Welcome;
