// File: client/src/pages/PurchasePage.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CourseContext } from '../context/CourseContext';
import '../styles/PurchasePage.css';

const PurchasePage = () => {
  const { courseId: paramCourseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { purchaseCourse } = useContext(CourseContext);
  
  // Get courseId from either URL params or query params
  const courseId = paramCourseId || searchParams.get('course');
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit_card'
  });

  // Mock course data for demo
  const mockCourseData = {
    'ap-statistics': {
      title: 'AP Statistics',
      subtitle: 'Master statistical thinking and data analysis',
      category: 'Mathematics',
      level: 'Advanced',
      totalDuration: '960',
      price: 149.99,
      discountPrice: null,
      imageUrl: null,
      lessons: ['lesson-1']
    },
    'ap-physics-1': {
      title: 'AP Physics 1',
      subtitle: 'Algebra-based Physics',
      category: 'Physics',
      level: 'Intermediate',
      totalDuration: '900',
      price: 149.99,
      discountPrice: null,
      imageUrl: null,
      lessons: ['lesson-1']
    },
    'ap-physics-2': {
      title: 'AP Physics 2',
      subtitle: 'Advanced Algebra-based Physics',
      category: 'Physics',
      level: 'Advanced',
      totalDuration: '920',
      price: 149.99,
      discountPrice: null,
      imageUrl: null,
      lessons: ['lesson-1']
    },
    'ap-physics-c-mechanics': {
      title: 'AP Physics C: Mechanics',
      subtitle: 'Calculus-based Mechanics',
      category: 'Physics',
      level: 'Expert',
      totalDuration: '480',
      price: 149.99,
      discountPrice: null,
      imageUrl: null,
      lessons: ['lesson-1']
    }
  };
  
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setError('No course specified');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // For demo, use mock data
        const mockCourse = mockCourseData[courseId];
        if (mockCourse) {
          setCourse(mockCourse);
          setLoading(false);
          return;
        }

        // Real API call (commented out for demo)
        /*
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        
        const response = await axios.get(`/api/courses/${courseId}`, config);
        setCourse(response.data.data);
        */
        
        setLoading(false);
      } catch (error) {
        setError('Failed to load course. Please try again.');
        setLoading(false);
        console.error('Error fetching course:', error);
      }
    };
    
    fetchCourse();
  }, [courseId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!course) {
      return;
    }
    
    try {
      setProcessingPayment(true);
      
      // In a real app, this would integrate with a payment processor
      // For demo purposes, we're just simulating a successful payment
      setTimeout(() => {
        setPaymentSuccess(true);
        
        // Redirect to the course detail page after a short delay
        setTimeout(() => {
          navigate(`/courses/${courseId}`, { replace: true });
        }, 3000);
      }, 2000);
      
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Error processing payment:', error);
      setProcessingPayment(false);
    }
  };

  const handleBackToCourse = () => {
    navigate(`/courses/${courseId}`);
  };
  
  if (loading) {
    return (
      <div className="purchase-page loading">
        <div className="loader"></div>
        <p>Loading course details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="purchase-page error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="purchase-page error">
        <h2>Course Not Found</h2>
        <p>The course you're trying to purchase doesn't exist.</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }
  
  if (paymentSuccess) {
    return (
      <div className="purchase-page success">
        <motion.div 
          className="success-card"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>Thank you for purchasing <strong>{course.title}</strong>.</p>
          <p>You now have full access to all course materials.</p>
          <p className="redirect-message">Redirecting to the course...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="purchase-page">
      <div className="purchase-container">
        <div className="purchase-header">
          <button onClick={handleBackToCourse} className="back-btn">
            &larr; Back to Course
          </button>
          <h1>Purchase Course</h1>
        </div>
        
        <div className="purchase-content">
          <div className="course-summary">
            <div className="course-image">
              <div className="course-image-placeholder">
                {courseId === 'ap-statistics' ? '📊' : 
                 courseId === 'ap-physics-1' ? '⚛️' :
                 courseId === 'ap-physics-2' ? '🔬' :
                 courseId === 'ap-physics-c-mechanics' ? '🎯' : '📚'}
              </div>
            </div>
            <div className="course-info">
              <h2>{course.title}</h2>
              <p className="course-subtitle">{course.subtitle}</p>
              <div className="course-meta">
                <span className="category">{course.category}</span>
                <span className="level">{course.level}</span>
                <span className="duration">{course.totalDuration} min</span>
              </div>
              <div className="course-price">
                {course.discountPrice ? (
                  <>
                    <span className="original-price">${course.price}</span>
                    <span className="discount-price">${course.discountPrice}</span>
                  </>
                ) : (
                  <span className="price">FREE</span>
                )}
              </div>
            </div>
          </div>
          
          <form className="payment-form" onSubmit={handleSubmit}>
            <h3>Payment Information</h3>
            
            <div className="form-group">
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  placeholder="123"
                  maxLength="4"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-submit"
              disabled={processingPayment}
            >
              {processingPayment ? 'Processing...' : 'Complete Purchase'}
            </button>
            
            <p className="secure-notice">
              🔒 Your payment information is secure and encrypted.
            </p>
            
            <p className="demo-notice">
              <strong>Demo Mode:</strong> This is a demonstration. No real payment will be processed.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;