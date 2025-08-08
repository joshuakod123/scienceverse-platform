import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import SpaceCanvas from '../components/Space/SpaceCanvas';
import '../styles/AuthPage.css';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const { login, register, isLoading, error, currentUser, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }

    // Clear any previous errors when component mounts or mode changes
    return () => {
      if (clearError) clearError();
    };
  }, [currentUser, navigate, isLoginMode, clearError]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoginMode) {
      try {
        const success = await login(formData.email, formData.password);
        if (success) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      try {
        const success = await register(formData.username, formData.email, formData.password);
        if (success) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode(prevMode => !prevMode);
    // Reset form data when switching modes
    setFormData({
      email: '',
      password: '',
      username: ''
    });
    if (clearError) clearError();
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Instead of navigating away, we'll show a password reset form or notification
    alert("Password reset functionality will be implemented soon. Please contact support for assistance.");
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    // Here you would implement Google OAuth authentication
    alert("Google authentication will be implemented soon.");
    // For development purposes, you could use a mock login:
    // const mockUser = { id: 'google-123', username: 'GoogleUser', email: 'google@example.com' };
    // login(mockUser.email, 'googleauth');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left Panel - Space Theme */}
        <motion.div
          className="auth-left-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <SpaceCanvas />
          <div className="auth-overlay">
            <div className="auth-header">
              <span className="logo-text">ScienceVerse</span>
              <div className="auth-nav-buttons">
                <button
                  onClick={() => navigate('/')}
                  className="btn-text"
                >
                  Home
                </button>
                <button
                  onClick={toggleAuthMode}
                  className="btn-primary-small"
                >
                  {isLoginMode ? 'Sign Up' : 'Login'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Login Form */}
        <motion.div
          className="auth-right-panel"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="auth-brand">
            <h2>SCIENCEVERSE</h2>
            <div className="language-selector">
              <span className="flag">🇬🇧</span>
              <span>EN</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>

          <motion.div
            className="auth-content"
            variants={itemVariants}
          >
            <h1>{isLoginMode ? 'Welcome Back' : 'Join Us'}</h1>
            <p>{isLoginMode ? 'Login to continue your journey' : 'Create an account to start learning'}</p>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLoginMode && (
                <motion.div className="form-group" variants={itemVariants}>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required={!isLoginMode}
                  />
                </motion.div>
              )}

              <motion.div className="form-group" variants={itemVariants}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>

              <motion.div className="form-group" variants={itemVariants}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>

              {isLoginMode && (
                <motion.div className="forgot-password" variants={itemVariants}>
                  <button type="button" onClick={handleForgotPassword} className="switch-btn">Forgot password?</button>
                </motion.div>
              )}

              <motion.div className="divider" variants={itemVariants}>
                <span className="line"></span>
                <span className="divider-text">or</span>
                <span className="line"></span>
              </motion.div>

              <motion.button
                type="button"
                className="btn-google"
                variants={itemVariants}
                onClick={handleGoogleLogin}
              >
                <div className="google-icon">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                {isLoginMode ? 'Login with Google' : 'Sign up with Google'}
              </motion.button>

              <motion.button
                type="submit"
                className="btn-submit"
                variants={itemVariants}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : isLoginMode ? 'Login' : 'Sign Up'}
              </motion.button>
            </form>

            {error && <p className="error-message">{error}</p>}

            <motion.div className="auth-switch" variants={itemVariants}>
              <p>
                {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={toggleAuthMode} className="switch-btn">
                  {isLoginMode ? 'Sign up' : 'Login'}
                </button>
              </p>
            </motion.div>

            <motion.div className="social-links" variants={itemVariants}>
              <button type="button" className="social-icon facebook">f</button>
              <button type="button" className="social-icon twitter">t</button>
              <button type="button" className="social-icon linkedin">in</button>
              <button type="button" className="social-icon instagram">ig</button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;