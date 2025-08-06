import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [userCourses, setUserCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  // AP 과목 중심의 mock 데이터 - useMemo로 메모이제이션
  const mockCourses = useMemo(() => [
    {
      _id: "ap-physics-1",
      id: "ap-physics-1",
      title: "AP Physics 1",
      subtitle: "Algebra-based Physics Fundamentals",
      description: "Master kinematics, dynamics, circular motion, energy, and waves with interactive animations and simulations.",
      author: "Dr. Richard Feynman",
      category: "Physics",
      level: "Beginner",
      totalDuration: 160,
      duration: "45 min",
      progress: 75,
      students: 15420,
      listeners: 15420,
      rating: 4.9,
      lessons: ["kinematics", "forces", "energy", "momentum", "circular-motion", "waves"],
      totalLessons: 25,
      apCourse: true,
      difficulty: 70,
      price: "Free"
    },
    {
      _id: "ap-physics-2",
      id: "ap-physics-2", 
      title: "AP Physics 2",
      subtitle: "Advanced Algebra-based Physics",
      description: "Explore fluid mechanics, thermodynamics, electricity, magnetism, optics, and modern physics.",
      author: "Dr. Richard Feynman",
      category: "Physics", 
      level: "Intermediate",
      totalDuration: 180,
      duration: "50 min",
      progress: 40,
      students: 12100,
      listeners: 12100,
      rating: 4.8,
      lessons: ["fluids", "thermodynamics", "electricity", "magnetism", "optics", "modern-physics"],
      totalLessons: 28,
      apCourse: true,
      difficulty: 85,
      price: "Free"
    },
    {
      _id: "ap-physics-c-mech",
      id: "ap-physics-c-mech",
      title: "AP Physics C: Mechanics", 
      subtitle: "Calculus-based Mechanics",
      description: "Master advanced mechanics using calculus. Perfect preparation for college-level physics.",
      author: "Dr. Isaac Newton",
      category: "Physics",
      level: "Advanced", 
      totalDuration: 120,
      duration: "55 min",
      progress: 20,
      students: 8920,
      listeners: 8920,
      rating: 4.9,
      lessons: ["calculus-kinematics", "newton-laws-calc", "work-energy-calc", "momentum-calc", "rotation", "oscillations"],
      totalLessons: 20,
      apCourse: true,
      difficulty: 95,
      price: "Free"
    },
    {
      _id: "ap-physics-c-em",
      id: "ap-physics-c-em",
      title: "AP Physics C: E&M",
      subtitle: "Calculus-based Electricity & Magnetism", 
      description: "Advanced electromagnetism with calculus. From Coulomb's law to Maxwell's equations.",
      author: "Dr. James Maxwell",
      category: "Physics",
      level: "Advanced",
      totalDuration: 140,
      duration: "60 min", 
      progress: 0,
      students: 6540,
      listeners: 6540,
      rating: 4.8,
      lessons: ["electrostatics-calc", "gauss-law", "electric-potential", "capacitors", "current-resistance", "magnetic-fields", "induction", "maxwell-equations"],
      totalLessons: 22,
      apCourse: true,
      difficulty: 98,
      price: "Free"
    },
    {
      _id: "ap-calculus-ab",
      id: "ap-calculus-ab",
      title: "AP Calculus AB",
      subtitle: "Differential and Integral Calculus",
      description: "Master limits, derivatives, and integrals. Build a strong foundation for advanced mathematics.",
      author: "Prof. Gottfried Leibniz",
      category: "Mathematics",
      level: "Intermediate",
      totalDuration: 200,
      duration: "50 min",
      progress: 60,
      students: 18750,
      listeners: 18750,
      rating: 4.9,
      lessons: ["limits", "derivatives", "derivative-applications", "integrals", "fundamental-theorem", "integration-applications"],
      totalLessons: 30,
      apCourse: true,
      difficulty: 75,
      price: "Free"
    },
    {
      _id: "ap-calculus-bc", 
      id: "ap-calculus-bc",
      title: "AP Calculus BC",
      subtitle: "Advanced Calculus Topics",
      description: "All of AB plus series, parametric equations, polar coordinates, and advanced integration techniques.",
      author: "Prof. Leonhard Euler",
      category: "Mathematics",
      level: "Advanced",
      totalDuration: 240,
      duration: "55 min",
      progress: 30,
      students: 14200,
      listeners: 14200,
      rating: 4.8,
      lessons: ["ab-review", "integration-techniques", "series", "parametric-polar", "advanced-applications"],
      totalLessons: 35,
      apCourse: true,
      difficulty: 90,
      price: "Free"
    },
    {
      _id: "precalculus",
      id: "precalculus",
      title: "Pre-Calculus",
      subtitle: "Essential Foundation for Calculus",
      description: "Master trigonometry, exponentials, logarithms, and other essential concepts for calculus success.",
      author: "Prof. Algebra Master",
      category: "Mathematics", 
      level: "Beginner",
      totalDuration: 180,
      duration: "45 min",
      progress: 85,
      students: 22100,
      listeners: 22100,
      rating: 4.7,
      lessons: ["functions", "polynomials", "exponentials", "logarithms", "trigonometry", "analytic-geometry"],
      totalLessons: 28,
      apCourse: false,
      difficulty: 60,
      price: "Free"
    },
    {
      _id: "algebra-2",
      id: "algebra-2",
      title: "Algebra 2", 
      subtitle: "Advanced Algebraic Concepts",
      description: "Build strong algebra skills with quadratics, polynomials, exponentials, and more.",
      author: "Prof. Variable Expert",
      category: "Mathematics",
      level: "Beginner", 
      totalDuration: 160,
      duration: "40 min",
      progress: 90,
      students: 19800,
      listeners: 19800,
      rating: 4.6,
      lessons: ["quadratics", "polynomials", "rational-functions", "exponential-functions", "logarithmic-functions", "sequences-series"],
      totalLessons: 24,
      apCourse: false,
      difficulty: 50,
      price: "Free"
    }
  ], []);

  // AP 추천 코스 (고등학생용)
  const discoverCourses = useMemo(() => [
    {
      id: 'study-skills',
      title: 'AP 시험 전략',
      subtitle: '효과적인 AP 시험 준비법',
      description: 'AP 시험에서 고득점을 받기 위한 전략과 시간 관리법을 배우세요.',
      author: 'AP 전문가팀',
      duration: '30 min',
      lesson: '완료',
      listeners: 25000,
      displayListeners: '25,000',
      category: 'Study Skills',
      level: 'Beginner',
      progress: 100,
      totalLessons: 5,
      apCourse: false
    },
    {
      id: 'physics-animations',
      title: '물리학 개념 시각화',
      subtitle: '애니메이션으로 이해하는 물리',
      description: '복잡한 물리 개념을 3D 애니메이션과 시뮬레이션으로 직관적으로 이해하세요.',
      author: 'Dr. 물리애니메이션',
      duration: '25 min',
      lesson: '8/12',
      listeners: 18000,
      displayListeners: '18,000',
      category: 'Physics',
      level: 'Intermediate',
      progress: 67,
      totalLessons: 12,
      apCourse: false
    },
    {
      id: 'calculus-prep',
      title: '미적분학 준비과정',
      subtitle: 'AP Calculus 성공을 위한 준비',
      description: 'AP Calculus AB/BC 수강 전 반드시 알아야 할 핵심 개념들을 정리합니다.',
      author: 'Prof. 준비왕',
      duration: '35 min', 
      lesson: '5/8',
      listeners: 16500,
      displayListeners: '16,500',
      category: 'Mathematics',
      level: 'Beginner',
      progress: 62,
      totalLessons: 8,
      apCourse: false
    }
  ], []);

  useEffect(() => {
    // 개발 모드에서는 mock 데이터 사용
    if (process.env.NODE_ENV === 'development') {
      setAvailableCourses([...mockCourses, ...discoverCourses]);
      
      const storedUserCourses = JSON.parse(localStorage.getItem('userCourses')) || [];
      setUserCourses(storedUserCourses);
      setLoading(false);
      return;
    }

    // 프로덕션에서는 실제 API 호출
    const fetchAvailableCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        setAvailableCourses(response.data.data || []);
      } catch (error) {
        console.error('Error fetching available courses:', error);
        setError('Failed to load available courses');
      }
    };

    fetchAvailableCourses();
  }, [discoverCourses, mockCourses]);

  useEffect(() => {
    // 개발 모드에서는 이미 설정되었으므로 return
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    const fetchUserCourses = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        };

        const response = await axios.get('/api/user/courses', config);
        setUserCourses(response.data.data || []);
      } catch (error) {
        console.error('Error fetching user courses:', error);
        setError('Failed to load user courses');
      } finally {
        setLoading(false);
      }
    };

    fetchUserCourses();
  }, [currentUser]);

  // 코스 등록 함수
  const enrollInCourse = async (courseId) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 모드: localStorage 사용
        const course = availableCourses.find(c => c.id === courseId || c._id === courseId);
        if (course) {
          const newUserCourse = { ...course, enrolledAt: new Date().toISOString() };
          const updatedUserCourses = [...userCourses, newUserCourse];
          setUserCourses(updatedUserCourses);
          localStorage.setItem('userCourses', JSON.stringify(updatedUserCourses));
          return { success: true };
        }
        return { success: false, message: 'Course not found' };
      }

      // 프로덕션 모드: API 호출
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      };

      const response = await axios.post(`/api/user/courses/${courseId}/enroll`, {}, config);
      
      // 사용자 코스 목록 업데이트
      setUserCourses(prev => [...prev, response.data.course]);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to enroll in course' 
      };
    }
  };

  // 코스 진행률 업데이트
  const updateCourseProgress = async (courseId, lessonId, progress) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        // 개발 모드: localStorage 업데이트
        const updatedCourses = userCourses.map(course => {
          if (course.id === courseId || course._id === courseId) {
            return { ...course, progress: progress };
          }
          return course;
        });
        setUserCourses(updatedCourses);
        localStorage.setItem('userCourses', JSON.stringify(updatedCourses));
        return { success: true };
      }

      // 프로덕션 모드: API 호출
      const token = localStorage.getItem('authToken');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      };

      await axios.put(`/api/user/courses/${courseId}/progress`, {
        lessonId,
        progress
      }, config);

      // 로컬 상태 업데이트
      setUserCourses(prev => prev.map(course => 
        course._id === courseId ? { ...course, progress } : course
      ));

      return { success: true };
    } catch (error) {
      console.error('Error updating course progress:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update progress' 
      };
    }
  };

  // 코스가 등록되어 있는지 확인
  const isEnrolled = (courseId) => {
    return userCourses.some(course => course.id === courseId || course._id === courseId);
  };

  // AP 코스만 필터링
  const getAPCourses = () => {
    return availableCourses.filter(course => course.apCourse);
  };

  // 카테고리별 코스 필터링
  const getCoursesByCategory = (category) => {
    return availableCourses.filter(course => 
      course.category.toLowerCase() === category.toLowerCase()
    );
  };

  const value = {
    userCourses,
    availableCourses,
    loading,
    error,
    enrollInCourse,
    updateCourseProgress,
    isEnrolled,
    getAPCourses,
    getCoursesByCategory,
    setError
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom hook for using course context
export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};