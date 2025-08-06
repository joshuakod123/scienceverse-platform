import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import SpaceCanvas from '../components/Space/SpaceCanvas';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const { logout, currentUser } = useContext(AuthContext);
  const { userCourses, availableCourses, getAPCourses } = useCourses();
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
    // 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle logout function
  const handleLogout = () => {
    if (window.confirm('정말 로그아웃하시겠습니까?')) {
      logout();
      navigate('/');
    }
  };

  // 진행 중인 코스들 (AP 우선)
  const inProgressCourses = userCourses
    .filter(course => course.progress > 0 && course.progress < 100)
    .sort((a, b) => {
      // AP 코스를 우선으로 정렬
      if (a.apCourse && !b.apCourse) return -1;
      if (!a.apCourse && b.apCourse) return 1;
      return b.progress - a.progress;
    })
    .slice(0, 4);

  // 추천 AP 코스들
  const recommendedAPCourses = getAPCourses()
    .filter(course => !userCourses.some(uc => uc.id === course.id))
    .slice(0, 3);

  // 전체 학습 진행률 계산
  const overallProgress = userCourses.length > 0 
    ? userCourses.reduce((sum, course) => sum + course.progress, 0) / userCourses.length
    : 0;

  const renderCourseCard = (course, isRecommended = false) => (
    <motion.div
      key={course.id}
      className="course-card"
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/course/${course.id}`)}
      style={{
        background: isRecommended 
          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        border: course.apCourse 
          ? '2px solid rgba(255, 193, 7, 0.5)' 
          : '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '20px',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* AP 배지 */}
      {course.apCourse && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #FFD700, #FFA500)',
          color: '#1a202c',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: 'bold'
        }}>
          AP
        </div>
      )}

      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '4px',
          color: 'white'
        }}>
          {course.title}
        </h3>
        <p style={{ 
          fontSize: '14px', 
          opacity: 0.8,
          marginBottom: '8px'
        }}>
          {course.subtitle}
        </p>
        <p style={{ 
          fontSize: '12px', 
          opacity: 0.7
        }}>
          {course.author} • {course.totalLessons}개 레슨
        </p>
      </div>

      {!isRecommended && course.progress !== undefined && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px'
          }}>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>진행률</span>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
              {Math.round(course.progress)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                height: '100%',
                background: course.apCourse 
                  ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                  : 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: '3px'
              }}
            />
          </div>
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px'
      }}>
        <div>
          <span>⭐ {course.rating}</span>
          <span style={{ marginLeft: '12px', opacity: 0.8 }}>
            {course.students?.toLocaleString()}명 수강
          </span>
        </div>
        {isRecommended && (
          <div style={{
            background: 'rgba(102, 126, 234, 0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>
            추천
          </div>
        )}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }}>
        <SpaceCanvas />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: '48px' }}
        >
          🚀
        </motion.div>
        <h2 style={{ marginLeft: '16px' }}>학습 데이터를 불러오는 중...</h2>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      color: 'white',
      padding: '20px'
    }}>
      <SpaceCanvas />
      
      {/* 헤더 */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          maxWidth: '1200px',
          margin: '0 auto 40px'
        }}
      >
        <div>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AP Physics & Calculus
          </h1>
          <p style={{ fontSize: '16px', opacity: 0.9, marginTop: '8px' }}>
            안녕하세요, {currentUser?.username || '학습자'}님! 오늘도 열심히 공부해볼까요? 🚀
          </p>
        </div>

        {/* 사용자 메뉴 */}
        <div className="user-dropdown" ref={userMenuRef} style={{ position: 'relative' }}>
          <motion.div 
            className="user-avatar" 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
          </motion.div>
          
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="user-menu"
              style={{
                position: 'absolute',
                top: '60px',
                right: '0',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '16px',
                minWidth: '200px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div style={{ fontWeight: 'bold' }}>{currentUser?.username}</div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>{currentUser?.email}</div>
              </div>
              
              <button
                onClick={() => navigate('/profile')}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  padding: '8px 0',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                👤 프로필 설정
              </button>
              
              <button
                onClick={handleLogout}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  padding: '8px 0',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🚪 로그아웃
              </button>
            </motion.div>
          )}
        </div>
      </motion.header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        {/* 학습 진행 상황 요약 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginBottom: '40px' }}
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
              📊 학습 현황
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
                <div style={{ fontSize: '14px', opacity: 0.8 }}>등록된 코스</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#67F3AB' }}>
                  {Math.round(overallProgress)}%
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>전체 진행률</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FB7185' }}>
                  {userCourses.filter(c => c.apCourse).length}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>AP 코스</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#60A5FA' }}>
                  {userCourses.filter(c => c.progress === 100).length}
                </div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>완료된 코스</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 진행 중인 코스들 */}
        {inProgressCourses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ marginBottom: '40px' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: 'white'
              }}>
                📚 진행 중인 코스
              </h2>
              <Link 
                to="/courses"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                전체 보기 →
              </Link>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {inProgressCourses.map(course => renderCourseCard(course))}
            </div>
          </motion.section>
        )}

        {/* 추천 AP 코스들 */}
        {recommendedAPCourses.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ marginBottom: '40px' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: 'white'
              }}>
                🌟 추천 AP 코스
              </h2>
              <Link 
                to="/discover"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                더 탐색하기 →
              </Link>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {recommendedAPCourses.map(course => renderCourseCard(course, true))}
            </div>
          </motion.section>
        )}

        {/* 빈 상태 - 코스가 없을 때 */}
        {userCourses.length === 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚀</div>
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              color: 'white'
            }}>
              AP 학습 여정을 시작해보세요!
            </h3>
            <p style={{ 
              fontSize: '16px', 
              opacity: 0.8, 
              marginBottom: '32px',
              maxWidth: '500px',
              margin: '0 auto 32px'
            }}>
              Physics와 Calculus AP 코스들이 여러분을 기다리고 있어요. 
              3D 애니메이션과 시뮬레이션으로 복잡한 개념도 쉽게 이해할 수 있답니다!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/discover')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '25px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              코스 둘러보기
            </motion.button>
          </motion.section>
        )}

        {/* 하단 네비게이션 */}
        <motion.nav
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '40px',
            paddingTop: '40px'
          }}
        >
          <Link to="/discover">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                borderRadius: '20px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              🔍 코스 탐색
            </motion.button>
          </Link>
          
          <Link to="/progress">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '12px 24px',
                borderRadius: '20px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}
            >
              📈 학습 진도
            </motion.button>
          </Link>
        </motion.nav>
      </div>
    </div>
  );
};

export default HomePage;