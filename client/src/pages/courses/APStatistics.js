// File: client/src/pages/courses/APStatistics.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { unitData } from '../../components/course-data/ap-statistics-data';
import './APStatisticsRoadmap.css'; // CSS 파일은 별도로 생성

const APStatistics = () => {
  const [unitProgress, setUnitProgress] = useState({});
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 각 유닛의 진행 상황을 localStorage에서 불러옵니다
    const allProgress = {};
    Object.keys(unitData).forEach((key, index) => {
      const unitId = index + 1;
      const savedProgress = localStorage.getItem(`ap-stats-unit-${unitId}-progress`);
      const completedTopics = savedProgress ? JSON.parse(savedProgress) : [];
      const totalTopics = unitData[key].topics.length;
      allProgress[unitId] = totalTopics > 0 ? (completedTopics.length / totalTopics) * 100 : 0;
    });
    setUnitProgress(allProgress);

    // Progress animation simulation
    setTimeout(() => {
      const simulatedProgress = {};
      Object.keys(unitData).forEach((key, index) => {
        simulatedProgress[index + 1] = Math.random() * 30;
      });
      setUnitProgress(prev => ({ ...prev, ...simulatedProgress }));
    }, 1000);
  }, []);

  const units = Object.keys(unitData).map((key, index) => ({
    id: index + 1,
    number: index + 1,
    ...unitData[key],
    topicsList: unitData[key].topics,
    completed: false,
    progress: unitProgress[index + 1] || 0
  }));

  const handleUnitClick = (unit) => {
    setActiveModal(unit);
  };

  const handleTopicClick = (unitNumber, topicId) => {
    navigate(`/courses/ap-statistics/${unitNumber}/${topicId}`);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="ap-statistics-roadmap">
      {/* Floating Background Elements */}
      <div className="floating-element"></div>
      <div className="floating-element"></div>

      {/* Header */}
      <div className="header">
        <h1>AP Statistics</h1>
        <p>Master statistical thinking and data analysis through hands-on exploration of real-world data</p>
      </div>

      {/* Roadmap Container */}
      <div className="roadmap-container">
        {/* SVG Path Connection */}
        <svg className="path-svg" viewBox="0 0 1200 2000">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <path 
            className="path-line" 
            d="M 600 100 Q 300 250 600 400 T 600 700 Q 300 850 600 1000 T 600 1300 Q 300 1450 600 1600 T 600 1900" 
          />
        </svg>

        {/* Roadmap Grid */}
        <div className="roadmap">
          {units.map((unit, index) => (
            <div 
              key={unit.id}
              className={`unit-node ${unit.completed ? 'completed' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleUnitClick(unit)}
            >
              <div className="node-circle">{unit.number}</div>
              <div className="node-content">
                <h3>Unit {unit.number}: {unit.title}</h3>
                <p className="description">{unit.description}</p>
                <div className="node-meta">
                  <div className="meta-item">
                    <span className="icon">📚</span>
                    <span>{unit.topicsList.length} Topics</span>
                  </div>
                  <div className="meta-item">
                    <span className="icon">⏱</span>
                    <span>{unit.pacing}</span>
                  </div>
                  <div className="meta-item">
                    <span className="icon">📊</span>
                    <span>{unit.examWeight} Exam Weight</span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${unit.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Topics */}
      {activeModal && (
        <div className="modal active" onClick={(e) => {
          if (e.target.classList.contains('modal')) {
            closeModal();
          }
        }}>
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <div className="modal-header">
              <h2>Unit {activeModal.number}: {activeModal.title}</h2>
              <p>{activeModal.description}</p>
            </div>
            <div className="topics-grid">
              {activeModal.topicsList.map(topic => (
                <div 
                  key={topic.id}
                  className="topic-item"
                  onClick={() => handleTopicClick(activeModal.number, topic.id)}
                >
                  <h4>{topic.id} - {topic.title}</h4>
                  <p>{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default APStatistics;