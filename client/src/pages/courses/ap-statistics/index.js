// File: client/src/pages/courses/ap-statistics/index.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseLayout from '../../../components/CourseLayout';
import { unitData } from '../../../components/course-data/ap-statistics-data';

const APStatisticsIndexPage = () => {
  const navigate = useNavigate();

  const course = {
    title: 'AP Statistics',
    description: 'Master statistical thinking and data analysis through hands-on exploration of real-world data.',
  };
  
  // unitData에서 유닛 목록을 동적으로 생성
  const units = Object.values(unitData).map((unit, index) => ({
    id: index + 1,
    ...unit
  }));

  const handleUnitClick = (unitId) => {
    navigate(`/courses/ap-statistics/unit/${unitId}`);
  };

  return (
    <CourseLayout title={course.title} description={course.description}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {course.description}
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm font-semibold text-blue-600">UNIT {unit.id}</p>
                  <p className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{unit.examWeight} of AP Exam</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{unit.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{unit.description}</p>
                <p className="text-gray-500 text-sm">{unit.topics.length} Topics</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-b-xl mt-auto">
                <button 
                  onClick={() => handleUnitClick(unit.id)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Go to Unit
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </CourseLayout>
  );
};

export default APStatisticsIndexPage;