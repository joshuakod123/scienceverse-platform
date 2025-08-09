// File: client/src/pages/courses/ap-statistics/chapters/topic_1_1.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../APStatisticsTopic.css';

const Topic1_1 = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [dataExamples, setDataExamples] = useState([]);
  const [currentExample, setCurrentExample] = useState(0);

  // Data context examples for animation
  const contextExamples = [
    { number: "170", contexts: ["Height (cm)", "Test Score", "Age", "Weight (lbs)", "IQ Score"] },
    { number: "25", contexts: ["Age", "Temperature (°C)", "Test Score", "Speed (mph)", "Price ($)"] },
    { number: "3.5", contexts: ["GPA", "Rating", "Time (hours)", "Distance (miles)", "Weight (kg)"] }
  ];

  const lesson = {
    title: "Introducing Statistics: What Can We Learn from Data?",
    subtitle: "Understanding the Power of Statistical Thinking",
    duration: "45 minutes",
    difficulty: "Beginner",
    learningObjectives: [
      {
        id: 1,
        icon: "🎯",
        text: "Understand the purpose and importance of statistics in daily life"
      },
      {
        id: 2,
        icon: "📊",
        text: "Identify sources of variation and uncertainty in data"
      },
      {
        id: 3,
        icon: "🔍",
        text: "Recognize how context gives meaning to numbers"
      },
      {
        id: 4,
        icon: "🛠",
        text: "Formulate statistical questions from real-world scenarios"
      }
    ],
    overview: {
      description: "This topic introduces the fundamental concept of statistics as a science of learning from data. We'll explore why statistics is essential in a world full of variability and uncertainty.",
      keyQuestion: "What can we learn from data, and why does context matter?",
      realWorldConnection: "From medical research to social media algorithms, statistics helps us make sense of patterns in data and make informed decisions under uncertainty."
    },
    sections: [
      {
        id: 'intro',
        title: 'What is Statistics?',
        content: `
          <p>Statistics is the <strong>science of learning from data</strong>. It provides tools and methods for:</p>
          <ul>
            <li>📊 Collecting and organizing data</li>
            <li>🔍 Analyzing patterns and relationships</li>
            <li>📈 Making predictions and inferences</li>
            <li>🎯 Drawing conclusions under uncertainty</li>
          </ul>
          <br>
          <p>But why do we need statistics? Consider these everyday questions:</p>
          <ul>
            <li>🏫 Are students at our school taller than the national average?</li>
            <li>📱 Does this new study app really improve test scores?</li>
            <li>🎯 Which teaching method is most effective?</li>
            <li>🌡 Is climate change actually happening?</li>
          </ul>
          <br>
          <p>To answer these questions reliably, we can't rely on hunches or anecdotes. We need <strong>systematic, data-driven approaches</strong>.</p>
        `
      },
      {
        id: 'context',
        title: 'Data Needs Context',
        content: `
          <p>The same number can mean completely different things depending on its <strong>context</strong>.</p>
          <br>
          <div class="context-animation">
            <div class="number-display">${contextExamples[currentExample].number}</div>
            <div class="context-options">
              ${contextExamples[currentExample].contexts.map(context => 
                `<span class="context-tag">${context}</span>`
              ).join('')}
            </div>
          </div>
          <br>
          <p>For example, "170" could represent:</p>
          <ul>
            <li>Height: 170 cm (about 5'7" - average height)</li>
            <li>Test score: 170 points (depends on the scale!)</li>
            <li>Age: 170 years old (that's really old!)</li>
            <li>Weight: 170 lbs (about 77 kg)</li>
          </ul>
          <br>
          <p><strong>Key takeaway:</strong> Before analyzing any data, always ask: "What does this number represent?" and "Under what conditions was it collected?"</p>
        `
      },
      {
        id: 'variability',
        title: 'Understanding Variability',
        content: `
          <p>The heart of statistics is understanding <strong>variability</strong> - why data points differ from each other.</p>
          <br>
          <p>If all students were exactly 170 cm tall, would we need statistics? No!</p>
          <br>
          <p>But in reality, we see variation everywhere:</p>
          <ul>
            <li>📏 Student heights: 150cm, 165cm, 178cm, 160cm, 185cm...</li>
            <li>📝 Test scores: 85, 92, 78, 96, 88...</li>
            <li>⏰ Commute times: 25min, 30min, 18min, 45min, 22min...</li>
          </ul>
          <br>
          <div class="highlight-box">
            <h4>🎯 Because of variability, we need to:</h4>
            <ul>
              <li>Find typical values (mean, median)</li>
              <li>Measure spread (range, standard deviation)</li>
              <li>Visualize distributions (histograms, boxplots)</li>
              <li>Identify unusual observations (outliers)</li>
            </ul>
          </div>
          <br>
          <p>Variability isn't just noise - it often contains valuable information about the underlying process!</p>
        `
      },
      {
        id: 'uncertainty',
        title: 'Dealing with Uncertainty',
        content: `
          <p>Another crucial role of statistics is dealing with <strong>uncertainty</strong>.</p>
          <br>
          <p>Suppose the average height in our class of 30 students is 172 cm. Can we conclude that the average height of all students in our school is also 172 cm?</p>
          <br>
          <div class="uncertainty-demo">
            <div class="sample-box">
              <h4>Our Sample (Class)</h4>
              <p>30 students<br>Average: 172 cm</p>
            </div>
            <div class="arrow">→</div>
            <div class="population-box">
              <h4>Population (Whole School)</h4>
              <p>2000 students<br>Average: ???</p>
            </div>
          </div>
          <br>
          <div class="highlight-box">
            <h4>🤔 Key Questions:</h4>
            <ul>
              <li>How confident can we be in our conclusion?</li>
              <li>What's the margin of error?</li>
              <li>What does "95% confident" actually mean?</li>
            </ul>
          </div>
          <br>
          <p>Statistics provides tools to <strong>quantify uncertainty</strong> and make <strong>reliable inferences</strong> from limited data.</p>
        `
      },
      {
        id: 'applications',
        title: 'Statistics in Action',
        content: `
          <p>Statistics is everywhere in modern life:</p>
          <br>
          <div class="applications-grid">
            <div class="app-card">
              <h4>🏥 Medicine</h4>
              <p>Drug effectiveness trials, disease pattern analysis, clinical research design</p>
            </div>
            <div class="app-card">
              <h4>📱 Technology</h4>
              <p>A/B testing, user experience optimization, algorithm performance evaluation</p>
            </div>
            <div class="app-card">
              <h4>💼 Business</h4>
              <p>Market research, sales forecasting, quality control, risk management</p>
            </div>
            <div class="app-card">
              <h4>🌍 Social Sciences</h4>
              <p>Public opinion polls, policy impact analysis, demographic studies</p>
            </div>
            <div class="app-card">
              <h4>🔬 Scientific Research</h4>
              <p>Experimental design, hypothesis testing, data mining, pattern discovery</p>
            </div>
            <div class="app-card">
              <h4>🎮 Sports Analytics</h4>
              <p>Player performance analysis, strategy development, injury prevention</p>
            </div>
          </div>
          <br>
          <p>Understanding statistics helps you become a more critical consumer of information and a better decision-maker!</p>
        `
      }
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the primary purpose of statistics?",
          options: [
            "To use complex mathematical formulas",
            "To understand variability and deal with uncertainty",
            "To collect as much data as possible",
            "To make perfect predictions"
          ],
          correctAnswer: 1,
          explanation: "Statistics is fundamentally about understanding variability in data and making reasonable conclusions despite uncertainty."
        },
        {
          id: 2,
          question: 'You see the number "85" in a dataset. What should you do first to interpret it correctly?',
          options: [
            "Compare it to other numbers",
            "Calculate the average",
            "Understand the context",
            "Create a graph"
          ],
          correctAnswer: 2,
          explanation: "The same number can mean completely different things depending on context. Always establish what the number represents before analyzing it."
        },
        {
          id: 3,
          question: "Why is statistics necessary in the first place?",
          options: [
            "Because all values are identical",
            "Because data contains variability",
            "Because computers are required",
            "To make mathematics more difficult"
          ],
          correctAnswer: 1,
          explanation: "If all measurements were identical, we wouldn't need statistics. It's the variability in data that makes statistical analysis and inference necessary."
        },
        {
          id: 4,
          question: "A class of 25 students has an average test score of 87. What can we conclude about the entire school's average?",
          options: [
            "The school average is exactly 87",
            "The school average is probably close to 87, but we're uncertain",
            "The school average is definitely higher than 87",
            "We cannot learn anything about the school from this sample"
          ],
          correctAnswer: 1,
          explanation: "A sample gives us information about the population, but there's always uncertainty. The sample suggests the population mean is near 87, but we can't be certain of the exact value."
        }
      ]
    }
  };

  // Animation effect for context examples
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % contextExamples.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
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
            <span onClick={() => navigate('/courses/ap-statistics/unit/1')} className="breadcrumb-link">
              Unit 1
            </span>
            <span className="separator">›</span>
            <span className="current">Topic 1.1</span>
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
                <h2>{section.title}</h2>
                {completedSections.has(section.id) && <span className="completed-badge">✅ Completed</span>}
              </div>
              
              <div className="section-content" dangerouslySetInnerHTML={{ __html: section.content }} />
              
              {!completedSections.has(section.id) && (
                <button 
                  className="complete-section-btn"
                  onClick={() => handleSectionComplete(section.id)}
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Quiz Section */}
      {completedSections.size === lesson.sections.length && (
        <section className="quiz-section">
          <div className="section-container">
            <h2>🧠 Knowledge Check</h2>
            <p>Test your understanding of the concepts covered in this topic.</p>
            
            {lesson.quiz.questions.map((question, qIdx) => (
              <div key={question.id} className="quiz-question">
                <h3>Question {qIdx + 1}</h3>
                <p className="question-text">{question.question}</p>
                
                <div className="answer-options">
                  {question.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      className={`option-btn ${
                        selectedAnswers[question.id]?.index === optIdx 
                          ? selectedAnswers[question.id]?.isCorrect 
                            ? 'correct' 
                            : 'incorrect'
                          : ''
                      }`}
                      onClick={() => handleQuizAnswer(question.id, optIdx, optIdx === question.correctAnswer)}
                      disabled={selectedAnswers[question.id]}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                
                {selectedAnswers[question.id] && (
                  <div className="explanation">
                    <p><strong>Explanation:</strong> {question.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Completion Message */}
      {completedSections.size === lesson.sections.length && Object.keys(selectedAnswers).length === lesson.quiz.questions.length && (
        <div className="completion-message">
          <div className="completion-content">
            <h2>🎉 Congratulations!</h2>
            <p>You've completed Topic 1.1: Introducing Statistics</p>
            <div className="completion-stats">
              <div className="stat">
                <span className="stat-label">Sections Completed</span>
                <span className="stat-value">{completedSections.size}/{lesson.sections.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Questions Answered</span>
                <span className="stat-value">{Object.keys(selectedAnswers).length}/{lesson.quiz.questions.length}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Correct Answers</span>
                <span className="stat-value">
                  {Object.values(selectedAnswers).filter(a => a.isCorrect).length}/{lesson.quiz.questions.length}
                </span>
              </div>
            </div>
            <p className="next-steps">Ready for Topic 1.2: The Language of Variation?</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="lesson-navigation">
        <button 
          className="nav-btn prev"
          onClick={() => navigate('/courses/ap-statistics/unit/1')}
        >
          ← Back to Unit 1
        </button>
        
        <button 
          className="nav-btn next"
          onClick={() => navigate('/courses/ap-statistics/topic_1_2')}
        >
          Next: Topic 1.2 →
        </button>
      </nav>
    </div>
  );
};

export default Topic1_1;