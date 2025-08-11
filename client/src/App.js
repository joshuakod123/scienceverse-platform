import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

// Pages
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import DiscoverPage from './pages/DiscoverPage';
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import PurchasePage from './pages/PurchasePage';
import SurveyPage from './pages/SurveyPage';

// Components
import ProtectedRoute from './components/Auth/ProtectedRoute';
import DevTools from './components/DevTools';

// Styles
import './styles/App.css';
import './styles/globals.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <CourseProvider>
        <Router>
          <>
            {!isLoaded && (
              <div className="loading-overlay">
                "The only way to learn mathematics is to do mathematics." - Paul Halmos
              </div>
            )}
            <div className={`App ${isLoaded ? 'loaded' : ''}`}>
              {/* Development Tools - 개발 환경에서만 표시 */}
              {process.env.NODE_ENV === 'development' && <DevTools />}
              
              <main>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/discover" element={<DiscoverPage />} />
                  <Route path="/survey" element={<SurveyPage />} />
                  
                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/lesson/:lessonId"
                    element={
                      <ProtectedRoute>
                        <LessonPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/purchase"
                    element={
                      <ProtectedRoute>
                        <PurchasePage />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Redirect unknown routes to landing page */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;