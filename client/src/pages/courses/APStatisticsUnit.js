// File: client/src/pages/courses/APStatisticsUnit.js

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const APStatisticsUnit = () => {
  const { unitNumber } = useParams();
  const navigate = useNavigate();
  const [completedTopics, setCompletedTopics] = useState(new Set());
  
  // 유닛 데이터 (실제로는 별도 파일로 분리 권장)
  const unitsData = {
    1: {
      title: 'Exploring One-Variable Data',
      description: 'Learn how to describe and analyze single-variable datasets using graphical and numerical summaries.',
      bigIdeas: ['VAR', 'UNC'],
      examWeight: '15-23%',
      classPeriods: '14-16',
      topics: [
        { 
          id: '1.1', 
          title: 'Introducing Statistics', 
          description: 'What can we learn from data? Understanding the role of variation and uncertainty.',
          content: 'Statistics is the science of collecting, organizing, analyzing, and interpreting data to make decisions...'
        },
        { 
          id: '1.2', 
          title: 'The Language of Variation: Variables', 
          description: 'Understanding categorical and quantitative variables with real-world examples.',
          content: 'Variables are characteristics that change from one individual to another...'
        },
        // ... 더 많은 토픽들
      ]
    },
    // ... 다른 유닛들
  };

  const currentUnit = unitsData[unitNumber];

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Unit Not Found</h1>
          <p className="text-gray-600 mb-6">The requested unit could not be found.</p>
          <Link 
            to="/courses/ap-statistics"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Back to AP Statistics
          </Link>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/courses/ap-statistics')}
            className="bg-white/20 text-white p-3 rounded-xl hover:bg-white/30 transition-colors mr-6"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
                {unitNumber}
              </div>
              <h1 className="text-4xl font-bold text-white">{currentUnit.title}</h1>
            </div>
            <p className="text-indigo-200 text-lg">{currentUnit.description}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Progress</h3>
            <span className="text-2xl font-bold text-indigo-600">{progressPercentage}%</span>
          </div>
          <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {completedTopics.size} of {currentUnit.topics.length} topics completed
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentUnit.topics.map((topic, index) => {
            const isCompleted = completedTopics.has(topic.id);
            const isLocked = index > 0 && !completedTopics.has(currentUnit.topics[index - 1].id);
            
            return (
              <div key={topic.id} className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transition-all duration-300 ${isLocked ? 'opacity-50' : 'hover:-translate-y-2 hover:shadow-2xl'}`}>
                {/* Topic Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-bold">
                    {topic.id}
                  </div>
                  <div className="flex items-center gap-2">
                    {isLocked && <i className="fas fa-lock text-gray-400"></i>}
                    {isCompleted && <i className="fas fa-check-circle text-green-500 text-xl"></i>}
                  </div>
                </div>

                {/* Topic Content */}
                <h4 className="text-lg font-semibold text-gray-800 mb-3">{topic.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{topic.description}</p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link 
                    to={`/courses/ap-statistics/${unitNumber}/${topic.id}`}
                    className={`flex-1 text-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                      isLocked 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    }`}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    <i className="fas fa-play mr-2"></i>
                    Study
                  </Link>
                  <button 
                    onClick={() => !isLocked && toggleTopicCompletion(topic.id)}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      isLocked 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : isCompleted 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    disabled={isLocked}
                  >
                    <i className={`fas ${isCompleted ? 'fa-check' : 'fa-circle'}`}></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unit Summary */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 mt-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Unit Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                <i className="fas fa-chart-pie"></i>
              </div>
              <h4 className="font-semibold text-gray-800">Exam Weight</h4>
              <p className="text-indigo-600 font-bold">{currentUnit.examWeight}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                <i className="fas fa-clock"></i>
              </div>
              <h4 className="font-semibold text-gray-800">Class Periods</h4>
              <p className="text-green-600 font-bold">{currentUnit.classPeriods}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                <i className="fas fa-list"></i>
              </div>
              <h4 className="font-semibold text-gray-800">Topics</h4>
              <p className="text-purple-600 font-bold">{currentUnit.topics.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APStatisticsUnit;