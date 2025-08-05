import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { CourseContext } from '../context/CourseContext';
import '../styles/LessonPage.css';

// Create mock lesson data for development (moved outside the component)
const createMockLesson = (lessonId) => {
  return {
    _id: lessonId || "1",
    title: "Introduction to Physics",
    subtitle: "Basic concepts and principles",
    description: "Learn about forces, motion, and energy in this introductory course.",
    category: "Physics",
    level: "Beginner",
    duration: 45,
    author: "Dr. Richard Feynman",
    courseId: "course123",
    sections: [
      {
        title: "Introduction to Forces",
        content: `
          <h3>What are Forces?</h3>
          <p>Forces are interactions that, when unopposed, will change the motion of an object. The motion of an object is determined by the sum of the forces acting on it; if the total force on an object is not zero, its motion will change.</p>
          <p>The SI unit for force is the newton (N), which is defined as 1 kilogram meter per second squared (kg·m/s²).</p>
          
          <h3>Newton's Three Laws of Motion</h3>
          <p>Sir Isaac Newton's three laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.</p>
          <ul>
            <li><strong>First Law:</strong> An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.</li>
            <li><strong>Second Law:</strong> The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</li>
            <li><strong>Third Law:</strong> For every action, there is an equal and opposite reaction.</li>
          </ul>
        `,
        order: 1,
        quizzes: [
          {
            question: "What is the SI unit of force?",
            options: ["Kilogram", "Newton", "Joule", "Watt"],
            correctAnswer: 1
          },
          {
            question: "Which of Newton's laws states that an object at rest will stay at rest unless acted upon by an external force?",
            options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
            correctAnswer: 0
          }
        ]
      },
      {
        title: "Types of Forces",
        content: `
          <h3>Fundamental Forces</h3>
          <p>In physics, there are four fundamental forces that govern all interactions in the universe:</p>
          <ul>
            <li><strong>Gravitational Force:</strong> The weakest of the four forces, but has an infinite range. It is always attractive and acts between any two objects with mass.</li>
            <li><strong>Electromagnetic Force:</strong> Acts between electrically charged particles. It is both attractive and repulsive and has infinite range.</li>
            <li><strong>Strong Nuclear Force:</strong> Holds protons and neutrons together in the nucleus. It is the strongest force but has a very short range.</li>
            <li><strong>Weak Nuclear Force:</strong> Responsible for radioactive decay and nuclear fusion. It has a very short range.</li>
          </ul>

          <h3>Contact Forces</h3>
          <p>These are forces that act when objects physically touch:</p>
          <ul>
            <li><strong>Normal Force:</strong> The perpendicular force exerted by a surface on an object.</li>
            <li><strong>Frictional Force:</strong> The force that opposes motion between two surfaces in contact.</li>
            <li><strong>Tension Force:</strong> The force transmitted through a string, rope, or cable when it is pulled tight.</li>
          </ul>
        `,
        order: 2,
        quizzes: [
          {
            question: "Which is the weakest of the four fundamental forces?",
            options: ["Gravitational", "Electromagnetic", "Strong Nuclear", "Weak Nuclear"],
            correctAnswer: 0
          },
          {
            question: "Which force opposes motion between two surfaces in contact?",
            options: ["Normal Force", "Tension Force", "Frictional Force", "Spring Force"],
            correctAnswer: 2
          }
        ]
      },
      {
        title: "Motion and Energy",
        content: `
          <h3>Kinetic and Potential Energy</h3>
          <p>Energy is the capacity to do work. The two main forms of mechanical energy are:</p>
          <ul>
            <li><strong>Kinetic Energy:</strong> The energy an object possesses due to its motion. It is calculated using the formula KE = (1/2)mv², where m is mass and v is velocity.</li>
            <li><strong>Potential Energy:</strong> The energy stored in an object due to its position or state. Gravitational potential energy is calculated using PE = mgh, where m is mass, g is gravitational acceleration, and h is height.</li>
          </ul>

          <h3>Conservation of Energy</h3>
          <p>One of the most fundamental principles in physics is the law of conservation of energy, which states that energy cannot be created or destroyed, only transformed from one form to another.</p>
          <p>In a closed system, the total energy remains constant. This principle allows us to track energy transformations and solve complex physics problems.</p>
        `,
        order: 3,
        quizzes: [
          {
            question: "What is the formula for kinetic energy?",
            options: ["KE = mv", "KE = (1/2)mv²", "KE = mgh", "KE = m²v"],
            correctAnswer: 1
          },
          {
            question: "According to the law of conservation of energy:",
            options: [
              "Energy can be created but not destroyed",
              "Energy can be destroyed but not created",
              "Energy cannot be created or destroyed",
              "Energy can be created and destroyed"
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  };
};

const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { isCoursePaid } = useContext(CourseContext);
  
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [contentAccess, setContentAccess] = useState('full'); // Default to full access
  const userMenuRef = useRef(null);
  
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
    const fetchLesson = () => {
      try {
        setLoading(true);
        
        // Create a mock lesson for development/testing
        const mockLesson = createMockLesson(id);
        setLesson(mockLesson);
        
        // Check if user has paid for this course
        if (isCoursePaid && mockLesson.courseId) {
          const paid = isCoursePaid(mockLesson.courseId);
          setContentAccess(paid ? 'full' : 'limited');
        } else {
          setContentAccess('full'); // Default to full access if we can't verify
        }
        
        // Simulate loading time
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching lesson:', error);
        setError('Failed to load lesson. Please try again.');
        setLoading(false);
      }
    };
    
    fetchLesson();
  }, [id, isCoursePaid]);
  
  const updateProgress = () => {
    if (lesson) {
      const sectionProgress = ((currentSection + 1) / lesson.sections.length) * 100;
      setProgress(sectionProgress);
    }
  };
  
  const handleNextSection = () => {
    if (lesson && currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      updateProgress();
      setShowQuiz(false);
      setQuizResults(null);
    }
  };
  
  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      updateProgress();
      setShowQuiz(false);
      setQuizResults(null);
    }
  };
  
  const handleQuizToggle = () => {
    setShowQuiz(!showQuiz);
    setQuizAnswers({});
    setQuizResults(null);
  };
  
  const handleQuizAnswerChange = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };
  
  const handleQuizSubmit = () => {
    const currentQuizzes = lesson.sections[currentSection].quizzes;
    
    // Calculate results
    let correctAnswers = 0;
    
    currentQuizzes.forEach((quiz, index) => {
      if (quizAnswers[index] === quiz.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = (correctAnswers / currentQuizzes.length) * 100;
    
    setQuizResults({
      score,
      correctAnswers,
      total: currentQuizzes.length
    });
  };
  
  // Handle logout function
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
        logout();
        navigate('/');
    }
  };
  
  // Add a prompt to purchase if content is limited
  const renderPurchasePrompt = () => {
    if (contentAccess === 'limited') {
      return (
        <div className="purchase-prompt">
          <h3>Unlock Full Access</h3>
          <p>You're currently viewing the free content. Purchase this course to unlock all lessons and materials.</p>
          <button 
            className="btn-purchase"
            onClick={() => navigate(`/purchase/${lesson.courseId}`)}
          >
            Purchase Course
          </button>
        </div>
      );
    }
    return null;
  };
  
  // Render content based on access level
  const renderContent = () => {
    const currentSectionData = lesson.sections[currentSection];
    if (contentAccess === 'full' || currentSection < 2) { // First section is free
      return (
        <div 
          className="content-body"
          dangerouslySetInnerHTML={{ __html: currentSectionData.content }}
        />
      );
    } else {
      return (
        <div className="locked-content">
          <div className="blur-overlay">
            <div 
              className="blurred-content"
              dangerouslySetInnerHTML={{ __html: currentSectionData.content.substring(0, 300) + '...' }}
            />
          </div>
          <div className="lock-icon">🔒</div>
          <p>This content is locked. Purchase the course to view.</p>
        </div>
      );
    }
  };
  
  if (loading) {
    return (
      <div className="lesson-page loading">
        <div className="loader"></div>
        <p>Loading lesson content...</p>
      </div>
    );
  }
  
  if (error || !lesson) {
    return (
      <div className="lesson-page error">
        <h2>Error</h2>
        <p>{error || 'Failed to load lesson.'}</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  const currentSectionData = lesson.sections[currentSection];
  
  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <div className="header-left">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            &larr; Back
          </button>
          <h1>{lesson.title}</h1>
        </div>
        <div className="header-right">
          <div className="progress-container">
            <div className="progress-text">
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* User dropdown for logout */}
          <div className="user-dropdown" ref={userMenuRef} style={{ marginLeft: '20px' }}>
            <div 
              className="user-avatar" 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ cursor: 'pointer', width: '36px', height: '36px' }}
            >
              <img 
                src="/assets/images/avatar.jpg" 
                alt="User profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzMzMyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjIxIDAgNCAxLjc5IDQgNHMtMS43OSA0LTQgNC00LTEuNzktNC00IDEuNzktNCA0LTR6bTAgMTMuOTljLTMuNSAwLTYuNTgtMS44LTguMzYtNC41MyAxLjg0LTIuNzMgNC45NS00LjQ2IDguMzYtNC40NiAzLjQgMCA2LjUyIDEuNzMgOC4zNiA0LjQ2LTEuNzggMi43My00Ljg1IDQuNTMtOC4zNiA0LjUzeiIvPjwvc3ZnPg==';
                }}
              />
            </div>
            
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
      
      <div className="lesson-container">
        <aside className="lesson-sidebar">
          <div className="lesson-info">
            <div className="lesson-category">
              <span className="category-label">{lesson.category}</span>
              <span className="level-label">{lesson.level}</span>
            </div>
            <h2>{lesson.title}</h2>
            <p>{lesson.subtitle}</p>
            <div className="lesson-meta">
              <div className="author">By {lesson.author}</div>
              <div className="duration">{lesson.duration} min</div>
            </div>
          </div>
          
          <div className="lesson-sections">
            <h3>Sections</h3>
            <ul>
              {lesson.sections.map((section, index) => (
                <li 
                  key={index}
                  className={index === currentSection ? 'active' : ''}
                  onClick={() => setCurrentSection(index)}
                >
                  <span className="section-number">{index + 1}</span>
                  <span className="section-title">{section.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        
        <main className="lesson-content">
          <motion.div 
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="section-content"
          >
            <h2>{currentSectionData.title}</h2>
            
            {renderContent()}
            
            {renderPurchasePrompt()}
            
            {currentSectionData.quizzes && currentSectionData.quizzes.length > 0 && (
              <div className="quiz-section">
                <button 
                  onClick={handleQuizToggle} 
                  className="btn-quiz"
                >
                  {showQuiz ? 'Hide Quiz' : 'Take Quiz'}
                </button>
                
                {showQuiz && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="quiz-container"
                  >
                    <h3>Section Quiz</h3>
                    
                    {currentSectionData.quizzes.map((quiz, qIndex) => (
                      <div key={qIndex} className="quiz-question">
                        <p className="question-text">{quiz.question}</p>
                        <div className="options-list">
                          {quiz.options.map((option, oIndex) => (
                            <div key={oIndex} className="option">
                              <input 
                                type="radio"
                                id={`q${qIndex}-o${oIndex}`}
                                name={`question-${qIndex}`}
                                checked={quizAnswers[qIndex] === oIndex}
                                onChange={() => handleQuizAnswerChange(qIndex, oIndex)}
                                disabled={quizResults !== null}
                              />
                              <label htmlFor={`q${qIndex}-o${oIndex}`}>
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    {quizResults === null ? (
                      <button 
                        onClick={handleQuizSubmit} 
                        className="btn-submit-quiz"
                        disabled={Object.keys(quizAnswers).length !== currentSectionData.quizzes.length}
                      >
                        Submit Answers
                      </button>
                    ) : (
                      <div className="quiz-results">
                        <h4>Quiz Results</h4>
                        <p className="score">
                          You scored {quizResults.correctAnswers} out of {quizResults.total} ({Math.round(quizResults.score)}%)
                        </p>
                        {quizResults.score >= 70 ? (
                          <p className="pass-message">Great job! You can proceed to the next section.</p>
                        ) : (
                          <p className="fail-message">You might want to review this section again.</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
            
            <div className="section-navigation">
              <button 
                onClick={handlePrevSection} 
                className="btn-nav prev"
                disabled={currentSection === 0}
              >
                Previous
              </button>
              <button 
                onClick={handleNextSection} 
                className="btn-nav next"
                disabled={currentSection === lesson.sections.length - 1}
              >
                Next
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default LessonPage;