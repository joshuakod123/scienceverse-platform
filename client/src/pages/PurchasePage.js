import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CourseContext } from '../context/CourseContext';
import '../styles/PurchasePage.css';

const PurchasePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { purchaseCourse } = useContext(CourseContext);
  
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
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        
        const response = await axios.get(`/api/courses/${courseId}`, config);
        setCourse(response.data.data);
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
      await purchaseCourse(courseId, formData);
      
      setPaymentSuccess(true);
      
      // Redirect to the lesson page after a short delay
      setTimeout(() => {
        navigate(`/lesson/${course.lessons[0]}`, { replace: true });
      }, 3000);
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Error processing payment:', error);
      setProcessingPayment(false);
    }
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
          <button onClick={() => navigate(-1)} className="back-btn">
            &larr; Back
          </button>
          <h1>Purchase Course</h1>
        </div>
        
        <div className="purchase-content">
          <div className="course-summary">
            <div className="course-image">
              <img 
                src={course.imageUrl || '/assets/images/default-course.jpg'} 
                alt={course.title} 
              />
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
                    <span className="original-price">${course.price.toFixed(2)}</span>
                    <span className="discount-price">${course.discountPrice.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="price">${course.price.toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="payment-form-container">
            <h3>Payment Details</h3>
            <form onSubmit={handleSubmit} className="payment-form">
              <div className="form-group">
                <label htmlFor="cardName">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
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
                  placeholder="1234 5678 9012 3456"
                  required
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
                    placeholder="MM/YY"
                    required
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
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-methods">
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={handleInputChange}
                    />
                    <span>Credit Card</span>
                  </label>
                  <label className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit_card"
                      checked={formData.paymentMethod === 'debit_card'}
                      onChange={handleInputChange}
                    />
                    <span>Debit Card</span>
                  </label>
                </div>
              </div>
              
              <div className="form-group total-section">
                <div className="total-label">Total:</div>
                <div className="total-amount">
                  ${(course.discountPrice || course.price).toFixed(2)}
                </div>
              </div>
              
              <button 
                type="submit" 
                className="btn-complete-purchase"
                disabled={processingPayment}
              >
                {processingPayment ? 'Processing...' : 'Complete Purchase'}
              </button>
              
              <p className="secure-note">
                <span className="lock-icon">🔒</span> All payments are secure and encrypted
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;