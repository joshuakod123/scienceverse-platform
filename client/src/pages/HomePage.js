import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import SpaceCanvas from '../components/Space/SpaceCanvas';
import '../styles/Dashboard.css';

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const profileMenuRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userCourses] = useState([]); // Mock empty courses for now

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    
    // Loading simulation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [currentUser, navigate]);

  // Handle clicks outside the profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Profile menu position adjustment
  useEffect(() => {
    if (showProfileMenu && profileMenuRef.current) {
      const menu = profileMenuRef.current.querySelector('.profile-menu');
      if (menu) {
        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        if (rect.right > viewportWidth) {
          const overflow = rect.right - viewportWidth + 20; // 20px margin
          menu.style.transform = `translateX(-${overflow}px)`;
        }
      }
    }
  }, [showProfileMenu]);

  // Enhanced logout function with confirmation
  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;

    try {
      setShowProfileMenu(false);
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  // Profile menu handlers
  const handleProfileClick = () => {
    setShowProfileMenu(prevState => !prevState);
  };

  const handleProfilePageClick = () => {
    setShowProfileMenu(false);
    navigate('/profile');
  };

  const handleDiscoverClick = () => {
    navigate('/discover');
  };

  // User display name
  const userDisplayName = currentUser?.username || currentUser?.fullName || 'User';

  // Mock recommended courses
  const recommendedCourses = [
    {
      id: 'ap-physics-1',
      title: 'AP Physics 1',
      subtitle: 'Algebra-based Physics Fundamentals',
      instructor: 'Dr. Richard Feynman',
      lessons: 25,
      students: 15420,
      rating: 4.9,
      difficulty: 'Intermediate',
      color: 'linear-gradient(135deg, #722F37 0%, #E85A4F 100%)',
      icon: '⚡'
    },
    {
      id: 'ap-physics-2',
      title: 'AP Physics 2',
      subtitle: 'Advanced Algebra-based Physics',
      instructor: 'Dr. Richard Feynman',
      lessons: 28,
      students: 12100,
      rating: 4.8,
      difficulty: 'Advanced',
      color: 'linear-gradient(135deg, #1E0538 0%, #722F37 100%)',
      icon: '🔬'
    },
    {
      id: 'ap-physics-c-mechanics',
      title: 'AP Physics C: Mechanics',
      subtitle: 'Calculus-based Mechanics',
      instructor: 'Dr. Isaac Newton',
      lessons: 20,
      students: 8920,
      rating: 4.9,
      difficulty: 'Advanced',
      color: 'linear-gradient(135deg, #0B1026 0%, #1E0538 100%)',
      icon: '🧮'
    }
  ];

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        <SpaceCanvas />
        <div style={{
          position: 'absolute',
          color: '#EFDFBB',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Loading BrainByte...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
      color: '#EFDFBB',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(15px)',
          background: 'rgba(11, 16, 38, 0.9)',
          borderBottom: '1px solid rgba(239, 223, 187, 0.2)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            background: 'linear-gradient(135deg, #EFDFBB, #E85A4F)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            BrainByte
          </h1>
          <span style={{ fontSize: '18px', opacity: 0.7 }}>
            AP Physics & Calculus
          </span>
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '20px' }}>
          <button 
            onClick={handleDiscoverClick}
            style={{
              background: 'rgba(239, 223, 187, 0.1)',
              border: '1px solid rgba(239, 223, 187, 0.3)',
              borderRadius: '12px',
              padding: '10px 16px',
              color: '#EFDFBB',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease'
            }}
          >
            Discover More →
          </button>
        </nav>

        {/* Profile Section */}
        <div 
          ref={profileMenuRef}
          style={{ position: 'relative' }}
        >
          <button
            onClick={handleProfileClick}
            style={{
              background: 'rgba(239, 223, 187, 0.1)',
              border: '1px solid rgba(239, 223, 187, 0.3)',
              borderRadius: '25px',
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{
              width: '35px',
              height: '35px',
              background: 'linear-gradient(135deg, #722F37, #E85A4F)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EFDFBB',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
            <span style={{
              color: '#EFDFBB',
              fontWeight: '500',
              fontSize: '14px'
            }}>
              {userDisplayName}
            </span>
          </button>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 12px)',
                  right: '10px',
                  background: 'rgba(11, 16, 38, 0.98)',
                  border: '1px solid rgba(239, 223, 187, 0.3)',
                  borderRadius: '15px',
                  padding: '12px 8px',
                  width: '200px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6), 0 5px 15px rgba(0, 0, 0, 0.4)',
                  zIndex: 2000
                }}
                className="profile-menu"
              >
                <button
                  onClick={handleProfilePageClick}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: '#EFDFBB',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    borderRadius: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(239, 223, 187, 0.1)'}
                  onMouseLeave={(e) => e.target.style.background = 'none'}
                >
                  👤 Profile Settings
                </button>
                
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: '#E85A4F',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    borderRadius: '8px',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(232, 90, 79, 0.1)'}
                  onMouseLeave={(e) => e.target.style.background = 'none'}
                >
                  🚪 Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        padding: '0 20px'
      }}>
        {/* Learning Progress Summary */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: '40px', marginTop: '40px' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '30px',
            backdropFilter: 'blur(10px)'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              color: 'white'
            }}>
              📊 Learning Progress
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FFD700' }}>
                  {userCourses.length}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Enrolled Courses</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>
                  0%
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Overall Progress</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF6B6B' }}>
                  0
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>AP Courses</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4ECDC4' }}>
                  0
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Online Courses</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Welcome Message */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ 
            textAlign: 'center', 
            marginBottom: '60px',
            padding: '60px 40px'
          }}
        >
          <div style={{ marginBottom: '60px' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚀</div>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #EFDFBB, #E85A4F)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Start Your AP Learning Journey!
            </h1>
            <p style={{ 
              fontSize: '20px', 
              opacity: 0.8, 
              maxWidth: '600px', 
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Ready to tackle Physics and Calculus AP courses? Our interactive 3D animations and AI tutoring will guide you every step of the way!
            </p>
          </div>
        </motion.section>

        {/* Recommended AP Courses */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ marginBottom: '80px' }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              ⭐ Recommended AP Courses
            </h2>
            <button
              onClick={handleDiscoverClick}
              style={{
                background: 'none',
                border: 'none',
                color: '#E85A4F',
                fontSize: '16px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              View All →
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                style={{
                  background: course.color,
                  borderRadius: '20px',
                  padding: '30px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontSize: '32px' }}>{course.icon}</span>
                    <span style={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '20px',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      AP
                    </span>
                  </div>
                  
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 'bold', 
                    marginBottom: '8px',
                    color: 'white'
                  }}>
                    {course.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: '14px', 
                    opacity: 0.9, 
                    marginBottom: '16px',
                    color: 'white'
                  }}>
                    {course.subtitle}
                  </p>
                  
                  <div style={{ 
                    fontSize: '13px', 
                    opacity: 0.8,
                    marginBottom: '20px',
                    color: 'white'
                  }}>
                    {course.instructor} • {course.lessons} lessons
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '8px',
                      color: 'white'
                    }}>
                      <span>⭐ {course.rating}</span>
                      <span style={{ opacity: 0.7 }}>({course.students.toLocaleString()} students)</span>
                    </div>
                    
                    <button style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Enroll
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;