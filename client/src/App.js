// File: client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DiscoverPage from './pages/DiscoverPage';
import ProfilePage from './pages/ProfilePage';
import LessonPage from './pages/LessonPage';

// AP Statistics Course Pages
import APStatistics from './pages/courses/APStatistics';
import APStatisticsUnit from './pages/courses/APStatisticsUnit';
import APStatisticsTopic from './pages/courses/APStatisticsTopic';

// Alternative AP Statistics Pages (if you want to use these instead)
// import APStatisticsIndexPage from './pages/courses/ap-statistics/index.js';
// import APStatisticsUnitPage from './pages/courses/ap-statistics/[unit].js';

// Styles
import './styles/App.css';

// Temporary CoursePage component for other courses
const CoursePage = () => {
    const { id } = useParams();
    return (
        <div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>
            <h2>Course Page for: {id}</h2>
            <p>Build this page for other courses.</p>
        </div>
    );
};

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
              <Route path="/dashboard" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/discover" element={<ProtectedRoute><DiscoverPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              
              {/* AP Statistics Course Routes */}
              <Route 
                path="/courses/ap-statistics" 
                element={<ProtectedRoute><APStatistics /></ProtectedRoute>} 
              />
              <Route 
                path="/courses/ap-statistics/:unitNumber" 
                element={<ProtectedRoute><APStatisticsUnit /></ProtectedRoute>} 
              />
              <Route 
                path="/courses/ap-statistics/:unitNumber/:topicId" 
                element={<ProtectedRoute><APStatisticsTopic /></ProtectedRoute>} 
              />
              
              {/* Alternative routing structure (comment out the above and uncomment these if you prefer) */}
              {/* 
              <Route 
                path="/courses/ap-statistics" 
                element={<ProtectedRoute><APStatisticsIndexPage /></ProtectedRoute>} 
              />
              <Route 
                path="/courses/ap-statistics/unit/:unitId" 
                element={<ProtectedRoute><APStatisticsUnitPage /></ProtectedRoute>} 
              />
              */}
              
              {/* Generic Course & Lesson Routes */}
              <Route 
                path="/course/:id" 
                element={<ProtectedRoute><CoursePage /></ProtectedRoute>} 
              />
              <Route 
                path="/lesson/:id" 
                element={<ProtectedRoute><LessonPage /></ProtectedRoute>} 
              />
              
              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;