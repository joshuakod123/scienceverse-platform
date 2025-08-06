import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';

// Three.js 관련 컴포넌트가 없다면 CSS로 대체하겠습니다
const SpaceCanvas = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: 'linear-gradient(135deg, #0B1026 0%, #1E0538 50%, #722F37 100%)',
      overflow: 'hidden'
    }}>
      {/* Animated stars background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, #EFDFBB, transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(239, 223, 187, 0.8), transparent),
            radial-gradient(1px 1px at 90px 40px, #E85A4F, transparent),
            radial-gradient(1px 1px at 130px 80px, #722F37, transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(239, 223, 187, 0.6), transparent),
            radial-gradient(1px 1px at 200px 120px, rgba(232, 90, 79, 0.7), transparent),
            radial-gradient(2px 2px at 250px 50px, rgba(239, 223, 187, 0.9), transparent),
            radial-gradient(1px 1px at 300px 150px, #1E0538, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '350px 200px',
          animation: 'twinkle 6s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />
      
      {/* Moving nebula clouds */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '120%',
          height: '120%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(114, 47, 55, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(232, 90, 79, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(30, 5, 56, 0.5) 0%, transparent 50%),
            radial-gradient(circle at 90% 90%, rgba(239, 223, 187, 0.1) 0%, transparent 50%)
          `,
          animation: 'nebula-drift 20s ease-in-out infinite alternate',
          pointerEvents: 'none',
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      />
      
      {/* Floating particles */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: 'rgba(239, 223, 187, 0.6)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-float-${i % 3} ${Math.random() * 10 + 8}s infinite linear`,
              boxShadow: '0 0 6px rgba(239, 223, 187, 0.8)'
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.5; transform: scale(1); }
        }
        
        @keyframes nebula-drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-20px, 10px) rotate(1deg); }
          66% { transform: translate(15px, -15px) rotate(-1deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes particle-float-0 {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(100px); opacity: 0; }
        }
        
        @keyframes particle-float-1 {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(-50px); opacity: 0; }
        }
        
        @keyframes particle-float-2 {
          0% { transform: translateY(100vh) translateX(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100px) translateX(30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
  
export default SpaceCanvas;