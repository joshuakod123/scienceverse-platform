// File: client/src/pages/courses/ap-statistics/index.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseLayout from '../../../components/CourseLayout';

const APStatisticsIndexPage = () => {
  const navigate = useNavigate();

  const course = {
    title: 'AP Statistics',
    description: 'Master statistical thinking and data analysis through hands-on exploration of real-world data.',
  };
  
  const units = [
    { id: 1, title: 'Exploring One-Variable Data', topics: 10 },
    { id: 2, title: 'Exploring Two-Variable Data', topics: 9 },
    { id: 3, title: 'Collecting Data', topics: 7 },
    { id: 4, title: 'Probability, Random Variables, and Probability Distributions', topics: 12 },
    { id: 5, title: 'Sampling Distributions', topics: 8 },
    { id: 6, title: 'Inference for Categorical Data: Proportions', topics: 10 },
    { id: 7, title: 'Inference for Quantitative Data: Means', topics: 10 },
    { id: 8, title: 'Inference for Categorical Data: Chi-Square', topics: 6 },
    { id: 9, title: 'Inference for Quantitative Data: Slopes', topics: 6 },
  ];

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
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 flex flex-col"
              onClick={() => handleUnitClick(unit.id)}
            >
              <div className="p-6 flex-grow">
                <p className="text-sm font-semibold text-blue-600 mb-2">UNIT {unit.id}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{unit.title}</h3>
                <p className="text-gray-500 text-sm">{unit.topics} Topics</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-b-xl mt-auto">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
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