// client/src/courses/ap-statistics/unit-1/1.1-IntroStatistics.js
import React, { useState } from 'react';

const IntroStatistics = () => {
  const [completed, setCompleted] = useState(false);

  const handleLessonComplete = () => {
    setCompleted(true);
    // 진도 저장 로직
  };

  return (
    <div className="lesson-container">
      {/* React 네비게이션 바 */}
      <div className="lesson-nav">
        <button onClick={() => window.history.back()}>← 뒤로</button>
        <h1>1.1 - Introducing Statistics</h1>
        <button 
          onClick={() => window.location.href = '/courses/ap-statistics/1.2'}
          disabled={!completed}
        >
          다음 →
        </button>
      </div>

      {/* 👇 여기가 핵심: 당신의 HTML 파일 경로만 맞춰주면 됨 */}
      <iframe 
        src="/lessons/ap-statistics/unit-1/1.1-introstatistics.html"
        title="AP Statistics Unit 1.1 Introduction"
        style={{
          width: '100%',
          height: 'calc(100vh - 80px)',
          border: 'none'
        }}
      />
    </div>
  );
};

export default IntroStatistics;