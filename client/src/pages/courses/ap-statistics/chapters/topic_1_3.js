// File: client/src/pages/courses/ap-statistics/chapters/topic_1_3.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../APStatisticsTopic.css';

const Topic1_3 = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentChart, setCurrentChart] = useState('bar');
  const [animationStep, setAnimationStep] = useState(0);

  // Sample data for interactive charts
  const sampleData = {
    schoolLunch: [
      { category: 'Pizza', count: 45, percentage: 36 },
      { category: 'Sandwich', count: 35, percentage: 28 },
      { category: 'Salad', count: 25, percentage: 20 },
      { category: 'Soup', count: 20, percentage: 16 }
    ],
    transportMode: [
      { category: 'Car', count: 120, percentage: 48 },
      { category: 'Bus', count: 75, percentage: 30 },
      { category: 'Walk', count: 35, percentage: 14 },
      { category: 'Bike', count: 20, percentage: 8 }
    ]
  };

  const lesson = {
    title: "Displaying Categorical Data",
    subtitle: "Visualizing Categories and Frequencies",
    duration: "50 minutes",
    difficulty: "Beginner",
    learningObjectives: [
      {
        id: 1,
        icon: "📊",
        text: "Create and interpret bar charts for categorical data"
      },
      {
        id: 2,
        icon: "🥧",
        text: "Construct and analyze pie charts effectively"
      },
      {
        id: 3,
        icon: "📈",
        text: "Calculate and use relative frequencies"
      },
      {
        id: 4,
        icon: "🎯",
        text: "Choose appropriate displays for different categorical variables"
      }
    ],
    overview: {
      description: "Categorical data tells us which group or category each individual belongs to. Learning to display this data effectively is crucial for understanding patterns and making comparisons.",
      keyQuestion: "How can we visualize categorical data to reveal patterns and make comparisons?",
      realWorldConnection: "From election results to market research surveys, categorical data visualization helps us understand group differences and preferences in every field."
    },
    sections: [
      {
        id: 'frequency-tables',
        title: 'Frequency Tables: The Foundation',
        content: `
          <p>Before creating any graph, we start with a <strong>frequency table</strong> - a simple summary showing how often each category appears.</p>
          <br>
          <div class="example-table">
            <h4>📊 Example: Favorite School Lunch</h4>
            <p>Survey of 125 students about their favorite lunch option:</p>
            <table class="frequency-table">
              <thead>
                <tr>
                  <th>Lunch Option</th>
                  <th>Frequency</th>
                  <th>Relative Frequency</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pizza</td>
                  <td>45</td>
                  <td>45/125 = 0.36</td>
                  <td>36%</td>
                </tr>
                <tr>
                  <td>Sandwich</td>
                  <td>35</td>
                  <td>35/125 = 0.28</td>
                  <td>28%</td>
                </tr>
                <tr>
                  <td>Salad</td>
                  <td>25</td>
                  <td>25/125 = 0.20</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>Soup</td>
                  <td>20</td>
                  <td>20/125 = 0.16</td>
                  <td>16%</td>
                </tr>
                <tr class="total-row">
                  <td><strong>Total</strong></td>
                  <td><strong>125</strong></td>
                  <td><strong>1.00</strong></td>
                  <td><strong>100%</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <br>
          <div class="key-concepts">
            <h4>🔑 Key Terms:</h4>
            <ul>
              <li><strong>Frequency:</strong> The count of individuals in each category</li>
              <li><strong>Relative Frequency:</strong> The proportion (frequency ÷ total)</li>
              <li><strong>Percentage:</strong> Relative frequency × 100</li>
            </ul>
          </div>
        `
      },
      {
        id: 'bar-charts',
        title: 'Bar Charts: Comparing Categories',
        content: `
          <p>A <strong>bar chart</strong> uses rectangular bars to display the frequency or relative frequency of each category.</p>
          <br>
          <div class="chart-features">
            <h4>📊 Bar Chart Characteristics:</h4>
            <ul>
              <li>✅ Bars can be vertical or horizontal</li>
              <li>✅ Bar height represents frequency/percentage</li>
              <li>✅ Bars should be separated by small gaps</li>
              <li>✅ Categories can be ordered by frequency or alphabetically</li>
              <li>✅ Easy to compare category sizes</li>
            </ul>
          </div>
          <br>
          <div class="interactive-chart">
            <h4>🎮 Interactive: School Lunch Preferences</h4>
            <div class="chart-container">
              <div class="bar-chart">
                <div class="chart-title">Favorite School Lunch Options</div>
                <div class="bars-container">
                  ${sampleData.schoolLunch.map((item, idx) => `
                    <div class="bar-group">
                      <div class="bar" style="height: ${item.percentage * 3}px; animation-delay: ${idx * 0.2}s;">
                        <div class="bar-value">${item.count}</div>
                      </div>
                      <div class="bar-label">${item.category}</div>
                    </div>
                  `).join('')}
                </div>
                <div class="chart-axes">
                  <div class="y-axis-label">Number of Students</div>
                  <div class="x-axis-label">Lunch Option</div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="tip-box">
            <h4>💡 Pro Tips for Bar Charts:</h4>
            <ul>
              <li>Always label your axes</li>
              <li>Include a descriptive title</li>
              <li>Start the frequency axis at 0</li>
              <li>Consider ordering categories by frequency for easier comparison</li>
            </ul>
          </div>
        `
      },
      {
        id: 'pie-charts',
        title: 'Pie Charts: Showing Parts of a Whole',
        content: `
          <p>A <strong>pie chart</strong> displays categorical data as slices of a circle, where each slice represents the relative frequency of a category.</p>
          <br>
          <div class="chart-features">
            <h4>🥧 Pie Chart Characteristics:</h4>
            <ul>
              <li>✅ Total circle represents 100% of the data</li>
              <li>✅ Each slice angle is proportional to the category's percentage</li>
              <li>✅ Good for showing parts of a whole</li>
              <li>⚠️ Difficult to compare small differences</li>
              <li>⚠️ Best with 5 or fewer categories</li>
            </ul>
          </div>
          <br>
          <div class="pie-chart-demo">
            <h4>🎯 Same Data, Different View</h4>
            <div class="pie-container">
              <div class="pie-chart">
                <div class="slice slice-1" style="--percentage: 36; --start-angle: 0deg;">
                  <span class="slice-label">Pizza 36%</span>
                </div>
                <div class="slice slice-2" style="--percentage: 28; --start-angle: 129.6deg;">
                  <span class="slice-label">Sandwich 28%</span>
                </div>
                <div class="slice slice-3" style="--percentage: 20; --start-angle: 230.4deg;">
                  <span class="slice-label">Salad 20%</span>
                </div>
                <div class="slice slice-4" style="--percentage: 16; --start-angle: 302.4deg;">
                  <span class="slice-label">Soup 16%</span>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="comparison-box">
            <h4>🤔 Bar Chart vs. Pie Chart - When to Use Which?</h4>
            <div class="comparison-grid">
              <div class="comparison-item">
                <h5>📊 Use Bar Charts When:</h5>
                <ul>
                  <li>Comparing category sizes</li>
                  <li>You have many categories (6+)</li>
                  <li>Precise comparisons matter</li>
                  <li>Categories don't form a "whole"</li>
                </ul>
              </div>
              <div class="comparison-item">
                <h5>🥧 Use Pie Charts When:</h5>
                <ul>
                  <li>Showing parts of a whole</li>
                  <li>You have few categories (2-5)</li>
                  <li>Emphasizing proportions</li>
                  <li>One category dominates</li>
                </ul>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'relative-frequency',
        title: 'The Power of Relative Frequency',
        content: `
          <p><strong>Relative frequency</strong> (proportions and percentages) is often more useful than raw counts because it allows for fair comparisons between groups of different sizes.</p>
          <br>
          <div class="example-comparison">
            <h4>🎯 Example: Comparing Two Schools</h4>
            <div class="school-comparison">
              <div class="school-data">
                <h5>🏫 Washington High (500 students)</h5>
                <ul>
                  <li>Walk to school: 100 students (20%)</li>
                  <li>Drive to school: 250 students (50%)</li>
                  <li>Take bus: 150 students (30%)</li>
                </ul>
              </div>
              <div class="school-data">
                <h5>🏫 Lincoln High (1000 students)</h5>
                <ul>
                  <li>Walk to school: 150 students (15%)</li>
                  <li>Drive to school: 600 students (60%)</li>
                  <li>Take bus: 250 students (25%)</li>
                </ul>
              </div>
            </div>
            <p><strong>Question:</strong> Which school has more students who walk? Which school has a higher <em>proportion</em> of walkers?</p>
            <div class="answer-box">
              <p><strong>Answer:</strong> Lincoln has more walkers (150 vs 100), but Washington has a higher proportion of walkers (20% vs 15%)!</p>
            </div>
          </div>
          <br>
          <div class="why-relative">
            <h4>🤷‍♀️ Why Use Relative Frequency?</h4>
            <ul>
              <li>🔄 <strong>Fair Comparisons:</strong> Compare groups of different sizes</li>
              <li>📊 <strong>Standardization:</strong> All groups sum to 100%</li>
              <li>🎯 <strong>Pattern Recognition:</strong> Easier to spot trends</li>
              <li>📈 <strong>Communication:</strong> Percentages are universally understood</li>
            </ul>
          </div>
        `
      },
      {
        id: 'common-mistakes',
        title: 'Common Mistakes and Best Practices',
        content: `
          <p>Let's learn from common mistakes to create better categorical data displays:</p>
          <br>
          <div class="mistakes-grid">
            <div class="mistake-item">
              <h4>❌ Mistake 1: 3D Charts</h4>
              <p>3D effects look fancy but distort the data and make comparisons difficult.</p>
              <p><strong>✅ Solution:</strong> Stick to simple 2D charts for accuracy.</p>
            </div>
            
            <div class="mistake-item">
              <h4>❌ Mistake 2: Too Many Categories</h4>
              <p>Pie charts with 8+ slices become impossible to read.</p>
              <p><strong>✅ Solution:</strong> Group small categories into "Other" or use a bar chart.</p>
            </div>
            
            <div class="mistake-item">
              <h4>❌ Mistake 3: Missing Labels</h4>
              <p>Charts without proper titles, axis labels, or legends are confusing.</p>
              <p><strong>✅ Solution:</strong> Always include clear, descriptive labels.</p>
            </div>
            
            <div class="mistake-item">
              <h4>❌ Mistake 4: Misleading Scales</h4>
              <p>Starting bar charts at non-zero values can exaggerate differences.</p>
              <p><strong>✅ Solution:</strong> Always start frequency axes at zero.</p>
            </div>
          </div>
          <br>
          <div class="best-practices">
            <h4>🌟 Best Practices Checklist:</h4>
            <ul>
              <li>✅ Clear, descriptive title</li>
              <li>✅ Labeled axes (bar charts)</li>
              <li>✅ Consistent color scheme</li>
              <li>✅ Appropriate chart type for your data</li>
              <li>✅ Easy-to-read fonts and sizes</li>
              <li>✅ Legend when needed</li>
              <li>✅ Source of data mentioned</li>
            </ul>
          </div>
        `
      }
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is the relative frequency of a category that appears 15 times in a dataset of 60 observations?",
          options: [
            "15",
            "0.25",
            "25%",
            "Both 0.25 and 25%"
          ],
          correctAnswer: 3,
          explanation: "Relative frequency = 15/60 = 0.25 = 25%. Both the decimal and percentage forms are correct ways to express relative frequency."
        },
        {
          id: 2,
          question: "Which chart type is generally better for comparing the frequencies of 8 different categories?",
          options: [
            "Pie chart",
            "Bar chart",
            "Both are equally good",
            "Neither is appropriate"
          ],
          correctAnswer: 1,
          explanation: "Bar charts are better for many categories because they make precise comparisons easier. Pie charts become cluttered and hard to read with 8+ categories."
        },
        {
          id: 3,
          question: "In a frequency table, what should the relative frequencies always add up to?",
          options: [
            "The sample size",
            "100",
            "1.0 (or 100%)",
            "It depends on the data"
          ],
          correctAnswer: 2,
          explanation: "Relative frequencies are proportions, so they must always sum to 1.0 (which equals 100%)."
        },
        {
          id: 4,
          question: "A pie chart is most appropriate when:",
          options: [
            "You have more than 10 categories",
            "You want to show parts of a whole with few categories",
            "You need to compare exact values precisely",
            "The categories don't form a complete set"
          ],
          correctAnswer: 1,
          explanation: "Pie charts work best when showing how parts make up a whole, especially with 2-5 categories. They emphasize proportions rather than exact comparisons."
        },
        {
          id: 5,
          question: "School A has 20 out of 100 students who bike to school. School B has 60 out of 400 students who bike. Which statement is correct?",
          options: [
            "School B has more bikers and a higher proportion of bikers",
            "School B has more bikers but School A has a higher proportion",
            "School A has more bikers and a higher proportion of bikers",
            "Both schools have the same proportion of bikers"
          ],
          correctAnswer: 1,
          explanation: "School B has more bikers (60 vs 20), but School A has a higher proportion (20% vs 15%). This shows why relative frequency is important for fair comparisons."
        }
      ]
    }
  };

  // Animation for chart building
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 2000);
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
            <span className="current">Topic 1.3</span>
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
            <p>Test your understanding of displaying categorical data.</p>
            
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
            <h2>🎉 Outstanding!</h2>
            <p>You've mastered Topic 1.3: Displaying Categorical Data</p>
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
            <p className="next-steps">Ready for Topic 1.4: Describing Categorical Data?</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="lesson-navigation">
        <button 
          className="nav-btn prev"
          onClick={() => navigate('/courses/ap-statistics/topic_1_2')}
        >
          ← Topic 1.2
        </button>
        
        <button 
          className="nav-btn next"
          onClick={() => navigate('/courses/ap-statistics/topic_1_4')}
        >
          Next: Topic 1.4 →
        </button>
      </nav>
    </div>
  );
};

export default Topic1_3;