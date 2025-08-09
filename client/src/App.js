import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Roadmaps from './pages/Roadmaps';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import APStatistics from "./pages/courses/APStatistics";
import TopicRouter from './pages/courses/ap-statistics/TopicRouter';
import './App.css';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a loading process
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // 1 second delay

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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/courses/ap-statistics/:topicId" component={TopicRouter} />
            <Route path="/courses/ap-statistics" component={APStatistics} />
            <Route path="/courses" component={Courses} />
            <Route path="/roadmaps" component={Roadmaps} />
            <Route path="/community" component={Community} />
            <Route path="/mypage" component={MyPage} />
            <Route component={NotFound} />
          </Switch>
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