import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SurveyPage = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    name: '',
    interest: '',
    experience: '',
    goal: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setAnswers(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Survey submitted:', answers);
    // In a real app, you would send this data to your backend
    // and navigate to the dashboard
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Determine if current step can proceed
  const canProceed = () => {
    switch(step) {
      case 1: return !!answers.name;
      case 2: return !!answers.interest;
      case 3: return !!answers.experience;
      case 4: return !!answers.goal;
      default: return false;
    }
  };

  return (
    <div className="survey-page">
      <div className="stars-background"></div>
      
      <div className="survey-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${step * 25}%` }}></div>
        </div>
        
        <motion.div 
          key={`step-${step}`}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4 }}
          className="survey-content"
        >
          {step === 1 && (
            <>
              <h2>Welcome to BrainByte!</h2>
              <p>Let's personalize your learning experience. What should we call you?</p>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={answers.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="survey-input"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2>What interests you most?</h2>
              <p>Choose an area you'd like to focus on first.</p>
              <div className="option-cards">
                {['Physics', 'Chemistry', 'Biology', 'Astronomy'].map(option => (
                  <div 
                    key={option}
                    className={`option-card ${answers.interest === option ? 'selected' : ''}`}
                    onClick={() => handleSelectChange('interest', option)}
                  >
                    <div className="option-icon">
                      {option === 'Physics' && '⚛️'}
                      {option === 'Chemistry' && '🧪'}
                      {option === 'Biology' && '🧬'}
                      {option === 'Astronomy' && '🔭'}
                    </div>
                    <span className="option-label">{option}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>What's your experience level?</h2>
              <p>This helps us tailor content to your knowledge level.</p>
              <div className="option-cards">
                {['Beginner', 'Intermediate', 'Advanced'].map(option => (
                  <div 
                    key={option}
                    className={`option-card ${answers.experience === option ? 'selected' : ''}`}
                    onClick={() => handleSelectChange('experience', option)}
                  >
                    <div className="option-icon">
                      {option === 'Beginner' && '🌱'}
                      {option === 'Intermediate' && '🌿'}
                      {option === 'Advanced' && '🌳'}
                    </div>
                    <span className="option-label">{option}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2>What's your main goal?</h2>
              <p>This helps us recommend the right learning path.</p>
              <div className="option-cards goal-cards">
                {[
                  'Build general knowledge', 
                  'Prepare for school/college', 
                  'Professional development',
                  'Personal interest'
                ].map(option => (
                  <div 
                    key={option}
                    className={`option-card ${answers.goal === option ? 'selected' : ''}`}
                    onClick={() => handleSelectChange('goal', option)}
                  >
                    <div className="option-icon">
                      {option === 'Build general knowledge' && '🧠'}
                      {option === 'Prepare for school/college' && '🎓'}
                      {option === 'Professional development' && '💼'}
                      {option === 'Personal interest' && '⭐'}
                    </div>
                    <span className="option-label">{option}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="survey-actions">
            {step > 1 && (
              <button 
                className="btn-back"
                onClick={prevStep}
              >
                Back
              </button>
            )}
            
            {step < 4 ? (
              <button 
                className="btn-next"
                onClick={nextStep}
                disabled={!canProceed()}
              >
                Next
              </button>
            ) : (
              <button 
                className="btn-submit"
                onClick={handleSubmit}
                disabled={!canProceed()}
              >
                Start Learning
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SurveyPage;