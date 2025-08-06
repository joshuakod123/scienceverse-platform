import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import DiscoverPage from './pages/DiscoverPage';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = React.useContext(AuthContext);
  
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
        color: '#EFDFBB'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #333',
            borderTop: '3px solid #EFDFBB',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }
  
  return currentUser ? children : <Navigate to="/auth" replace />;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { currentUser, isLoading } = React.useContext(AuthContext);
  
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
        color: '#EFDFBB'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #333',
            borderTop: '3px solid #EFDFBB',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }
  
  return currentUser ? <Navigate to="/dashboard" replace /> : children;
};

// Main App Component
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              } 
            />
            
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
              path="/discover" 
              element={
                <ProtectedRoute>
                  <DiscoverPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Placeholder routes for future pages */}
            <Route 
              path="/course/:courseId" 
              element={
                <ProtectedRoute>
                  <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
                    color: '#EFDFBB',
                    textAlign: 'center',
                    fontSize: '24px'
                  }}>
                    <div>
                      <h2>🚧 강의 페이지 준비 중 🚧</h2>
                      <p>곧 멋진 강의 페이지로 찾아뵙겠습니다!</p>
                      <button 
                        onClick={() => window.history.back()}
                        style={{
                          background: 'linear-gradient(135deg, #722F37, #E85A4F)',
                          border: 'none',
                          color: '#EFDFBB',
                          padding: '15px 30px',
                          borderRadius: '25px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '600',
                          marginTop: '20px'
                        }}
                      >
                        돌아가기
                      </button>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
                    color: '#EFDFBB',
                    textAlign: 'center',
                    fontSize: '24px'
                  }}>
                    <div>
                      <h2>👤 프로필 페이지 준비 중 👤</h2>
                      <p>개인 맞춤형 프로필 페이지를 준비하고 있습니다!</p>
                      <button 
                        onClick={() => window.history.back()}
                        style={{
                          background: 'linear-gradient(135deg, #722F37, #E85A4F)',
                          border: 'none',
                          color: '#EFDFBB',
                          padding: '15px 30px',
                          borderRadius: '25px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '600',
                          marginTop: '20px'
                        }}
                      >
                        돌아가기
                      </button>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
                    color: '#EFDFBB',
                    textAlign: 'center',
                    fontSize: '24px'
                  }}>
                    <div>
                      <h2>⚙️ 설정 페이지 준비 중 ⚙️</h2>
                      <p>세부적인 설정 옵션들을 준비하고 있습니다!</p>
                      <button 
                        onClick={() => window.history.back()}
                        style={{
                          background: 'linear-gradient(135deg, #722F37, #E85A4F)',
                          border: 'none',
                          color: '#EFDFBB',
                          padding: '15px 30px',
                          borderRadius: '25px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '600',
                          marginTop: '20px'
                        }}
                      >
                        돌아가기
                      </button>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/achievements" 
              element={
                <ProtectedRoute>
                  <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
                    color: '#EFDFBB',
                    textAlign: 'center',
                    fontSize: '24px'
                  }}>
                    <div>
                      <h2>🏆 업적 페이지 준비 중 🏆</h2>
                      <p>당신의 학습 여정을 기록할 업적 시스템을 준비하고 있습니다!</p>
                      <button 
                        onClick={() => window.history.back()}
                        style={{
                          background: 'linear-gradient(135deg, #722F37, #E85A4F)',
                          border: 'none',
                          color: '#EFDFBB',
                          padding: '15px 30px',
                          borderRadius: '25px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '600',
                          marginTop: '20px'
                        }}
                      >
                        돌아가기
                      </button>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/checkout/:courseId" 
              element={
                <ProtectedRoute>
                  <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
                    color: '#EFDFBB',
                    textAlign: 'center',
                    fontSize: '24px'
                  }}>
                    <div>
                      <h2>💳 결제 페이지 준비 중 💳</h2>
                      <p>안전한 결제 시스템을 준비하고 있습니다!</p>
                      <button 
                        onClick={() => window.history.back()}
                        style={{
                          background: 'linear-gradient(135deg, #722F37, #E85A4F)',
                          border: 'none',
                          color: '#EFDFBB',
                          padding: '15px 30px',
                          borderRadius: '25px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '600',
                          marginTop: '20px'
                        }}
                      >
                        돌아가기
                      </button>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div style={{
                  minHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
                  color: '#EFDFBB',
                  textAlign: 'center',
                  fontSize: '24px'
                }}>
                  <div>
                    <h2>🌌 우주 어딘가에서 길을 잃었네요 🌌</h2>
                    <p>찾으시는 페이지가 존재하지 않습니다.</p>
                    <button 
                      onClick={() => window.location.href = '/dashboard'}
                      style={{
                        background: 'linear-gradient(135deg, #722F37, #E85A4F)',
                        border: 'none',
                        color: '#EFDFBB',
                        padding: '15px 30px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginTop: '20px'
                      }}
                    >
                      홈으로 돌아가기 🏠
                    </button>
                  </div>
                </div>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;