// File: client/src/pages/courses/APStatistics.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const APStatistics = () => {
  const [unitProgress, setUnitProgress] = useState({});

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('ap-statistics-progress');
    if (savedProgress) {
      setUnitProgress(JSON.parse(savedProgress));
    }
  }, []);

  const toggleDetails = (unitId) => {
    const details = document.getElementById(unitId + '-details');
    details.classList.toggle('active');
  };

  const unitsData = [
    {
      id: 'unit1',
      number: 1,
      title: 'Exploring One-Variable Data',
      bigIdeas: ['VAR', 'UNC'],
      examWeight: '15-23%',
      classPeriods: '14-16',
      topicsCount: 10,
      description: 'Learn how to describe and analyze single-variable datasets using graphical and numerical summaries. Master the fundamentals of statistical thinking and data interpretation.',
      topics: [
        { id: '1.1', title: 'Introducing Statistics', description: 'What can we learn from data? Understanding the role of variation and uncertainty.' },
        { id: '1.2', title: 'Variables', description: 'Understanding categorical and quantitative variables with real-world examples.' },
        { id: '1.3', title: 'Categorical Data Tables', description: 'Frequency tables and relative frequency tables for organizing categorical data.' },
        { id: '1.4', title: 'Categorical Data Graphs', description: 'Bar charts, pie charts, and their interpretations.' },
        { id: '1.5', title: 'Quantitative Data Graphs', description: 'Dotplots, stemplots, histograms, and cumulative frequency plots.' },
        { id: '1.6', title: 'Describing Distributions', description: 'Shape, center, variability (spread), and unusual characteristics (SOCS).' },
        { id: '1.7', title: 'Summary Statistics', description: 'Measures of center (mean, median) and variability (standard deviation, IQR).' },
        { id: '1.8', title: 'Boxplots', description: 'Graphical representations of summary statistics and five-number summary.' },
        { id: '1.9', title: 'Comparing Distributions', description: 'Using back-to-back stemplots, parallel boxplots, and histograms.' },
        { id: '1.10', title: 'Normal Distribution', description: 'Properties of normal distributions and the empirical rule (68-95-99.7).' }
      ]
    },
    {
      id: 'unit2',
      number: 2,
      title: 'Exploring Two-Variable Data',
      bigIdeas: ['VAR', 'DAT'],
      examWeight: '5-7%',
      classPeriods: '10-11',
      topicsCount: 9,
      description: 'Discover and analyze relationships between two variables. Learn correlation, regression, and how to identify patterns in bivariate data.',
      topics: [
        { id: '2.1', title: 'Are Variables Related?', description: 'Identifying response and explanatory variables in relationships.' },
        { id: '2.2', title: 'Two Categorical Variables', description: 'Two-way tables, joint and marginal relative frequencies.' },
        { id: '2.3', title: 'Statistics for Two Categorical Variables', description: 'Conditional relative frequencies and association between variables.' },
        { id: '2.4', title: 'Scatterplots', description: 'Creating and interpreting scatterplots for quantitative variables.' },
        { id: '2.5', title: 'Correlation', description: 'Measuring the strength and direction of linear relationships.' },
        { id: '2.6', title: 'Linear Regression Models', description: 'Finding the line of best fit and making predictions.' },
        { id: '2.7', title: 'Residuals', description: 'Analyzing the difference between observed and predicted values.' },
        { id: '2.8', title: 'Least Squares Regression', description: 'Mathematical foundation of regression analysis.' },
        { id: '2.9', title: 'Analyzing Departures from Linearity', description: 'Identifying when linear models may not be appropriate.' }
      ]
    },
    // Add more units as needed...
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            AP Statistics
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            Master statistical thinking and data analysis through hands-on exploration of real-world data.
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {unitsData.map((unit) => (
            <div key={unit.id} className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              {/* Unit Header */}
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mr-6 shadow-lg">
                  {unit.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{unit.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {unit.bigIdeas.map((idea) => (
                      <span key={idea} className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {idea}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Unit Meta */}
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <i className="fas fa-chart-pie mr-2 text-indigo-600"></i>
                  {unit.examWeight} Exam Weight
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <i className="fas fa-clock mr-2 text-indigo-600"></i>
                  {unit.classPeriods} Class Periods
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <i className="fas fa-list mr-2 text-indigo-600"></i>
                  {unit.topicsCount} Topics
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-500"
                    style={{ width: `${unitProgress[unit.id] || 0}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {unitProgress[unit.id] || 0}% Complete
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {unit.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <Link 
                  to={`/courses/ap-statistics/${unit.number}`}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <i className="fas fa-play"></i>
                  Start Unit
                </Link>
                <button 
                  onClick={() => toggleDetails(unit.id)}
                  className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-info-circle"></i>
                  View Details
                </button>
              </div>

              {/* Unit Details (Hidden by default) */}
              <div id={`${unit.id}-details`} className="unit-details">
                <div className="border-t-2 border-gray-200 pt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Unit Topics:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {unit.topics.map((topic) => (
                      <div key={topic.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors border-l-4 border-indigo-500">
                        <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-bold inline-block mb-2">
                          {topic.id}
                        </div>
                        <h5 className="font-semibold text-gray-800 mb-2">{topic.title}</h5>
                        <p className="text-gray-600 text-sm leading-relaxed">{topic.description}</p>
                        <Link 
                          to={`/courses/ap-statistics/${unit.number}/${topic.id}`}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 inline-flex items-center gap-2 mt-3"
                        >
                          <i className="fas fa-play"></i>
                          Study
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .unit-details {
          display: none;
          animation: slideDown 0.3s ease;
        }

        .unit-details.active {
          display: block;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default APStatistics;