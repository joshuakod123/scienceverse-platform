// File: client/src/pages/courses/APStatistics.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { unitData } from '../../components/course-data/ap-statistics-data';

const APStatistics = () => {
  const [unitProgress, setUnitProgress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // 각 유닛의 진행 상황을 localStorage에서 불러옵니다.
    const allProgress = {};
    Object.keys(unitData).forEach((key, index) => {
      const unitId = index + 1;
      const savedProgress = localStorage.getItem(`ap-stats-unit-${unitId}-progress`);
      const completedTopics = savedProgress ? JSON.parse(savedProgress) : [];
      const totalTopics = unitData[key].topics.length;
      allProgress[unitId] = totalTopics > 0 ? (completedTopics.length / totalTopics) * 100 : 0;
    });
    setUnitProgress(allProgress);
  }, []);

  const units = Object.keys(unitData).map((key, index) => ({
    id: index + 1,
    ...unitData[key]
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">
            AP Statistics
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Master statistical thinking and data analysis through hands-on exploration of real-world data.
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => (
            <div 
              key={unit.id} 
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer"
              onClick={() => navigate(`/courses/ap-statistics/${unit.id}`)}
            >
              {/* Unit Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shadow-md">
                  {unit.id}
                </div>
                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-semibold">
                  {unit.examWeight}
                </span>
              </div>

              {/* Unit Content */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-100 mb-2">{unit.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed h-20 overflow-hidden">
                  {unit.description}
                </p>
              </div>

              {/* Unit Meta & Progress */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>{unit.pacing}</span>
                  <span>{unit.topics.length} Topics</span>
                </div>
                <div className="bg-gray-700 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                    style={{ width: `${unitProgress[unit.id] || 0}%` }}
                  ></div>
                </div>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {Math.round(unitProgress[unit.id] || 0)}% Complete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APStatistics;