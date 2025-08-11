import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  // Theme state - default to dark mode (space theme)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('brainbyte-theme');
    return saved ? JSON.parse(saved) : true; // Default to dark mode
  });

  // Stateful user data - currently at 0 since user just started
  const [userStats] = useState({
    completedLessons: 0,
    studyTimeHours: 0,
    studyTimeMinutes: 0,
    enrolledCourses: []
  });
  
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Theme persistence
  useEffect(() => {
    localStorage.setItem('brainbyte-theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Theme configuration
  const themes = {
    dark: {
      name: 'Space Mode',
      icon: '🌌',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      headerBg: 'rgba(30, 60, 114, 0.95)',
      cardBg: 'rgba(239, 223, 187, 0.1)',
      textPrimary: '#EFDFBB',
      textSecondary: 'rgba(239, 223, 187, 0.8)',
      border: 'rgba(239, 223, 187, 0.2)'
    },
    light: {
      name: 'Solar Mode',
      icon: '☀️',
      background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 50%, #fd79a8 100%)',
      headerBg: 'rgba(255, 255, 255, 0.95)',
      cardBg: 'rgba(255, 255, 255, 0.8)',
      textPrimary: '#2d3436',
      textSecondary: '#636e72',
      border: 'rgba(0, 0, 0, 0.1)'
    }
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  // Navigation functions
  const navigateToProfile = () => {
    setShowProfileDropdown(false);
    // Simulate navigation to profile page
    alert('Navigating to Profile Page...\n(In real app, this would use React Router)');
    console.log('Navigate to /profile');
  };

  const navigateToDiscover = () => {
    // Simulate navigation to discover page  
    alert('Navigating to Discover Page...\n(In real app, this would use React Router)');
    console.log('Navigate to /discover');
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    // In a real app, this would handle logout logic
    console.log('Logout clicked');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      color: currentTheme.textPrimary,
      fontFamily: 'Inter, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 40px',
        borderBottom: `1px solid ${currentTheme.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: currentTheme.headerBg,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          fontSize: '28px',
          fontWeight: 'bold',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #EFDFBB, #E85A4F)'
            : 'linear-gradient(135deg, #2d3436, #636e72)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          BrainByte
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: currentTheme.cardBg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '15px',
              padding: '10px 15px',
              cursor: 'pointer',
              color: currentTheme.textPrimary,
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            {currentTheme.icon} {currentTheme.name}
          </motion.button>

          {/* Profile Dropdown */}
          <div 
            className="profile-dropdown-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              position: 'relative'
            }}
          >
            <div 
              style={{
                background: currentTheme.cardBg,
                padding: '10px 20px',
                borderRadius: '15px',
                border: `1px solid ${currentTheme.border}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #E85A4F, #722F37)'
                  : 'linear-gradient(135deg, #fd79a8, #fdcb6e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                T
              </div>
              testuser ▼
            </div>
            
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute',
                    top: '60px',
                    right: '0',
                    background: isDarkMode 
                      ? 'rgba(30, 60, 114, 0.95)' 
                      : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${currentTheme.border}`,
                    borderRadius: '15px',
                    padding: '10px 0',
                    minWidth: '200px',
                    zIndex: 1000,
                    boxShadow: isDarkMode 
                      ? '0 8px 25px rgba(0, 0, 0, 0.3)'
                      : '0 8px 25px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div 
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                      fontSize: '14px',
                      color: currentTheme.textPrimary
                    }}
                    onMouseEnter={(e) => e.target.style.background = currentTheme.cardBg}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    onClick={navigateToProfile}
                  >
                    👤 View Profile
                  </div>
                  <div 
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                      fontSize: '14px',
                      color: currentTheme.textPrimary
                    }}
                    onMouseEnter={(e) => e.target.style.background = currentTheme.cardBg}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    onClick={() => {
                      console.log('Navigate to settings');
                      setShowProfileDropdown(false);
                    }}
                  >
                    ⚙️ Settings
                  </div>
                  <div 
                    style={{
                      padding: '12px 20px',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                      fontSize: '14px',
                      borderTop: `1px solid ${currentTheme.border}`,
                      marginTop: '8px',
                      color: currentTheme.textPrimary
                    }}
                    onMouseEnter={(e) => e.target.style.background = currentTheme.cardBg}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px' }}>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            marginBottom: '60px'
          }}
        >
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: currentTheme.textPrimary
          }}>
            Hello, testuser! 🚀
          </h1>
          <p style={{
            fontSize: '18px',
            color: currentTheme.textSecondary,
            marginBottom: '40px'
          }}>
            Ready to explore the universe of knowledge today?
          </p>

          {/* Quick Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToDiscover}
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              🔍 Explore Courses
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Continue Learning feature coming soon!')}
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)'
                  : 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 30px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              📚 Continue Learning
            </button>
          </div>

          {/* Current Stats */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            marginBottom: '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: isDarkMode ? '#4CAF50' : '#00b894'
              }}>
                {userStats.completedLessons}
              </div>
              <div style={{ fontSize: '14px', color: currentTheme.textSecondary }}>Completed Lessons</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px', 
                fontWeight: 'bold',
                color: isDarkMode ? '#FF6B6B' : '#e17055'
              }}>
                {userStats.studyTimeHours}h {userStats.studyTimeMinutes}m
              </div>
              <div style={{ fontSize: '14px', color: currentTheme.textSecondary }}>This Week's Study Time</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px', 
                fontWeight: 'bold',
                color: isDarkMode ? '#4ECDC4' : '#00cec9'
              }}>
                {userStats.enrolledCourses.length}
              </div>
              <div style={{ fontSize: '14px', color: currentTheme.textSecondary }}>Enrolled Courses</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: '60px' }}
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
            color: currentTheme.textPrimary
          }}>
            Quick Overview 📊
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Recent Activity */}
            <div style={{
              background: currentTheme.cardBg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '20px',
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>📈</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 10px 0',
                color: currentTheme.textPrimary
              }}>
                Recent Activity
              </h3>
              <p style={{
                fontSize: '14px',
                color: currentTheme.textSecondary,
                margin: 0
              }}>
                No recent activity yet. Start your first lesson!
              </p>
            </div>

            {/* Achievements */}
            <div style={{
              background: currentTheme.cardBg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '20px',
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏆</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 10px 0',
                color: currentTheme.textPrimary
              }}>
                Achievements
              </h3>
              <p style={{
                fontSize: '14px',
                color: currentTheme.textSecondary,
                margin: 0
              }}>
                Start learning to unlock achievements!
              </p>
            </div>

            {/* Study Schedule */}
            <div style={{
              background: currentTheme.cardBg,
              border: `1px solid ${currentTheme.border}`,
              borderRadius: '20px',
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>📅</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 10px 0',
                color: currentTheme.textPrimary
              }}>
                Study Schedule
              </h3>
              <p style={{
                fontSize: '14px',
                color: currentTheme.textSecondary,
                margin: 0
              }}>
                Set up your personalized study plan
              </p>
            </div>
          </div>
        </motion.div>

        {/* Getting Started Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '30px',
            textAlign: 'center',
            color: currentTheme.textPrimary
          }}>
            Getting Started 🎯
          </h2>
          
          <div style={{
            background: currentTheme.cardBg,
            border: `1px solid ${currentTheme.border}`,
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              margin: '0 0 20px 0',
              color: currentTheme.textPrimary
            }}>
              Welcome to BrainByte! 🎉
            </h3>
            <p style={{
              fontSize: '16px',
              color: currentTheme.textSecondary,
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              You haven't enrolled in any courses yet. Explore our AP Physics and Calculus courses designed specifically for high school students. Start your journey to academic excellence!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToDiscover}
              style={{
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #E85A4F 0%, #722F37 100%)'
                  : 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)',
                border: 'none',
                borderRadius: '15px',
                padding: '15px 40px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
              }}
            >
              🚀 Start Exploring Courses
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;