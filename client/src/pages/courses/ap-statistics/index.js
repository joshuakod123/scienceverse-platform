// File: pages/courses/index.js

import React from 'react';
import { useRouter } from 'next/router';
import CourseLayout from '../../components/CourseLayout';

const CoursesIndex = () => {
  const router = useRouter();

  const courses = [
    {
      id: 'ap-statistics',
      title: 'AP Statistics',
      description: 'Master statistical thinking and data analysis through hands-on exploration of real-world data',
      level: 'Advanced Placement',
      duration: '9 Units',
      difficulty: 'Advanced',
      color: 'from-blue-500 to-purple-600',
      icon: '📊',
      skills: [
        'Data Analysis',
        'Probability Theory', 
        'Statistical Inference',
        'Experimental Design'
      ],
      examInfo: {
        date: 'May',
        duration: '3 hours',
        format: 'Multiple Choice + Free Response'
      }
    },
    {
      id: 'ap-physics-1',
      title: 'AP Physics 1',
      description: 'Explore fundamental physics concepts through algebra-based problem solving',
      level: 'Advanced Placement',
      duration: '10 Units',
      difficulty: 'Advanced',
      color: 'from-green-500 to-teal-600',
      icon: '⚛️',
      skills: [
        'Kinematics',
        'Forces and Motion',
        'Energy and Momentum',
        'Waves and Sound'
      ],
      examInfo: {
        date: 'May',
        duration: '3 hours',
        format: 'Multiple Choice + Free Response'
      }
    },
    {
      id: 'ap-physics-2', 
      title: 'AP Physics 2',
      description: 'Advanced physics topics including thermodynamics, electricity, and modern physics',
      level: 'Advanced Placement',
      duration: '7 Units',
      difficulty: 'Advanced',
      color: 'from-purple-500 to-pink-600',
      icon: '🔬',
      skills: [
        'Thermodynamics',
        'Electricity & Magnetism',
        'Fluid Mechanics',
        'Modern Physics'
      ],
      examInfo: {
        date: 'May',
        duration: '3 hours',
        format: 'Multiple Choice + Free Response'
      }
    },
    {
      id: 'ap-calculus-ab',
      title: 'AP Calculus AB',
      description: 'Master the fundamentals of differential and integral calculus',
      level: 'Advanced Placement',
      duration: '8 Units',
      difficulty: 'Advanced',
      color: 'from-red-500 to-orange-600',
      icon: '∫',
      skills: [
        'Limits and Continuity',
        'Differentiation',
        'Integration',
        'Applications of Derivatives'
      ],
      examInfo: {
        date: 'May',
        duration: '3 hours 15 minutes',
        format: 'Multiple Choice + Free Response'
      }
    }
  ];

  const handleCourseClick = (courseId) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <CourseLayout 
      title="Advanced Placement Courses"
      description="Explore our comprehensive AP course offerings designed to help you succeed"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Advanced Placement Courses
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Challenge yourself with college-level coursework and earn college credit while building critical thinking skills
          </p>
        </div>

        {/* Featured Course */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Course</h2>
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => handleCourseClick('ap-statistics')}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">📊</span>
                  <div>
                    <h3 className="text-3xl font-bold">AP Statistics</h3>
                    <p className="text-blue-100">Now Available with Interactive Learning Paths</p>
                  </div>
                </div>
                <p className="text-lg mb-6">
                  Master statistical thinking and data analysis through hands-on exploration of real-world data. 
                  Our new stepping-stone approach makes complex concepts accessible and engaging.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Data Analysis', 'Probability Theory', 'Statistical Inference', 'Experimental Design'].map(skill => (
                    <span key={skill} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-8 text-center">
                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <div className="text-2xl font-bold">9</div>
                  <div className="text-sm">Units</div>
                </div>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Courses Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onClick={() => handleCourseClick(course.id)}
              >
                {/* Course Header */}
                <div className={`bg-gradient-to-r ${course.color} rounded-t-xl p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{course.icon}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {course.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-white/90 text-sm">{course.description}</p>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Duration: {course.duration}</span>
                      <span>Level: {course.level}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">AP Exam Info:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>📅 Exam Date: {course.examInfo.date}</div>
                      <div>⏱️ Duration: {course.examInfo.duration}</div>
                      <div>📝 Format: {course.examInfo.format}</div>
                    </div>
                  </div>
                </div>

                {/* Course Footer */}
                <div className="px-6 pb-6">
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                    {course.id === 'ap-statistics' ? 'Explore Learning Paths' : 'Coming Soon'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our AP Courses */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose ScienceVerse AP Courses?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Learning Paths</h3>
              <p className="text-gray-600 text-sm">
                Follow structured learning paths that break down complex concepts into manageable steps with clear prerequisites
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Exam-Focused Content</h3>
              <p className="text-gray-600 text-sm">
                Content aligned with official AP curriculum and exam requirements to maximize your success
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">
                Monitor your learning progress and identify areas that need more attention with detailed analytics
              </p>
            </div>
          </div>
        </div>

        {/* Course Enrollment CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Challenge Yourself?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of students who have successfully prepared for their AP exams with our comprehensive courses. 
            Start with AP Statistics and experience our new interactive learning approach.
          </p>
          <button 
            onClick={() => handleCourseClick('ap-statistics')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
          >
            Start with AP Statistics
          </button>
        </div>
      </div>
    </CourseLayout>
  );
};

export default CoursesIndex;