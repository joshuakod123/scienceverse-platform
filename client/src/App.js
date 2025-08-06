import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import CoursePage from './pages/CoursePage';
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import ProgressPage from './pages/ProgressPage';

// Styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              
              <Route path="/discover" element={
                <ProtectedRoute>
                  <DiscoverPage />
                </ProtectedRoute>
              } />
              
              <Route path="/course/:id" element={
                <ProtectedRoute>
                  <CoursePage />
                </ProtectedRoute>
              } />
              
              <Route path="/lesson/:id" element={
                <ProtectedRoute>
                  <LessonPage />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              <Route path="/progress" element={
                <ProtectedRoute>
                  <ProgressPage />
                </ProtectedRoute>
              } />
              
              <Route path="/courses" element={
                <ProtectedRoute>
                  <DiscoverPage />
                </ProtectedRoute>
              } />
              
              {/* Redirects for common paths */}
              <Route path="/home" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Navigate to="/auth" replace />} />
              <Route path="/register" element={<Navigate to="/auth" replace />} />
              
              {/* 404 - Redirect to dashboard if authenticated, otherwise to landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;