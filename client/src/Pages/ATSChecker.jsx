import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUpload, 
  FaFileAlt, 
  FaRobot, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaLightbulb,
  FaSpinner,
  FaChartBar,
  FaSearch,
  FaBullseye,
  FaExclamationTriangle
} from 'react-icons/fa';
import { toast } from 'sonner';

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.pdf')) {
        setFile(droppedFile);
      } else {
        toast.error('Please upload a PDF file only');
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.pdf')) {
        setFile(selectedFile);
      } else {
        toast.error('Please upload a PDF file only');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please upload your resume');
      return;
    }

    if (!jobDescription.trim()) {
      toast.error('Please enter a job description');
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', jobDescription);

      const response = await fetch('http://localhost:8000/api/v1/ats/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data.analysis);
        toast.success('Resume analysis completed!');
      } else {
        toast.error(data.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ScoreCard = ({ score, title, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-3xl font-bold mt-2" style={{ color }}>
            {score}%
          </p>
        </div>
        <Icon className="text-3xl" style={{ color }} />
      </div>
    </motion.div>
  );

  const RecommendationCard = ({ title, items, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <div className="flex items-center mb-4">
        <Icon className="text-2xl mr-3" style={{ color }} />
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items?.map((item, index) => (
          <li key={index} className="flex items-start">
            <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: color }}></div>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <FaRobot className="inline-block mr-3 text-blue-600" />
            AI Resume ATS Checker
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get your resume analyzed by AI and optimize it for Applicant Tracking Systems (ATS) 
            to increase your chances of getting noticed by recruiters.
          </p>
        </motion.div>

        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Your Resume (PDF Only)
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : file 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  {file ? (
                    <div className="text-green-600">
                      <FaCheckCircle className="text-4xl mx-auto mb-2" />
                      <p className="text-lg font-medium">{file.name}</p>
                      <p className="text-sm">Click to change file</p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <FaUpload className="text-4xl mx-auto mb-2" />
                      <p className="text-lg font-medium">Drag and drop your resume here</p>
                      <p className="text-sm">or click to browse</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Paste the job description here to get more accurate ATS matching..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <FaSearch className="mr-2" />
                  Analyze Resume
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Results */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* ATS Scores */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ATS Analysis Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ScoreCard
                  score={results.atsScore}
                  title="Overall ATS Score"
                  icon={FaChartBar}
                  color="#3B82F6"
                />
                <ScoreCard
                  score={results.keywordMatch}
                  title="Keyword Matching"
                  icon={FaBullseye}
                  color="#10B981"
                />
                <ScoreCard
                  score={results.formatScore}
                  title="Format Compatibility"
                  icon={FaFileAlt}
                  color="#F59E0B"
                />
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecommendationCard
                title="✅ Do's - What to Include"
                items={results.dos}
                icon={FaCheckCircle}
                color="#10B981"
              />
              <RecommendationCard
                title="❌ Don'ts - What to Avoid"
                items={results.donts}
                icon={FaTimesCircle}
                color="#EF4444"
              />
            </div>

            {/* Improvements */}
            <RecommendationCard
              title="💡 Improvement Suggestions"
              items={results.improvements}
              icon={FaLightbulb}
              color="#F59E0B"
            />

            {/* Missing Keywords */}
            {results.missingKeywords && results.missingKeywords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <FaExclamationTriangle className="text-2xl mr-3 text-red-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {results.missingKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ATSChecker; 