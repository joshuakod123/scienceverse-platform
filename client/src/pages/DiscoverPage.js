import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SpaceCanvas from '../components/Space/SpaceCanvas';

const DiscoverPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Course data for high school students focusing on AP subjects
  const allCourses = useMemo(() => [
    // AP Statistics (Newly Added)
    {
      id: 'ap-statistics',
      title: 'AP Statistics',
      subtitle: 'Master statistical thinking and data analysis',
      category: 'Mathematics',
      level: 'Advanced',
      duration: '32 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.9,
      studentsEnrolled: 16200,
      instructor: 'Dr. Evelyn Reed',
      description: 'Explore data analysis, probability, statistical inference, and experimental design.',
      thumbnail: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
      icon: '📊',
      features: ['Interactive Data Tools', 'Real-world Scenarios', 'AP Exam Prep'],
      difficulty: 80,
      popular: true,
      new: true,
      bestseller: true,
      apCourse: true
    },
    // Other courses... (rest of the courses array remains the same as previous answer)
    {
      id: 'ap-physics-1',
      title: 'AP Physics 1',
      subtitle: 'Algebra-based Physics',
      category: 'Physics',
      level: 'Beginner',
      duration: '32 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.9,
      studentsEnrolled: 15420,
      instructor: 'Dr. Ken Physics',
      description: 'Covers algebra-based physics including kinematics, dynamics, waves, and basic electricity.',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '⚛️',
      features: ['Interactive Simulations', 'Animation Experiments', 'AP Exam Prep'],
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
      category: 'Physics',
      level: 'Intermediate',
      duration: '32 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.8,
      studentsEnrolled: 12100,
      instructor: 'Dr. Ken Physics',
      description: 'Covers fluid dynamics, thermodynamics, electromagnetism, optics, and atomic physics.',
      thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🔬',
      features: ['Advanced Experiments', 'AP Exam Prep', 'University Physics Prep'],
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
      category: 'Physics',
      level: 'Advanced',
      duration: '16 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.9,
      studentsEnrolled: 8920,
      instructor: 'Dr. Park Mechanics',
      description: 'In-depth study of mechanics using calculus, covering motion, force, energy, and momentum.',
      thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '📐',
      features: ['Calculus Application', 'Advanced Problem Solving', 'Full AP Exam Prep'],
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
      category: 'Physics',
      level: 'Advanced',
      duration: '16 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.8,
      studentsEnrolled: 6540,
      instructor: 'Dr. Lee Electronics',
      description: 'Electricity and magnetism using calculus, up to Maxwell\'s equations.',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '⚡',
      features: ['Maxwell\'s Equations', 'Electromagnetic Simulations', 'AP Exam Specialization'],
      difficulty: 98,
      popular: false,
      new: false,
      bestseller: false,
      apCourse: true
    },
    {
      id: 'ap-calculus-ab',
      title: 'AP Calculus AB',
      subtitle: 'Differential and Integral Calculus',
      category: 'Mathematics',
      level: 'Intermediate',
      duration: '32 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.9,
      studentsEnrolled: 18750,
      instructor: 'Prof. Jane Math',
      description: 'From basics to applications of limits, differentiation, and integration. Corresponds to university Calculus 1.',
      thumbnail: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      icon: '∫',
      features: ['Step-by-step Learning', 'Graphing Tools', 'Full AP Exam Prep'],
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
      category: 'Mathematics',
      level: 'Advanced',
      duration: '32 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.8,
      studentsEnrolled: 14200,
      instructor: 'Prof. Han Series',
      description: 'Covers all AB topics plus advanced calculus subjects like series, parametric functions, and polar coordinates.',
      thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      icon: '∞',
      features: ['Advanced Series', 'Parametric Functions', 'AP BC Specialization'],
      difficulty: 90,
      popular: true,
      new: false,
      bestseller: false,
      apCourse: true
    },
    {
      id: 'precalculus',
      title: 'Pre-Calculus',
      subtitle: 'Foundation for Calculus',
      category: 'Mathematics',
      level: 'Beginner',
      duration: '24 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.7,
      studentsEnrolled: 22100,
      instructor: 'Prof. Kim Foundation',
      description: 'Essential topics for calculus preparation, including trigonometry, exponential, and logarithmic functions.',
      thumbnail: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      icon: '📊',
      features: ['Solid Foundation', 'Visual Learning', 'Calculus Connection'],
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
      category: 'Mathematics',
      level: 'Beginner',
      duration: '24 Weeks',
      price: 'Free',
      originalPrice: null,
      rating: 4.6,
      studentsEnrolled: 19800,
      instructor: 'Prof. Park Algebra',
      description: 'Learn advanced algebraic concepts such as quadratic functions, polynomials, and exponential functions.',
      thumbnail: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      icon: '📈',
      features: ['Step-by-step Learning', 'Problem Solving', 'Pre-Calc Prep'],
      difficulty: 50,
      popular: false,
      new: false,
      bestseller: false,
      apCourse: false
    }
  ], []);

  const categories = useMemo(() => ['All', 'Physics', 'Mathematics'], []);
  const levels = useMemo(() => ['All', 'Beginner', 'Intermediate', 'Advanced'], []);

  // Calculate filtered courses
  useEffect(() => {
    let filtered = allCourses;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedLevel !== 'All') {
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

  // Initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCourseClick = (courseId) => {
    // 경로를 /courses/ 로 수정
    navigate(`/courses/${courseId}`);
  };
  
  // renderCourseCard 함수 및 나머지 코드는 이전 답변과 동일합니다...
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
      {/* Badges */}
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
            Popular
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
            New
          </span>
        )}
      </div>

      {/* Course Icon */}
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>
        {course.icon}
      </div>

      {/* Course Info */}
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

      {/* Bottom Info */}
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
            {course.studentsEnrolled.toLocaleString()} students
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

      {/* Difficulty Bar */}
      <div style={{ marginTop: '12px' }}>
        <div style={{ fontSize: '10px', marginBottom: '4px', opacity: 0.8 }}>
          Difficulty: {course.difficulty}%
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
        <h2 style={{ marginLeft: '16px' }}>Loading Courses...</h2>
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
      
      {/* Header */}
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
          Explore AP Courses
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>
          Master AP Physics and AP Calculus for high school students!
        </p>
      </motion.div>

      {/* Filter Section */}
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
        {/* Search Bar */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Search courses..."
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

        {/* Category and Level Filters */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Category
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
              Difficulty
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

      {/* Course Grid */}
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
              No courses found
            </h3>
            <p style={{ opacity: 0.8 }}>
              Try a different search term or filter.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Navigation */}
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
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
};

export default DiscoverPage;