// client/src/courses/ap-statistics/unit-1/1.1-IntroStatistics.js
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../../styles/LessonComponent.css';

// 레슨 데이터를 컴포넌트 밖으로 분리하여 재사용성을 높입니다.
const lessonData = {
  title: 'Unit 1.1 — Introducing Statistics: What Can We Learn from Data?',
  subtitle: 'AP Statistics • Exploring One-Variable Data • Interactive Lesson',
  learningGoals: {
    pills: ['VAR-1', 'Skill 1.A'],
    points: [
      'Distinguish statistical questions (expect variability) from non-statistical ones.',
      'Explain why numbers require context to be meaningful.',
      'Recognize the role of data in answering questions about a group.',
    ],
    notice: 'Statistics studies how to collect, analyze, interpret, and present data.'
  },
  interactiveActivity: {
    title: 'Interactive — Is it a Statistical Question?',
    description: 'For each prompt, choose Statistical or Not Statistical. Then open the Why? to see the reasoning.',
    questions: [
      { prompt:"How many push-ups can tenth-graders do in one minute?", isStat:true, why:"Many different students → many possible values. We'd collect data and expect variability." },
      { prompt:"How many letters are in the word 'data'?", isStat:false, why:"There's only one correct, fixed answer. No variability across a population." },
      { prompt:"What percentage of households in our town own a pet?", isStat:true, why:"Different households differ. We'd sample households; results vary with who we ask." },
      { prompt:"What is my heart rate at this moment?", isStat:false, why:"Refers to a single individual at a single time → not about variation across a group." },
      { prompt:"How long are commute times (minutes) for students at our school?", isStat:true, why:"Commutes vary widely across students. A distribution of values is expected." },
      { prompt:"Is 7 a big number?", isStat:false, why:"Without context (units, variable, group) the number is meaningless; not a statistical question." }
    ]
  },
  exitTicket: {
    question: 'Choose the statistical question.',
    options: [
      { id: 'A', text: 'What is my score on today’s quiz?' },
      { id: 'B', text: 'What are the quiz scores of students in this class?' },
      { id: 'C', text: 'Is 7 a big number?' }
    ],
    correctAnswer: 'B'
  }
};

// 재사용 가능한 카드 컴포넌트
const InteractiveCard = ({ question, index, onSelect, selectedChoice }) => {
  return (
    <motion.article 
      className="card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <h3 style={{ margin: '0 0 10px', fontSize: '16px' }}>{index + 1}. {question.prompt}</h3>
      <div className="card-actions">
        <button 
          className={`btn ${selectedChoice === 'stat' ? 'active' : ''}`} 
          onClick={() => onSelect(index, 'stat')}
        >
          Statistical
        </button>
        <button 
          className={`btn ${selectedChoice === 'not' ? 'active' : ''}`}
          onClick={() => onSelect(index, 'not')}
        >
          Not Statistical
        </button>
      </div>
      <details style={{ marginTop: '10px' }}>
        <summary style={{ cursor: 'pointer', fontSize: '14px' }}>Why?</summary>
        <div className="details-box">
          {question.why}
        </div>
      </details>
    </motion.article>
  );
};

const IntroStatistics = () => {
  const navigate = useNavigate();
  
  // States
  const [interactiveChoices, setInteractiveChoices] = useState({});
  const [exitTicketChoice, setExitTicketChoice] = useState(null);
  const [isTicketChecked, setIsTicketChecked] = useState(false);
  
  // Memoized value for performance
  const isTicketCorrect = useMemo(() => {
    return exitTicketChoice === lessonData.exitTicket.correctAnswer;
  }, [exitTicketChoice]);

  // Event Handlers
  const handleInteractiveSelect = (index, choice) => {
    setInteractiveChoices(prev => ({ ...prev, [index]: choice }));
  };
  
  const handleExitTicketSelect = (optionId) => {
    if (!isTicketChecked) {
      setExitTicketChoice(optionId);
    }
  };

  const handleCheckTicket = () => {
    setIsTicketChecked(true);
  };
  
  const handleNextLesson = () => {
    alert('Congratulations! Moving to the next lesson.');
    navigate('/discover'); // 다음 레슨 경로로 변경 가능
  };
  
  const handleBack = () => {
    navigate('/courses/ap-statistics');
  }

  return (
    <div className="lesson-wrapper">
      <header className="lesson-header">
        <div style={{ position: 'absolute', left: '40px' }}>
            <button onClick={handleBack} className="btn ghost">← 뒤로</button>
        </div>
        <div>
            <h1>{lessonData.title}</h1>
            <div className="sub-title">{lessonData.subtitle}</div>
        </div>
        {/* 헤더의 다음 버튼은 Exit Ticket 통과 시에만 나타나도록 할 수 있습니다. */}
      </header>

      <main className="lesson-main-content">
        {/* Learning Goals Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lesson-section"
        >
          <h2>{lessonData.learningGoals.title}</h2>
          <p>{lessonData.learningGoals.pills.map(p => <span key={p} className="pill">{p}</span>)}</p>
          <ul>
            {lessonData.learningGoals.points.map((point, i) => <li key={i}>{point}</li>)}
          </ul>
          <p style={{ marginTop: '15px', fontSize: '14px' }}>{lessonData.learningGoals.notice}</p>
        </motion.section>

        {/* Interactive Activity Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lesson-section"
        >
          <h2>{lessonData.interactiveActivity.title}</h2>
          <p>{lessonData.interactiveActivity.description}</p>
          <div className="grid g2" style={{marginTop: '20px'}}>
            {lessonData.interactiveActivity.questions.map((q, i) => (
              <InteractiveCard 
                key={i}
                question={q}
                index={i}
                onSelect={handleInteractiveSelect}
                selectedChoice={interactiveChoices[i]}
              />
            ))}
          </div>
        </motion.section>

        {/* Exit Ticket Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lesson-section"
        >
          <h2>Exit Ticket</h2>
          <div className="exit-ticket-container">
            <p>{lessonData.exitTicket.question}</p>
            {lessonData.exitTicket.options.map(option => {
              const isSelected = exitTicketChoice === option.id;
              let className = 'choice';
              if (isSelected) className += ' selected';
              if (isTicketChecked) {
                if (option.id === lessonData.exitTicket.correctAnswer) {
                  className += ' correct';
                } else if (isSelected) {
                  className += ' incorrect';
                }
              }

              return (
                <div key={option.id} className={className} onClick={() => handleExitTicketSelect(option.id)}>
                  <input
                    type="radio"
                    name="exit-ticket"
                    value={option.id}
                    checked={isSelected}
                    readOnly
                  />
                  <label htmlFor={`option-${option.id}`}>{option.text}</label>
                </div>
              );
            })}
            <div className="exit-ticket-actions">
              <button className="btn primary" onClick={handleCheckTicket} disabled={!exitTicketChoice || isTicketChecked}>
                Check
              </button>
              <AnimatePresence>
                {isTicketChecked && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`feedback-message ${isTicketCorrect ? 'correct' : 'incorrect'}`}
                  >
                    {isTicketCorrect ? 'Correct! You can now proceed.' : 'Not quite, please try again.'}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="lesson-footer">
        <button className="btn" onClick={handleNextLesson} disabled={!isTicketCorrect}>
          Next Lesson →
        </button>
      </footer>
    </div>
  );
};

export default IntroStatistics;