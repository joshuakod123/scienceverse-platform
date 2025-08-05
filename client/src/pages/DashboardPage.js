import React, { useState, useEffect } from 'react';

const DashboardPage = () => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const currentUser = {
    username: '조수아',
    fullName: '조수아'
  };

  // Featured courses with original color theme
  const featuredCourses = [
    {
      id: 'physics-mechanics',
      title: 'Classical Mechanics',
      subtitle: 'Motion and Forces',
      category: 'Physics',
      level: 'Intermediate',
      duration: '12 weeks',
      progress: 65,
      color: 'linear-gradient(135deg, #722F37 0%, #1E0538 100%)',
      icon: '⚛️'
    },
    {
      id: 'chemistry-organic',
      title: 'Organic Chemistry',
      subtitle: 'Carbon Compounds',
      category: 'Chemistry',
      level: 'Advanced',
      duration: '16 weeks',
      progress: 30,
      color: 'linear-gradient(135deg, #E85A4F 0%, #722F37 100%)',
      icon: '🧪'
    },
    {
      id: 'biology-genetics',
      title: 'Genetics & Evolution',
      subtitle: 'DNA and Heredity',
      category: 'Biology',
      level: 'Intermediate',
      duration: '10 weeks',
      progress: 80,
      color: 'linear-gradient(135deg, #0B1026 0%, #1E0538 100%)',
      icon: '🧬'
    },
    {
      id: 'astronomy-cosmos',
      title: 'Exploring the Cosmos',
      subtitle: 'Stars and Galaxies',
      category: 'Astronomy',
      level: 'Beginner',
      duration: '8 weeks',
      progress: 15,
      color: 'linear-gradient(135deg, #1E0538 0%, #0B1026 100%)',
      icon: '🌌'
    },
    {
      id: 'mathematics-calculus',
      title: 'Advanced Calculus',
      subtitle: 'Derivatives and Integrals',
      category: 'Mathematics',
      level: 'Advanced',
      duration: '14 weeks',
      progress: 45,
      color: 'linear-gradient(135deg, #EFDFBB 0%, #E85A4F 100%)',
      icon: '📐'
    },
    {
      id: 'computer-science',
      title: 'Computer Science',
      subtitle: 'Algorithms & Data Structures',
      category: 'Computer Science',
      level: 'Intermediate',
      duration: '12 weeks',
      progress: 90,
      color: 'linear-gradient(135deg, #722F37 0%, #E85A4F 100%)',
      icon: '💻'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleCourseClick = (courseId) => {
    console.log('Course clicked:', courseId);
    // In real app, navigate to course
  };

  const handleDiscoverClick = () => {
    console.log('Discover clicked');
    // In real app, navigate to discover page
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // In real app, handle logout
  };

  const userDisplayName = currentUser?.fullName || currentUser?.username || 'User';

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f0f23',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #333',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading your learning dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 80%, rgba(114, 47, 55, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(239, 223, 187, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(30, 5, 56, 0.4) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <header style={{
        position: 'relative',
        zIndex: 10,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <h1 style={{
            margin: 0,
            color: '#EFDFBB',
            fontSize: '24px',
            fontWeight: '700'
          }}>
            Science<span style={{ fontWeight: '400' }}>Verse</span>
          </h1>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          <button 
            onClick={handleDiscoverClick}
            style={{
              background: 'transparent',
              border: '2px solid #EFDFBB',
              color: '#EFDFBB',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#EFDFBB';
              e.target.style.color = '#722F37';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#EFDFBB';
            }}
          >
            Discover
          </button>

          <div 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            <div             style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#722F37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              border: '2px solid #EFDFBB'
            }}>
              👤
            </div>
            <span style={{ fontSize: '14px', color: '#EFDFBB' }}>{userDisplayName}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        position: 'relative',
        zIndex: 5,
        padding: '60px 40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          color: 'white',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease forwards'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '300',
            margin: '0 0 20px 0',
            lineHeight: '1.2'
          }}>
            We strive to greet<br />
            <span style={{ fontWeight: '600' }}>a better future.</span>
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.8,
            margin: 0
          }}>
            Click here to add your own text and edit me.
          </p>
        </div>

        {/* Motivational Quote */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 0.2s forwards'
        }}>
          <p style={{
            fontSize: '20px',
            color: 'white',
            fontStyle: 'italic',
            opacity: 0.9
          }}>
            "I am a positive person"
          </p>
        </div>

        {/* Course Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          marginBottom: '60px',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 0.4s forwards'
        }}>
          {featuredCourses.map((course, index) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                opacity: 0,
                animation: `fadeInUp 0.6s ease ${0.1 * index + 0.6}s forwards`,
                transform: 'translateY(30px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Course Image/Icon */}
              <div style={{
                height: '200px',
                background: course.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  fontSize: '60px',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                }}>
                  {course.icon}
                </div>
                
                {/* Progress bar */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${course.progress}%`,
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>

              {/* Course Info */}
              <div style={{
                padding: '25px',
                color: 'white'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div>
                    <h3 style={{
                      margin: '0 0 5px 0',
                      fontSize: '20px',
                      fontWeight: '600'
                    }}>
                      {course.title}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      opacity: 0.8
                    }}>
                      {course.subtitle}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    {course.progress}%
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  opacity: 0.7
                }}>
                  <span>{course.category}</span>
                  <span>{course.level}</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{
          textAlign: 'center',
          opacity: 0,
          animation: 'fadeInUp 0.8s ease 0.8s forwards'
        }}>
          <button
            onClick={handleDiscoverClick}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '15px 40px',
              borderRadius: '30px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'translateY(0px)';
            }}
          >
            Explore All Courses
          </button>
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;