import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SpaceCanvas from '../components/Space/SpaceCanvas';

const DiscoverPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedLevel, setSelectedLevel] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // AP 과목 중심의 고등학생 대상 코스 데이터
  const allCourses = useMemo(() => [
    // AP Physics
    {
      id: 'ap-physics-1',
      title: 'AP Physics 1',
      subtitle: 'Algebra-based Physics',
      category: '물리학',
      level: 'Beginner',
      duration: '32주',
      price: 'Free',
      originalPrice: null,
      rating: 4.9,
      studentsEnrolled: 15420,
      instructor: 'Dr. 김물리',
      description: '대수 기반의 물리학. 운동학, 역학, 파동, 전기 기초 등을 다룹니다.',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '⚛️',
      features: ['인터랙티브 시뮬레이션', '실험 애니메이션', 'AP 시험 준비'],
      difficulty: 70,
      popular: true,
      new: false,
      bestseller: true,
      apCourse: true
    },
    {
      id: 'ap-physics-2',
      title: 'AP Physics 2',
      subtitle: 'Advanced Algebra-based Physics',
      category: '물리학',
      level: 'Intermediate',
      duration: '32주',
      price: 'Free',
      originalPrice: null,
      rating: 4.8,
      studentsEnrolled: 12100,
      instructor: 'Dr. 김물리',
      description: '유체역학, 열역학, 전자기학, 광학, 원자물리학을 다룹니다.',
      thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🔬',
      features: ['고급 실험', 'AP 시험 대비', '대학 물리 준비'],
      difficulty: 85,
      popular: true,
      new: false,
      bestseller: false,
      apCourse: true
    },
    {
      id: 'ap-physics-c-mechanics',
      title: 'AP Physics C: Mechanics',
      subtitle: 'Calculus-based Mechanics',
      category: '물리학',
      level: 'Advanced',
      duration: '16주',
      price: 'Free',
      originalPrice: null,
      rating: 4.9,
      studentsEnrolled: 8920,
      instructor: 'Dr. 박역학',
      description: '미적분을 이용한 역학. 운동, 힘, 에너지, 모멘텀을 심화 학습합니다.',
      thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '📐',
      features: ['미적분 활용', '고급 문제 해결', 'AP 시험 완벽 대비'],
      difficulty: 95,
      popular: false,
      new: true,
      bestseller: false,
      apCourse: true
    },
    {
      id: 'ap-physics-c-em',
      title: 'AP Physics C: E&M',
      subtitle: 'Calculus-based Electricity & Magnetism',
      category: '물리학',
      level: 'Advanced',
      duration: '16주',
      price: 'Free',
      originalPrice: null,
      rating: 4.8,
      studentsEnrolled: 6540,
      instructor: 'Dr. 이전자',
      description: '미적분을 이용한 전기와 자기학. Maxwell 방정식까지 다룹니다.',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '⚡',
      features: ['Maxwell 방정식', '전자기 시뮬레이션', 'AP 시험 특화'],
      difficulty: 98,
      popular: false,
      new: false,
      bestseller: false,
      apCourse: true
    },
    
    // AP Calculus
    {
      id: 'ap-calculus-ab',
      title: 'AP Calculus AB',
      subtitle: 'Differential and Integral Calculus',
      category: '수학',
      level: 'Intermediate',
      duration: '32주',
      price: 'Free',
      originalPrice: null,
      rating: 4.9,
      studentsEnrolled: 18750,
      instructor: 'Prof. 정미분',
      description: '극한, 미분, 적분의 기초부터 응용까지. 대학 미적분학 1에 해당합니다.',
      thumbnail: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      icon: '∫',
      features: ['단계별 학습', '그래프 도구', 'AP 시험 완벽 대비'],
      difficulty: 75,
      popular: true,
      new: false,
      bestseller: true,
      apCourse: true
    },
    {
      id: 'ap-calculus-bc',
      title: 'AP Calculus BC',
      subtitle: 'Advanced Calculus Topics',
      category: '수학',
      level: 'Advanced',
      duration: '32주',
      price: 'Free',
      originalPrice: null,
      rating: 4.8,
      studentsEnrolled: 14200,
      instructor: 'Prof. 한급수',
      description: 'AB 내용 + 급수, 매개변수 함수, 극좌표 등 고급 미적분 주제들.',
      thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      icon: '∞',
      features: ['고급 급수', '매개변수 함수', 'AP BC 특화'],
      difficulty: 90,
      popular: true,
      new: false,
      bestseller: false,
      apCourse: true
    },
    
    // Pre-AP 기초 과목들
    {
      id: 'precalculus',
      title: 'Pre-Calculus',
      subtitle: 'Calculus 준비를 위한 기초',
      category: '수학',
      level: 'Beginner',
      duration: '24주',
      price: 'Free',
      originalPrice: null,
      rating: 4.7,
      studentsEnrolled: 22100,
      instructor: 'Prof. 김기초',
      description: '삼각함수, 지수함수, 로그함수 등 미적분학 준비를 위한 필수 내용.',
      thumbnail: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      icon: '📊',
      features: ['기초 탄탄', '시각적 학습', '미적분 연계'],
      difficulty: 60,
      popular: true,
      new: false,
      bestseller: false,
      apCourse: false
    },
    {
      id: 'algebra-2',
      title: 'Algebra 2',
      subtitle: 'Advanced Algebraic Concepts',
      category: '수학',
      level: 'Beginner',
      duration: '24주',
      price: 'Free',
      originalPrice: null,
      rating: 4.6,
      studentsEnrolled: 19800,
      instructor: 'Prof. 박대수',
      description: '이차함수, 다항함수, 지수함수 등 고급 대수 개념들을 학습합니다.',
      thumbnail: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      icon: '📈',
      features: ['단계적 학습', '문제 해결', 'Pre-Calc 준비'],
      difficulty: 50,
      popular: false,
      new: false,
      bestseller: false,
      apCourse: false
    }
  ], []);

  const categories = useMemo(() => ['전체', '물리학', '수학'], []);
  const levels = useMemo(() => ['전체', 'Beginner', 'Intermediate', 'Advanced'], []);

  // 필터링된 코스 계산
  useEffect(() => {
    let filtered = allCourses;

    if (selectedCategory !== '전체') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedLevel !== '전체') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [selectedCategory, selectedLevel, searchTerm, allCourses]);

  // 초기 로딩
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const renderCourseCard = (course) => (
    <motion.div
      key={course.id}
      className="course-card"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={() => handleCourseClick(course.id)}
      style={{
        background: course.thumbnail,
        cursor: 'pointer',
        borderRadius: '16px',
        padding: '24px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* 배지들 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {course.apCourse && (
          <span style={{
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#1a202c',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            AP
          </span>
        )}
        {course.popular && (
          <span style={{
            background: 'rgba(255, 193, 7, 0.9)',
            color: '#1a202c',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            인기
          </span>
        )}
        {course.new && (
          <span style={{
            background: 'rgba(34, 197, 94, 0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            신규
          </span>
        )}
      </div>

      {/* 코스 아이콘 */}
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>
        {course.icon}
      </div>

      {/* 코스 정보 */}
      <div>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          {course.title}
        </h3>
        <p style={{ 
          fontSize: '14px', 
          opacity: 0.9,
          marginBottom: '12px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          {course.subtitle}
        </p>
        <p style={{ 
          fontSize: '12px', 
          opacity: 0.8,
          lineHeight: '1.4',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          {course.description}
        </p>
      </div>

      {/* 하단 정보 */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '16px',
        fontSize: '12px'
      }}>
        <div>
          <div>⭐ {course.rating}</div>
          <div style={{ opacity: 0.8 }}>
            {course.studentsEnrolled.toLocaleString()}명 수강
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
            {course.price}
          </div>
          <div style={{ opacity: 0.8 }}>
            {course.duration}
          </div>
        </div>
      </div>

      {/* 난이도 바 */}
      <div style={{ marginTop: '12px' }}>
        <div style={{ fontSize: '10px', marginBottom: '4px', opacity: 0.8 }}>
          난이도: {course.difficulty}%
        </div>
        <div style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${course.difficulty}%`,
            height: '100%',
            background: 'rgba(255, 255, 255, 0.8)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
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
          🌌
        </motion.div>
        <h2 style={{ marginLeft: '16px' }}>코스를 불러오는 중...</h2>
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
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          marginBottom: '40px'
        }}
      >
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          AP 과목 탐험하기
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          고등학생을 위한 AP Physics와 AP Calculus 완벽 정복!
        </p>
      </motion.div>

      {/* 필터 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: '40px'
        }}
      >
        {/* 검색바 */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="코스 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '12px 16px',
              borderRadius: '25px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '16px',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>

        {/* 카테고리 및 레벨 필터 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              카테고리
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category} style={{ background: '#1a202c', color: 'white' }}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              난이도
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                backdropFilter: 'blur(10px)'
              }}
            >
              {levels.map(level => (
                <option key={level} value={level} style={{ background: '#1a202c', color: 'white' }}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* 코스 그리드 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <AnimatePresence>
            {filteredCourses.map(course => renderCourseCard(course))}
          </AnimatePresence>
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'white'
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔍</div>
            <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>
              검색 결과가 없습니다
            </h3>
            <p style={{ opacity: 0.8 }}>
              다른 검색어나 필터를 시도해보세요.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* 하단 네비게이션 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          margin: '60px auto 0',
          display: 'flex',
          justifyContent: 'center',
          gap: '16px'
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '25px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          대시보드로 돌아가기
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DiscoverPage;