import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import SpaceCanvas from '../Space/SpaceCanvas';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }}>
        <SpaceCanvas />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: '48px' }}
        >
          🌌
        </motion.div>
        <h2 style={{ marginLeft: '16px' }}>인증 확인 중...</h2>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;