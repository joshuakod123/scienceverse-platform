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
import APStatisticsIndexPage from './pages/courses/ap-statistics/index.js';
import APStatisticsUnitPage from './pages/courses/ap-statistics/[unit].js'; // 새로 만든 유닛 페이지 import

// Styles
import './styles/App.css';

// 임시 CoursePage 컴포넌트
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
              
              {/* Course & Lesson Routes */}
              <Route path="/courses/ap-statistics" element={<ProtectedRoute><APStatisticsIndexPage /></ProtectedRoute>} />
              {/* ▼▼▼▼▼ 새로운 유닛 페이지를 위한 경로 추가 ▼▼▼▼▼ */}
              <Route path="/courses/ap-statistics/unit/:unitId" element={<ProtectedRoute><APStatisticsUnitPage /></ProtectedRoute>} />
              {/* ▲▲▲▲▲ 새로운 유닛 페이지를 위한 경로 추가 ▲▲▲▲▲ */}

              <Route path="/course/:id" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
              <Route path="/lesson/:id" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;