import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import TopicRouter from './pages/courses/ap-statistics/TopicRouter';
import APStatistics from './pages/courses/APStatistics';
import './App.css';
import './components/Footer.css';
import './components/Header.css';
import Courses from './pages/Courses';
import Roadmaps from './pages/Roadmaps';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();
  const isCoursePage = location.pathname.includes('/courses/ap-statistics/');

  return (
    <>
      {!isLoaded && <div className="loading-overlay">"The only way to learn mathematics is to do mathematics." - Paul Halmos</div>}
      <div className={`App ${isLoaded ? 'loaded' : ''} ${isCoursePage ? 'course-page' : ''}`}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses/ap-statistics/:topicId" element={<TopicRouter />} />
            <Route path="/courses/ap-statistics" element={<APStatistics />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/roadmaps" element={<Roadmaps />} />
            <Route path="/community" element={<Community />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;