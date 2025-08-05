import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SpaceBackground = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);
    
    // Handle window resize
    const handleResize = () => {
      if(currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // ... (createStars, createNebula, createShootingStar, etc. functions remain the same)
    const createStars = () => {
        const geometry = new THREE.BufferGeometry();
        const count = 2000;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        for (let i = 0; i < count * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 100;
          positions[i + 1] = (Math.random() - 0.5) * 100;
          positions[i + 2] = -Math.random() * 50;
          sizes[i / 3] = Math.random() * 2;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, sizeAttenuation: true, transparent: true, opacity: 0.8, size: 0.05 });
        return new THREE.Points(geometry, starsMaterial);
      };
      
      const createNebula = (color, size, count) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i += 3) {
          positions[i] = (Math.random() - 0.5) * 50;
          positions[i + 1] = (Math.random() - 0.5) * 50;
          positions[i + 2] = -Math.random() * 50 - 10;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
        return new THREE.Points(geometry, material);
      };
  
      const createShootingStar = () => {
        const geometry = new THREE.BufferGeometry();
        const particleCount = 20;
        const positions = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const t = i / particleCount;
          positions[i3] = 20 - 40 * t;
          positions[i3 + 1] = 10 - 20 * t + Math.random() * 2 - 1;
          positions[i3 + 2] = -10 - Math.random() * 5;
          sizes[i] = (1 - t) * 0.8;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const shootingStar = new THREE.Points(geometry, material);
        shootingStar.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, -20);
        shootingStar.rotation.z = Math.random() * Math.PI * 2;
        scene.add(shootingStar);
        return shootingStar;
      };
      
      const createRing = (radius, color) => {
        const geometry = new THREE.RingGeometry(radius, radius + 0.05, 64);
        const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.2 });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2;
        return ring;
      };
  
      const createGalaxy = () => {
        const geometry = new THREE.BufferGeometry();
        const count = 1000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          const radius = 5 + Math.random() * 10;
          const angle = (i / count) * Math.PI * 20;
          positions[i3] = Math.cos(angle) * radius;
          positions[i3 + 1] = (Math.random() - 0.5) * 3;
          positions[i3 + 2] = Math.sin(angle) * radius - 30;
          const colorFactor = radius / 15;
          colors[i3] = 0.5 - colorFactor * 0.5;
          colors[i3 + 1] = 0.2 - colorFactor * 0.2;
          colors[i3 + 2] = 0.8;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 0.3, transparent: true, opacity: 0.8, vertexColors: true, blending: THREE.AdditiveBlending });
        return new THREE.Points(geometry, material);
      };

    const stars = createStars();
    scene.add(stars);
    
    const purpleNebula = createNebula(0x1E0538, 0.5, 300);
    const wineNebula = createNebula(0x722F37, 0.7, 200);
    const dutchWhiteNebula = createNebula(0xEFDFBB, 0.3, 150);
    scene.add(purpleNebula, wineNebula, dutchWhiteNebula);
    
    const ring1 = createRing(15, 0x722F37);
    const ring2 = createRing(20, 0xEFDFBB);
    scene.add(ring1, ring2);

    const galaxy = createGalaxy();
    scene.add(galaxy);
    
    const shootingStars = [];
    const maxShootingStars = 3;
    
    let frameId;
    let elapsed = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      elapsed += 0.01;
      
      stars.rotation.y += 0.0003;
      stars.rotation.x += 0.0001;
      
      purpleNebula.rotation.y += 0.0002;
      wineNebula.rotation.y -= 0.0001;
      dutchWhiteNebula.rotation.y += 0.00015;
      
      ring1.rotation.y += 0.001;
      ring2.rotation.y -= 0.0007;
      
      galaxy.rotation.z += 0.0005;
      
      if (Math.random() > 0.994 && shootingStars.length < maxShootingStars) {
        const newStar = createShootingStar();
        shootingStars.push({ object: newStar, life: 0, speed: 0.2 + Math.random() * 0.3, maxLife: 1 + Math.random() * 1 });
      }
      
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.object.position.x += star.speed;
        star.object.position.y -= star.speed * 0.6;
        star.life += 0.02;
        
        if (star.life >= star.maxLife) {
          scene.remove(star.object);
          star.object.geometry.dispose();
          star.object.material.dispose();
          shootingStars.splice(i, 1);
        }
      }
      
      const parallaxX = Math.sin(elapsed * 0.1) * 0.5;
      const parallaxY = Math.cos(elapsed * 0.1) * 0.5;
      camera.position.x = parallaxX;
      camera.position.y = parallaxY;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      
      // Use the captured currentMount variable for cleanup
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      // Dispose geometries and materials to prevent memory leaks
      stars.geometry.dispose();
      stars.material.dispose();
      purpleNebula.geometry.dispose();
      purpleNebula.material.dispose();
      wineNebula.geometry.dispose();
      wineNebula.material.dispose();
      dutchWhiteNebula.geometry.dispose();
      dutchWhiteNebula.material.dispose();
      ring1.geometry.dispose();
      ring1.material.dispose();
      ring2.geometry.dispose();
      ring2.material.dispose();
      galaxy.geometry.dispose();
      galaxy.material.dispose();
      shootingStars.forEach(star => {
        scene.remove(star.object);
        star.object.geometry.dispose();
        star.object.material.dispose();
      });
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 1
      }}
    />
  );
};

export default SpaceBackground;