// File: client/src/data/ap-statistics-lessons.js

export const lessonContent = {
  '1': {
    '1.1': {
      title: 'Introducing Statistics: What Can We Learn from Data?',
      subtitle: 'Understanding the Power of Statistical Thinking',
      duration: '45 minutes',
      difficulty: 'Beginner',
      
      overview: {
        description: `Welcome to the fascinating world of statistics! In this lesson, we'll explore how statistics helps us make sense of the world around us through data. Statistics is not just about numbers—it's about understanding patterns, making predictions, and drawing meaningful conclusions from information.`,
        keyQuestion: "How can we use data to answer questions and solve real-world problems?",
        realWorldConnection: "Every day, from weather forecasts to medical treatments, statistics shapes the decisions that affect our lives."
      },

      learningObjectives: [
        {
          id: 'lo1',
          text: 'Understand the purpose and importance of statistics in daily life',
          icon: '🎯'
        },
        {
          id: 'lo2',
          text: 'Identify sources of variation and uncertainty in data',
          icon: '📊'
        },
        {
          id: 'lo3',
          text: 'Recognize how context gives meaning to numbers',
          icon: '🔍'
        },
        {
          id: 'lo4',
          text: 'Formulate statistical questions from real-world scenarios',
          icon: '❓'
        }
      ],

      sections: [
        {
          id: 'intro',
          title: 'What is Statistics?',
          content: `
            <h3>The Science of Data</h3>
            <p>Statistics is the science of collecting, organizing, analyzing, and interpreting data to make decisions. It's a powerful tool that transforms raw information into meaningful insights.</p>
            
            <div class="definition-box">
              <h4>📚 Definition</h4>
              <p><strong>Statistics</strong> is the practice or science of collecting and analyzing numerical data in large quantities, especially for the purpose of inferring proportions in a whole from those in a representative sample.</p>
            </div>

            <h3>Why Statistics Matters</h3>
            <p>In our data-driven world, statistics helps us:</p>
            <ul>
              <li>Make informed decisions based on evidence</li>
              <li>Understand patterns and trends</li>
              <li>Evaluate claims and arguments</li>
              <li>Predict future outcomes</li>
              <li>Solve complex problems</li>
            </ul>
          `,
          interactive: {
            type: 'animation',
            id: 'data-flow',
            description: 'Interactive animation showing how raw data transforms into insights'
          }
        },
        
        {
          id: 'variation',
          title: 'Understanding Variation',
          content: `
            <h3>The Heart of Statistics: Variation</h3>
            <p>Variation is everywhere! No two things are exactly alike, and this variation is what makes statistics necessary and powerful.</p>
            
            <div class="concept-highlight">
              <h4>🎲 Key Concept: Variation</h4>
              <p>Variation refers to the differences we observe in data. It can be:</p>
              <ul>
                <li><strong>Natural variation:</strong> Normal differences between individuals</li>
                <li><strong>Measurement variation:</strong> Differences due to measurement errors</li>
                <li><strong>Sampling variation:</strong> Differences between samples from the same population</li>
              </ul>
            </div>

            <h3>Sources of Variation</h3>
            <p>Consider measuring the height of students in your class:</p>
            <ul>
              <li>Genetic factors create natural variation</li>
              <li>Measurement tools might have slight errors</li>
              <li>Time of day (people are slightly taller in the morning!)</li>
              <li>Posture and measurement technique</li>
            </ul>
          `,
          interactive: {
            type: 'simulation',
            id: 'height-variation',
            description: 'Interactive simulation showing variation in student heights'
          }
        },

        {
          id: 'context',
          title: 'Context Gives Meaning',
          content: `
            <h3>Numbers Without Context Are Meaningless</h3>
            <p>Consider this number: <strong>98.6</strong></p>
            <p>What does it mean? Without context, it's just a number. But when we add context:</p>
            
            <div class="example-box">
              <h4>Context Changes Everything</h4>
              <ul>
                <li><strong>98.6°F</strong> - Normal human body temperature</li>
                <li><strong>98.6%</strong> - An excellent test score</li>
                <li><strong>$98.60</strong> - The price of something</li>
                <li><strong>98.6 seconds</strong> - A time measurement</li>
              </ul>
            </div>

            <p>This is why statistical analysis always requires understanding the context of the data!</p>
          `,
          interactive: {
            type: 'quiz',
            id: 'context-quiz',
            description: 'Interactive quiz about interpreting numbers in context'
          }
        },

        {
          id: 'real-world',
          title: 'Real-World Applications',
          content: `
            <h3>Statistics in Action</h3>
            <p>Let's explore three major areas where statistics makes a crucial difference:</p>
          `,
          examples: [
            {
              title: '🏥 Medicine & Healthcare',
              description: 'Clinical trials and treatment effectiveness',
              details: `
                <p>When pharmaceutical companies develop new drugs, they use statistics to:</p>
                <ul>
                  <li>Determine if a drug is effective</li>
                  <li>Identify side effects and their frequency</li>
                  <li>Compare new treatments to existing ones</li>
                </ul>
                <p><strong>Example:</strong> COVID-19 vaccine trials used statistical analysis to prove 95% effectiveness.</p>
              `,
              visualization: 'clinical-trial-chart'
            },
            {
              title: '🗳️ Politics & Polling',
              description: 'Election predictions and public opinion',
              details: `
                <p>Political pollsters use statistics to:</p>
                <ul>
                  <li>Predict election outcomes</li>
                  <li>Understand voter preferences</li>
                  <li>Track changes in public opinion</li>
                </ul>
                <p><strong>Example:</strong> A poll of 1,000 voters can predict millions of votes with surprising accuracy!</p>
              `,
              visualization: 'polling-simulation'
            },
            {
              title: '🏭 Quality Control',
              description: 'Manufacturing and product quality',
              details: `
                <p>Companies use statistics to:</p>
                <ul>
                  <li>Monitor product quality</li>
                  <li>Reduce defects</li>
                  <li>Optimize production processes</li>
                </ul>
                <p><strong>Example:</strong> Testing a sample of 100 products can ensure the quality of 10,000.</p>
              `,
              visualization: 'quality-control-chart'
            }
          ]
        },

        {
          id: 'statistical-thinking',
          title: 'Developing Statistical Thinking',
          content: `
            <h3>How to Think Statistically</h3>
            <p>Statistical thinking involves:</p>
            
            <div class="thinking-framework">
              <h4>The Statistical Thinking Framework</h4>
              <ol>
                <li><strong>Ask the right question:</strong> What do we want to know?</li>
                <li><strong>Collect appropriate data:</strong> How can we gather relevant information?</li>
                <li><strong>Analyze patterns:</strong> What does the data tell us?</li>
                <li><strong>Draw conclusions:</strong> What can we reasonably conclude?</li>
                <li><strong>Communicate results:</strong> How do we share our findings?</li>
              </ol>
            </div>

            <h3>Common Statistical Questions</h3>
            <p>Good statistical questions are:</p>
            <ul>
              <li>Clear and specific</li>
              <li>Answerable with data</li>
              <li>About a group or population</li>
              <li>Anticipate variability</li>
            </ul>
          `,
          interactive: {
            type: 'exercise',
            id: 'question-formulation',
            description: 'Practice formulating statistical questions'
          }
        }
      ],

      activities: [
        {
          id: 'coin-flip',
          type: 'simulation',
          title: 'Coin Flip Experiment',
          description: 'Explore variation and probability through coin flips',
          instructions: 'Click to flip coins and observe the pattern of results'
        },
        {
          id: 'data-detective',
          type: 'game',
          title: 'Data Detective',
          description: 'Identify meaningful patterns in various datasets',
          instructions: 'Analyze the data and answer questions about what you observe'
        }
      ],

      practice: {
        warmup: [
          {
            id: 'q1',
            question: 'Which of the following is a statistical question?',
            type: 'multiple-choice',
            options: [
              'How tall is John?',
              'What is the average height of students in our class?',
              'What is 2 + 2?',
              'What color is the sky?'
            ],
            correct: 1,
            explanation: 'A statistical question anticipates variability and is about a group, not a single value.'
          },
          {
            id: 'q2',
            question: 'Why is context important in statistics?',
            type: 'multiple-choice',
            options: [
              'It makes the data look better',
              'It gives meaning to numbers',
              'It is not important',
              'It makes calculations easier'
            ],
            correct: 1,
            explanation: 'Context transforms raw numbers into meaningful information we can interpret and use.'
          }
        ],
        
        challenge: [
          {
            id: 'c1',
            question: 'A pharmaceutical company claims their new headache medicine works in "87% of cases." What additional context would you need to properly evaluate this claim?',
            type: 'open-response',
            hints: [
              'Think about the study design',
              'Consider the comparison group',
              'What defines "works"?'
            ],
            sampleAnswer: `To properly evaluate this claim, we would need:
              1. Sample size - How many people were tested?
              2. Control group - Was there a placebo comparison?
              3. Definition of "works" - How was effectiveness measured?
              4. Time frame - How quickly and for how long?
              5. Population studied - Age, health conditions, etc.
              6. Side effects - What were the trade-offs?`
          }
        ]
      },

      assessment: {
        checkpoints: [
          {
            id: 'cp1',
            title: 'Understanding Variation',
            description: 'Can you identify sources of variation in data?'
          },
          {
            id: 'cp2',
            title: 'Context Matters',
            description: 'Can you explain why context is crucial for interpreting data?'
          },
          {
            id: 'cp3',
            title: 'Statistical Questions',
            description: 'Can you formulate good statistical questions?'
          }
        ]
      },

      resources: {
        vocabulary: [
          {
            term: 'Statistics',
            definition: 'The science of collecting, organizing, analyzing, and interpreting data'
          },
          {
            term: 'Variation',
            definition: 'The differences observed in data'
          },
          {
            term: 'Data',
            definition: 'Facts and statistics collected for analysis'
          },
          {
            term: 'Context',
            definition: 'The circumstances that form the setting for data'
          },
          {
            term: 'Population',
            definition: 'The entire group being studied'
          },
          {
            term: 'Sample',
            definition: 'A subset of the population used for analysis'
          }
        ],
        
        furtherReading: [
          {
            title: 'The Art of Statistics',
            author: 'David Spiegelhalter',
            description: 'Learning from Data'
          },
          {
            title: 'How to Lie with Statistics',
            author: 'Darrell Huff',
            description: 'Classic book on statistical literacy'
          }
        ],
        
        videos: [
          {
            title: 'The Joy of Stats',
            duration: '5:23',
            description: 'Hans Rosling brings statistics to life'
          }
        ]
      },

      navigation: {
        previous: null,
        next: {
          unit: 1,
          topic: '1.2',
          title: 'The Language of Variation: Variables'
        }
      }
    }
  }
};