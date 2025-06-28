import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Welcome from './Pages/Welcome';
import Profile from './Pages/Profile';
import ATSChecker from './Pages/ATSChecker';
import { Toaster } from 'sonner';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Jobs from './Pages/Jobs';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      {/* Toast Container */}
      <Toaster 
        position="top-right"
        richColors
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        {/* Protected Routes */}
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ats-checker"
          element={
            <ProtectedRoute>
              <ATSChecker />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
