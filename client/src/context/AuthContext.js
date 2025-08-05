import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check if user is already logged in (via token in localStorage)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // Configure axios with token
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        
        // API URL based on environment
        const baseUrl = process.env.NODE_ENV === 'production' 
          ? '/api/auth/user'
          : 'http://localhost:5001/api/auth/user';
        
        // Verify token and get user data
        const response = await axios.get(baseUrl, config);
        
        setCurrentUser(response.data.data || response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth verification error:', error);
        localStorage.removeItem('authToken');
        setIsLoading(false);
        setError('Authentication failed. Please login again.');
      }
    };
    
    checkLoggedIn();
  }, []);
  
  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      // API URL based on environment
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? '/api/auth/login'
        : 'http://localhost:5001/api/auth/login';
      
      const response = await axios.post(
        baseUrl,
        { email, password },
        config
      );
      
      localStorage.setItem('authToken', response.data.token);
      setCurrentUser(response.data.user);
      setIsLoading(false);
      
      return true;
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error ||
                           'Login failed. Please check your credentials.';
      setError(errorMessage);
      return false;
    }
  };
  
  // Register function
  const register = async (username, email, password) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      // API URL based on environment
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? '/api/auth/register'
        : 'http://localhost:5001/api/auth/register';
      
      const response = await axios.post(
        baseUrl,
        { username, email, password },
        config
      );
      
      localStorage.setItem('authToken', response.data.token);
      setCurrentUser(response.data.user);
      setIsLoading(false);
      
      return true;
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error ||
                           'Registration failed. Please try again.';
      setError(errorMessage);
      return false;
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setCurrentUser(null);
  };
  
  // Clear error message
  const clearError = () => {
    setError(null);
  };
  
  // For development/testing - mock login without backend
  const mockLogin = (userData) => {
    const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
    localStorage.setItem('authToken', mockToken);
    localStorage.setItem('mockUser', JSON.stringify(userData));
    setCurrentUser(userData);
  };
  
  // Password reset request
  const requestPasswordReset = async (email) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      // API URL based on environment
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? '/api/auth/forgotpassword'
        : 'http://localhost:5001/api/auth/forgotpassword';
      
      const response = await axios.post(
        baseUrl,
        { email },
        config
      );
      
      setIsLoading(false);
      return { success: true, message: response.data.data || 'Password reset email sent' };
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error ||
                           'Failed to request password reset. Please try again.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  
  // Google OAuth login - this would be implemented with a proper OAuth flow
  const googleLogin = async () => {
    // In a real implementation, this would redirect to Google OAuth
    // For development, we can simulate with a mock login
    if (process.env.NODE_ENV === 'development') {
      const mockGoogleUser = {
        id: 'google-' + Math.random().toString(36).substring(2),
        username: 'GoogleUser',
        email: 'google.user@example.com',
        role: 'user'
      };
      mockLogin(mockGoogleUser);
      return true;
    }
    
    // TODO: Implement real Google OAuth flow for production
    return false;
  };
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
        mockLogin,
        requestPasswordReset,
        googleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;