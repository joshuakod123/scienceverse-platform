// File: client/src/pages/courses/ap-statistics/chapters/topic_1_2.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../APStatisticsTopic.css';

const Topic1_2 = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedVariable, setSelectedVariable] = useState(null);

  // Interactive variable examples
  const variableExamples = [
    {
      name: "Student Height",
      type: "quantitative",
      description: "Measured in centimeters",
      values: ["165 cm", "170 cm", "158 cm", "182 cm", "175 cm"],
      icon: "📏"
    },
    {
      name: "Favorite Subject",
      type: "categorical",
      description: "Subject preferences",
      values: ["Math", "English", "Science", "History", "Art"],
      icon: "📚"
    },
    {
      name: "Number of Siblings",
      type: "quantitative",
      description: "Count of siblings",
      values: ["0", "1", "2", "3", "4"],
      icon: "👨‍👩‍👧‍👦"
    },
    {
      name: "Eye Color",
      type: "categorical",
      description: "Natural eye color",
      values: ["Brown", "Blue", "Green", "Hazel", "Gray"],
      icon: "👁"
    }
  ];

  const lesson = {
    title: "The Language of Variation: Variables",
    subtitle: "Understanding Different Types of Data",
    duration: "40 minutes",
    difficulty: "Beginner",
    learningObjectives: [
      {
        id: 1,
        icon: "🏷",
        text: "Define what a variable is in statistical terms"
      },
      {
        id: 2,
        icon: "🔢",
        text: "Distinguish between quantitative and categorical variables"
      },
      {
        id: 3,
        icon: "📊",
        text: "Recognize how variable type affects analysis methods"
      },
      {
        id: 4,
        icon: "🎯",
        text: "Identify variables in real-world contexts"
      }
    ],
    overview: {
      description: "Every statistical investigation begins with identifying what varies from one individual to another. In this topic, we'll learn the fundamental language of variables and how to classify them.",
      keyQuestion: "How do we classify and describe the characteristics that vary among individuals?",
      realWorldConnection: "Understanding variable types is crucial for choosing appropriate graphs, calculations, and analysis methods in any data science project."
    },
    sections: [
      {
        id: 'variables-defined',
        title: 'What is a Variable?',
        content: `
          <p>A <strong>variable</strong> is any characteristic that can take on different values for different individuals or objects in a dataset.</p>
          <br>
          <div class="definition-box">
            <h4>🎯 Key Definition</h4>
            <p><strong>Variable:</strong> A characteristic that varies from one individual to another.</p>
          </div>
          <br>
          <p>Think about your classmates. What characteristics vary among them?</p>
          <ul>
            <li>📏 Height (some are tall, some are short)</li>
            <li>🎂 Age (different birth dates)</li>
            <li>👁 Eye color (brown, blue, green, etc.)</li>
            <li>📱 Number of social media accounts</li>
            <li>🏠 Distance from home to school</li>
            <li>🎵 Favorite music genre</li>
          </ul>
          <br>
          <p>Each of these is a <strong>variable</strong> because the values change (vary) from person to person.</p>
          <br>
          <p><strong>Contrast with constants:</strong> If everyone in your class were exactly 170 cm tall, then height wouldn't be a variable for your class - it would be a constant!</p>
        `
      },
      {
        id: 'variable-types',
        title: 'Two Main Types of Variables',
        content: `
          <p>Variables can be classified into two main categories based on the type of values they can take:</p>
          <br>
          <div class="variable-types-grid">
            <div class="variable-type-card quantitative">
              <h3>🔢 Quantitative Variables</h3>
              <p><strong>Take numerical values that represent quantities</strong></p>
              <ul>
                <li>Heights: 165 cm, 170 cm, 158 cm</li>
                <li>Test scores: 85, 92, 78, 96</li>
                <li>Number of pets: 0, 1, 2, 3</li>
                <li>Time spent studying: 2.5 hours, 4 hours</li>
              </ul>
              <p><strong>Key feature:</strong> Mathematical operations make sense!</p>
            </div>
            
            <div class="variable-type-card categorical">
              <h3>🏷 Categorical Variables</h3>
              <p><strong>Take values that are names or labels</strong></p>
              <ul>
                <li>Eye color: Brown, Blue, Green</li>
                <li>Major: Biology, Math, English</li>
                <li>Grade level: Freshman, Sophomore, Junior, Senior</li>
                <li>Transportation: Car, Bus, Walk, Bike</li>
              </ul>
              <p><strong>Key feature:</strong> Categories classify individuals into groups!</p>
            </div>
          </div>
          <br>
          <div class="tip-box">
            <h4>💡 Quick Test</h4>
            <p>Ask yourself: "Does it make sense to calculate an average?" If yes, it's likely quantitative. If no, it's likely categorical.</p>
          </div>
        `
      },
      {
        id: 'quantitative-details',
        title: 'Diving Deeper: Quantitative Variables',
        content: `
          <p>Quantitative variables can be further subdivided:</p>
          <br>
          <div class="quant-types">
            <div class="quant-type">
              <h4>🔢 Discrete Quantitative</h4>
              <p>Takes on a countable number of values (usually whole numbers)</p>
              <ul>
                <li>Number of children in a family: 0, 1, 2, 3, 4...</li>
                <li>Number of cars owned: 0, 1, 2, 3...</li>
                <li>Shoe size: 6, 6.5, 7, 7.5, 8... (limited options)</li>
              </ul>
            </div>
            
            <div class="quant-type">
              <h4>📈 Continuous Quantitative</h4>
              <p>Can take on any value within a range (including decimals)</p>
              <ul>
                <li>Height: 165.7 cm, 170.23 cm, 158.91 cm...</li>
                <li>Weight: 65.4 kg, 72.85 kg...</li>
                <li>Time: 2.735 seconds, 15.692 minutes...</li>
              </ul>
            </div>
          </div>
          <br>
          <p><strong>Why does this matter?</strong></p>
          <ul>
            <li>📊 Different types require different graphs</li>
            <li>🧮 Different calculations are appropriate</li>
            <li>📋 Different summary statistics make sense</li>
          </ul>
        `
      },
      {
        id: 'categorical-details',
        title: 'Diving Deeper: Categorical Variables',
        content: `
          <p>Categorical variables also have important subtypes:</p>
          <br>
          <div class="cat-types">
            <div class="cat-type">
              <h4>🏷 Nominal Categorical</h4>
              <p>Categories have no natural ordering</p>
              <ul>
                <li>Eye color: Brown, Blue, Green (no "best" color)</li>
                <li>Major: Biology, Math, English (no ranking)</li>
                <li>Transportation: Car, Bus, Walk, Bike</li>
              </ul>
            </div>
            
            <div class="cat-type">
              <h4>📊 Ordinal Categorical</h4>
              <p>Categories have a natural order or ranking</p>
              <ul>
                <li>Grade level: Freshman < Sophomore < Junior < Senior</li>
                <li>Survey responses: Strongly Disagree < Disagree < Neutral < Agree < Strongly Agree</li>
                <li>T-shirt sizes: XS < S < M < L < XL</li>
              </ul>
            </div>
          </div>
          <br>
          <div class="warning-box">
            <h4>⚠️ Common Mistake</h4>
            <p>Just because something is recorded as a number doesn't automatically make it quantitative!</p>
            <ul>
              <li>ZIP codes: 90210, 10001 (categorical - they're labels!)</li>
              <li>Jersey numbers: #23, #7 (categorical - just identifiers!)</li>
              <li>Phone numbers: (555) 123-4567 (categorical - they identify, don't measure!)</li>
            </ul>
          </div>
        `
      },
      {
        id: 'choosing-analysis',
        title: 'Variable Type Determines Analysis',
        content: `
          <p>The type of variable you're working with determines what statistical methods you can use:</p>
          <br>
          <div class="analysis-comparison">
            <div class="analysis-column">
              <h4>📊 For Quantitative Variables</h4>
              <ul>
                <li><strong>Graphs:</strong> Histograms, boxplots, dot plots</li>
                <li><strong>Center:</strong> Mean, median</li>
                <li><strong>Spread:</strong> Standard deviation, IQR, range</li>
                <li><strong>Relationships:</strong> Scatterplots, correlation</li>
              </ul>
            </div>
            
            <div class="analysis-column">
              <h4>🏷 For Categorical Variables</h4>
              <ul>
                <li><strong>Graphs:</strong> Bar charts, pie charts</li>
                <li><strong>Center:</strong> Mode (most common category)</li>
                <li><strong>Spread:</strong> Variety of categories</li>
                <li><strong>Relationships:</strong> Two-way tables, mosaic plots</li>
              </ul>
            </div>
          </div>
          <br>
          <div class="example-box">
            <h4>🎯 Example in Action</h4>
            <p><strong>Scenario:</strong> You want to analyze student performance data</p>
            <ul>
              <li><strong>Test scores (quantitative):</strong> Calculate mean = 85.3, create histogram</li>
              <li><strong>Letter grades (categorical ordinal):</strong> Count frequencies - 12 A's, 15 B's, 8 C's</li>
              <li><strong>Favorite subject (categorical nominal):</strong> Make bar chart showing Math (40%), Science (35%), English (25%)</li>
            </ul>
          </div>
        `
      },
      {
        id: 'practice-identification',
        title: 'Practice: Identifying Variables',
        content: `
          <p>Let's practice identifying variable types with some examples:</p>
          <br>
          <div class="practice-examples">
            <div class="practice-item">
              <h4>🏃‍♀️ Example 1: Running Survey</h4>
              <p>A survey asks runners about their habits:</p>
              <ul>
                <li>"How many miles do you run per week?" → <strong>Quantitative (continuous)</strong></li>
                <li>"What type of shoes do you prefer?" → <strong>Categorical (nominal)</strong></li>
                <li>"Rate your fitness level: Poor/Fair/Good/Excellent" → <strong>Categorical (ordinal)</strong></li>
                <li>"How many races have you completed?" → <strong>Quantitative (discrete)</strong></li>
              </ul>
            </div>
            
            <div class="practice-item">
              <h4>🍕 Example 2: Pizza Restaurant Data</h4>
              <p>A pizza restaurant tracks:</p>
              <ul>
                <li>"Customer satisfaction rating (1-10)" → <strong>Quantitative (discrete)</strong></li>
                <li>"Pizza size: Small/Medium/Large" → <strong>Categorical (ordinal)</strong></li>
                <li>"Delivery time in minutes" → <strong>Quantitative (continuous)</strong></li>
                <li>"Payment method: Cash/Card/App" → <strong>Categorical (nominal)</strong></li>
              </ul>
            </div>
          </div>
          <br>
          <div class="interactive-section">
            <h4>🎮 Interactive: Click to Explore Variables</h4>
            <div class="variable-cards">
              ${variableExamples.map((variable, idx) => `
                <div class="variable-card ${selectedVariable === idx ? 'selected' : ''}" onclick="selectVariable(${idx})">
                  <div class="variable-icon">${variable.icon}</div>
                  <h5>${variable.name}</h5>
                  <p class="variable-type ${variable.type}">${variable.type}</p>
                  <p class="variable-desc">${variable.description}</p>
                  <div class="variable-values">
                    ${variable.values.map(val => `<span class="value-tag">${val}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `
      }
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "Which of the following is the best definition of a variable?",
          options: [
            "Any number in a dataset",
            "A characteristic that varies from one individual to another",
            "The average of a set of numbers",
            "A graph showing data patterns"
          ],
          correctAnswer: 1,
          explanation: "A variable is any characteristic that can take on different values for different individuals in your study."
        },
        {
          id: 2,
          question: "A researcher records the zip codes of survey participants. This variable is:",
          options: [
            "Quantitative, because zip codes are numbers",
            "Categorical, because zip codes identify locations",
            "Neither quantitative nor categorical",
            "Both quantitative and categorical"
          ],
          correctAnswer: 1,
          explanation: "Even though zip codes contain numbers, they are categorical because they serve as labels/identifiers for locations, not quantities that can be meaningfully averaged."
        },
        {
          id: 3,
          question: "Which variable would be classified as quantitative discrete?",
          options: [
            "Height measured to the nearest centimeter",
            "Eye color",
            "Number of books owned",
            "Temperature in degrees Celsius"
          ],
          correctAnswer: 2,
          explanation: "Number of books owned is quantitative (numerical) and discrete (you can't own 2.5 books). Height and temperature are continuous, while eye color is categorical."
        },
        {
          id: 4,
          question: "A survey asks: 'Rate this product: Poor, Fair, Good, Excellent.' This is:",
          options: [
            "Quantitative discrete",
            "Quantitative continuous", 
            "Categorical nominal",
            "Categorical ordinal"
          ],
          correctAnswer: 3,
          explanation: "This is categorical (the responses are labels, not numbers) and ordinal (the categories have a natural order from Poor to Excellent)."
        },
        {
          id: 5,
          question: "For which type of variable would calculating a mean (average) be most appropriate?",
          options: [
            "Categorical nominal",
            "Categorical ordinal",
            "Quantitative",
            "None of the above"
          ],
          correctAnswer: 2,
          explanation: "Calculating a mean is most appropriate for quantitative variables because the numerical values represent actual quantities that can be meaningfully averaged."
        }
      ]
    }
  };

  const selectVariable = (index) => {
    setSelectedVariable(index);
  };

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
            <span className="current">Topic 1.2</span>
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
            <p>Test your understanding of variables and their types.</p>
            
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
            <h2>🎉 Excellent Work!</h2>
            <p>You've mastered Topic 1.2: The Language of Variation</p>
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
            <p className="next-steps">Ready for Topic 1.3: Displaying Categorical Data?</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="lesson-navigation">
        <button 
          className="nav-btn prev"
          onClick={() => navigate('/courses/ap-statistics/topic_1_1')}
        >
          ← Topic 1.1
        </button>
        
        <button 
          className="nav-btn next"
          onClick={() => navigate('/courses/ap-statistics/topic_1_3')}
        >
          Next: Topic 1.3 →
        </button>
      </nav>
    </div>
  );
};

// Expose selectVariable function globally for the interactive section
window.selectVariable = (index) => {
  // This would need to be handled differently in a real React app
  // For now, this is just for demonstration
  console.log(`Selected variable ${index}`);
};

export default Topic1_2;