import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { USER_API_END_POINT } from "../../utils/constant";

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    isRecruiter: false,
  });

  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setInput({ 
      ...input, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const validateForm = () => {
    if (!input.fullname.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!input.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(input.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!input.phoneNumber.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!/^\d{10}$/.test(input.phoneNumber.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!input.password) {
      toast.error("Password is required");
      return false;
    }
    if (input.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (input.password !== input.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    // Create the registration data object
    const registrationData = {
      fullname: input.fullname,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: input.password,
      role: input.isRecruiter ? "recruiter" : "student"
    };

    try {
      console.log("Sending registration data:", registrationData);
      
      const res = await axios.post(`${USER_API_END_POINT}/register`, registrationData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        // Log success details
        console.log("Registration successful!");
        console.log("User Details:", {
          name: registrationData.fullname,
          email: registrationData.email,
          role: registrationData.role,
          phoneNumber: registrationData.phoneNumber
        });
        console.log("Server Response:", res.data);

        // Show success toast with custom styling
        toast.success(
          <div className="flex flex-col">
            <span className="font-bold text-lg">🎉 Registration Successful!</span>
            <span className="text-sm">Welcome to Intervuex, {registrationData.fullname}!</span>
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

        // Clear the form
        setInput({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          isRecruiter: false
        });

        // Show additional success message
        toast.success(
          <div>
            <span>Redirecting to login page...</span>
          </div>,
          {
            duration: 2000,
            style: {
              background: '#2196F3',
              color: 'white',
            },
          }
        );

        // Delay before redirecting
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || 
                          "Registration failed. Please try again.";
      
      // Show error toast with custom styling
      toast.error(
        <div className="flex flex-col">
          <span className="font-bold">Registration Failed</span>
          <span className="text-sm">{errorMessage}</span>
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
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        if (error.response.data.message.includes("exist")) {
          console.log("Email already exists:", input.email);
          toast.error("This email is already registered. Please try logging in.");
        }
      } else if (error.response?.status === 500) {
        console.error("Server error details:", error.response?.data);
        toast.error("Server error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Join Intervuex</h1>
          <p className="text-blue-600 text-lg">Start Your Interview Journey Today</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <h2 className="font-bold text-2xl mb-6 text-blue-900 text-center">Create Your Account</h2>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name Field */}
                <div className="relative">
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      id="fullname"
                      type="text"
                      value={input.fullname}
                      name="fullname"
                      onChange={changeEventHandler}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
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

                {/* Phone Number Field */}
                <div className="relative">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      id="phoneNumber"
                      type="tel"
                      value={input.phoneNumber}
                      name="phoneNumber"
                      onChange={changeEventHandler}
                      placeholder="Enter 10-digit number"
                      className="w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="flex items-center justify-start h-full pt-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="isRecruiter"
                      checked={input.isRecruiter}
                      onChange={changeEventHandler}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-700">I am a recruiter</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Security Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="Min. 6 characters"
                      className="w-full pl-10 pr-10 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={input.confirmPassword}
                      name="confirmPassword"
                      onChange={changeEventHandler}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-10 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
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
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition duration-150">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
