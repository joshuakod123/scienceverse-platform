import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import SpaceCanvas from '../components/Space/SpaceCanvas';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [streak] = useState(7);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [totalXP] = useState(2450);
  const [currentLevel] = useState(12);
  const [completedLessons] = useState(89);

  // Mock course data with enhanced information
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

  // Achievements system
  const achievements = [
    { id: 1, title: '일주일 연속 학습', description: '7일 연속으로 학습을 완료했습니다!', unlocked: true, icon: '🔥' },
    { id: 2, title: '지식의 탐험가', description: '3개 이상의 과목을 시작했습니다', unlocked: true, icon: '🚀' },
    { id: 3, title: '완벽주의자', description: '레슨을 100% 정확도로 완료', unlocked: false, icon: '⭐' },
    { id: 4, title: '스피드 러너', description: '레슨을 5분 이내에 완료', unlocked: false, icon: '⚡' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleCourseClick = (courseId) => {
    console.log('Navigating to course:', courseId);
    // 실제로는 navigate(`/course/${courseId}`) 사용
    navigate(`/course/${courseId}`);
  };

  const handleDiscoverClick = () => {
    console.log('Navigating to discover page');
    navigate('/discover');
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const userDisplayName = currentUser?.fullName || currentUser?.username || '우주 탐험가';

  if (loading) {
    return (
      <div className="loading-container">
        <SpaceCanvas />
        <div className="loading-content">
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            우주선을 준비하는 중...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <SpaceCanvas />
      
      {/* Floating particles effect */}
      <div className="particles-overlay">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="header-left">
          <motion.h1 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Science<span>Verse</span>
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
          
          <div className="profile-section">
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
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                  {achievement.unlocked && <div className="achievement-badge">✨</div>}
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Courses Section */}
          <motion.section 
            className="courses-section"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="section-header">
              <h3 className="section-title">학습 중인 과정 📚</h3>
              <motion.button 
                className="view-all-btn"
                whileHover={{ scale: 1.05 }}
                onClick={handleDiscoverClick}
              >
                모든 과정 보기 →
              </motion.button>
            </div>

            <div className="courses-grid">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="course-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => handleCourseClick(course.id)}
                  style={{ background: course.color }}
                >
                  <div className="course-header">
                    <div className="course-icon">{course.icon}</div>
                    <div className="course-meta">
                      <span className="course-level">{course.level}</span>
                      <span className="course-duration">{course.duration}</span>
                    </div>
                  </div>

                  <div className="course-content">
                    <h4 className="course-title">{course.title}</h4>
                    <p className="course-subtitle">{course.subtitle}</p>
                    
                    <div className="course-stats">
                      <div className="stat">
                        <span className="stat-icon">👥</span>
                        <span>{course.studentsEnrolled.toLocaleString()}명 참여</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">⭐</span>
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    <div className="progress-section">
                      <div className="progress-header">
                        <span>진행률</span>
                        <span className="progress-percentage">{course.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <motion.div 
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.2 * index }}
                        />
                      </div>
                      <p className="next-lesson">다음: {course.nextLesson}</p>
                    </div>
                  </div>

                  <motion.button 
                    className="continue-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.id);
                    }}
                  >
                    계속 학습하기 🚀
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Quick Actions */}
          <motion.section 
            className="quick-actions"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="section-title">빠른 실행 ⚡</h3>
            <div className="actions-grid">
              <motion.button 
                className="action-btn"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/quiz')}
              >
                <div className="action-icon">🧠</div>
                <div className="action-content">
                  <h4>일일 퀴즈</h4>
                  <p>오늘의 문제 풀기</p>
                </div>
              </motion.button>

              <motion.button 
                className="action-btn"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/flashcards')}
              >
                <div className="action-icon">🃏</div>
                <div className="action-content">
                  <h4>플래시카드</h4>
                  <p>복습 모드</p>
                </div>
              </motion.button>

              <motion.button 
                className="action-btn"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/lab')}
              >
                <div className="action-icon">🔬</div>
                <div className="action-content">
                  <h4>가상 실험실</h4>
                  <p>실험 체험하기</p>
                </div>
              </motion.button>

              <motion.button 
                className="action-btn"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/study-group')}
              >
                <div className="action-icon">👥</div>
                <div className="action-content">
                  <h4>스터디 그룹</h4>
                  <p>함께 공부하기</p>
                </div>
              </motion.button>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;