import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Theme state - default to dark mode (space theme)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('brainbyte-theme');
    return saved ? JSON.parse(saved) : true; // Default to dark mode
  });

  // Course data based on the images
  const [courses] = useState([
    {
      id: 'ap-statistics',
      title: 'AP Statistics',
      subtitle: 'Master statistical thinking and data analysis',
      description: 'Explore data analysis, probability, statistical inference, and experimental design.',
      icon: '📊',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      rating: 4.9,
      students: '16,200 students',
      duration: '32 Weeks',
      difficulty: 80,
      tags: ['AP', 'Popular', 'New'],
      price: 'Free'
    },
    {
      id: 'ap-physics-1',
      title: 'AP Physics 1',
      subtitle: 'Algebra-based Physics',
      description: 'Covers algebra-based physics including kinematics, dynamics, waves, and basic electricity.',
      icon: '⚛️',
      color: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      rating: 4.9,
      students: '15,420 students',
      duration: '32 Weeks',
      difficulty: 70,
      tags: ['AP', 'Popular'],
      price: 'Free'
    },
    {
      id: 'ap-physics-2',
      title: 'AP Physics 2',
      subtitle: 'Advanced Algebra-based Physics',
      description: 'Covers fluid dynamics, thermodynamics, electromagnetism, optics, and atomic physics.',
      icon: '🔬',
      color: 'linear-gradient(135deg, #e17055 0%, #fd79a8 100%)',
      rating: 4.8,
      students: '12,100 students',
      duration: '32 Weeks',
      difficulty: 85,
      tags: ['AP', 'Popular'],
      price: 'Free'
    },
    {
      id: 'ap-physics-c-mechanics',
      title: 'AP Physics C: Mechanics',
      subtitle: 'Calculus-based Mechanics',
      description: 'In-depth study of mechanics using calculus, covering motion, force, energy, and momentum.',
      icon: '📐',
      color: 'linear-gradient(135deg, #fab1a0 0%, #fdcb6e 100%)',
      rating: 4.9,
      students: '8,920 students',
      duration: '16 Weeks',
      difficulty: 90,
      tags: ['AP', 'New'],
      price: 'Free'
    },
    {
      id: 'ap-physics-c-em',
      title: 'AP Physics C: E&M',
      subtitle: 'Calculus-based Electricity & Magnetism',
      description: 'Electricity and magnetism using calculus, up to Maxwell\'s equations.',
      icon: '⚡',
      color: 'linear-gradient(135deg, #5f3dc4 0%, #6c5ce7 100%)',
      rating: 4.8,
      students: '6,540 students',
      duration: '16 Weeks',
      difficulty: 98,
      tags: ['AP'],
      price: 'Free'
    },
    {
      id: 'ap-calculus-ab',
      title: 'AP Calculus AB',
      subtitle: 'Differential and Integral Calculus',
      description: 'Very focused class covering all AB calculus - differential calculus, integral calculus, and the fundamental theorem.',
      icon: '∫',
      color: 'linear-gradient(135deg, #00b894 0%, #81ecec 100%)',
      rating: 4.9,
      students: '22,100 students',
      duration: '32 Weeks',
      difficulty: 75,
      tags: ['AP', 'Popular'],
      price: 'Free'
    },
    {
      id: 'ap-calculus-bc',
      title: 'AP Calculus BC',
      subtitle: 'Advanced Calculus Topics',
      description: 'Covers all AB topics plus advanced calculus subjects like series, parametric functions, and polar coordinates.',
      icon: '∞',
      color: 'linear-gradient(135deg, #e17055 0%, #fab1a0 100%)',
      rating: 4.8,
      students: '14,200 students',
      duration: '32 Weeks',
      difficulty: 90,
      tags: ['AP', 'Popular'],
      price: 'Free'
    }
  ]);

  // User stats
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
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      headerBg: 'rgba(26, 26, 46, 0.95)',
      cardBg: 'rgba(255, 255, 255, 0.1)',
      textPrimary: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.7)',
      border: 'rgba(255, 255, 255, 0.2)'
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
    navigate('/profile');
  };

  const handleCourseClick = (courseId) => {
    // Navigate to course purchase or lesson page
    navigate(`/purchase?course=${courseId}`);
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      navigate('/auth');
    }
  };

  // Render course card
  const renderCourseCard = (course) => (
    <motion.div
      key={course.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => handleCourseClick(course.id)}
      style={{
        background: course.color,
        borderRadius: '20px',
        padding: '24px',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}
    >
      {/* Tags */}
      <div style={{ 
        position: 'absolute', 
        top: '16px', 
        left: '16px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {course.tags.map(tag => (
          <span
            key={tag}
            style={{
              background: tag === 'Popular' ? '#FFA726' : 
                         tag === 'New' ? '#66BB6A' : 'rgba(255, 255, 255, 0.9)',
              color: tag === 'AP' ? '#333' : 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Course Icon */}
      <div style={{
        fontSize: '48px',
        marginBottom: '16px',
        marginTop: '40px'
      }}>
        {course.icon}
      </div>

      {/* Course Info */}
      <h3 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: 'white'
      }}>
        {course.title}
      </h3>

      <p style={{
        fontSize: '16px',
        marginBottom: '12px',
        opacity: 0.9,
        fontWeight: '500'
      }}>
        {course.subtitle}
      </p>

      <p style={{
        fontSize: '14px',
        marginBottom: '20px',
        opacity: 0.8,
        lineHeight: '1.4'
      }}>
        {course.description}
      </p>

      {/* Course Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#FFD700' }}>⭐</span>
          <span style={{ fontWeight: 'bold' }}>{course.rating}</span>
        </div>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          textAlign: 'right'
        }}>
          {course.price}
        </div>
      </div>

      <div style={{
        fontSize: '14px',
        opacity: 0.8,
        marginBottom: '12px'
      }}>
        {course.students}
      </div>

      <div style={{
        fontSize: '14px',
        opacity: 0.8,
        marginBottom: '16px'
      }}>
        {course.duration}
      </div>

      {/* Difficulty Bar */}
      <div style={{ marginTop: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '14px', opacity: 0.9 }}>
            Difficulty: {course.difficulty}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div
            style={{
              width: `${course.difficulty}%`,
              height: '100%',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>
    </motion.div>
  );

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
        {/* Logo - 완전히 수정된 버전 */}
        <div style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: currentTheme.textPrimary,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          // Remove WebkitTextFillColor completely
          background: 'none'
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
                      ? 'rgba(26, 26, 46, 0.95)'
                      : 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '15px',
                    border: `1px solid ${currentTheme.border}`,
                    minWidth: '180px',
                    zIndex: 1000,
                    backdropFilter: 'blur(10px)',
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
            marginBottom: '40px'
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
            marginBottom: '30px'
          }}>
            Choose from our comprehensive AP and advanced courses
          </p>

          {/* Stats Display */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: isDarkMode ? '#00b894' : '#00b894'
              }}>
                {userStats.completedLessons}
              </div>
              <div style={{ fontSize: '12px', color: currentTheme.textSecondary }}>Completed</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '24px', 
                fontWeight: 'bold',
                color: isDarkMode ? '#74b9ff' : '#74b9ff'
              }}>
                {userStats.studyTimeHours}h {userStats.studyTimeMinutes}m
              </div>
              <div style={{ fontSize: '12px', color: currentTheme.textSecondary }}>Study Time</div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: isDarkMode ? '#fd79a8' : '#fd79a8'
              }}>
                {userStats.enrolledCourses.length}
              </div>
              <div style={{ fontSize: '12px', color: currentTheme.textSecondary }}>Enrolled</div>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <AnimatePresence>
              {courses.map(course => renderCourseCard(course))}
            </AnimatePresence>
          </div>

          {courses.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: currentTheme.textPrimary
              }}
            >
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔍</div>
              <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>
                No courses found
              </h3>
              <p style={{ opacity: 0.8 }}>
                Try a different search term or filter.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;