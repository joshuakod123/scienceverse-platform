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

  // Course metadata
  const courseMetadata = {
    'ap-statistics': {
      title: 'AP Statistics',
      subtitle: 'Master statistical thinking and data analysis',
      description: 'Explore data analysis, probability, statistical inference, and experimental design. This comprehensive course prepares you for the AP Statistics exam.',
      instructor: 'Dr. Evelyn Reed',
      duration: '32 Weeks',
      totalLessons: 90,
      difficulty: 'Advanced',
      examWeight: '100%',
      icon: '📊',
      gradient: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)',
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
      examWeight: '100%',
      icon: '⚛️',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      features: ['Interactive Simulations', 'Animation Experiments', 'AP Exam Prep']
    },
    'ap-physics-2': {
      title: 'AP Physics 2',
      subtitle: 'Advanced Algebra-based Physics',
      description: 'Covers fluid dynamics, thermodynamics, electromagnetism, optics, and atomic physics.',
      instructor: 'Dr. Ken Physics',
      duration: '32 Weeks',
      totalLessons: 88,
      difficulty: 'Advanced',
      examWeight: '100%',
      icon: '🔬',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      features: ['Advanced Lab Simulations', 'Modern Physics Topics', 'AP Exam Prep']
    },
    'ap-physics-c-mechanics': {
      title: 'AP Physics C: Mechanics',
      subtitle: 'Calculus-based Mechanics',
      description: 'A calculus-based, college-level physics course that covers kinematics, dynamics, energy, momentum, rotation, and oscillations.',
      instructor: 'Dr. Newton',
      duration: '16 Weeks',
      totalLessons: 45,
      difficulty: 'Expert',
      examWeight: '100%',
      icon: '🎯',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      features: ['Calculus Integration', 'Advanced Problem Solving', 'College-level Content']
    }
  };

  // Unit data structure (example for AP Statistics, similar structure for other courses)
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
        topics: [
          'Introducing Statistics',
          'Variables and Data Types',
          'Categorical Variables',
          'Quantitative Variables',
          'Summary Statistics',
          'The Normal Distribution'
        ],
        color: '#4A90E2'
      },
      {
        id: 'unit2',
        number: 2,
        title: 'Exploring Two-Variable Data',
        description: 'Discover relationships between two variables',
        lessons: 9,
        duration: '2 weeks',
        examWeight: '5-7%',
        topics: [
          'Scatterplots',
          'Correlation',
          'Linear Regression',
          'Residuals',
          'Least-Squares Regression',
          'Transformations'
        ],
        color: '#7B68EE'
      },
      {
        id: 'unit3',
        number: 3,
        title: 'Collecting Data',
        description: 'Master sampling methods and experimental design',
        lessons: 7,
        duration: '2 weeks',
        examWeight: '12-15%',
        topics: [
          'Sampling Methods',
          'Bias in Sampling',
          'Experimental Design',
          'Random Assignment',
          'Control Groups',
          'Blocking'
        ],
        color: '#FF6B6B'
      },
      {
        id: 'unit4',
        number: 4,
        title: 'Probability & Random Variables',
        description: 'Build foundation in probability theory',
        lessons: 12,
        duration: '4 weeks',
        examWeight: '10-20%',
        topics: [
          'Basic Probability',
          'Conditional Probability',
          'Independence',
          'Random Variables',
          'Binomial Distribution',
          'Geometric Distribution'
        ],
        color: '#4ECDC4'
      },
      {
        id: 'unit5',
        number: 5,
        title: 'Sampling Distributions',
        description: 'Understand sampling variability',
        lessons: 9,
        duration: '3 weeks',
        examWeight: '7-12%',
        topics: [
          'Sampling Variability',
          'Central Limit Theorem',
          'Sampling Distribution of x̄',
          'Sampling Distribution of p̂',
          'Difference of Means',
          'Difference of Proportions'
        ],
        color: '#45B7D1'
      },
      {
        id: 'unit6',
        number: 6,
        title: 'Inference for Categorical Data',
        description: 'Make inferences about proportions',
        lessons: 11,
        duration: '3 weeks',
        examWeight: '12-15%',
        topics: [
          'Confidence Intervals',
          'Hypothesis Testing',
          'One-Sample z-test',
          'Two-Sample z-test',
          'Chi-Square Tests',
          'Type I and II Errors'
        ],
        color: '#F7B731'
      },
      {
        id: 'unit7',
        number: 7,
        title: 'Inference for Quantitative Data',
        description: 'Make inferences about means',
        lessons: 10,
        duration: '3 weeks',
        examWeight: '10-18%',
        topics: [
          't-Distribution',
          'One-Sample t-test',
          'Two-Sample t-test',
          'Paired t-test',
          'ANOVA Basics',
          'Confidence Intervals for Means'
        ],
        color: '#5F27CD'
      },
      {
        id: 'unit8',
        number: 8,
        title: 'Inference for Regression',
        description: 'Statistical inference in regression',
        lessons: 8,
        duration: '2 weeks',
        examWeight: '2-5%',
        topics: [
          'Regression Inference',
          'Confidence Intervals for Slope',
          'Hypothesis Tests for Slope',
          'Residual Analysis',
          'Transformations',
          'Computer Output'
        ],
        color: '#00D2D3'
      },
      {
        id: 'unit9',
        number: 9,
        title: 'Review & AP Exam Prep',
        description: 'Comprehensive review and exam strategies',
        lessons: 14,
        duration: '4 weeks',
        examWeight: 'Review',
        topics: [
          'Free Response Strategies',
          'Multiple Choice Tips',
          'Common Mistakes',
          'Practice Exams',
          'Time Management',
          'Final Review'
        ],
        color: '#EE5A6F'
      }
    ],
    // Add similar structure for other courses
    'ap-physics-1': [
      { id: 'unit1', number: 1, title: 'Kinematics', description: 'Motion in one and two dimensions', lessons: 12, duration: '4 weeks', examWeight: '12-18%', topics: ['Position and Displacement', 'Velocity and Speed', 'Acceleration', 'Projectile Motion'], color: '#667eea' },
      { id: 'unit2', number: 2, title: 'Dynamics', description: 'Forces and Newton\'s laws', lessons: 10, duration: '3 weeks', examWeight: '16-20%', topics: ['Newton\'s Laws', 'Free Body Diagrams', 'Friction', 'Circular Motion'], color: '#764ba2' },
      { id: 'unit3', number: 3, title: 'Circular Motion & Gravitation', description: 'Rotational motion and gravity', lessons: 8, duration: '2 weeks', examWeight: '4-6%', topics: ['Uniform Circular Motion', 'Gravitational Force', 'Orbital Motion'], color: '#f093fb' },
      { id: 'unit4', number: 4, title: 'Energy', description: 'Work, energy, and power', lessons: 11, duration: '3 weeks', examWeight: '16-24%', topics: ['Work and Power', 'Kinetic Energy', 'Potential Energy', 'Conservation of Energy'], color: '#4A90E2' },
      { id: 'unit5', number: 5, title: 'Momentum', description: 'Linear momentum and collisions', lessons: 9, duration: '3 weeks', examWeight: '12-18%', topics: ['Impulse and Momentum', 'Conservation of Momentum', 'Collisions', 'Center of Mass'], color: '#FF6B6B' },
      { id: 'unit6', number: 6, title: 'Simple Harmonic Motion', description: 'Oscillations and waves', lessons: 8, duration: '2 weeks', examWeight: '2-4%', topics: ['Springs and Hooke\'s Law', 'Pendulums', 'Wave Properties'], color: '#4ECDC4' },
      { id: 'unit7', number: 7, title: 'Torque & Rotational Motion', description: 'Rotational dynamics', lessons: 10, duration: '3 weeks', examWeight: '12-18%', topics: ['Torque', 'Rotational Kinematics', 'Angular Momentum'], color: '#45B7D1' },
      { id: 'unit8', number: 8, title: 'Electric Charge & Force', description: 'Electrostatics basics', lessons: 7, duration: '2 weeks', examWeight: '4-6%', topics: ['Electric Charge', 'Coulomb\'s Law', 'Electric Fields'], color: '#F7B731' },
      { id: 'unit9', number: 9, title: 'Review & AP Exam Prep', description: 'Comprehensive review', lessons: 10, duration: '3 weeks', examWeight: 'Review', topics: ['Practice Problems', 'Exam Strategies', 'Lab Review'], color: '#5F27CD' }
    ],
    'ap-physics-2': [
      { id: 'unit1', number: 1, title: 'Fluids', description: 'Fluid statics and dynamics', lessons: 10, duration: '3 weeks', examWeight: '10-12%', topics: ['Pressure', 'Buoyancy', 'Fluid Flow', 'Bernoulli\'s Equation'], color: '#f093fb' },
      { id: 'unit2', number: 2, title: 'Thermodynamics', description: 'Heat and temperature', lessons: 12, duration: '4 weeks', examWeight: '12-18%', topics: ['Temperature and Heat', 'Ideal Gas Law', 'Thermodynamic Processes', 'Heat Engines'], color: '#f5576c' },
      { id: 'unit3', number: 3, title: 'Electric Force & Field', description: 'Electrostatics', lessons: 9, duration: '3 weeks', examWeight: '18-22%', topics: ['Electric Fields', 'Gauss\'s Law', 'Electric Potential'], color: '#4A90E2' },
      { id: 'unit4', number: 4, title: 'Electric Circuits', description: 'DC circuits', lessons: 11, duration: '3 weeks', examWeight: '10-14%', topics: ['Current and Resistance', 'Kirchhoff\'s Rules', 'RC Circuits'], color: '#7B68EE' },
      { id: 'unit5', number: 5, title: 'Magnetism', description: 'Magnetic fields and forces', lessons: 10, duration: '3 weeks', examWeight: '10-12%', topics: ['Magnetic Fields', 'Magnetic Force', 'Electromagnetic Induction'], color: '#FF6B6B' },
      { id: 'unit6', number: 6, title: 'Electromagnetic Waves', description: 'Light and EM radiation', lessons: 8, duration: '2 weeks', examWeight: '5-7%', topics: ['EM Spectrum', 'Wave Properties', 'Polarization'], color: '#4ECDC4' },
      { id: 'unit7', number: 7, title: 'Geometric Optics', description: 'Mirrors and lenses', lessons: 9, duration: '3 weeks', examWeight: '12-14%', topics: ['Reflection', 'Refraction', 'Lenses', 'Optical Instruments'], color: '#45B7D1' },
      { id: 'unit8', number: 8, title: 'Quantum & Atomic Physics', description: 'Modern physics', lessons: 10, duration: '3 weeks', examWeight: '10-12%', topics: ['Photoelectric Effect', 'Wave-Particle Duality', 'Atomic Models', 'Nuclear Physics'], color: '#F7B731' },
      { id: 'unit9', number: 9, title: 'Review & AP Exam Prep', description: 'Comprehensive review', lessons: 9, duration: '3 weeks', examWeight: 'Review', topics: ['Practice Problems', 'Lab Skills', 'Exam Strategies'], color: '#5F27CD' }
    ],
    'ap-physics-c-mechanics': [
      { id: 'unit1', number: 1, title: 'Kinematics', description: 'Motion with calculus', lessons: 6, duration: '2 weeks', examWeight: '18-20%', topics: ['Derivatives in Motion', 'Integration in Motion', 'Vector Kinematics'], color: '#fa709a' },
      { id: 'unit2', number: 2, title: 'Newton\'s Laws', description: 'Forces with calculus', lessons: 5, duration: '1.5 weeks', examWeight: '17-23%', topics: ['Differential Equations', 'Variable Forces', 'Systems of Particles'], color: '#fee140' },
      { id: 'unit3', number: 3, title: 'Work & Energy', description: 'Energy with calculus', lessons: 5, duration: '1.5 weeks', examWeight: '14-17%', topics: ['Work Integrals', 'Conservative Forces', 'Potential Energy Functions'], color: '#4A90E2' },
      { id: 'unit4', number: 4, title: 'Momentum', description: 'Impulse and collisions', lessons: 4, duration: '1 week', examWeight: '14-17%', topics: ['Variable Mass Systems', 'Collision Analysis', 'Center of Mass Calculus'], color: '#7B68EE' },
      { id: 'unit5', number: 5, title: 'Rotation', description: 'Rotational dynamics', lessons: 6, duration: '2 weeks', examWeight: '18-20%', topics: ['Moment of Inertia', 'Torque', 'Angular Momentum', 'Rolling Motion'], color: '#FF6B6B' },
      { id: 'unit6', number: 6, title: 'Oscillations', description: 'Simple harmonic motion', lessons: 5, duration: '1.5 weeks', examWeight: '6-14%', topics: ['Differential Equations of SHM', 'Damped Oscillations', 'Driven Oscillations'], color: '#4ECDC4' },
      { id: 'unit7', number: 7, title: 'Gravitation', description: 'Universal gravitation', lessons: 4, duration: '1 week', examWeight: '6-14%', topics: ['Gravitational Field', 'Orbital Mechanics', 'Kepler\'s Laws'], color: '#45B7D1' },
      { id: 'unit8', number: 8, title: 'Advanced Topics', description: 'Special topics', lessons: 5, duration: '1.5 weeks', examWeight: 'Enrichment', topics: ['Lagrangian Mechanics', 'Special Relativity Intro', 'Advanced Problems'], color: '#F7B731' },
      { id: 'unit9', number: 9, title: 'Review & AP Exam Prep', description: 'Intensive review', lessons: 5, duration: '2 weeks', examWeight: 'Review', topics: ['Free Response Practice', 'Problem Solving Strategies'], color: '#5F27CD' }
    ]
  };

  useEffect(() => {
    // Simulate loading
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
    }, 1000);

    return () => clearTimeout(timer);
  }, [courseId]);

  const handleUnitClick = (unitId) => {
    if (selectedUnit === unitId) {
      setSelectedUnit(null);
    } else {
      setSelectedUnit(unitId);
    }
  };

  const handleLessonClick = (unitId, topicIndex) => {
    // Navigate to lesson page (you can modify this based on your routing structure)
    navigate(`/lesson/${courseId}-${unitId}-${topicIndex}`);
  };

  const handleBackClick = () => {
    navigate('/discover');
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
          <button onClick={handleBackClick}>Back to Courses</button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <SpaceCanvas />
      
      {/* Header */}
      <motion.div 
        className="course-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button className="back-button" onClick={handleBackClick}>
          ← Back to Courses
        </button>
        
        <div className="course-hero" style={{ background: courseData.gradient }}>
          <div className="course-icon">{courseData.icon}</div>
          <h1>{courseData.title}</h1>
          <p className="course-subtitle">{courseData.subtitle}</p>
          <p className="course-description">{courseData.description}</p>
          
          <div className="course-meta">
            <span>👨‍🏫 {courseData.instructor}</span>
            <span>⏱️ {courseData.duration}</span>
            <span>📚 {courseData.totalLessons} Lessons</span>
            <span>🎯 {courseData.difficulty}</span>
          </div>
          
          <div className="course-features">
            {courseData.features.map((feature, index) => (
              <span key={index} className="feature-tag">{feature}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Units Roadmap */}
      <motion.div 
        className="units-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="units-title">Course Roadmap</h2>
        <div className="units-grid">
          {courseData.units.map((unit, index) => (
            <motion.div
              key={unit.id}
              className={`unit-card ${selectedUnit === unit.id ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleUnitClick(unit.id)}
              style={{ 
                borderLeft: `4px solid ${unit.color}`,
                background: selectedUnit === unit.id 
                  ? `linear-gradient(135deg, ${unit.color}15 0%, ${unit.color}05 100%)`
                  : 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <div className="unit-header">
                <div className="unit-number" style={{ background: unit.color }}>
                  Unit {unit.number}
                </div>
                <div className="unit-info">
                  <h3>{unit.title}</h3>
                  <p>{unit.description}</p>
                  <div className="unit-meta">
                    <span>📖 {unit.lessons} lessons</span>
                    <span>⏰ {unit.duration}</span>
                    {unit.examWeight !== 'Review' && (
                      <span>📊 {unit.examWeight} of exam</span>
                    )}
                  </div>
                </div>
                <div className="expand-icon">
                  {selectedUnit === unit.id ? '−' : '+'}
                </div>
              </div>

              <AnimatePresence>
                {selectedUnit === unit.id && (
                  <motion.div
                    className="unit-topics"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4>Topics Covered:</h4>
                    <div className="topics-list">
                      {unit.topics.map((topic, topicIndex) => (
                        <motion.div
                          key={topicIndex}
                          className="topic-item"
                          whileHover={{ x: 5 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLessonClick(unit.id, topicIndex);
                          }}
                        >
                          <span className="topic-number">{topicIndex + 1}</span>
                          <span className="topic-name">{topic}</span>
                          <span className="topic-arrow">→</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <button 
                      className="start-unit-button"
                      style={{ background: unit.color }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLessonClick(unit.id, 0);
                      }}
                    >
                      Start Unit {unit.number}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div 
        className="progress-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2>Your Progress</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '0%' }}></div>
        </div>
        <p>Start your journey to master {courseData.title}</p>
        
        <button 
          className="start-course-button"
          style={{ background: courseData.gradient }}
          onClick={() => handleLessonClick('unit1', 0)}
        >
          Start Course
        </button>
      </motion.div>
    </div>
  );
};

export default CourseDetailPage;