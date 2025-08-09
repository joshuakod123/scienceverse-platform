// File: client/src/pages/courses/ap-statistics/chapters/topic_1_4.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../APStatisticsTopic.css';

const Topic1_4 = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [animatingBars, setAnimatingBars] = useState(false);
  const [selectedChart, setSelectedChart] = useState('bar');
  const [pieRotation, setPieRotation] = useState(0);

  // Sample data for interactive visualizations
  const transportationData = [
    { method: 'Drive', count: 80, percentage: 40, color: '#667eea' },
    { method: 'Bus', count: 60, percentage: 30, color: '#764ba2' },
    { method: 'Walk', count: 40, percentage: 20, color: '#f093fb' },
    { method: 'Bike', count: 20, percentage: 10, color: '#f5576c' }
  ];

  const lesson = {
    title: "Representing a Categorical Variable with Graphs",
    subtitle: "Bar Charts, Pie Charts, and Visual Comparisons",
    duration: "50 minutes",
    difficulty: "Beginner",
    learningObjectives: [
      {
        id: 1,
        icon: "📊",
        text: "Construct and interpret bar charts for categorical data"
      },
      {
        id: 2,
        icon: "🥧",
        text: "Create and analyze pie charts effectively"
      },
      {
        id: 3,
        icon: "📈",
        text: "Compare distributions using relative frequencies"
      },
      {
        id: 4,
        icon: "🎯",
        text: "Choose appropriate graphs for different categorical variables"
      }
    ],
    overview: {
      description: "Building on frequency tables, we now learn to create compelling visual representations of categorical data that reveal patterns and enable comparisons.",
      keyQuestion: "How can we use graphs to effectively communicate patterns in categorical data?",
      realWorldConnection: "From election results to market share analysis, graphical displays help decision-makers quickly understand categorical data patterns."
    },
    sections: [
      {
        id: 'bar-charts',
        title: 'Bar Charts: The Gold Standard',
        content: `
          <p>A <strong>bar chart</strong> displays categorical data using rectangular bars where the height represents frequency or relative frequency.</p>
          <br>
          <div class="chart-features">
            <h4>📊 Bar Chart Elements:</h4>
            <ul>
              <li>✅ <strong>Bars:</strong> One for each category</li>
              <li>✅ <strong>Height:</strong> Represents frequency/percentage</li>
              <li>✅ <strong>Gaps:</strong> Small spaces between bars</li>
              <li>✅ <strong>Axes:</strong> Clear labels and scales</li>
              <li>✅ <strong>Title:</strong> Describes what is shown</li>
            </ul>
          </div>
          <br>
          <div class="interactive-demo">
            <h4>🎮 Interactive: Student Transportation Methods</h4>
            <p>Click the button to see the bar chart animate!</p>
            <button class="animate-btn" onclick="triggerBarAnimation()">Animate Bar Chart</button>
            <div class="animated-bar-chart" id="barChart">
              <div class="chart-title">How Students Get to School (n=200)</div>
              <div class="bars-container">
                ${transportationData.map((item, idx) => `
                  <div class="bar-group">
                    <div class="animated-bar" 
                         style="height: 0px; background: ${item.color}; 
                                animation-delay: ${idx * 0.3}s;" 
                         data-height="${item.count * 3}">
                      <span class="bar-value">${item.count}</span>
                    </div>
                    <div class="bar-label">${item.method}</div>
                  </div>
                `).join('')}
              </div>
              <div class="chart-axes">
                <div class="y-axis-label">Number of Students</div>
                <div class="x-axis-label">Transportation Method</div>
              </div>
            </div>
          </div>
          <br>
          <div class="tip-box">
            <h4>💡 Bar Chart Best Practices:</h4>
            <ul>
              <li>Start the frequency axis at zero</li>
              <li>Order categories logically (alphabetical or by frequency)</li>
              <li>Use consistent bar colors or meaningful color coding</li>
              <li>Include clear, descriptive labels and units</li>
              <li>Keep bar widths consistent</li>
            </ul>
          </div>
        `
      },
      {
        id: 'pie-charts',
        title: 'Pie Charts: Parts of a Whole',
        content: `
          <p>A <strong>pie chart</strong> shows categorical data as slices of a circle, emphasizing how each category contributes to the total.</p>
          <br>
          <div class="pie-features">
            <h4>🥧 Pie Chart Characteristics:</h4>
            <ul>
              <li>✅ <strong>Circle:</strong> Represents 100% of the data</li>
              <li>✅ <strong>Slices:</strong> Sized proportionally to category frequency</li>
              <li>✅ <strong>Angles:</strong> Each slice's angle = (frequency/total) × 360°</li>
              <li>✅ <strong>Labels:</strong> Category names and percentages</li>
            </ul>
          </div>
          <br>
          <div class="interactive-pie-demo">
            <h4>🎮 Interactive: Pie Chart Visualization</h4>
            <button class="animate-btn" onclick="rotatePieChart()">Rotate Pie Chart</button>
            <div class="animated-pie-container">
              <div class="pie-chart-animated" id="pieChart">
                <div class="pie-slice slice-1" style="--percentage: 40; --start: 0; --color: #667eea;">
                  <span class="slice-label">Drive 40%</span>
                </div>
                <div class="pie-slice slice-2" style="--percentage: 30; --start: 144; --color: #764ba2;">
                  <span class="slice-label">Bus 30%</span>
                </div>
                <div class="pie-slice slice-3" style="--percentage: 20; --start: 252; --color: #f093fb;">
                  <span class="slice-label">Walk 20%</span>
                </div>
                <div class="pie-slice slice-4" style="--percentage: 10; --start: 324; --color: #f5576c;">
                  <span class="slice-label">Bike 10%</span>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="angle-calculation">
            <h4>🔢 Calculating Slice Angles:</h4>
            <p>For our transportation example:</p>
            <div class="calculation-grid">
              <div class="calc-item">
                <strong>Drive:</strong> (80/200) × 360° = 144°
              </div>
              <div class="calc-item">
                <strong>Bus:</strong> (60/200) × 360° = 108°
              </div>
              <div class="calc-item">
                <strong>Walk:</strong> (40/200) × 360° = 72°
              </div>
              <div class="calc-item">
                <strong>Bike:</strong> (20/200) × 360° = 36°
              </div>
            </div>
            <p><strong>Check:</strong> 144° + 108° + 72° + 36° = 360° ✓</p>
          </div>
        `
      },
      {
        id: 'comparison-techniques',
        title: 'Comparing Categorical Distributions',
        content: `
          <p>When comparing categorical data across groups, <strong>relative frequencies</strong> are essential for fair comparisons.</p>
          <br>
          <div class="comparison-example">
            <h4>📊 Example: School Transportation by Grade Level</h4>
            <div class="grade-comparison-interactive">
              <div class="grade-selector">
                <button class="grade-btn active" onclick="showGrade(9)">9th Grade</button>
                <button class="grade-btn" onclick="showGrade(12)">12th Grade</button>
                <button class="grade-btn" onclick="showComparison()">Compare Both</button>
              </div>
              <div class="comparison-charts" id="comparisonArea">
                <div class="grade-data grade-9">
                  <h5>9th Grade (150 students)</h5>
                  <div class="mini-bars">
                    <div class="mini-bar" style="width: 10%; background: #667eea;">Drive: 15 (10%)</div>
                    <div class="mini-bar" style="width: 50%; background: #764ba2;">Bus: 75 (50%)</div>
                    <div class="mini-bar" style="width: 30%; background: #f093fb;">Walk: 45 (30%)</div>
                    <div class="mini-bar" style="width: 10%; background: #f5576c;">Bike: 15 (10%)</div>
                  </div>
                </div>
                <div class="grade-data grade-12">
                  <h5>12th Grade (150 students)</h5>
                  <div class="mini-bars">
                    <div class="mini-bar" style="width: 60%; background: #667eea;">Drive: 90 (60%)</div>
                    <div class="mini-bar" style="width: 20%; background: #764ba2;">Bus: 30 (20%)</div>
                    <div class="mini-bar" style="width: 13%; background: #f093fb;">Walk: 20 (13%)</div>
                    <div class="mini-bar" style="width: 7%; background: #f5576c;">Bike: 10 (7%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="insight-box">
            <h4>💡 Key Insights from Comparison:</h4>
            <ul>
              <li><strong>Driving increases dramatically:</strong> 60% of 12th graders vs 10% of 9th graders</li>
              <li><strong>Bus dependence decreases:</strong> 50% of 9th graders vs 20% of 12th graders</li>
              <li><strong>Walking decreases:</strong> 30% vs 13% (possibly due to driving)</li>
              <li><strong>Biking remains low:</strong> Both grades under 10%</li>
            </ul>
          </div>
          <br>
          <div class="comparison-methods">
            <h4>📈 Methods for Comparing Distributions:</h4>
            <div class="methods-grid">
              <div class="method-card">
                <h5>Side-by-side Bar Charts</h5>
                <p>Bars for each group placed next to each other for easy comparison</p>
              </div>
              <div class="method-card">
                <h5>Segmented Bar Charts</h5>
                <p>Each bar shows proportions as segments, useful when totals differ</p>
              </div>
              <div class="method-card">
                <h5>Multiple Pie Charts</h5>
                <p>Separate pie chart for each group, good for showing parts of whole</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: 'graph-selection',
        title: 'Choosing the Right Graph',
        content: `
          <p>The choice between different graph types depends on your data characteristics and communication goals.</p>
          <br>
          <div class="selection-guide">
            <h4>🎯 Graph Selection Decision Tree:</h4>
            <div class="decision-tree">
              <div class="decision-node">
                <h5>How many categories?</h5>
                <div class="decision-branches">
                  <div class="branch">
                    <span class="branch-condition">2-5 categories</span>
                    <div class="branch-result">
                      <strong>Consider Pie Chart</strong>
                      <p>Especially if showing parts of a whole</p>
                    </div>
                  </div>
                  <div class="branch">
                    <span class="branch-condition">6+ categories</span>
                    <div class="branch-result">
                      <strong>Use Bar Chart</strong>
                      <p>Pie charts become cluttered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="chart-comparison-tool">
            <h4>🎮 Interactive: Chart Type Selector</h4>
            <div class="chart-selector">
              <button class="chart-type-btn ${selectedChart === 'bar' ? 'active' : ''}" 
                      onclick="selectChartType('bar')">Bar Chart</button>
              <button class="chart-type-btn ${selectedChart === 'pie' ? 'active' : ''}" 
                      onclick="selectChartType('pie')">Pie Chart</button>
            </div>
            <div class="chart-display" id="chartDisplay">
              <!-- Chart will be rendered here based on selection -->
            </div>
          </div>
          <br>
          <div class="common-mistakes">
            <h4>⚠️ Common Mistakes to Avoid:</h4>
            <div class="mistakes-grid">
              <div class="mistake-item">
                <h5>❌ 3D Effects</h5>
                <p>Distort perception and make accurate comparisons impossible</p>
              </div>
              <div class="mistake-item">
                <h5>❌ Too Many Pie Slices</h5>
                <p>More than 5-6 slices become indistinguishable</p>
              </div>
              <div class="mistake-item">
                <h5>❌ Poor Color Choices</h5>
                <p>Use accessible colors that are distinguishable for colorblind users</p>
              </div>
              <div class="mistake-item">
                <h5>❌ Missing Context</h5>
                <p>Always include titles, labels, and data source</p>
              </div>
            </div>
          </div>
          <br>
          <div class="professional-tips">
            <h4>🌟 Professional Presentation Tips:</h4>
            <ul>
              <li><strong>Consistency:</strong> Use the same color scheme throughout</li>
              <li><strong>Ordering:</strong> Arrange categories logically (frequency, alphabetical, or natural order)</li>
              <li><strong>Context:</strong> Include sample size, data collection period, and source</li>
              <li><strong>Accessibility:</strong> Use patterns or textures in addition to colors</li>
              <li><strong>Simplicity:</strong> Remove unnecessary elements that don't add information</li>
            </ul>
          </div>
        `
      }
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "When creating a pie chart, the angle for a category that represents 25% of the data should be:",
          options: [
            "25 degrees",
            "45 degrees", 
            "90 degrees",
            "180 degrees"
          ],
          correctAnswer: 2,
          explanation: "25% of 360° = 0.25 × 360° = 90°. Each percentage point equals 3.6 degrees in a pie chart."
        },
        {
          id: 2,
          question: "Which graph type is most appropriate for displaying the market share of 8 different smartphone brands?",
          options: [
            "Pie chart",
            "Bar chart",
            "Both are equally appropriate",
            "Neither is appropriate"
          ],
          correctAnswer: 1,
          explanation: "With 8 categories, a bar chart is better because pie charts become cluttered and hard to read with many slices. Bar charts make precise comparisons easier."
        },
        {
          id: 3,
          question: "When comparing categorical data between two groups of different sizes, you should:",
          options: [
            "Compare the raw frequencies directly",
            "Use only the larger group's data",
            "Compare the relative frequencies (percentages)",
            "Combine both groups into one analysis"
          ],
          correctAnswer: 2,
          explanation: "When groups have different sizes, relative frequencies (percentages) allow for fair comparisons. Raw frequencies would be misleading."
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
        }
      ]
    }
  };

  // Animation functions
  const triggerBarAnimation = () => {
    setAnimatingBars(true);
    const bars = document.querySelectorAll('.animated-bar');
    bars.forEach((bar, index) => {
      setTimeout(() => {
        const height = bar.getAttribute('data-height');
        bar.style.height = height + 'px';
        bar.style.transform = 'scaleY(1)';
      }, index * 300);
    });
  };

  const rotatePieChart = () => {
    setPieRotation(prev => prev + 90);
    const pieChart = document.getElementById('pieChart');
    if (pieChart) {
      pieChart.style.transform = `rotate(${pieRotation + 90}deg)`;
    }
  };

  // Event handlers
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

  // Make functions globally available for onclick handlers
  useEffect(() => {
    window.triggerBarAnimation = triggerBarAnimation;
    window.rotatePieChart = rotatePieChart;
    window.selectChartType = (type) => setSelectedChart(type);
    
    return () => {
      delete window.triggerBarAnimation;
      delete window.rotatePieChart;
      delete window.selectChartType;
    };
  }, [pieRotation]);

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
            <span className="current">Topic 1.4</span>
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
            <p>Test your understanding of categorical data visualization.</p>
            
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
            <p>You've mastered Topic 1.4: Representing Categorical Variables with Graphs</p>
            <div className="completion-stats">
              <div class="stat">
                <span class="stat-label">Sections Completed</span>
                <span class="stat-value">{completedSections.size}/{lesson.sections.length}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Questions Answered</span>
                <span class="stat-value">{Object.keys(selectedAnswers).length}/{lesson.quiz.questions.length}</span>
              </div>
              <div class="stat">
                <span class="stat-label">Correct Answers</span>
                <span class="stat-value">
                  {Object.values(selectedAnswers).filter(a => a.isCorrect).length}/{lesson.quiz.questions.length}
                </span>
              </div>
            </div>
            <p class="next-steps">Ready for Topic 1.5: Representing Quantitative Variables with Graphs?</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="lesson-navigation">
        <button 
          className="nav-btn prev"
          onClick={() => navigate('/courses/ap-statistics/topic_1_3')}
        >
          ← Topic 1.3
        </button>
        
        <button 
          className="nav-btn next"
          onClick={() => navigate('/courses/ap-statistics/topic_1_5')}
        >
          Next: Topic 1.5 →
        </button>
      </nav>
    </div>
  );
};

export default Topic1_4;