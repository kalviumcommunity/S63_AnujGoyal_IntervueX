import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaPhone, FaTimes, FaEdit, FaMapMarkerAlt, 
  FaGithub, FaLinkedin, FaGlobe, FaGraduationCap, FaUniversity,
  FaCalendarAlt, FaFileAlt, FaPlus, FaTimes as FaTimesCircle,
  FaBriefcase, FaBuilding, FaTrash, FaLock, FaMedal, FaHistory,
  FaBookmark, FaUpload, FaSignOutAlt, FaBars, FaRegBookmark,
  FaClipboardList, FaDownload, FaSpinner, FaCheck
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);
  const [skills, setSkills] = useState(['React', 'JavaScript', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript']);
  const [profileData, setProfileData] = useState({
    university: 'Example University',
    course: 'B.Tech Computer Science',
    graduationYear: '2024',
    cgpa: '8.5',
    location: 'Bangalore, Karnataka',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    portfolio: 'https://portfolio.com',
    preferredRoles: ['Frontend Developer', 'Full Stack Developer'],
    workMode: 'Hybrid',
    preferredLocations: ['Bangalore', 'Mumbai', 'Remote'],
    achievements: [
      { title: 'First Prize in Hackathon', date: '2023', description: 'Won first place in national coding competition' },
      { title: 'AWS Certified Developer', date: '2023', description: 'Associate level certification' }
    ]
  });

  // API Base URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

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
      
      // Set skills from user profile if available
      if (parsedUser.profile?.skills && parsedUser.profile.skills.length > 0) {
        setSkills(parsedUser.profile.skills);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    setShowLogoutPrompt(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleResumeUpload(file);
    }
  };

  // Upload resume function
  const handleResumeUpload = async (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload only PDF, DOC, or DOCX files');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setIsUploadingResume(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/user/resume/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Update user data in localStorage and state
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        toast.success('Resume uploaded successfully!');
      }
    } catch (error) {
      console.error('Resume upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload resume');
    } finally {
      setIsUploadingResume(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Download resume function
  const handleResumeDownload = async () => {
    if (!user?.profile?.resume) {
      toast.error('No resume found to download');
      return;
    }

    setIsDownloadingResume(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/user/resume/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob'
      });

      // Create blob and download
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = user.profile.resumeOrignalName || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Resume download error:', error);
      toast.error(error.response?.data?.message || 'Failed to download resume');
    } finally {
      setIsDownloadingResume(false);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const sidebarLinks = [
    { id: 'profile', icon: FaUser, label: 'Profile' },
    { id: 'applied', icon: FaClipboardList, label: 'Applied Jobs' },
    { id: 'saved', icon: FaRegBookmark, label: 'Saved Jobs' },
    { id: 'update', icon: FaEdit, label: 'Update Profile' },
    { id: 'password', icon: FaLock, label: 'Change Password' },
    { id: 'delete', icon: FaTrash, label: 'Delete Account' },
  ];

  const SidebarLink = ({ icon: Icon, label, id }) => (
    <button
      onClick={() => {
        setActiveSection(id);
        setShowMobileSidebar(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeSection === id 
          ? 'bg-blue-100 text-blue-600' 
          : 'hover:bg-gray-100 text-gray-600'
      }`}
    >
      <Icon className="text-lg" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const ProfileContent = () => (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullname}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <FaUpload />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{user?.fullname}</h2>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                <FaEnvelope />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
                <FaMapMarkerAlt />
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Education</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <FaUniversity className="text-blue-500 text-xl" />
            <div>
              <div className="font-medium">{profileData.university}</div>
              <div className="text-sm text-gray-500">{profileData.course}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <FaGraduationCap className="text-blue-500 text-xl" />
            <div>
              <div className="font-medium">Graduating {profileData.graduationYear}</div>
              <div className="text-sm text-gray-500">CGPA: {profileData.cgpa}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Resume & Links */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Resume & Links</h3>
        <div className="space-y-4">
          {/* Resume Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              {user?.profile?.resume ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2 text-green-600">
                    <FaCheck className="text-xl" />
                    <span className="font-medium">Resume Uploaded</span>
                  </div>
                  <div className="text-gray-600">
                    <FaFileAlt className="text-3xl mx-auto mb-2" />
                    <p className="text-sm">{user.profile.resumeOrignalName}</p>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleResumeDownload}
                      disabled={isDownloadingResume}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isDownloadingResume ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaDownload />
                      )}
                      <span>{isDownloadingResume ? 'Downloading...' : 'Download'}</span>
                    </button>
                    <button
                      onClick={triggerFileInput}
                      disabled={isUploadingResume}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 flex items-center space-x-2"
                    >
                      {isUploadingResume ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaUpload />
                      )}
                      <span>{isUploadingResume ? 'Uploading...' : 'Replace Resume'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <FaFileAlt className="text-6xl text-gray-400 mx-auto" />
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Upload Your Resume</h4>
                    <p className="text-gray-600 mb-4">Upload your resume in PDF, DOC, or DOCX format (Max 5MB)</p>
                    <button
                      onClick={triggerFileInput}
                      disabled={isUploadingResume}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2 mx-auto"
                    >
                      {isUploadingResume ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaUpload />
                      )}
                      <span>{isUploadingResume ? 'Uploading...' : 'Choose File'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="space-y-3">
            <a 
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaGithub className="text-xl" />
              <span>{profileData.github}</span>
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin className="text-xl" />
              <span>{profileData.linkedin}</span>
            </a>
            <a
              href={profileData.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaGlobe className="text-xl" />
              <span>{profileData.portfolio}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="space-y-4">
          {profileData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <FaMedal className="text-blue-500 text-xl mt-1" />
              <div>
                <div className="font-medium">{achievement.title}</div>
                <div className="text-sm text-gray-500">{achievement.description}</div>
                <div className="text-sm text-gray-400 mt-1">{achievement.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Preferences</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Preferred Roles</h4>
            <div className="flex flex-wrap gap-2">
              {profileData.preferredRoles.map((role, index) => (
                <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                  {role}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Work Mode</h4>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
              {profileData.workMode}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Preferred Locations</h4>
            <div className="flex flex-wrap gap-2">
              {profileData.preferredLocations.map((location, index) => (
                <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                  {location}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AppliedJobs = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <img 
        src="https://illustrations.popsy.co/gray/work-from-home.svg" 
        alt="No Applied Jobs"
        className="w-64 h-64 mx-auto mb-6"
      />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Jobs Applied Yet</h3>
      <p className="text-gray-600 mb-4">Start applying to jobs and track your applications here</p>
      <button 
        onClick={() => navigate('/browse-jobs')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Browse Jobs
      </button>
    </div>
  );

  const SavedJobs = () => (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <img 
        src="https://illustrations.popsy.co/gray/remote-work.svg" 
        alt="No Saved Jobs"
        className="w-64 h-64 mx-auto mb-6"
      />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Jobs</h3>
      <p className="text-gray-600 mb-4">Save jobs you're interested in to apply later</p>
      <button 
        onClick={() => navigate('/browse-jobs')}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Browse Jobs
      </button>
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setShowMobileSidebar(!showMobileSidebar)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaBars className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Intervuex</h1>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(showMobileSidebar || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className={`fixed lg:static inset-y-0 left-0 w-72 bg-white shadow-lg lg:shadow-none z-50 overflow-y-auto`}
            >
              <div className="p-6 space-y-6">
                {/* Profile Picture and Name */}
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.fullname}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{user.fullname}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {sidebarLinks.map((link) => (
                    <SidebarLink key={link.id} {...link} />
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 lg:px-8">
          {activeSection === 'profile' && <ProfileContent />}
          {activeSection === 'applied' && <AppliedJobs />}
          {activeSection === 'saved' && <SavedJobs />}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutPrompt(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeletePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeletePrompt(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle account deletion
                  setShowDeletePrompt(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
