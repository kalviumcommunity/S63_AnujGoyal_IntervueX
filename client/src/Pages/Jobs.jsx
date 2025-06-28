import React from 'react';
import Navbar from '../components/shared/Navbar';
import { Link } from 'react-router-dom';

const Jobs = () => {
  // Sample job data for demonstration
  const sampleJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹8-12 LPA",
      description: "Looking for a skilled frontend developer with React experience."
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Digital Innovations",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹10-15 LPA",
      description: "Seeking a backend developer proficient in Node.js and databases."
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Creative Studios",
      location: "Delhi, India",
      type: "Full-time",
      salary: "₹6-10 LPA",
      description: "Creative UI/UX designer needed for innovative design projects."
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹12-18 LPA",
      description: "Full stack developer for dynamic startup environment."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
          <p className="text-lg text-gray-600">Discover exciting career opportunities with top companies</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search jobs..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F83002]"
            />
            <input
              type="text"
              placeholder="Location"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F83002]"
            />
            <button className="px-6 py-2 bg-[#F83002] text-white rounded-md hover:bg-[#e02900] transition-colors duration-200">
              Search
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {sampleJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-[#F83002] font-medium mb-2">{job.company}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.salary}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                </div>
                <div className="flex flex-col gap-2 md:ml-6">
                  <button className="px-6 py-2 bg-[#F83002] text-white rounded-md hover:bg-[#e02900] transition-colors duration-200">
                    Apply Now
                  </button>
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Don't see the perfect job? Create an account to get personalized recommendations!</p>
          <div className="space-x-4">
            <Link 
              to="/signup" 
              className="inline-block px-6 py-2 bg-[#F83002] text-white rounded-md hover:bg-[#e02900] transition-colors duration-200"
            >
              Sign Up
            </Link>
            <Link 
              to="/login" 
              className="inline-block px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
