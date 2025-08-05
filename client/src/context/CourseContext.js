// Updated CourseContext.js
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [userCourses, setUserCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  // useMemo를 사용하여 mock 데이터가 리렌더링 시 재생성되지 않도록 수정
  const mockCourses = useMemo(() => [
    {
      _id: "course123",
      id: "lesson1",
      title: "Introduction to Physics",
      subtitle: "Basic concepts and principles",
      description: "Learn about forces, motion, and energy in this introductory course.",
      price: 49.99,
      imageUrl: "/assets/images/physics.jpg",
      author: "Dr. Richard Feynman",
      category: "Physics",
      level: "Beginner",
      totalDuration: 120,
      duration: "45 min",
      progress: 60,
      students: 1245,
      listeners: 1245,
      rating: 4.8,
      lessons: ["lesson1", "lesson2", "lesson3"],
      totalLessons: 10,
    },
    {
      _id: "course456",
      id: "lesson2",
      title: "Chemistry Fundamentals",
      subtitle: "Atoms, molecules and reactions",
      description: "Understand the building blocks of matter and how they interact.",
      price: 39.99,
      imageUrl: "/assets/images/chemistry.jpg",
      author: "Dr. Marie Curie",
      category: "Chemistry",
      level: "Beginner",
      totalDuration: 150,
      duration: "60 min",
      progress: 30,
      students: 987,
      listeners: 987,
      rating: 4.6,
      lessons: ["lesson4", "lesson5", "lesson6"],
      totalLessons: 12,
    },
    {
        _id: "course789",
        id: "lesson3",
        title: "Biology Essentials",
        subtitle: "Life and living organisms",
        description: "Explore cells, genetics, and ecosystems in this comprehensive overview.",
        price: 59.99,
        imageUrl: "/assets/images/biology.jpg",
        author: "Dr. Jane Goodall",
        category: "Biology",
        level: "Beginner",
        totalDuration: 180,
        duration: "50 min",
        progress: 15,
        students: 756,
        listeners: 756,
        rating: 4.9,
        lessons: ["lesson7", "lesson8", "lesson9"],
        totalLessons: 15,
      },
      {
        _id: "course012",
        id: "lesson4",
        title: "Astronomy Wonders",
        subtitle: "Exploring our universe",
        description: "Journey through space and learn about stars, planets, and galaxies.",
        price: 49.99,
        imageUrl: "/assets/images/astronomy.jpg",
        author: "Dr. Carl Sagan",
        category: "Astronomy",
        level: "Intermediate",
        totalDuration: 160,
        duration: "55 min",
        progress: 5,
        students: 832,
        listeners: 832,
        rating: 4.7,
        lessons: ["lesson10", "lesson11", "lesson12"],
        totalLessons: 8,
      }
  ], []);

  const discoverCourses = useMemo(() => [
    {
        id: 'physics1',
        title: 'AP PHYSICS 1',
        subtitle: 'Algebra-based fundamentals',
        description: 'Learn about kinematics, dynamics, circular motion, and more.',
        author: 'Dr. Richard Feynman',
        duration: '24 min',
        lesson: '6/10',
        listeners: 12000,
        displayListeners: '12,000',
        image: '/assets/images/physics1.jpg',
        category: 'Physics',
        level: 'Advanced',
        progress: 60,
        totalLessons: 10,
      },
      {
        id: 'physics2',
        title: 'AP PHYSICS 2',
        subtitle: 'Advanced concepts and applications',
        description: 'Explore fluid mechanics, thermodynamics, and electric circuits.',
        author: 'Dr. Richard Feynman',
        duration: '30 min',
        lesson: '4/10',
        listeners: 10000,
        displayListeners: '10,000',
        image: '/assets/images/physics2.jpg',
        category: 'Physics',
        level: 'Advanced',
        progress: 40,
        totalLessons: 10,
      },
  ], []);

  useEffect(() => {
    // If we're in development mode, use mock data
    if (process.env.NODE_ENV === 'development') {
      setAvailableCourses([...mockCourses, ...discoverCourses]);
      
      const storedUserCourses = JSON.parse(localStorage.getItem('userCourses')) || [];
      setUserCourses(storedUserCourses);
      setPaidCourses(["course123", "course456"]);
      setLoading(false);
      return;
    }

    // Fetch available courses regardless of user authentication
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
    // If we're in development mode, we already set the data in the previous effect
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
            'Authorization': `Bearer ${token}`
          }
        };
        
        // Fetch user courses
        const coursesResponse = await axios.get('/api/courses/user', config);
        setUserCourses(coursesResponse.data.data || []);
        
        // Fetch paid courses
        const paymentsResponse = await axios.get('/api/payments/user', config);
        const paidCoursesIds = paymentsResponse.data.data
          .filter(payment => payment.status === 'completed')
          .map(payment => payment.courseId._id || payment.courseId);
        
        setPaidCourses(paidCoursesIds);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load your courses');
        setLoading(false);
      }
    };
    
    fetchUserCourses();
  }, [currentUser]);

  // Format listeners to display actual numbers instead of K format
  const formatListeners = (count) => {
    if (!count) return "0";
    return new Intl.NumberFormat().format(count);
  };

  // Check if a user has any predefined courses
  const hasPreDefinedCourses = () => {
    return userCourses.length > 0;
  };
  
  // Check if a specific course is paid for
  const isCoursePaid = (courseId) => {
    if (!courseId) return false;
    
    // In development mode, consider some courses as paid
    if (process.env.NODE_ENV === 'development') {
      return ["course123", "course456"].includes(courseId);
    }
    
    // Check if course is in paid courses list
    return paidCourses.includes(courseId);
  };
  
  // Enroll in a course
  const enrollInCourse = async (courseId) => {
    try {
      // For development, update the local state to simulate enrollment
      if (process.env.NODE_ENV === 'development') {
        const course = availableCourses.find(c => c._id === courseId || c.id === courseId);
        if (course && !userCourses.some(c => c._id === courseId || c.id === courseId)) {
          const newCourses = [...userCourses, course];
          setUserCourses(newCourses);
          localStorage.setItem('userCourses', JSON.stringify(newCourses));
        }
        console.log('Development mode: Enrolled in course', courseId);
        return { success: true };
      }

      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.post(`/api/courses/${courseId}/enroll`, {}, config);
      
      // Refresh user courses after enrollment
      const coursesResponse = await axios.get('/api/courses/user', config);
      setUserCourses(coursesResponse.data.data || []);
      
      return response.data;
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  };
  
  // Purchase a course
  const purchaseCourse = async (courseId, paymentDetails) => {
    try {
      // For development, just return mock success and add to user courses
      if (process.env.NODE_ENV === 'development') {
        const course = availableCourses.find(c => c._id === courseId || c.id === courseId);
        if (course && !userCourses.some(c => c._id === courseId || c.id === courseId)) {
            const newCourses = [...userCourses, course];
            setUserCourses(newCourses);
            localStorage.setItem('userCourses', JSON.stringify(newCourses));
        }
        
        setPaidCourses([...paidCourses, courseId]);
        console.log('Development mode: Purchased course', courseId, paymentDetails);
        return { success: true };
      }

      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      const paymentData = {
        courseId,
        ...paymentDetails,
        paymentMethod: paymentDetails.paymentMethod || 'credit_card',
        status: 'completed' // In a real app, this would be set by the payment gateway
      };
      
      const response = await axios.post('/api/payments/create', paymentData, config);
      
      // Add the new course to paid courses
      setPaidCourses([...paidCourses, courseId]);
      
      // If not already enrolled, enroll in the course
      await enrollInCourse(courseId);
      
      return response.data;
    } catch (error) {
      console.error('Error purchasing course:', error);
      throw error;
    }
  };
  
  return (
    <CourseContext.Provider
      value={{
        userCourses,
        availableCourses,
        paidCourses,
        loading,
        error,
        hasPreDefinedCourses,
        isCoursePaid,
        enrollInCourse,
        purchaseCourse,
        formatListeners
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;