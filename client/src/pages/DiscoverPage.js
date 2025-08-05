import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { CourseContext } from '../context/CourseContext';

const DiscoverPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { availableCourses, formatListeners } = useContext(CourseContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter the courses that should appear in the discover page
    const discoverCourses = availableCourses.filter(course => {
      // Filter logic can be customized based on your needs
      return course.category === 'Physics' || course.category === 'Mathematics';
    });
    
    setCourses(discoverCourses);
    setLoading(false);
  }, [availableCourses]);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleStartCourse = (course) => {
    navigate(`/lesson/${course.id}`);
  };

  const handlePurchaseCourse = (course) => {
    navigate(`/purchase/${course._id || course.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-wine border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg text-gray-700">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dutch-white p-6">
      <header className="bg-space-blue text-white p-6 rounded-lg shadow-md mb-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Discover New Courses</h1>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-wine text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
            >
              Back to Dashboard
            </button>
          </div>
          <p className="text-sm opacity-80 mt-2">Explore our collection of advanced courses</p>
        </div>
      </header>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
          {courses.map((course) => (
            <motion.div
              key={course.id || course._id}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer h-96 bg-white transform transition-transform hover:-translate-y-1"
              onClick={() => handleCourseSelect(course)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-cover bg-center z-0">
                <img 
                  src={course.imageUrl || "/api/placeholder/400/300"} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-5 text-white">
                <div>
                  <h3 className="text-xl font-mono tracking-wider mb-2">{course.title}</h3>
                  <p className="text-sm mb-1">{course.subtitle}</p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center mb-2">
                    <div className="flex -space-x-2 mr-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                    </div>
                    <div className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-xs">
                      {formatListeners(course.listeners || 0)} listeners
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="text-sm">Lesson {course.completedLessons || 0}/{course.totalLessons || 10}</div>
                    <div className="h-1 bg-white bg-opacity-30 rounded-full mt-1">
                      <div 
                        className="h-full bg-white rounded-full" 
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm mb-3">{course.duration || '30 min'}</div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      course.price && course.price > 0 
                        ? handlePurchaseCourse(course) 
                        : handleStartCourse(course);
                    }}
                    className="w-full bg-wine hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded transition-all"
                  >
                    {course.price && course.price > 0 ? 'PURCHASE COURSE' : 'START LEARNING'}
                  </button>
                </div>
              </div>
              
              {course.price && course.price > 0 && (
                <div className="absolute top-4 right-4 bg-accent-orange text-white text-xs px-2 py-1 rounded-full">
                  PREMIUM
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {selectedCourse && (
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-space-blue mb-3">{selectedCourse.title}</h2>
            <p className="text-gray-700 mb-6">{selectedCourse.description}</p>
            
            <div className="flex justify-between items-center flex-wrap">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  {/* Placeholder for instructor avatar */}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{selectedCourse.category} - {selectedCourse.level}</p>
                </div>
              </div>
              
              <button
                onClick={() => selectedCourse.price && selectedCourse.price > 0 
                  ? handlePurchaseCourse(selectedCourse) 
                  : handleStartCourse(selectedCourse)
                }
                className="bg-wine hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                {selectedCourse.price && selectedCourse.price > 0 ? 'Purchase Course' : 'Start Learning'}
              </button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Lessons</p>
                <p className="font-bold text-xl">{selectedCourse.totalLessons || 10}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-bold text-xl">{selectedCourse.duration || '30 min'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Students</p>
                <p className="font-bold text-xl">{formatListeners(selectedCourse.listeners || 0)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPage;