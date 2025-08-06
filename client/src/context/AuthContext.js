import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - 환경에 따라 조정
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call logout endpoint if available
      await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage and state
      localStorage.removeItem('token');
      localStorage.removeItem('mock_user');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
      setError(null);
    }
  }, [API_BASE_URL]);

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Check for mock user in development
        if (process.env.NODE_ENV === 'development') {
          const mockUser = localStorage.getItem('mock_user');
          if (mockUser) {
            try {
              const parsedUser = JSON.parse(mockUser);
              setCurrentUser(parsedUser);
            } catch (error) {
              localStorage.removeItem('mock_user');
            }
          }
        }
        setIsLoading(false);
        return;
      }

      // Set axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Verify token with backend
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      
      if (response.data && response.data.success) {
        setCurrentUser(response.data.data);
      } else if (response.data.user) {
        setCurrentUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      // Remove invalid token
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  // Configure axios defaults and interceptors
  useEffect(() => {
    // Add response interceptor to handle token expiration
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  // Check if user is already logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      // Use mock login in development
      if (process.env.NODE_ENV === 'development') {
        return await mockLogin(email, password);
      }

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;

      // Store token
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Set user data
      setCurrentUser(user);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'An error occurred during login.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      // Use mock register in development
      if (process.env.NODE_ENV === 'development') {
        return await mockRegister(username, email, password);
      }

      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        email,
        password
      });

      const { token, user } = response.data;

      // Store token
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Set user data
      setCurrentUser(user);
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'An error occurred during registration.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Update mock user in development
      if (process.env.NODE_ENV === 'development' && currentUser) {
        const updatedUser = { ...currentUser, ...profileData };
        setCurrentUser(updatedUser);
        localStorage.setItem('mock_user', JSON.stringify(updatedUser));
        return true;
      }

      const response = await axios.put(`${API_BASE_URL}/auth/updatedetails`, {
        username: profileData.username,
        email: profileData.email,
        fullName: profileData.fullName,
        bio: profileData.bio,
        language: profileData.language,
        timezone: profileData.timezone,
        notifications: profileData.notifications
      });
      
      if (response.data && response.data.success) {
        setCurrentUser(response.data.data);
        return true;
      } else {
        throw new Error('Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update profile.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock success in development
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
      }

      const response = await axios.put(`${API_BASE_URL}/auth/updatepassword`, {
        currentPassword,
        newPassword
      });
      
      if (response.data && response.data.success) {
        return true;
      } else {
        throw new Error('Password update failed');
      }
    } catch (error) {
      console.error('Password update error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update password.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.post(`${API_BASE_URL}/auth/forgotpassword`, {
        email
      });
      
      if (response.data && response.data.success) {
        return { success: true, message: response.data.data };
      } else {
        throw new Error('Password reset request failed');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to send password reset email.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (resetToken, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.put(`${API_BASE_URL}/auth/resetpassword/${resetToken}`, {
        password
      });
      
      const { token, user } = response.data;

      // Store new token
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Set user data
      setCurrentUser(user);
      
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to reset password.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock authentication for development/testing
  const mockLogin = async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 'mock_user_1',
          username: 'testuser',
          email: email,
          fullName: 'Test User',
          bio: '',
          language: 'en',
          timezone: 'UTC',
          notifications: {
            email: true,
            push: true,
            marketing: false
          },
          profilePicture: null,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        setCurrentUser(mockUser);
        localStorage.setItem('mock_user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  const mockRegister = async (username, email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 'mock_user_' + Date.now(),
          username: username,
          email: email,
          fullName: username,
          bio: '',
          language: 'en',
          timezone: 'UTC',
          notifications: {
            email: true,
            push: true,
            marketing: false
          },
          profilePicture: null,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        setCurrentUser(mockUser);
        localStorage.setItem('mock_user', JSON.stringify(mockUser));
        resolve(true);
      }, 1000);
    });
  };

  // Context value
  const value = {
    currentUser,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword,
    clearError,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;