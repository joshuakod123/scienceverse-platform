import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading, mockLogin } = useContext(AuthContext);
  
  useEffect(() => {
    // For development only - create mock user if none exists
    if (!currentUser && process.env.NODE_ENV === 'development') {
      // Check if we want to bypass authentication (you can use localStorage to toggle this)
      const devBypass = localStorage.getItem('devAuthBypass') === 'true';
      
      if (devBypass) {
        const mockUser = {
          id: 'dev-123',
          username: 'DevUser',
          email: 'dev@example.com',
          role: 'user'
        };
        mockLogin(mockUser);
      }
    }
  }, [currentUser, mockLogin]);
  
  // If still checking authentication status, show loading
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  // If user is not authenticated, redirect to login page
  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }
  
  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;