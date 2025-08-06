import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SpaceCanvas from '../components/Space/SpaceCanvas';

const DiscoverPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedLevel, setSelectedLevel] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 확장된 코스 데이터 - 매출 1억을 위한 다양하고 매력적인 코스들
  const allCourses = [
    // Physics
    {
      id: 'quantum-mechanics',
      title: '양자역학의 신비',
      subtitle: '미시세계의 놀라운 법칙들',
      category: '물리학',
      level: 'Advanced',
      duration: '16주',
      price: '₩299,000',
      originalPrice: '₩399,000',
      rating: 4.9,
      studentsEnrolled: 8920,
      instructor: 'Dr. 김양자',
      description: '양자역학의 기본 원리부터 최신 양자컴퓨팅까지, 미래 기술의 핵심을 마스터하세요.',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '⚛️',
      features: ['실습 시뮬레이션', '1:1 멘토링', '수료증 발급', 'VR 실험실'],
      difficulty: 90,
      popular: true,
      new: false,
      bestseller: true
    },
    {
      id: 'astrophysics',
      title: '우주물리학 탐험',
      subtitle: '블랙홀부터 빅뱅까지',
      category: '물리학',
      level: 'Intermediate',
      duration: '12주',
      price: '₩199,000',
      originalPrice: '₩249,000',
      rating: 4.8,
      studentsEnrolled: 15420,
      instructor: 'Dr. 박우주',
      description: '우주의 탄생부터 진화까지, 천체물리학의 모든 것을 배워보세요.',
      thumbnail: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: '🌌',
      features: ['천체 관측 가이드', '실시간 Q&A', '천문대 견학'],
      difficulty: 70,
      popular: true,
      new: false,
      bestseller: false
    },
    {
      id: 'thermodynamics',
      title: '열역학 완전정복',
      subtitle: '에너지의 변환과 보존',
      category: '물리학',
      level: 'Intermediate',
      duration: '10주',
      price: '₩149,000',
      originalPrice: '₩199,000',
      rating: 4.7,
      studentsEnrolled: 12100,
      instructor: 'Prof. 이열량',
      description: '열역학 법칙부터 실제 엔진 설계까지, 에너지의 모든 것을 다룹니다.',
      thumbnail: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: '🔥',
      features: ['엔진 시뮬레이션', '실습 키트 제공'],
      difficulty: 65,
      popular: false,
      new: true,
      bestseller: false
    },
    // Chemistry
    {
      id: 'biochemistry',
      title: '생화학의 세계',
      subtitle: '생명체의 분자적 이해',
      category: '화학',
      level: 'Advanced',
      duration: '14주',
      price: '₩349,000',
      originalPrice: '₩449,000',
      rating: 4.8,
      studentsEnrolled: 7890,
      instructor: 'Dr. 최생명',
      description: '단백질, DNA, 효소의 작동원리부터 신약개발까지 생화학의 전 영역을 커버합니다.',
      thumbnail: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      icon: '🧬',
      features: ['분자 모델링', '실제 실험 키트', '바이오 기업 연계'],
      difficulty: 85,
      popular: false,
      new: true,
      bestseller: false
    },
    {
      id: 'organic-synthesis',
      title: '유기합성 마스터',
      subtitle: '복잡한 분자를 만드는 예술',
      category: '화학',
      level: 'Advanced',
      duration: '18주',
      price: '₩399,000',
      originalPrice: '₩499,000',
      rating: 4.9,
      studentsEnrolled: 5670,
      instructor: 'Prof. 김합성',
      description: '의약품부터 향료까지, 유기화합물 합성의 고급 테크닉을 마스터하세요.',
      thumbnail: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      icon: '⚗️',
      features: ['고급 실험실 이용', '산업체 인턴십', '특허 출원 가이드'],
      difficulty: 95,
      popular: false,
      new: false,
      bestseller: true
    },
    {
      id: 'analytical-chemistry',
      title: '분석화학 실무',
      subtitle: '정확한 분석의 기술',
      category: '화학',
      level: 'Intermediate',
      duration: '8주',
      price: '₩179,000',
      originalPrice: '₩229,000',
      rating: 4.6,
      studentsEnrolled: 9340,
      instructor: 'Dr. 정분석',
      description: '최신 분석장비 사용법부터 데이터 해석까지, 분석화학의 실무 능력을 기르세요.',
      thumbnail: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      icon: '📊',
      features: ['최신 장비 실습', '산업체 견학', '자격증 대비'],
      difficulty: 60,
      popular: true,
      new: false,
      bestseller: false
    },
    // Biology
    {
      id: 'molecular-biology',
      title: '분자생물학 심화',
      subtitle: 'DNA에서 단백질까지',
      category: '생물학',
      level: 'Advanced',
      duration: '15주',
      price: '₩329,000',
      originalPrice: '₩429,000',
      rating: 4.8,
      studentsEnrolled: 11200,
      instructor: 'Dr. 한분자',
      description: '유전자 발현부터 단백질 합성까지, 분자생물학의 핵심을 깊이 있게 다룹니다.',
      thumbnail: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      icon: '🧪',
      features: ['PCR 실습', 'CRISPR 체험', '바이오 스타트업 멘토링'],
      difficulty: 80,
      popular: true,
      new: false,
      bestseller: true
    },
    {
      id: 'ecology-evolution',
      title: '생태계와 진화',
      subtitle: '생명의 다양성과 변화',
      category: '생물학',
      level: 'Beginner',
      duration: '10주',
      price: '₩129,000',
      originalPrice: '₩179,000',
      rating: 4.7,
      studentsEnrolled: 18500,
      instructor: 'Prof. 서진화',
      description: '생태계의 균형부터 진화의 메커니즘까지, 생명과학의 거시적 관점을 배워보세요.',
      thumbnail: 'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)',
      icon: '🌿',
      features: ['야외 실습', '멸종위기종 보호 활동', '국립공원 탐사'],
      difficulty: 40,
      popular: true,
      new: false,
      bestseller: false
    },
    // Computer Science
    {
      id: 'quantum-computing',
      title: '양자컴퓨팅 입문',
      subtitle: '미래 컴퓨팅의 혁명',
      category: '컴퓨터과학',
      level: 'Advanced',
      duration: '12주',
      price: '₩449,000',
      originalPrice: '₩599,000',
      rating: 4.9,
      studentsEnrolled: 3240,
      instructor: 'Dr. 최양자',
      description: 'IBM Qiskit을 활용한 실제 양자 알고리즘 구현부터 양자 암호화까지 다룹니다.',
      thumbnail: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: '💻',
      features: ['실제 양자컴퓨터 접근', 'IBM 파트너십', '취업 연계'],
      difficulty: 95,
      popular: false,
      new: true,
      bestseller: true
    },
    {
      id: 'ai-machine-learning',
      title: 'AI & 머신러닝',
      subtitle: '인공지능의 모든 것',
      category: '컴퓨터과학',
      level: 'Intermediate',
      duration: '16주',
      price: '₩389,000',
      originalPrice: '₩499,000',
      rating: 4.8,
      studentsEnrolled: 24500,
      instructor: 'Dr. 이인공',
      description: '딥러닝부터 자연어처리까지, AI의 핵심 기술을 실무 프로젝트와 함께 배워보세요.',
      thumbnail: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      icon: '🤖',
      features: ['GPU 클러스터 이용', '포트폴리오 제작', 'FAANG 취업 멘토링'],
      difficulty: 75,
      popular: true,
      new: false,
      bestseller: true
    }
  ];

  const categories = ['전체', '물리학', '화학', '생물학', '컴퓨터과학'];
  const levels = ['전체', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = allCourses;

      if (selectedCategory !== '전체') {
        filtered = filtered.filter(course => course.category === selectedCategory);
      }

      if (selectedLevel !== '전체') {
        filtered = filtered.filter(course => course.level === selectedLevel);
      }

      if (searchTerm) {
        filtered = filtered.filter(course => 
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredCourses(filtered);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCategory, selectedLevel, searchTerm]);

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handleEnroll = (courseId, price) => {
    // 실제로는 결제 페이지로 이동
    console.log(`Enrolling in course: ${courseId}, Price: ${price}`);
    navigate(`/checkout/${courseId}`);
  };

  return (
    <div className="discover-container">
      <SpaceCanvas />
      
      {/* Header */}
      <motion.header 
        className="discover-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <motion.button
            className="back-btn"
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← 대시보드
          </motion.button>
          
          <h1 className="page-title">
            지식의 우주 탐험 🚀
          </h1>
          
          <div className="search-section">
            <motion.div 
              className="search-container"
              whileFocus={{ scale: 1.02 }}
            >
              <input
                type="text"
                placeholder="관심 있는 과목을 검색해보세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Filters */}
      <motion.section 
        className="filters-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="filter-group">
          <h3>분야</h3>
          <div className="filter-buttons">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h3>난이도</h3>
          <div className="filter-buttons">
            {levels.map((level) => (
              <motion.button
                key={level}
                className={`filter-btn ${selectedLevel === level ? 'active' : ''}`}
                onClick={() => setSelectedLevel(level)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Results Summary */}
      <motion.div 
        className="results-summary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p>
          {filteredCourses.length}개의 강의를 찾았습니다
          {searchTerm && <span> "{searchTerm}" 검색결과</span>}
        </p>
      </motion.div>

      {/* Course Grid */}
      <main className="courses-main">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              className="loading-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="course-card-skeleton">
                  <div className="skeleton-thumbnail"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-subtitle"></div>
                    <div className="skeleton-stats"></div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="courses-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  className="discover-course-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.4)"
                  }}
                  onClick={() => handleCourseClick(course.id)}
                >
                  {/* Course thumbnail */}
                  <div 
                    className="course-thumbnail"
                    style={{ background: course.thumbnail }}
                  >
                    <div className="thumbnail-overlay">
                      <span className="course-icon-large">{course.icon}</span>
                      <div className="course-badges">
                        {course.bestseller && <span className="badge bestseller">베스트</span>}
                        {course.new && <span className="badge new">신규</span>}
                        {course.popular && <span className="badge popular">인기</span>}
                      </div>
                    </div>
                  </div>

                  {/* Course content */}
                  <div className="course-content">
                    <div className="course-meta">
                      <span className="course-category">{course.category}</span>
                      <span className="course-level">{course.level}</span>
                    </div>

                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-subtitle">{course.subtitle}</p>
                    <p className="course-instructor">by {course.instructor}</p>

                    <div className="course-stats">
                      <div className="stat">
                        <span>⭐ {course.rating}</span>
                      </div>
                      <div className="stat">
                        <span>👥 {course.studentsEnrolled.toLocaleString()}</span>
                      </div>
                      <div className="stat">
                        <span>📅 {course.duration}</span>
                      </div>
                    </div>

                    <div className="difficulty-bar">
                      <span className="difficulty-label">난이도</span>
                      <div className="difficulty-progress">
                        <div 
                          className="difficulty-fill"
                          style={{ width: `${course.difficulty}%` }}
                        ></div>
                      </div>
                      <span className="difficulty-value">{course.difficulty}%</span>
                    </div>

                    <div className="course-features">
                      {course.features.slice(0, 2).map((feature, i) => (
                        <span key={i} className="feature-tag">✨ {feature}</span>
                      ))}
                    </div>

                    <div className="course-pricing">
                      <span className="current-price">{course.price}</span>
                      <span className="original-price">{course.originalPrice}</span>
                      <span className="discount">
                        {Math.round((1 - parseInt(course.price.replace(/[^0-9]/g, '')) / parseInt(course.originalPrice.replace(/[^0-9]/g, ''))) * 100)}% 할인
                      </span>
                    </div>

                    <motion.button
                      className="enroll-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnroll(course.id, course.price);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      지금 수강하기 🚀
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredCourses.length === 0 && !isLoading && (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="no-results-icon">🔍</div>
            <h3>검색 결과가 없습니다</h3>
            <p>다른 검색어나 필터를 시도해보세요</p>
            <motion.button
              className="reset-filters-btn"
              onClick={() => {
                setSelectedCategory('전체');
                setSelectedLevel('전체');
                setSearchTerm('');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              필터 초기화
            </motion.button>
          </motion.div>
        )}
      </main>

      {/* Call to Action Section */}
      <motion.section 
        className="cta-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="cta-content">
          <h2>아직 원하는 강의를 찾지 못하셨나요? 🤔</h2>
          <p>맞춤형 학습 계획을 세워드립니다!</p>
          <div className="cta-buttons">
            <motion.button
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/consultation')}
            >
              무료 상담받기 💬
            </motion.button>
            <motion.button
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/custom-course')}
            >
              맞춤 강의 요청하기 📝
            </motion.button>
          </div>
        </div>
      </motion.section>

      <style jsx>{`
        .discover-container {
          min-height: 100vh;
          position: relative;
          font-family: 'Inter', sans-serif;
          color: #EFDFBB;
        }

        /* Header */
        .discover-header {
          position: relative;
          z-index: 10;
          padding: 30px 40px;
          backdrop-filter: blur(15px);
          background: rgba(11, 16, 38, 0.8);
          border-bottom: 1px solid rgba(239, 223, 187, 0.2);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .back-btn {
          background: rgba(239, 223, 187, 0.1);
          border: 1px solid rgba(239, 223, 187, 0.3);
          color: #EFDFBB;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 14px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: rgba(239, 223, 187, 0.2);
        }

        .page-title {
          font-size: 42px;
          font-weight: 800;
          text-align: center;
          margin: 20px 0 30px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
          background: linear-gradient(135deg, #EFDFBB, #E85A4F);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .search-section {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .search-container {
          position: relative;
          max-width: 500px;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 15px 50px 15px 20px;
          background: rgba(239, 223, 187, 0.1);
          border: 2px solid rgba(239, 223, 187, 0.3);
          border-radius: 25px;
          color: #EFDFBB;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #E85A4F;
          background: rgba(239, 223, 187, 0.15);
        }

        .search-input::placeholder {
          color: rgba(239, 223, 187, 0.6);
        }

        .search-icon {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          pointer-events: none;
        }

        /* Filters */
        .filters-section {
          padding: 30px 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .filter-group {
          margin-bottom: 25px;
        }

        .filter-group h3 {
          color: #EFDFBB;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .filter-buttons {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(239, 223, 187, 0.1);
          border: 1px solid rgba(239, 223, 187, 0.3);
          color: #EFDFBB;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: rgba(239, 223, 187, 0.2);
          border-color: rgba(239, 223, 187, 0.5);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #722F37, #E85A4F);
          border-color: #E85A4F;
          color: #EFDFBB;
        }

        .results-summary {
          padding: 0 40px 20px;
          max-width: 1400px;
          margin: 0 auto;
          color: rgba(239, 223, 187, 0.8);
          font-size: 16px;
        }

        /* Course Grid */
        .courses-main {
          padding: 0 40px 60px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 30px;
        }

        .discover-course-card {
          background: rgba(239, 223, 187, 0.05);
          border: 1px solid rgba(239, 223, 187, 0.2);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          backdrop-filter: blur(15px);
        }

        .course-thumbnail {
          height: 200px;
          position: relative;
          overflow: hidden;
        }

        .thumbnail-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .course-icon-large {
          font-size: 60px;
        }

        .course-badges {
          display: flex;
          gap: 10px;
        }

        .badge {
          padding: 4px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 600;
        }

        .badge.bestseller {
          background: linear-gradient(135deg, #E85A4F, #722F37);
          color: #EFDFBB;
        }

        .badge.new {
          background: linear-gradient(135deg, #22c1c3, #fdbb2d);
          color: white;
        }

        .badge.popular {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .course-content {
          padding: 25px;
        }

        .course-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .course-category,
        .course-level {
          background: rgba(239, 223, 187, 0.2);
          color: #EFDFBB;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .course-title {
          color: #EFDFBB;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 8px;
          line-height: 1.3;
        }

        .course-subtitle {
          color: rgba(239, 223, 187, 0.8);
          font-size: 16px;
          margin: 0 0 8px;
          line-height: 1.4;
        }

        .course-instructor {
          color: rgba(239, 223, 187, 0.6);
          font-size: 14px;
          margin: 0 0 20px;
          font-style: italic;
        }

        .course-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .stat {
          color: rgba(239, 223, 187, 0.7);
        }

        .difficulty-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .difficulty-label {
          font-size: 14px;
          color: rgba(239, 223, 187, 0.8);
          min-width: 50px;
        }

        .difficulty-progress {
          flex: 1;
          height: 6px;
          background: rgba(239, 223, 187, 0.2);
          border-radius: 3px;
          overflow: hidden;
        }

        .difficulty-fill {
          height: 100%;
          background: linear-gradient(90deg, #22c1c3, #fdbb2d, #E85A4F);
          border-radius: 3px;
          transition: width 1s ease-out;
        }

        .difficulty-value {
          font-size: 12px;
          color: rgba(239, 223, 187, 0.6);
          min-width: 40px;
          text-align: right;
        }

        .course-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .feature-tag {
          background: rgba(232, 90, 79, 0.2);
          color: rgba(239, 223, 187, 0.9);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
        }

        .course-pricing {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .current-price {
          color: #E85A4F;
          font-size: 24px;
          font-weight: 700;
        }

        .original-price {
          color: rgba(239, 223, 187, 0.5);
          font-size: 18px;
          text-decoration: line-through;
        }

        .discount {
          background: linear-gradient(135deg, #E85A4F, #722F37);
          color: #EFDFBB;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .enroll-btn {
          width: 100%;
          background: linear-gradient(135deg, #1E0538, #722F37);
          border: none;
          color: #EFDFBB;
          padding: 15px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .enroll-btn:hover {
          background: linear-gradient(135deg, #722F37, #E85A4F);
        }

        /* Loading Skeleton */
        .loading-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 30px;
        }

        .course-card-skeleton {
          background: rgba(239, 223, 187, 0.05);
          border-radius: 20px;
          overflow: hidden;
          animation: pulse 1.5s ease-in-out infinite alternate;
        }

        .skeleton-thumbnail {
          height: 200px;
          background: rgba(239, 223, 187, 0.1);
        }

        .skeleton-content {
          padding: 25px;
        }

        .skeleton-title {
          height: 20px;
          background: rgba(239, 223, 187, 0.1);
          border-radius: 10px;
          margin-bottom: 10px;
        }

        .skeleton-subtitle {
          height: 16px;
          background: rgba(239, 223, 187, 0.1);
          border-radius: 8px;
          margin-bottom: 15px;
          width: 80%;
        }

        .skeleton-stats {
          height: 14px;
          background: rgba(239, 223, 187, 0.1);
          border-radius: 7px;
          width: 60%;
        }

        @keyframes pulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }

        /* No Results */
        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: rgba(239, 223, 187, 0.8);
        }

        .no-results-icon {
          font-size: 80px;
          margin-bottom: 20px;
          opacity: 0.6;
        }

        .no-results h3 {
          font-size: 28px;
          margin: 0 0 15px;
          color: #EFDFBB;
        }

        .no-results p {
          font-size: 18px;
          margin: 0 0 30px;
          opacity: 0.8;
        }

        .reset-filters-btn {
          background: linear-gradient(135deg, #722F37, #E85A4F);
          border: none;
          color: #EFDFBB;
          padding: 15px 30px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .reset-filters-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(232, 90, 79, 0.3);
        }

        /* CTA Section */
        .cta-section {
          background: rgba(239, 223, 187, 0.05);
          border-top: 1px solid rgba(239, 223, 187, 0.2);
          padding: 60px 40px;
          margin-top: 40px;
          text-align: center;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-size: 32px;
          font-weight: 700;
          color: #EFDFBB;
          margin: 0 0 15px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .cta-content p {
          font-size: 18px;
          color: rgba(239, 223, 187, 0.8);
          margin: 0 0 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          padding: 15px 30px;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .cta-btn.primary {
          background: linear-gradient(135deg, #E85A4F, #722F37);
          color: #EFDFBB;
        }

        .cta-btn.secondary {
          background: transparent;
          border: 2px solid #EFDFBB;
          color: #EFDFBB;
        }

        .cta-btn.secondary:hover {
          background: rgba(239, 223, 187, 0.1);
          transform: translateY(-2px);
        }

        .cta-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(232, 90, 79, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .discover-header,
          .filters-section,
          .courses-main,
          .cta-section {
            padding-left: 30px;
            padding-right: 30px;
          }

          .courses-grid {
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .discover-header,
          .filters-section,
          .courses-main,
          .cta-section {
            padding-left: 20px;
            padding-right: 20px;
          }

          .page-title {
            font-size: 32px;
          }

          .courses-grid {
            grid-template-columns: 1fr;
          }

          .filter-buttons {
            justify-content: center;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .page-title {
            font-size: 26px;
          }

          .search-input {
            padding: 12px 45px 12px 15px;
            font-size: 14px;
          }

          .discover-course-card {
            margin: 0 -10px;
          }

          .course-content {
            padding: 20px;
          }

          .course-title {
            font-size: 20px;
          }

          .course-stats {
            flex-direction: column;
            gap: 10px;
          }

          .course-pricing {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }

        /* Focus styles for accessibility */
        .back-btn:focus,
        .search-input:focus,
        .filter-btn:focus,
        .enroll-btn:focus,
        .reset-filters-btn:focus,
        .cta-btn:focus {
          outline: 2px solid #EFDFBB;
          outline-offset: 2px;
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .discover-course-card,
          .filter-btn,
          .back-btn {
            border-width: 2px;
            border-color: #EFDFBB;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DiscoverPage;