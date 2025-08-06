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
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
      setError(null);
    }
  }, [API_BASE_URL]);

  const checkAuthStatus = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Verify token with backend
      const response = await axios.get(`${API_BASE_URL}/auth/verify`);
      if (response.data.user) {
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

  // Configure axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
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
                          '로그인 중 오류가 발생했습니다.';
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
                          '회원가입 중 오류가 발생했습니다.';
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

      const response = await axios.put(`${API_BASE_URL}/auth/profile`, profileData);
      
      setCurrentUser(response.data.user);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          '프로필 업데이트 중 오류가 발생했습니다.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setIsLoading(true);
      setError(null);

      await axios.put(`${API_BASE_URL}/auth/change-password`, {
        currentPassword,
        newPassword
      });
      
      return true;
    } catch (error) {
      console.error('Password change error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          '비밀번호 변경 중 오류가 발생했습니다.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      setIsLoading(true);
      setError(null);

      await axios.post(`${API_BASE_URL}/auth/reset-password`, { email });
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          '비밀번호 재설정 요청 중 오류가 발생했습니다.';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`);
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return false;
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
          fullName: '테스트 사용자',
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

  // Check for mock user in development
  const checkMockAuth = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !currentUser) {
      checkMockAuth();
    }
  }, [currentUser, checkMockAuth]);

  // Context value
  const value = {
    currentUser,
    isLoading,
    error,
    login: process.env.NODE_ENV === 'development' ? mockLogin : login,
    register: process.env.NODE_ENV === 'development' ? mockRegister : register,
    logout,
    updateProfile,
    changePassword,
    resetPassword,
    refreshToken,
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