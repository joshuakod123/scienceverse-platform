// Updated DashboardPage.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { CourseContext } from '../context/CourseContext';
import '../styles/Dashboard.css';

const DashboardPage = () => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useContext(AuthContext);
  const { userCourses, hasPreDefinedCourses, loading: coursesLoading } = useContext(CourseContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for courses to load before setting the component loading state to false
    if (!coursesLoading) {
      // If there are courses, set the first one as current
      if (userCourses && userCourses.length > 0) {
        setCurrentLesson(userCourses[0]);
      }
      
      // Set loading to false after a short delay to ensure smooth transition
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [userCourses, coursesLoading]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
  };

  const goToLesson = (id) => {
    navigate(`/lesson/${id}`);
  };
  
  const handleDiscoverClick = () => {
    navigate('/discover');
  };

  // Format listener count to show actual numbers instead of "K" format
  const formatListeners = (count) => {
    return new Intl.NumberFormat().format(count);
  };

  // Get user's display name - preferring fullName if available
  const userDisplayName = currentUser?.fullName || currentUser?.username || 'User';

  if (loading || coursesLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading your learning dashboard...</p>
      </div>
    );
  }

  // Show message when no courses are selected
  const renderEmptyCourses = () => {
    return (
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '30px',
        textAlign: 'center',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '15px' }}>You haven't selected any courses yet</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Explore our course catalog and start your learning journey today!
        </p>
        <button 
          onClick={handleDiscoverClick}
          style={{ 
            backgroundColor: '#722F37',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Browse Courses
        </button>
      </div>
    );
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: '#EFDFBB', minHeight: '100vh' }}>
      <header className="dashboard-header" style={{ 
        backgroundColor: '#722F37', 
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        color: 'white'
      }}>
        <div className="logo" style={{ fontWeight: 'bold', fontSize: '24px' }}>
          <h1 style={{ margin: 0 }}>Science<span style={{ fontWeight: 'normal' }}>Verse</span></h1>
        </div>
        
        {/* Simplified navigation - only Discover button */}
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            className="nav-item" 
            onClick={handleDiscoverClick}
            style={{ 
              background: 'transparent', 
              border: 'none',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Discover
          </button>
          
          <div className="user-profile" onClick={handleLogout} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '5px 15px',
            borderRadius: '20px'
          }}>
            <div className="avatar" style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#EFDFBB'
            }}>
              <img 
                src="/assets/images/avatar.jpg" 
                alt="User" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzMzMyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjIxIDAgNCAxLjc5IDQgNHMtMS43OSA0LTQgNC00LTEuNzktNC00IDEuNzktNCA0LTR6bTAgMTMuOTljLTMuNSAwLTYuNTgtMS44LTguMzYtNC41MyAxLjg0LTIuNzMgNC45NS00LjQ2IDguMzYtNC40NiAzLjQgMCA2LjUyIDEuNzMgOC4zNiA0LjQ2LTEuNzggMi43My00Ljg1IDQuNTMtOC4zNiA0LjUzeiIvPjwvc3ZnPg==';
                }}
              />
            </div>
            <div className="username" style={{ fontWeight: 'bold' }}>
              {userDisplayName}
            </div>
          </div>
        </div>
      </header>
      
      <div className="dashboard-content" style={{ 
        padding: '30px',
        display: 'flex',
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto',
        flexDirection: window.innerWidth < 1024 ? 'column' : 'row'
      }}>
        <div className="left-panel" style={{ flex: '1', maxWidth: window.innerWidth < 1024 ? '100%' : '800px' }}>
          {/* Simple Welcome Banner */}
          <div className="welcome-section" style={{ 
            marginBottom: '30px',
            backgroundColor: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            padding: '30px 20px',
            textAlign: 'center'
          }}>
            <h1 style={{ 
              color: '#0B1026', 
              fontSize: '32px',
              margin: 0
            }}>
              Welcome, {userDisplayName}
            </h1>
          </div>
          
          <div className="courses-section" style={{ marginBottom: '30px' }}>
            <div className="section-header" style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ color: '#722F37', margin: 0 }}>My Courses</h2>
              {userCourses && userCourses.length > 0 && (
                <button 
                  className="view-all-btn" 
                  onClick={handleDiscoverClick}
                  style={{ 
                    backgroundColor: '#722F37',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >
                  View All
                </button>
              )}
            </div>
            
            {/* Show empty state or courses */}
            {!userCourses || userCourses.length === 0 ? (
              renderEmptyCourses()
            ) : (
              <div className="course-cards" style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(auto-fill, minmax(${window.innerWidth < 768 ? '100%' : '300px'}, 1fr))`,
                gap: '20px'
              }}>
                {userCourses.map(lesson => (
                  <motion.div 
                    key={lesson.id}
                    className={`course-card ${currentLesson?.id === lesson.id ? 'active' : ''}`}
                    onClick={() => handleLessonSelect(lesson)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    style={{ 
                      backgroundColor: 'white',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      border: currentLesson?.id === lesson.id ? '2px solid #722F37' : '2px solid transparent'
                    }}
                  >
                    <div className="course-progress" style={{ padding: '15px 15px 0' }}>
                      <div className="progress-bar" style={{ 
                        height: '6px',
                        backgroundColor: '#eee',
                        borderRadius: '3px',
                        marginBottom: '8px'
                      }}>
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${lesson.progress}%`,
                            height: '100%',
                            backgroundColor: '#722F37',
                            borderRadius: '3px'
                          }}
                        ></div>
                      </div>
                      <span className="progress-text" style={{ 
                        fontSize: '13px',
                        color: '#777'
                      }}>{lesson.progress}% Complete</span>
                    </div>
                    
                    <div style={{ padding: '15px' }}>
                      <h3 className="course-title" style={{ 
                        margin: '0 0 5px 0',
                        color: '#333',
                        fontSize: '18px'
                      }}>{lesson.title}</h3>
                      <p className="course-subtitle" style={{ 
                        margin: '0 0 15px 0',
                        color: '#777',
                        fontSize: '14px'
                      }}>{lesson.subtitle}</p>
                      
                      <div className="course-meta" style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '13px'
                      }}>
                        <span className="meta-category" style={{ 
                          backgroundColor: 'rgba(114, 47, 55, 0.1)',
                          color: '#722F37',
                          padding: '4px 8px',
                          borderRadius: '10px'
                        }}>{lesson.category}</span>
                        <span className="meta-duration">{lesson.duration}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {currentLesson ? (
          <div className="right-panel" style={{ 
            flex: '0 0 380px',
            backgroundColor: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            height: 'fit-content',
            width: window.innerWidth < 1024 ? '100%' : 'auto'
          }}>
            <motion.div 
              className="lesson-detail"
              key={currentLesson.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{ padding: '20px' }}
            >
              <div className="lesson-header" style={{ marginBottom: '20px' }}>
                <div className="lesson-badges" style={{ 
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '15px'
                }}>
                  <span className="badge category" style={{ 
                    backgroundColor: 'rgba(114, 47, 55, 0.1)',
                    color: '#722F37',
                    padding: '4px 10px',
                    borderRadius: '10px',
                    fontSize: '13px'
                  }}>{currentLesson.category}</span>
                  <span className="badge level" style={{ 
                    backgroundColor: '#f0f0f0',
                    color: '#555',
                    padding: '4px 10px',
                    borderRadius: '10px',
                    fontSize: '13px'
                  }}>{currentLesson.level}</span>
                </div>
                
                <h2 className="lesson-title" style={{ 
                  margin: '0 0 10px 0',
                  color: '#333',
                  fontSize: '20px'
                }}>{currentLesson.title}</h2>
                <p className="lesson-subtitle" style={{ 
                  margin: '0 0 15px 0',
                  color: '#777',
                  fontSize: '15px'
                }}>{currentLesson.subtitle}</p>
                
                <div className="lesson-progress-circle" style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '25px 0'
                }}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#e6e6e6" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#722F37" 
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * currentLesson.progress) / 100} 
                      transform="rotate(-90, 50, 50)"
                    />
                    <text 
                      x="50" 
                      y="57" 
                      textAnchor="middle" 
                      fill="#333" 
                      fontSize="22"
                      fontWeight="bold"
                    >
                      {currentLesson.progress}%
                    </text>
                  </svg>
                </div>
              </div>
              
              <div className="lesson-description" style={{ 
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f8f8f8',
                borderRadius: '10px'
              }}>
                <p style={{ 
                  margin: 0,
                  color: '#555',
                  lineHeight: '1.5'
                }}>{currentLesson.description}</p>
              </div>
              
              <div className="lesson-author" style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f8f8f8',
                borderRadius: '10px'
              }}>
                <div className="author-avatar" style={{ 
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#eee'
                }}>
                  <img 
                    src="/assets/avatar-placeholder.png" 
                    alt={currentLesson.author} 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzMzMyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjIxIDAgNCAxLjc5IDQgNHMtMS43OSA0LTQgNC00LTEuNzktNC00IDEuNzktNCA0LTR6bTAgMTMuOTljLTMuNSAwLTYuNTgtMS44LTguMzYtNC41MyAxLjg0LTIuNzMgNC45NS00LjQ2IDguMzYtNC40NiAzLjQgMCA2LjUyIDEuNzMgOC4zNiA0LjQ2LTEuNzggMi43My00Ljg1IDQuNTMtOC4zNiA0LjUzeiIvPjwvc3ZnPg==';
                    }}
                  />
                </div>
                <div className="author-info">
                  <span className="author-label" style={{ 
                    display: 'block',
                    fontSize: '13px',
                    color: '#777'
                  }}>Instructor</span>
                  <span className="author-name" style={{ 
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>{currentLesson.author}</span>
                </div>
              </div>
              
              <div className="lesson-details" style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '25px'
              }}>
                <div className="detail-item" style={{ textAlign: 'center' }}>
                  <span className="detail-label" style={{ 
                    display: 'block',
                    fontSize: '13px',
                    color: '#777',
                    marginBottom: '5px'
                  }}>Duration</span>
                  <span className="detail-value" style={{ 
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>{currentLesson.duration}</span>
                </div>
                <div className="detail-item" style={{ textAlign: 'center' }}>
                  <span className="detail-label" style={{ 
                    display: 'block',
                    fontSize: '13px',
                    color: '#777',
                    marginBottom: '5px'
                  }}>Level</span>
                  <span className="detail-value" style={{ 
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>{currentLesson.level}</span>
                </div>
                <div className="detail-item" style={{ textAlign: 'center' }}>
                  <span className="detail-label" style={{ 
                    display: 'block',
                    fontSize: '13px',
                    color: '#777',
                    marginBottom: '5px'
                  }}>Category</span>
                  <span className="detail-value" style={{ 
                    display: 'block',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>{currentLesson.category}</span>
                </div>
              </div>
              
              <button 
                className="continue-button"
                onClick={() => goToLesson(currentLesson.id)}
                style={{ 
                  width: '100%',
                  backgroundColor: '#722F37',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Continue Learning
              </button>
            </motion.div>
          </div>
        ) : (
          !userCourses || userCourses.length === 0 ? null : (
            <div className="right-panel" style={{ 
              flex: '0 0 380px',
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              height: 'fit-content',
              width: window.innerWidth < 1024 ? '100%' : 'auto'
            }}>
              <h3 style={{ marginBottom: '15px' }}>Select a course to view details</h3>
              <p style={{ color: '#666' }}>Click on any course card to see its details and continue your learning journey.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardPage;