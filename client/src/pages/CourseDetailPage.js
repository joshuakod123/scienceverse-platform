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
      description: 'Explore data analysis, probability, statistical inference, and experimental design.',
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
    // Add other courses here as needed
  };

  // Lesson mapping - connects topics to your actual lesson files
  const lessonMapping = {
    'ap-statistics': {
      'unit1': {
        // Topic index -> lesson file mapping
        0: '/courses/ap-statistics/unit-1/1.1-introstatistics',  // Introducing Statistics
        1: '/courses/ap-statistics/unit-1/1.2-variables',        // Variables and Data Types
        2: '/courses/ap-statistics/unit-1/1.3-categorical',      // Categorical Variables
        3: '/courses/ap-statistics/unit-1/1.4-quantitative',     // Quantitative Variables
        4: '/courses/ap-statistics/unit-1/1.5-summary',          // Summary Statistics
        5: '/courses/ap-statistics/unit-1/1.6-normal'            // The Normal Distribution
      },
      'unit2': {
        0: '/courses/ap-statistics/unit-2/2.1-scatterplots',
        1: '/courses/ap-statistics/unit-2/2.2-correlation',
        2: '/courses/ap-statistics/unit-2/2.3-regression',
        3: '/courses/ap-statistics/unit-2/2.4-residuals',
        4: '/courses/ap-statistics/unit-2/2.5-leastsquares',
        5: '/courses/ap-statistics/unit-2/2.6-transformations'
      },
      // Add more units as you create them
    },
    'ap-physics-1': {
      'unit1': {
        0: '/courses/ap-physics-1/unit-1/1.1-kinematics',
        // Add more lessons as needed
      }
    }
    // Add mappings for other courses
  };

  // Unit data structure with topics
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
          'Introducing Statistics',          // index 0 -> 1.1
          'Variables and Data Types',        // index 1 -> 1.2
          'Categorical Variables',            // index 2 -> 1.3
          'Quantitative Variables',           // index 3 -> 1.4
          'Summary Statistics',               // index 4 -> 1.5
          'The Normal Distribution'           // index 5 -> 1.6
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
      // Add more units here
    ],
    'ap-physics-1': [
      {
        id: 'unit1',
        number: 1,
        title: 'Kinematics',
        description: 'Motion in one and two dimensions',
        lessons: 8,
        duration: '3 weeks',
        examWeight: '10-16%',
        topics: [
          'Position, Velocity, and Acceleration',
          'Motion Graphs',
          // Add more topics
        ],
        color: '#4A90E2'
      },
      // Add more units
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
    }, 500);

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
    // Get the lesson route from mapping
    const lessonRoute = lessonMapping[courseId]?.[unitId]?.[topicIndex];
    
    if (lessonRoute) {
      navigate(lessonRoute);
    } else {
      console.warn(`No lesson mapping found for ${courseId}/${unitId}/${topicIndex}`);
      // You can show a message that the lesson is coming soon
      alert('This lesson is coming soon!');
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard');
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
          />
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
          <button onClick={handleBackClick}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-page">
      <SpaceCanvas />
      
      {/* Header */}
      <div className="course-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Back
        </button>
        <h1>{courseData.title}</h1>
        <p className="subtitle">{courseData.subtitle}</p>
      </div>

      {/* Course Roadmap */}
      <div className="course-roadmap">
        <h2>Course Roadmap</h2>
        
        {courseData.units.map((unit) => (
          <motion.div key={unit.id} className="unit-container">
            <div 
              className="unit-header"
              onClick={() => handleUnitClick(unit.id)}
            >
              <div className="unit-info">
                <span className="unit-number">Unit {unit.number}</span>
                <h3>{unit.title}</h3>
                <p>{unit.description}</p>
                <div className="unit-meta">
                  <span>📚 {unit.lessons} lessons</span>
                  <span>⏱️ {unit.duration}</span>
                  <span>📊 {unit.examWeight} of exam</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: selectedUnit === unit.id ? 180 : 0 }}
                className="expand-icon"
              >
                ▼
              </motion.div>
            </div>

            <AnimatePresence>
              {selectedUnit === unit.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="topics-container"
                >
                  <h4>Topics Covered:</h4>
                  {unit.topics.map((topic, index) => (
                    <div
                      key={index}
                      className="topic-item"
                      onClick={() => handleLessonClick(unit.id, index)}
                    >
                      <span className="topic-number">{index + 1}</span>
                      <span className="topic-title">{topic}</span>
                      <span className="topic-arrow">→</span>
                    </div>
                  ))}
                  
                  <button 
                    className="start-unit-button"
                    onClick={() => handleLessonClick(unit.id, 0)}
                  >
                    Start Unit {unit.number}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailPage;