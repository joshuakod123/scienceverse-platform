// client/src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CourseContext } from '../context/CourseContext';

const ProtectedRoute = ({ children, courseId, requiresPurchase = false }) => {
  const { currentUser, loading: authLoading } = useContext(AuthContext);
  const { userCourses, loading: courseLoading } = useContext(CourseContext);

  // 로딩 중일 때
  if (authLoading || (requiresPurchase && courseLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1026] to-[#1E0538] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // 로그인하지 않은 경우
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 구매가 필요한 코스인 경우
  if (requiresPurchase && courseId) {
    const hasPurchased = userCourses.some(
      course => course.id === courseId || course._id === courseId
    );

    if (!hasPurchased) {
      // 구매 페이지로 리디렉션
      return <Navigate to={`/purchase/${courseId}`} replace />;
    }
  }

  // 접근 권한이 있는 경우 children 렌더링
  return children;
};

export default ProtectedRoute;