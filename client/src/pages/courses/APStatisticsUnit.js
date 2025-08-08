// File: client/src/pages/courses/APStatisticsUnit.js

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { unitData } from '../../components/course-data/ap-statistics-data';

const APStatisticsUnit = () => {
  const { unitNumber } = useParams();
  const navigate = useNavigate();
  const [completedTopics, setCompletedTopics] = useState(new Set());
  
  const currentUnit = unitData[`unit${unitNumber}`];

  useEffect(() => {
    const savedProgress = localStorage.getItem(`ap-stats-unit-${unitNumber}-progress`);
    if (savedProgress) {
      setCompletedTopics(new Set(JSON.parse(savedProgress)));
    }
  }, [unitNumber]);

  useEffect(() => {
    localStorage.setItem(`ap-stats-unit-${unitNumber}-progress`, JSON.stringify([...completedTopics]));
  }, [completedTopics, unitNumber]);

  if (!currentUnit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 flex items-center justify-center text-white p-4">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Unit Not Found</h1>
          <p className="text-gray-300 mb-6">The requested unit could not be found.</p>
          <button 
            onClick={() => navigate('/courses/ap-statistics')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
          >
            Back to AP Statistics
          </button>
        </div>
      </div>
    );
  }

  const toggleTopicCompletion = (topicId) => {
    setCompletedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const progressPercentage = Math.round((completedTopics.size / currentUnit.topics.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
            <button 
                onClick={() => navigate('/courses/ap-statistics')}
                className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium"
            >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Units
            </button>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8 shadow-lg">
          <p className="text-sm font-semibold text-indigo-400 mb-2">UNIT {unitNumber}</p>
          <h1 className="text-4xl font-bold mb-4">{currentUnit.title}</h1>
          <p className="text-lg text-gray-300 mb-6">{currentUnit.description}</p>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-100">Unit Progress</h3>
            <span className="text-xl font-bold text-indigo-400">{progressPercentage}%</span>
          </div>
          <div className="bg-gray-700 h-3 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
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
                className={`border rounded-xl p-5 transition-all duration-300 flex items-center space-x-5 ${
                  isCompleted 
                    ? 'border-green-500/50 bg-green-500/10' 
                    : 'border-gray-700 bg-gray-800/50 hover:border-indigo-500/50'
                }`}
              >
                <div 
                  className="flex-shrink-0 cursor-pointer"
                  onClick={() => toggleTopicCompletion(topic.id)}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-colors ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}>
                    {isCompleted ? '✓' : '○'}
                  </div>
                </div>

                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-100">
                    {topic.id}: {topic.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {topic.description}
                  </p>
                </div>
                
                <div className="ml-6 flex-shrink-0">
                  <button
                    onClick={() => alert(`Navigating to lesson for topic ${topic.id}`)} // Placeholder
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm"
                  >
                    Study
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default APStatisticsUnit;