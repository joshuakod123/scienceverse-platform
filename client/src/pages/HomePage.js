import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Handle clicks outside the user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    // Simulate fetching lessons from API
    setTimeout(() => {
      const mockLessons = [
        {
          id: 1,
          title: 'CONSTRUCT-IVISM',
          subtitle: 'Art should only serve society',
          author: 'Steven Johnson, PhD',
          image: '/assets/images/constructivism.jpg',
          listeners: '15K',
          completed: true
        },
        {
          id: 2,
          title: 'RENAISSANCE',
          subtitle: 'Secularism and individualism of the era',
          author: 'Steven Johnson, PhD',
          image: '/assets/images/renaissance.jpg',
          listeners: '12K',
          progress: 6,
          total: 10,
          duration: '24 min',
          completed: false
        },
        {
          id: 3,
          title: 'MATISSE',
          subtitle: 'An emotional affair',
          author: 'Steven Johnson, PhD',
          image: '/assets/images/matisse.jpg',
          listeners: '8K',
          completed: false
        },
        {
          id: 4,
          title: 'VAN GOGH',
          subtitle: 'Lonely genius',
          author: 'Steven Johnson, PhD',
          image: '/assets/images/vangogh.jpg',
          listeners: '10K',
          completed: false
        },
        {
          id: 5,
          title: 'CUBISM',
          subtitle: 'Breaking the perspective',
          author: 'Steven Johnson, PhD',
          image: '/assets/images/cubism.jpg',
          listeners: '7K',
          completed: true
        }
      ];
      
      setLessons(mockLessons);
      setLoading(false);
      // Set progress (11 out of 15 lessons completed)
      setProgress(11/15);
    }, 1000);
  }, []);
  
  // Handle logout function
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="home-page">
      <header className="app-header">
        <div className="logo">
          <h1>ART<span>course</span></h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <i className="search-icon">🔍</i>
        </div>
        <nav className="main-nav">
          <Link to="/lessons" className="nav-link active">My Lessons</Link>
          <Link to="/browse" className="nav-link">Browse</Link>
          <Link to="/community" className="nav-link">Community</Link>
        </nav>
        <div className="user-controls">
          <button className="notification-btn">🔔</button>
          <button className="cart-btn">🛒</button>
          
          {/* User avatar with dropdown menu */}
          <div className="user-dropdown" ref={userMenuRef}>
            <div 
              className="user-avatar" 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ cursor: 'pointer' }}
            >
              <img src="/assets/images/avatar.jpg" alt="User profile" />
            </div>
            
            {/* User dropdown menu */}
            {showUserMenu && (
              <div className="user-menu">
                <button className="user-menu-item">Profile</button>
                <button className="user-menu-item">Settings</button>
                <button 
                  className="user-menu-item logout" 
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="home-content">
        <motion.div 
          className="lessons-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-heading">
            <h2>Your lessons (5)</h2>
            <button className="show-all-btn">Show all</button>
          </div>
          
          <div className="progress-container">
            <div className="progress-text">
              <span className="progress-count">11</span>
              <span className="progress-total">/15 lessons completed</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading your lessons...</p>
          </div>
        ) : (
          <motion.div 
            className="lessons-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {lessons.map(lesson => (
              <motion.div 
                key={lesson.id} 
                className="lesson-card"
                variants={itemVariants}
              >
                <div className="lesson-image">
                  <img src={lesson.image} alt={lesson.title} />
                  {lesson.progress && (
                    <div className="lesson-progress">
                      <span>Lesson {lesson.progress}/{lesson.total} • {lesson.duration}</span>
                      <button className="continue-btn">CONTINUE WATCHING</button>
                    </div>
                  )}
                </div>
                <div className="lesson-content">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <p className="lesson-subtitle">{lesson.subtitle}</p>
                  <div className="lesson-meta">
                    <p className="lesson-author">by {lesson.author}</p>
                    <div className="lesson-stats">
                      <div className="avatars">
                        <span className="avatar-stack"></span>
                      </div>
                      <span className="listeners">{lesson.listeners} listeners</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default HomePage;