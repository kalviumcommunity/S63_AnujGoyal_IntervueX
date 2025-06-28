import React from 'react';
import Navbar from '../components/shared/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About IntervueX</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Revolutionizing the way companies and candidates connect through innovative interview solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              IntervueX is dedicated to making the hiring process more efficient, transparent, and accessible for both recruiters and job seekers. We bridge the gap between talent and opportunity through cutting-edge technology.
            </p>
            <p className="text-gray-600">
              Our platform provides comprehensive tools for resume screening, interview scheduling, and candidate evaluation, ensuring the best match for every position.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose IntervueX?</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-[#F83002] mr-2">•</span>
                Advanced ATS integration
              </li>
              <li className="flex items-start">
                <span className="text-[#F83002] mr-2">•</span>
                AI-powered candidate matching
              </li>
              <li className="flex items-start">
                <span className="text-[#F83002] mr-2">•</span>
                Streamlined interview process
              </li>
              <li className="flex items-start">
                <span className="text-[#F83002] mr-2">•</span>
                Real-time collaboration tools
              </li>
              <li className="flex items-start">
                <span className="text-[#F83002] mr-2">•</span>
                Comprehensive analytics
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F83002] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Continuously evolving our platform with the latest technology to meet changing industry needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F83002] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600">
                Providing clear, honest communication throughout the entire hiring process.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F83002] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to delivering very exceptional results for both employers and job seekers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;