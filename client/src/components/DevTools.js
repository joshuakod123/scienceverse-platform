// src/components/DevTools.js
import React from 'react';

const DevTools = () => {
  // For development tools like toggling mock authentication
  const toggleDevAuth = () => {
    const current = localStorage.getItem('devAuthBypass') === 'true';
    localStorage.setItem('devAuthBypass', (!current).toString());
    alert(`Dev Auth Bypass: ${!current}`);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: 10, 
      right: 10, 
      background: '#333', 
      color: 'white',
      padding: '5px 10px',
      borderRadius: '4px',
      zIndex: 9999
    }}>
      <button onClick={toggleDevAuth}>Toggle Dev Auth</button>
    </div>
  );
};

export default DevTools;