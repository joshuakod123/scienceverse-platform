import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import SurveyPage from './pages/SurveyPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import PurchasePage from './pages/PurchasePage';
import DiscoverPage from './pages/DiscoverPage';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute';
import DevTools from './components/DevTools';

// Styles
import './styles/App.css';
import './styles/globals.css';


function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Protected routes */}
              <Route 
                path="/survey" 
                element={
                  <ProtectedRoute>
                    <SurveyPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/lesson/:id" 
                element={
                  <ProtectedRoute>
                    <LessonPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/purchase/:courseId" 
                element={
                  <ProtectedRoute>
                    <PurchasePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/discover" 
                element={
                  <ProtectedRoute>
                    <DiscoverPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
          
          {/* Dev tools for development environment only */}
          {process.env.NODE_ENV === 'development' && <DevTools />}
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;