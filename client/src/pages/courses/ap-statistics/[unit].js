// File: client/src/pages/courses/ap-statistics/[unit].js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseLayout from '../../../components/CourseLayout';
import { unitData } from '../../../components/course-data/ap-statistics-data';

const APStatisticsUnitPage = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const currentUnit = unitData[`unit${unitId}`];

  useEffect(() => {
    const savedProgress = localStorage.getItem(`ap-stats-unit-${unitId}-progress`);
    if (savedProgress) {
      setCompletedTopics(new Set(JSON.parse(savedProgress)));
    }
  }, [unitId]);

  useEffect(() => {
    localStorage.setItem(`ap-stats-unit-${unitId}-progress`, JSON.stringify([...completedTopics]));
  }, [completedTopics, unitId]);
  
  if (!currentUnit) {
    return (
      <CourseLayout title="Unit Not Found">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Unit Not Found</h1>
          <p className="text-gray-600 mb-6">The requested unit could not be found.</p>
          <button 
            onClick={() => navigate('/courses/ap-statistics')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to AP Statistics
          </button>
        </div>
      </CourseLayout>
    );
  }

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(topicId)) {
        newCompleted.delete(topicId);
      } else {
        newCompleted.add(topicId);
      }
      return newCompleted;
    });
  };

  const progress = (completedTopics.size / currentUnit.topics.length) * 100;

  return (
    <CourseLayout title={currentUnit.title} description={currentUnit.description}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/courses/ap-statistics')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to AP Statistics Units
          </button>
        </div>

        {/* Unit Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <p className="text-sm font-semibold text-blue-600 mb-2">UNIT {unitId}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentUnit.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{currentUnit.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="font-semibold text-gray-500 text-sm mb-1">Exam Weight</div>
              <div className="text-2xl font-bold text-gray-800">{currentUnit.examWeight}</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="font-semibold text-gray-500 text-sm mb-1">Recommended Pacing</div>
              <div className="text-2xl font-bold text-gray-800">{currentUnit.pacing}</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="font-semibold text-gray-500 text-sm mb-1">Big Ideas</div>
              <div className="text-lg font-bold text-gray-800">{currentUnit.bigIdeas.join(', ')}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Topics</h2>
            <span className="text-gray-600 font-medium">
              {completedTopics.size} / {currentUnit.topics.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {currentUnit.topics.map((topic) => {
            const isCompleted = completedTopics.has(topic.id);
            
            return (
              <div
                key={topic.id}
                className={`border-2 rounded-lg p-6 transition-all duration-300 flex items-center
                  ${isCompleted 
                    ? 'border-green-400 bg-green-50' 
                    : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-md'
                  }
                `}
              >
                <div 
                  className="flex-shrink-0 mr-4 cursor-pointer"
                  onClick={() => toggleTopicCompletion(topic.id)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                    ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}
                  `}>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      '✓'
                    )}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {topic.id}: {topic.title}
                  </h3>
                  <p className="text-gray-600 mt-1 mb-2">
                    {topic.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="font-medium">Skills: <span className="font-normal bg-gray-200 px-2 py-1 rounded">{topic.skills.join(', ')}</span></div>
                  </div>
                </div>
                
                <div className="ml-6">
                  <button
                    onClick={() => alert(`Navigating to lesson for topic ${topic.id}`)} // Replace with actual navigation
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  >
                    Study
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CourseLayout>
  );
};

export default APStatisticsUnitPage;