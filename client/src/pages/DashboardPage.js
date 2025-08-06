import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import SpaceCanvas from '../components/Space/SpaceCanvas';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const profileMenuRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [streak] = useState(7);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [totalXP] = useState(2450);
  const [currentLevel] = useState(12);
  const [completedLessons] = useState(89);

  // Redirect if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    
    // 로딩 시뮬레이션
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
        
        // 메뉴가 화면 밖으로 나가는지 확인
        if (rect.right > viewportWidth) {
          const overflow = rect.right - viewportWidth + 20; // 20px 여유공간
          menu.style.transform = `translateX(-${overflow}px)`;
        }
      }
    }
  }, [showProfileMenu]);

  // Enhanced logout function with confirmation
  const handleLogout = async () => {
    const confirmLogout = window.confirm('정말 로그아웃하시겠습니까?');
    if (!confirmLogout) return;

    try {
      setShowProfileMenu(false);
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, redirect to auth page
      navigate('/auth');
    }
  };

  // Profile menu handlers
  const handleProfileClick = () => {
    setShowProfileMenu(prevState => !prevState);
  };

  const handleDiscoverClick = () => {
    navigate('/discover');
  };

  // User display name
  const userDisplayName = currentUser?.username || currentUser?.fullName || '사용자';

  // Mock course data
  const courses = [
    {
      id: 'classical-mechanics',
      title: 'Classical Mechanics',
      subtitle: 'Motion and Forces',
      category: 'Physics',
      level: 'Intermediate',
      duration: '12 weeks',
      progress: 65,
      color: 'linear-gradient(135deg, #722F37 0%, #E85A4F 100%)',
      icon: '⚡',
      studentsEnrolled: 12450,
      rating: 4.8,
      nextLesson: 'Newton\'s Third Law'
    },
    {
      id: 'organic-chemistry',
      title: 'Organic Chemistry',
      subtitle: 'Carbon Compounds',
      category: 'Chemistry',
      level: 'Advanced',
      duration: '15 weeks',
      progress: 30,
      color: 'linear-gradient(135deg, #1E0538 0%, #722F37 100%)',
      icon: '🧪',
      studentsEnrolled: 8920,
      rating: 4.6,
      nextLesson: 'Alkane Reactions'
    },
    {
      id: 'genetics-evolution',
      title: 'Genetics & Evolution',
      subtitle: 'DNA and Heredity',
      category: 'Biology',
      level: 'Intermediate',
      duration: '10 weeks',
      progress: 80,
      color: 'linear-gradient(135deg, #0B1026 0%, #1E0538 100%)',
      icon: '🧬',
      studentsEnrolled: 15200,
      rating: 4.9,
      nextLesson: 'Gene Expression'
    }
  ];

  // Mock achievements data
  const achievements = [
    { 
      id: 1, 
      title: '일주일 연속 학습', 
      description: '7일 연속으로 학습을 완료했습니다!', 
      icon: '🔥', 
      unlocked: true, 
      date: '2024-01-15' 
    },
    { 
      id: 2, 
      title: '첫 번째 코스 완료', 
      description: '첫 번째 코스를 성공적으로 완료했습니다!', 
      icon: '🎯', 
      unlocked: true, 
      date: '2024-01-10' 
    },
    { 
      id: 3, 
      title: '지식 탐험가', 
      description: '5개 이상의 다른 과목을 학습했습니다.', 
      icon: '🌟', 
      unlocked: false 
    },
    { 
      id: 4, 
      title: '마스터 학습자', 
      description: '총 100시간 이상 학습했습니다.', 
      icon: '👑', 
      unlocked: false 
    }
  ];

  // Loading screen component
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>우주 탐험을 준비하는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Background Space Canvas */}
      <SpaceCanvas />
      
      {/* Particle Overlay */}
      <div className="particles-overlay">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="header-left">
          <motion.h1 
            className="logo"
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            AP Physics <span>&</span> Calculus
          </motion.h1>
          
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-icon">🔥</span>
              <span className="stat-value">{streak}일 연속</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⚡</span>
              <span className="stat-value">{totalXP} XP</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <span className="stat-value">레벨 {currentLevel}</span>
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <motion.button 
            className="discover-btn"
            onClick={handleDiscoverClick}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(239, 223, 187, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-icon">🔍</span>
            탐험하기
          </motion.button>
          
          <div className="profile-section" ref={profileMenuRef}>
            <motion.button 
              className="profile-btn"
              onClick={handleProfileClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="profile-avatar">
                {userDisplayName.charAt(0).toUpperCase()}
              </div>
              <span className="profile-name">{userDisplayName}</span>
            </motion.button>
            
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  className="profile-menu"
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <button className="menu-item" onClick={() => navigate('/profile')}>
                    <span>👤</span> 프로필
                  </button>
                  <button className="menu-item" onClick={() => navigate('/settings')}>
                    <span>⚙️</span> 설정
                  </button>
                  <button className="menu-item" onClick={() => navigate('/achievements')}>
                    <span>🏆</span> 업적
                  </button>
                  <hr className="menu-divider" />
                  <button className="menu-item logout" onClick={handleLogout}>
                    <span>🚪</span> 로그아웃
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="main-content">
          
          {/* Welcome Section */}
          <motion.section 
            className="welcome-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="welcome-title">
              안녕하세요, {userDisplayName}님! 🚀
            </h2>
            <p className="welcome-subtitle">
              오늘도 새로운 지식의 우주를 탐험해보세요
            </p>
            <div className="progress-overview">
              <div className="progress-item">
                <span className="progress-label">완료한 레슨</span>
                <span className="progress-value">{completedLessons}개</span>
              </div>
              <div className="progress-item">
                <span className="progress-label">이번 주 학습시간</span>
                <span className="progress-value">12시간 30분</span>
              </div>
            </div>
          </motion.section>

          {/* Achievements Section */}
          <motion.section 
            className="achievements-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="section-title">최근 업적 🏆</h3>
            <div className="achievements-grid">
              {achievements.slice(0, 4).map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                  whileHover={{ scale: achievement.unlocked ? 1.05 : 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4 className="achievement-title">{achievement.title}</h4>
                    <p className="achievement-description">{achievement.description}</p>
                    {achievement.unlocked && achievement.date && (
                      <span className="achievement-date">달성일: {achievement.date}</span>
                    )}
                  </div>
                  {achievement.unlocked && <div className="achievement-badge">✓</div>}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Current Courses Section */}
          <motion.section 
            className="courses-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="section-header">
              <h3 className="section-title">진행 중인 코스 📚</h3>
              <motion.button 
                className="view-all-btn"
                onClick={() => navigate('/courses')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                모두 보기
              </motion.button>
            </div>
            
            <div className="courses-grid">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="course-card"
                  whileHover={{ scale: 1.03, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/course/${course.id}`)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  style={{ background: course.color }}
                >
                  <div className="course-header">
                    <div className="course-icon">{course.icon}</div>
                    <div className="course-level">{course.level}</div>
                  </div>
                  
                  <div className="course-content">
                    <h4 className="course-title">{course.title}</h4>
                    <p className="course-subtitle">{course.subtitle}</p>
                    
                    <div className="course-meta">
                      <span className="course-category">{course.category}</span>
                      <span className="course-duration">{course.duration}</span>
                    </div>
                    
                    <div className="course-stats">
                      <div className="stat">
                        <span className="stat-label">학생 수</span>
                        <span className="stat-value">{course.studentsEnrolled.toLocaleString()}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">평점</span>
                        <span className="stat-value">⭐ {course.rating}</span>
                      </div>
                    </div>
                    
                    <div className="progress-section">
                      <div className="progress-info">
                        <span className="progress-label">진행률</span>
                        <span className="progress-percentage">{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div 
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 1 + index * 0.1 }}
                        />
                      </div>
                      <div className="next-lesson">
                        다음: {course.nextLesson}
                      </div>
                    </div>
                  </div>
                  
                  <motion.button 
                    className="continue-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/lesson/${course.id}/current`);
                    }}
                  >
                    계속하기
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Quick Actions Section */}
          <motion.section 
            className="actions-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h3 className="section-title">빠른 액션 ⚡</h3>
            <div className="actions-grid">
              <motion.div 
                className="action-btn practice"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/practice')}
              >
                <div className="action-icon">📝</div>
                <div className="action-content">
                  <h4>연습 문제</h4>
                  <p>실력을 테스트해보세요</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="action-btn study-plan"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/study-plan')}
              >
                <div className="action-icon">📅</div>
                <div className="action-content">
                  <h4>학습 계획</h4>
                  <p>맞춤형 계획을 세워보세요</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="action-btn community"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/community')}
              >
                <div className="action-icon">👥</div>
                <div className="action-content">
                  <h4>커뮤니티</h4>
                  <p>다른 학생들과 소통하세요</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="action-btn resources"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/resources')}
              >
                <div className="action-icon">📚</div>
                <div className="action-content">
                  <h4>학습 자료</h4>
                  <p>추가 자료를 확인하세요</p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;