// File: client/src/pages/courses/APStatisticsTopic.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessonContent } from '../../data/ap-statistics-lessons';
import './APStatisticsTopic.css';

const APStatisticsTopic = () => {
  const { unitNumber, topicId } = useParams();
  const navigate = useNavigate();
  
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [coinFlips, setCoinFlips] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);
  const [showInsight, setShowInsight] = useState(false);

  const lesson = lessonContent[unitNumber]?.[topicId];

  useEffect(() => {
    // Generate random data points for visualization
    const points = [];
    for (let i = 0; i < 30; i++) {
      points.push({
        id: i,
        height: 150 + Math.random() * 40, // Heights between 150-190cm
        weight: 45 + Math.random() * 40,  // Weights between 45-85kg
      });
    }
    setDataPoints(points);
    
    // Load saved progress
    const savedProgress = localStorage.getItem(`ap-stats-${unitNumber}-${topicId}-sections`);
    if (savedProgress) {
      setCompletedSections(new Set(JSON.parse(savedProgress)));
    }
  }, [unitNumber, topicId]);

  // Save progress
  useEffect(() => {
    if (completedSections.size > 0) {
      localStorage.setItem(
        `ap-stats-${unitNumber}-${topicId}-sections`,
        JSON.stringify([...completedSections])
      );
    }
  }, [completedSections, unitNumber, topicId]);

  if (!lesson) {
    return (
      <div className="lesson-error">
        <h2>Lesson not found</h2>
        <button onClick={() => navigate('/courses/ap-statistics')}>
          Back to Course
        </button>
      </div>
    );
  }

  const handleSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // All sections completed
      setShowInsight(true);
    }
  };

  const handleCoinFlip = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    const result = Math.random() > 0.5 ? 'H' : 'T';
    
    setTimeout(() => {
      setCoinFlips(prev => [...prev, result]);
      setIsFlipping(false);
    }, 500);
  };

  const resetCoinFlips = () => {
    setCoinFlips([]);
  };

  const calculateCoinStats = () => {
    const heads = coinFlips.filter(f => f === 'H').length;
    const tails = coinFlips.filter(f => f === 'T').length;
    const total = coinFlips.length;
    const headsPercent = total > 0 ? (heads / total * 100).toFixed(1) : 0;
    const tailsPercent = total > 0 ? (tails / total * 100).toFixed(1) : 0;
    return { heads, tails, total, headsPercent, tailsPercent };
  };

  const handleQuizAnswer = (questionId, answerIndex, isCorrect) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: { index: answerIndex, isCorrect }
    }));
  };

  const progress = (completedSections.size / lesson.sections.length) * 100;

  return (
    <div className="ap-topic-container">
      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">{Math.round(progress)}% Complete</span>
      </div>

      {/* Header */}
      <header className="topic-header">
        <div className="header-content">
          <div className="breadcrumb">
            <span onClick={() => navigate('/courses/ap-statistics')} className="breadcrumb-link">
              AP Statistics
            </span>
            <span className="separator">›</span>
            <span onClick={() => navigate(`/courses/ap-statistics/${unitNumber}`)} className="breadcrumb-link">
              Unit {unitNumber}
            </span>
            <span className="separator">›</span>
            <span className="current">Topic {topicId}</span>
          </div>
          
          <h1 className="topic-title">{lesson.title}</h1>
          <p className="topic-subtitle">{lesson.subtitle}</p>
          
          <div className="topic-meta">
            <span className="meta-item">
              <span className="icon">⏱</span> {lesson.duration}
            </span>
            <span className="meta-item">
              <span className="icon">📈</span> {lesson.difficulty}
            </span>
            <span className="meta-item">
              <span className="icon">✅</span> {completedSections.size}/{lesson.sections.length} Sections
            </span>
          </div>
        </div>
      </header>

      {/* Learning Objectives */}
      <section className="learning-objectives">
        <div className="section-container">
          <h2>🎯 Learning Objectives</h2>
          <div className="objectives-grid">
            {lesson.learningObjectives.map(obj => (
              <div key={obj.id} className="objective-card">
                <span className="objective-icon">{obj.icon}</span>
                <p>{obj.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="lesson-overview">
        <div className="section-container">
          <div className="overview-card">
            <h2>📚 Overview</h2>
            <p className="overview-description">{lesson.overview.description}</p>
            
            <div className="overview-highlights">
              <div className="key-question">
                <h3>🔍 Key Question</h3>
                <p>{lesson.overview.keyQuestion}</p>
              </div>
              
              <div className="real-world">
                <h3>🌍 Real-World Connection</h3>
                <p>{lesson.overview.realWorldConnection}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="content-sections">
        {lesson.sections.map((section, idx) => (
          <section 
            key={section.id} 
            className={`content-section ${idx <= currentSection ? 'visible' : 'hidden'} ${completedSections.has(section.id) ? 'completed' : ''}`}
          >
            <div className="section-container">
              <div className="section-header">
                <h2>Section {idx + 1}: {section.title}</h2>
                {completedSections.has(section.id) && (
                  <span className="completed-badge">✅ Completed</span>
                )}
              </div>
              
              <div className="section-content" dangerouslySetInnerHTML={{ __html: section.content }} />
              
              {/* Interactive Elements */}
              {section.interactive && section.interactive.type === 'animation' && (
                <div className="interactive-animation">
                  <div className="data-flow-animation">
                    <div className="flow-stage stage-1">
                      <div className="stage-icon">📊</div>
                      <div className="stage-label">Raw Data</div>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-stage stage-2">
                      <div className="stage-icon">⚙️</div>
                      <div className="stage-label">Analysis</div>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-stage stage-3">
                      <div className="stage-icon">💡</div>
                      <div className="stage-label">Insights</div>
                    </div>
                    <div className="flow-arrow">→</div>
                    <div className="flow-stage stage-4">
                      <div className="stage-icon">🎯</div>
                      <div className="stage-label">Decisions</div>
                    </div>
                  </div>
                </div>
              )}

              {section.interactive && section.interactive.id === 'height-variation' && (
                <div className="height-variation-sim">
                  <h4>Student Height Distribution</h4>
                  <div className="height-chart">
                    {dataPoints.map((point, i) => (
                      <div 
                        key={i}
                        className="student-bar"
                        style={{ 
                          height: `${point.height}px`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      >
                        <div className="height-label">{point.height.toFixed(0)}cm</div>
                      </div>
                    ))}
                  </div>
                  <p className="chart-caption">
                    Notice the variation! Heights range from {Math.min(...dataPoints.map(p => p.height)).toFixed(0)}cm 
                    to {Math.max(...dataPoints.map(p => p.height)).toFixed(0)}cm
                  </p>
                </div>
              )}

              {/* Real-world examples */}
              {section.examples && (
                <div className="examples-container">
                  {section.examples.map((example, i) => (
                    <div key={i} className="example-card">
                      <div className="example-header">
                        <h3>{example.title}</h3>
                        <p className="example-subtitle">{example.description}</p>
                      </div>
                      <div className="example-content" dangerouslySetInnerHTML={{ __html: example.details }} />
                      
                      {example.visualization === 'clinical-trial-chart' && (
                        <div className="clinical-trial-viz">
                          <div className="trial-group">
                            <div className="trial-label">Treatment Group</div>
                            <div className="trial-bar-container">
                              <div className="trial-bar treatment" style={{ width: '95%' }}>
                                95% Effective
                              </div>
                            </div>
                          </div>
                          <div className="trial-group">
                            <div className="trial-label">Placebo Group</div>
                            <div className="trial-bar-container">
                              <div className="trial-bar placebo" style={{ width: '23%' }}>
                                23% Effective
                              </div>
                            </div>
                          </div>
                          <p className="viz-caption">
                            The dramatic difference shows the treatment's effectiveness!
                          </p>
                        </div>
                      )}

                      {example.visualization === 'polling-simulation' && (
                        <div className="polling-viz">
                          <div className="poll-results">
                            <div className="candidate">
                              <div className="candidate-name">Candidate A</div>
                              <div className="poll-bar" style={{ width: '48%', background: '#4285f4' }}>48%</div>
                            </div>
                            <div className="candidate">
                              <div className="candidate-name">Candidate B</div>
                              <div className="poll-bar" style={{ width: '45%', background: '#ea4335' }}>45%</div>
                            </div>
                            <div className="candidate">
                              <div className="candidate-name">Undecided</div>
                              <div className="poll-bar" style={{ width: '7%', background: '#34a853' }}>7%</div>
                            </div>
                          </div>
                          <p className="margin-of-error">Margin of Error: ±3%</p>
                        </div>
                      )}

                      {example.visualization === 'quality-control-chart' && (
                        <div className="quality-control-viz">
                          <div className="control-chart">
                            <div className="control-line upper">Upper Control Limit</div>
                            <div className="control-line center">Target</div>
                            <div className="control-line lower">Lower Control Limit</div>
                            <div className="data-points">
                              {[...Array(10)].map((_, i) => (
                                <div 
                                  key={i}
                                  className="qc-point"
                                  style={{ 
                                    bottom: `${40 + Math.random() * 20}%`,
                                    left: `${i * 10}%`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="viz-caption">
                            Points within control limits indicate a stable process
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {idx === currentSection && !completedSections.has(section.id) && (
                <button 
                  className="continue-btn"
                  onClick={() => handleSectionComplete(section.id)}
                >
                  Mark Complete & Continue →
                </button>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Coin Flip Activity */}
      <section className="activity-section">
        <div className="section-container">
          <h2>🎲 Interactive Activity: Coin Flip Experiment</h2>
          <p className="activity-intro">
            Explore variation and probability by flipping a virtual coin. 
            Will you see exactly 50% heads and 50% tails?
          </p>
          
          <div className="coin-flip-container">
            <div className="coin-display">
              <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
                <div className="coin-face heads">H</div>
                <div className="coin-face tails">T</div>
              </div>
            </div>
            
            <div className="coin-controls">
              <button 
                className="flip-btn"
                onClick={handleCoinFlip}
                disabled={isFlipping}
              >
                {isFlipping ? 'Flipping...' : 'Flip Coin'}
              </button>
              
              {coinFlips.length > 0 && (
                <button className="reset-btn" onClick={resetCoinFlips}>
                  Reset
                </button>
              )}
            </div>
            
            {coinFlips.length > 0 && (
              <div className="coin-stats">
                <h3>Results after {coinFlips.length} flip{coinFlips.length !== 1 ? 's' : ''}:</h3>
                
                <div className="stats-grid">
                  <div className="stat-card heads-stat">
                    <div className="stat-icon">H</div>
                    <div className="stat-details">
                      <span className="stat-value">{calculateCoinStats().heads}</span>
                      <span className="stat-percent">{calculateCoinStats().headsPercent}%</span>
                    </div>
                  </div>
                  
                  <div className="stat-card tails-stat">
                    <div className="stat-icon">T</div>
                    <div className="stat-details">
                      <span className="stat-value">{calculateCoinStats().tails}</span>
                      <span className="stat-percent">{calculateCoinStats().tailsPercent}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flip-history">
                  <h4>Flip History:</h4>
                  <div className="history-list">
                    {coinFlips.map((flip, idx) => (
                      <span key={idx} className={`flip-result ${flip === 'H' ? 'heads' : 'tails'}`}>
                        {flip}
                      </span>
                    ))}
                  </div>
                </div>
                
                {coinFlips.length >= 10 && (
                  <div className="statistical-insight">
                    <span className="insight-icon">💡</span>
                    <div className="insight-content">
                      <strong>Statistical Insight:</strong>
                      {coinFlips.length < 30 ? (
                        <span> With {coinFlips.length} flips, we see variation from the expected 50/50 split. Try more flips!</span>
                      ) : (
                        <span> After {coinFlips.length} flips, the results are approaching 50/50. This demonstrates the <strong>Law of Large Numbers</strong>!</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Practice Questions */}
      <section className="practice-section">
        <div className="section-container">
          <h2>📝 Check Your Understanding</h2>
          
          <div className="practice-questions">
            {lesson.practice.warmup.map((q, idx) => (
              <div key={q.id} className="question-card">
                <div className="question-header">
                  <h3>Question {idx + 1}</h3>
                  {selectedAnswers[q.id] && (
                    <span className={`status-badge ${selectedAnswers[q.id].isCorrect ? 'correct' : 'incorrect'}`}>
                      {selectedAnswers[q.id].isCorrect ? '✅ Correct' : '❌ Try Again'}
                    </span>
                  )}
                </div>
                
                <p className="question-text">{q.question}</p>
                
                <div className="answer-options">
                  {q.options.map((option, i) => (
                    <button 
                      key={i}
                      className={`answer-option ${
                        selectedAnswers[q.id] 
                          ? selectedAnswers[q.id].index === i 
                            ? selectedAnswers[q.id].isCorrect ? 'correct' : 'incorrect'
                            : i === q.correct && selectedAnswers[q.id] ? 'show-correct' : ''
                          : ''
                      }`}
                      onClick={() => handleQuizAnswer(q.id, i, i === q.correct)}
                      disabled={selectedAnswers[q.id]}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                      <span className="option-text">{option}</span>
                    </button>
                  ))}
                </div>
                
                {selectedAnswers[q.id] && (
                  <div className="question-feedback">
                    <p className="explanation">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Challenge Question */}
          {lesson.practice.challenge && (
            <div className="challenge-section">
              <h3>🏆 Challenge Question</h3>
              {lesson.practice.challenge.map(challenge => (
                <div key={challenge.id} className="challenge-card">
                  <p className="challenge-question">{challenge.question}</p>
                  
                  <div className="hints-section">
                    <details>
                      <summary>💡 Need hints?</summary>
                      <ul className="hints-list">
                        {challenge.hints.map((hint, i) => (
                          <li key={i}>{hint}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                  
                  <details className="sample-answer">
                    <summary>📋 Sample Answer</summary>
                    <div className="answer-content">
                      <pre>{challenge.sampleAnswer}</pre>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Key Terms */}
      <section className="vocabulary-section">
        <div className="section-container">
          <h2>📖 Key Terms</h2>
          <div className="vocabulary-grid">
            {lesson.resources.vocabulary.map((item, idx) => (
              <div key={idx} className="vocab-card">
                <h3 className="vocab-term">{item.term}</h3>
                <p className="vocab-definition">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Completion Message */}
      {showInsight && (
        <div className="completion-message">
          <div className="completion-content">
            <h2>🎉 Congratulations!</h2>
            <p>You've completed all sections of this lesson!</p>
            <div className="completion-stats">
              <div className="stat">
                <span className="stat-label">Sections Completed</span>
                <span className="stat-value">{completedSections.size}/{lesson.sections.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Questions Answered</span>
                <span className="stat-value">{Object.keys(selectedAnswers).length}</span>
              </div>
            </div>
            <p className="next-steps">Ready to move on to the next topic?</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="lesson-navigation">
        <button 
          className="nav-btn prev"
          onClick={() => navigate(`/courses/ap-statistics/${unitNumber}`)}
        >
          ← Back to Unit {unitNumber}
        </button>
        
        {lesson.navigation.next && (
          <button 
            className="nav-btn next"
            onClick={() => navigate(`/courses/ap-statistics/${lesson.navigation.next.unit}/${lesson.navigation.next.topic}`)}
          >
            Next: {lesson.navigation.next.title} →
          </button>
        )}
      </nav>
    </div>
  );
};

export default APStatisticsTopic;