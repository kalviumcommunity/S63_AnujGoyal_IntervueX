import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaGoogle, FaLinkedin, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { USER_API_END_POINT } from "../../utils/constant";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "student",
  });

  // Check for existing token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/welcome');
    }
  }, [navigate]);

  // Handle OAuth token
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      toast.success('Successfully logged in!');
      navigate('/welcome');
    }
  }, [location, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      console.log("Attempting login with:", { email: input.email, role: input.role });
      
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },  
        withCredentials: true,
      });
      
      if (res.data.success) {
        console.log("Login successful:", res.data);
        
        // Store user data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        // Show success message
        toast.success(
          <div className="flex flex-col">
            <span className="font-bold text-lg">🎉 Welcome back!</span>
            <span className="text-sm">{res.data.user.fullname}</span>
          </div>,
          {
            duration: 3000,
            style: {
              background: '#4CAF50',
              color: 'white',
              padding: '16px',
            },
          }
        );

        // Redirect to welcome page
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response?.status === 400) {
        // Handle validation errors
        toast.error(
          <div className="flex flex-col">
            <span className="font-bold">Login Failed</span>
            <span className="text-sm">Please check your credentials</span>
          </div>,
          {
            duration: 4000,
            style: {
              background: '#f44336',
              color: 'white',
              padding: '16px',
            },
          }
        );
      } else if (error.response?.status === 401) {
        // Handle unauthorized
        toast.error(
          <div className="flex flex-col">
            <span className="font-bold">Account Not Found</span>
            <span className="text-sm">Please sign up first</span>
          </div>,
          {
            duration: 4000,
            style: {
              background: '#ff9800',
              color: 'white',
              padding: '16px',
            },
          }
        );
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = `${USER_API_END_POINT}/auth/google`;
  };

  const handleLinkedInLogin = async () => {
    window.location.href = `${USER_API_END_POINT}/auth/linkedin`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-2">Welcome Back!</h1>
            <p className="text-blue-600 text-lg">Sign in to continue your journey</p>
          </div>
          
          {/* Login Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
            <h2 className="font-bold text-2xl mb-6 text-blue-900 text-center">Login to Your Account</h2>
            
            <form onSubmit={submitHandler} className="space-y-6">
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>
              </div>
              
              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>
              </div>
              
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am a
                </label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center">
                    <input
                      id="student"
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label 
                      htmlFor="student" 
                      className="ml-2 text-sm text-gray-700 cursor-pointer flex items-center"
                    >
                      <FaUser className="mr-1" /> Student
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="recruiter"
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <label 
                      htmlFor="recruiter" 
                      className="ml-2 text-sm text-gray-700 cursor-pointer flex items-center"
                    >
                      <FaUser className="mr-1" /> Recruiter
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Login Button */}
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out ${
                  isLoading 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="my-6 flex items-center justify-between">
              <div className="flex-grow border-t border-blue-100"></div>
              <span className="px-3 text-blue-400 text-sm">OR</span>
              <div className="flex-grow border-t border-blue-100"></div>
            </div>
            
            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button 
                type="button" 
                onClick={handleLinkedInLogin}
                className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <FaLinkedin className="text-blue-700" />
                <span>LinkedIn</span>
              </button>
            </div>
            
            {/* Sign Up Link */}
            <div className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition duration-150">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
