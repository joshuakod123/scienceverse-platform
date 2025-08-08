// File: client/src/pages/courses/APStatisticsTopic.js

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const APStatisticsTopic = () => {
  const { unitNumber, topicId } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  
  // 토픽 데이터 (실제로는 별도 파일로 분리하거나 API에서 가져옴)
  const topicsData = {
    '1': {
      '1.1': {
        title: 'Introducing Statistics',
        description: 'What can we learn from data?',
        content: `
          Statistics is the science of collecting, organizing, analyzing, and interpreting data to make decisions.
          In this topic, we'll explore:
          - The role of variation in statistics
          - How uncertainty affects our conclusions
          - Real-world applications of statistical thinking
        `,
        learningObjectives: [
          'Understand the purpose of statistics',
          'Identify sources of variation in data',
          'Recognize the importance of context in data analysis'
        ],
        examples: [
          'Medical trials and drug effectiveness',
          'Election polling and predictions',
          'Quality control in manufacturing'
        ]
      },
      '1.2': {
        title: 'The Language of Variation: Variables',
        description: 'Understanding categorical and quantitative variables',
        content: `
          Variables are characteristics that can change from one individual to another.
          We classify variables into two main types:
          - Categorical (Qualitative) Variables: Categories or groups
          - Quantitative (Numerical) Variables: Measured quantities
        `,
        learningObjectives: [
          'Distinguish between categorical and quantitative variables',
          'Identify variable types in real-world contexts',
          'Understand the importance of variable classification'
        ],
        examples: [
          'Categorical: Eye color, political party, favorite subject',
          'Quantitative: Height, test scores, temperature'
        ]
      }
      // Add more topics...
    },
    '2': {
      '2.1': {
        title: 'Are Variables Related?',
        description: 'Identifying response and explanatory variables',
        content: `
          When exploring relationships between variables, we often identify:
          - Explanatory (Independent) Variable: The variable that explains or causes changes
          - Response (Dependent) Variable: The variable that responds to changes
        `,
        learningObjectives: [
          'Identify explanatory and response variables',
          'Understand the difference between association and causation',
          'Recognize when variables might be related'
        ],
        examples: [
          'Study hours (explanatory) vs. Test scores (response)',
          'Exercise frequency (explanatory) vs. Heart rate (response)'
        ]
      }
      // Add more topics...
    }
  };

  const currentTopic = topicsData[unitNumber]?.[topicId];

  useEffect(() => {
    // Check if this topic is completed
    const progress = localStorage.getItem(`ap-stats-topic-${unitNumber}-${topicId}`);
    setIsCompleted(progress === 'completed');
  }, [unitNumber, topicId]);

  const handleComplete = () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);
    localStorage.setItem(
      `ap-stats-topic-${unitNumber}-${topicId}`,
      newStatus ? 'completed' : 'incomplete'
    );
  };

  if (!currentTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Topic Not Found</h1>
          <p className="text-gray-600 mb-6">The requested topic could not be found.</p>
          <Link 
            to={`/courses/ap-statistics/${unitNumber}`}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Back to Unit {unitNumber}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-indigo-200">
            <li>
              <Link to="/courses/ap-statistics" className="hover:text-white transition-colors">
                AP Statistics
              </Link>
            </li>
            <li className="text-indigo-300">/</li>
            <li>
              <Link to={`/courses/ap-statistics/${unitNumber}`} className="hover:text-white transition-colors">
                Unit {unitNumber}
              </Link>
            </li>
            <li className="text-indigo-300">/</li>
            <li className="text-white">Topic {topicId}</li>
          </ol>
        </nav>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {topicId}: {currentTopic.title}
                </h1>
                <p className="text-indigo-100 text-lg">
                  {currentTopic.description}
                </p>
              </div>
              <button
                onClick={handleComplete}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isCompleted 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-white text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                {isCompleted ? '✓ Completed' : 'Mark Complete'}
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8">
            {/* Main Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                {currentTopic.content}
              </div>
            </section>

            {/* Learning Objectives */}
            {currentTopic.learningObjectives && (
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Learning Objectives</h2>
                <ul className="space-y-3">
                  {currentTopic.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 mr-3 mt-1">▸</span>
                      <span className="text-gray-600">{objective}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Examples */}
            {currentTopic.examples && (
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Examples</h2>
                <div className="bg-indigo-50 rounded-xl p-6">
                  <ul className="space-y-2">
                    {currentTopic.examples.map((example, index) => (
                      <li key={index} className="text-gray-700">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Practice Section (Placeholder) */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Practice</h2>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 text-center">
                <p className="text-gray-700 mb-4">
                  Interactive practice problems coming soon!
                </p>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
                  Start Practice
                </button>
              </div>
            </section>
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
            >
              ← Previous Topic
            </button>
            <Link
              to={`/courses/ap-statistics/${unitNumber}`}
              className="text-gray-600 hover:text-gray-700"
            >
              Back to Unit Overview
            </Link>
            <button
              onClick={() => navigate(1)}
              className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center"
            >
              Next Topic →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APStatisticsTopic;