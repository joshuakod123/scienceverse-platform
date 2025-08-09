import React from 'react';
import { useParams } from 'react-router-dom';
import Topic_1_1 from './chapters/topic_1_1';
import Topic_1_2 from './chapters/topic_1_2';
import Topic_1_3 from './chapters/topic_1_3';
import Topic_1_4 from './chapters/topic_1_4';
import Topic_1_5 from './chapters/topic_1_5';
import Topic_1_6 from './chapters/topic_1_6';
import Topic_1_7 from './chapters/topic_1_7';
import Topic_1_8 from './chapters/topic_1_8';
import Topic_1_9 from './chapters/topic_1_9';
import Topic_1_10 from './chapters/topic_1_10';
import './TopicRouter.css';

const topicComponentMap = {
  '1.1': Topic_1_1,
  '1.2': Topic_1_2,
  '1.3': Topic_1_3,
  '1.4': Topic_1_4,
  '1.5': Topic_1_5,
  '1.6': Topic_1_6,
  '1.7': Topic_1_7,
  '1.8': Topic_1_8,
  '1.9': Topic_1_9,
  '1.10': Topic_1_10,
};

const topicDetails = {
    '1.1': { title: 'Analyzing Categorical Data', prev: null, next: '1.2' },
    '1.2': { title: 'Displaying Quantitative Data with Tables', prev: '1.1', next: '1.3' },
    '1.3': { title: 'Displaying Quantitative Data with Graphs', prev: '1.2', next: '1.4' },
    '1.4': { title: 'Describing Quantitative Data', prev: '1.3', next: '1.5' },
    '1.5': { title: 'Measures of Position', prev: '1.4', next: '1.6' },
    '1.6': { title: 'The Normal Distribution', prev: '1.5', next: '1.7' },
    '1.7': { title: 'Correlation', prev: '1.6', next: '1.8' },
    '1.8': { title: 'Regression', prev: '1.7', next: '1.9' },
    '1.9': { title: 'Least-Squares Regression', prev: '1.8', next: '1.10' },
    '1.10': { title: 'Assessing a Regression Model', prev: '1.9', next: null },
};


function TopicRouter() {
  const { topicId } = useParams();
  const TopicComponent = topicComponentMap[topicId];
  const details = topicDetails[topicId];

  return (
    <div className="topic-container">
      {details && (
        <div className="topic-header">
          <h1>Unit 1: Exploring One-Variable Data</h1>
          <h2>Topic {topicId}: {details.title}</h2>
        </div>
      )}
      <div className="topic-content">
        {TopicComponent ? <TopicComponent /> : <div>Select a topic</div>}
      </div>
      {details && (
        <div className="topic-navigation">
          {details.prev && <a href={`/courses/ap-statistics/${details.prev}`}>Previous Topic</a>}
          {details.next && <a href={`/courses/ap-statistics/${details.next}`}>Next Topic</a>}
        </div>
      )}
    </div>
  );
}

export default TopicRouter;

// 중복된 React import를 제거했습니다.
// import React from 'react';

// TopicContents 컴포넌트입니다. export default가 아닌 named export로 수정했습니다.
export function TopicContents() {
  // Your component logic here
  return <div>Some content</div>;
}