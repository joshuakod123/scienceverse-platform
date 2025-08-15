// File: client/src/pages/CourseDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SpaceCanvas from '../components/Space/SpaceCanvas';
import '../styles/CourseDetailPage.css';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Course metadata - 더 깔끔하게 정리
  const courseMetadata = {
    'ap-statistics': {
      title: 'AP Statistics',
      subtitle: 'Master statistical thinking and data analysis',
      description: 'Explore data analysis, probability, statistical inference, and experimental design. This comprehensive course prepares you for the AP Statistics exam.',
      instructor: 'Dr. Evelyn Reed',
      duration: '32 Weeks',
      totalLessons: 90,
      difficulty: 'Advanced',
      icon: '📊',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Interactive Data Tools', 'Real-world Scenarios', 'AP Exam Prep']
    },
    'ap-physics-1': {
      title: 'AP Physics 1',
      subtitle: 'Algebra-based Physics',
      description: 'Covers algebra-based physics including kinematics, dynamics, waves, and basic electricity.',
      instructor: 'Dr. Ken Physics',
      duration: '32 Weeks',
      totalLessons: 85,
      difficulty: 'Intermediate',
      icon: '⚛️',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['Interactive Simulations', 'Animation Experiments', 'AP Exam Prep']
    },
    'ap-physics-c-mechanics': {
      title: 'AP Physics C: Mechanics',
      subtitle: 'Calculus-based Mechanics',
      description: 'A calculus-based, college-level physics course covering advanced mechanics.',
      instructor: 'Dr. Newton',
      duration: '18 Weeks',
      totalLessons: 50,
      difficulty: 'Expert',
      icon: '🚀',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      features: ['Calculus Integration', 'Advanced Problems', 'College Credit']
    },
    'ap-physics-c-em': {
      title: 'AP Physics C: E&M',
      subtitle: 'Calculus-based Electricity & Magnetism',
      description: 'Advanced study of electricity and magnetism using calculus, covering electrostatics, magnetostatics, and Maxwell\'s equations.',
      instructor: 'Dr. Maxwell',
      duration: '18 Weeks',
      totalLessons: 45,
      difficulty: 'Expert',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Maxwell\'s Equations', 'Electromagnetic Simulations', 'AP Exam Specialization']
    },
    'ap-calculus-ab': {
      title: 'AP Calculus AB',
      subtitle: 'Differential and Integral Calculus',
      description: 'Master limits, derivatives, and integrals. Build a strong foundation for advanced mathematics and science.',
      instructor: 'Prof. Leibniz',
      duration: '32 Weeks',
      totalLessons: 75,
      difficulty: 'Intermediate',
      icon: '∫',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      features: ['Step-by-step Learning', 'Graphing Tools', 'Full AP Exam Prep']
    },
    'ap-calculus-bc': {
      title: 'AP Calculus BC',
      subtitle: 'Advanced Calculus Topics',
      description: 'Covers all AB topics plus series, parametric equations, polar coordinates, and advanced integration techniques.',
      instructor: 'Prof. Euler',
      duration: '32 Weeks',
      totalLessons: 85,
      difficulty: 'Advanced',
      icon: '∞',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      features: ['Advanced Series', 'Parametric Functions', 'AP BC Specialization']
    }
  };

  // Units data
  const unitsData = {
    'ap-statistics': [
      { 
        id: 'unit1', 
        number: 1, 
        title: 'Exploring One-Variable Data', 
        description: 'Learn how to describe and analyze single-variable datasets',
        lessons: 10, 
        duration: '3 weeks', 
        examWeight: '15-23%',
        topics: ['Categorical vs Quantitative', 'Describing Distributions', 'Summary Statistics'], 
        color: '#667eea',
        icon: '📈'
      },
      { 
        id: 'unit2', 
        number: 2, 
        title: 'Exploring Two-Variable Data', 
        description: 'Analyze relationships between two variables',
        lessons: 8, 
        duration: '2 weeks', 
        examWeight: '5-7%',
        topics: ['Scatterplots', 'Correlation', 'Regression'], 
        color: '#764ba2',
        icon: '📊'
      },
      { 
        id: 'unit3', 
        number: 3, 
        title: 'Collecting Data', 
        description: 'Design surveys and experiments',
        lessons: 12, 
        duration: '4 weeks', 
        examWeight: '12-15%',
        topics: ['Sampling Methods', 'Experimental Design', 'Bias'], 
        color: '#f093fb',
        icon: '🔍'
      }
    ],
    'ap-physics-1': [
      { 
        id: 'unit1', 
        number: 1, 
        title: 'Kinematics', 
        description: 'Motion in one and two dimensions',
        lessons: 12, 
        duration: '4 weeks', 
        examWeight: '12-18%',
        topics: ['1D Motion', '2D Motion', 'Projectile Motion'], 
        color: '#f093fb',
        icon: '🎯'
      },
      { 
        id: 'unit2', 
        number: 2, 
        title: 'Dynamics', 
        description: "Newton's laws and applications",
        lessons: 10, 
        duration: '3 weeks', 
        examWeight: '16-20%',
        topics: ["Newton's Laws", 'Forces', 'Friction'], 
        color: '#f5576c',
        icon: '⚖️'
      },
      { 
        id: 'unit3', 
        number: 3, 
        title: 'Energy', 
        description: 'Work, energy, and power',
        lessons: 8, 
        duration: '3 weeks', 
        examWeight: '16-24%',
        topics: ['Work', 'Kinetic Energy', 'Conservation'], 
        color: '#4facfe',
        icon: '⚡'
      }
    ],
    'ap-physics-c-mechanics': [
      { 
        id: 'unit1', 
        number: 1, 
        title: 'Kinematics', 
        description: 'Motion with calculus',
        lessons: 6, 
        duration: '2 weeks', 
        examWeight: '18-20%',
        topics: ['Derivatives in Motion', 'Integration in Motion', 'Vector Kinematics'], 
        color: '#fa709a',
        icon: '🎯'
      },
      { 
        id: 'unit2', 
        number: 2, 
        title: "Newton's Laws", 
        description: 'Forces with calculus',
        lessons: 5, 
        duration: '1.5 weeks', 
        examWeight: '17-23%',
        topics: ['Differential Equations', 'Variable Forces', 'Systems of Particles'], 
        color: '#fee140',
        icon: '⚖️'
      },
      { 
        id: 'unit3', 
        number: 3, 
        title: 'Work & Energy', 
        description: 'Energy with calculus',
        lessons: 5, 
        duration: '1.5 weeks', 
        examWeight: '14-17%',
        topics: ['Work Integrals', 'Conservative Forces', 'Potential Energy Functions'], 
        color: '#4A90E2',
        icon: '⚡'
      }
    ],
    'ap-physics-c-em': [
      { 
        id: 'unit1', 
        number: 1, 
        title: 'Electrostatics', 
        description: 'Electric fields and potential',
        lessons: 8, 
        duration: '2.5 weeks', 
        examWeight: '30-35%',
        topics: ["Coulomb's Law", "Gauss's Law", 'Electric Potential'], 
        color: '#667eea',
        icon: '⚡'
      },
      { 
        id: 'unit2', 
        number: 2, 
        title: 'Conductors & Capacitors', 
        description: 'Electric properties of materials',
        lessons: 5, 
        duration: '1.5 weeks', 
        examWeight: '14-17%',
        topics: ['Conductors in Equilibrium', 'Capacitance', 'Dielectrics'], 
        color: '#764ba2',
        icon: '🔋'
      },
      { 
        id: 'unit3', 
        number: 3, 
        title: 'Magnetostatics', 
        description: 'Magnetic fields and forces',
        lessons: 7, 
        duration: '2 weeks', 
        examWeight: '20-24%',
        topics: ['Magnetic Forces', "Biot-Savart Law", "Ampere's Law"], 
        color: '#f093fb',
        icon: '🧲'
      }
    ],
    'ap-calculus-ab': [
      { 
        id: 'unit1', 
        number: 1, 
        title: 'Limits and Continuity', 
        description: 'Foundation of calculus',
        lessons: 10, 
        duration: '4 weeks', 
        examWeight: '10-12%',
        topics: ['Limit Definition', 'Continuity', 'Intermediate Value Theorem'], 
        color: '#a8edea',
        icon: '📉'
      },
      { 
        id: 'unit2', 
        number: 2, 
        title: 'Differentiation', 
        description: 'Derivatives and rules',
        lessons: 12, 
        duration: '5 weeks', 
        examWeight: '17-20%',
        topics: ['Power Rule', 'Chain Rule', 'Implicit Differentiation'], 
        color: '#fed6e3',
        icon: '📈'
      },
      { 
        id: 'unit3', 
        number: 3, 
        title: 'Applications of Derivatives', 
        description: 'Real-world applications',
        lessons: 10, 
        duration: '4 weeks', 
        examWeight: '15-18%',
        topics: ['Related Rates', 'Optimization', 'Motion Analysis'], 
        color: '#f093fb',
        icon: '🎯'
      }
    ],
    'ap-calculus-bc': [
      { 
        id: 'unit1', 
        number: 1, 
        title: 'AB Review & Extensions', 
        description: 'AB topics with BC depth',
        lessons: 8, 
        duration: '3 weeks', 
        examWeight: '35-40%',
        topics: ['L\'Hôpital\'s Rule', 'Advanced Integration', 'Improper Integrals'], 
        color: '#ffecd2',
        icon: '📚'
      },
      { 
        id: 'unit2', 
        number: 2, 
        title: 'Parametric & Polar', 
        description: 'Alternative coordinate systems',
        lessons: 10, 
        duration: '4 weeks', 
        examWeight: '11-12%',
        topics: ['Parametric Equations', 'Polar Coordinates', 'Vector Functions'], 
        color: '#fcb69f',
        icon: '🎯'
      },
      { 
        id: 'unit3', 
        number: 3, 
        title: 'Infinite Series', 
        description: 'Sequences and series',
        lessons: 12, 
        duration: '5 weeks', 
        examWeight: '17-18%',
        topics: ['Taylor Series', 'Power Series', 'Convergence Tests'], 
        color: '#ff9ff3',
        icon: '∞'
      }
    ]
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const units = unitsData[courseId] || [];
      const metadata = courseMetadata[courseId];
      
      if (metadata) {
        setCourseData({
          ...metadata,
          units: units
        });
      }
      
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [courseId]);

  const handleUnitClick = (unitId) => {
    setSelectedUnit(selectedUnit === unitId ? null : unitId);
  };

  const handleLessonClick = (unitId, topicIndex) => {
    if (courseId === 'ap-statistics' && unitId === 'unit1' && topicIndex === 0) {
      navigate('/courses/ap-statistics/lessons/1.1');
    } else {
      alert(`Navigating to ${courseId} - ${unitId} - Topic ${topicIndex + 1}`);
    }
  };

  const handleBackClick = () => {
    navigate('/discover');
  };

  const handleStartCourse = () => {
    const firstUnit = courseData.units[0];
    if (firstUnit) {
      handleLessonClick(firstUnit.id, 0);
    }
  };

  if (isLoading) {
    return (
      <div className="course-detail-page">
        <SpaceCanvas />
        <div className="loading-container">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="loading-spinner"
          >
            ⚛️
          </motion.div>
          <p>Loading course content...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="course-detail-page">
        <SpaceCanvas />
        <div className="error-container">
          <h2>Course not found</h2>
          <button onClick={handleBackClick} className="back-btn">
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <SpaceCanvas />
      
      {/* Modern Header Section */}
      <motion.div 
        className="course-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <motion.button 
          className="back-button"
          onClick={handleBackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="back-icon">←</span>
          <span>Back to Courses</span>
        </motion.button>
        
        {/* Hero Section */}
        <motion.div 
          className="course-hero-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="hero-background" style={{ background: courseData.gradient }}></div>
          <div className="hero-content">
            <motion.div 
              className="course-icon-large"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {courseData.icon}
            </motion.div>
            <h1 className="course-title">{courseData.title}</h1>
            <p className="course-subtitle">{courseData.subtitle}</p>
            <p className="course-description">{courseData.description}</p>
            
            <div className="course-info-grid">
              <div className="info-item">
                <span className="info-icon">👨‍🏫</span>
                <span className="info-label">Instructor</span>
                <span className="info-value">{courseData.instructor}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <span className="info-label">Duration</span>
                <span className="info-value">{courseData.duration}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">📚</span>
                <span className="info-label">Lessons</span>
                <span className="info-value">{courseData.totalLessons}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🎯</span>
                <span className="info-label">Level</span>
                <span className="info-value">{courseData.difficulty}</span>
              </div>
            </div>
            
            <div className="feature-tags">
              {courseData.features.map((feature, index) => (
                <motion.span 
                  key={index} 
                  className="feature-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Course Roadmap Section */}
        <motion.div 
          className="roadmap-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="section-title">
            <span className="title-icon">🗺️</span>
            Course Roadmap
          </h2>
          
          <div className="units-grid">
            {courseData.units.map((unit, index) => (
              <motion.div
                key={unit.id}
                className={`unit-card ${selectedUnit === unit.id ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => handleUnitClick(unit.id)}
              >
                <div className="unit-header">
                  <div className="unit-icon" style={{ background: unit.color }}>
                    {unit.icon}
                  </div>
                  <div className="unit-badge" style={{ background: unit.color }}>
                    Unit {unit.number}
                  </div>
                </div>
                
                <div className="unit-content">
                  <h3 className="unit-title">{unit.title}</h3>
                  <p className="unit-description">{unit.description}</p>
                  
                  <div className="unit-stats">
                    <div className="stat">
                      <span className="stat-icon">📖</span>
                      <span className="stat-text">{unit.lessons} lessons</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">⏰</span>
                      <span className="stat-text">{unit.duration}</span>
                    </div>
                    {unit.examWeight !== 'Review' && (
                      <div className="stat">
                        <span className="stat-icon">📊</span>
                        <span className="stat-text">{unit.examWeight}</span>
                      </div>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {selectedUnit === unit.id && (
                    <motion.div
                      className="unit-expanded-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="topics-section">
                        <h4 className="topics-title">Topics Covered:</h4>
                        <div className="topics-list">
                          {unit.topics.map((topic, topicIndex) => (
                            <motion.button
                              key={topicIndex}
                              className="topic-item"
                              whileHover={{ x: 10, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLessonClick(unit.id, topicIndex);
                              }}
                            >
                              <span className="topic-number">{topicIndex + 1}</span>
                              <span className="topic-name">{topic}</span>
                              <span className="topic-arrow">→</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <motion.button 
                        className="start-unit-btn"
                        style={{ background: unit.color }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLessonClick(unit.id, 0);
                        }}
                      >
                        Start Unit {unit.number}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="unit-expand-indicator">
                  <motion.span
                    animate={{ rotate: selectedUnit === unit.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▼
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          className="progress-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="progress-card">
            <div className="progress-header">
              <h2 className="progress-title">Your Progress</h2>
              <span className="progress-badge">Not Started</span>
            </div>
            
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%' }}></div>
              </div>
              <span className="progress-text">0% Complete</span>
            </div>
            
            <p className="progress-message">
              Ready to begin your journey in {courseData.title}?
            </p>
            
            <motion.button 
              className="start-course-btn"
              onClick={handleStartCourse}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-icon">🚀</span>
              Start Course
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CourseDetailPage;