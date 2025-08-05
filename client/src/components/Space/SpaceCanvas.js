import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SpaceCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    
    // Canvas element
    const canvas = canvasRef.current;
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      width / height, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      antialias: true,
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x0B1026, 1);
    
    // Responsive handler
    const handleResize = () => {
      const newWidth = canvas.parentElement.clientWidth;
      const newHeight = canvas.parentElement.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
    };
    
    // Mouse move handler for parallax effect
    const handleMouseMove = (event) => {
      // Calculate normalized coordinates (-1 to 1)
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 100;
      starPositions[i + 1] = (Math.random() - 0.5) * 100;
      starPositions[i + 2] = -Math.random() * 50;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Create twinkle stars (brighter stars that twinkle)
    const twinkleGeometry = new THREE.BufferGeometry();
    const twinkleCount = 100;
    const twinklePositions = new Float32Array(twinkleCount * 3);
    const twinkleSizes = new Float32Array(twinkleCount);
    
    for (let i = 0; i < twinkleCount; i++) {
      const i3 = i * 3;
      twinklePositions[i3] = (Math.random() - 0.5) * 80;
      twinklePositions[i3 + 1] = (Math.random() - 0.5) * 80;
      twinklePositions[i3 + 2] = -Math.random() * 40;
      
      twinkleSizes[i] = Math.random() * 0.2 + 0.2; // Larger than regular stars
    }
    
    twinkleGeometry.setAttribute('position', new THREE.BufferAttribute(twinklePositions, 3));
    twinkleGeometry.setAttribute('size', new THREE.BufferAttribute(twinkleSizes, 1));
    
    const twinkleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    
    const twinkleStars = new THREE.Points(twinkleGeometry, twinkleMaterial);
    scene.add(twinkleStars);
    
    // Create nebula effect (colorful gas clouds)
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaCount = 500;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaSizes = new Float32Array(nebulaCount);
    const nebulaColors = new Float32Array(nebulaCount * 3);
    
    // Wine color in RGB (114, 47, 55)
    const wineColor = new THREE.Color(0x722F37);
    
    // Dutch white in RGB (239, 223, 187)
    const dutchWhiteColor = new THREE.Color(0xEFDFBB);
    
    // Space purple color
    const purpleColor = new THREE.Color(0x1E0538);
    
    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      nebulaPositions[i3] = (Math.random() - 0.5) * 30;
      nebulaPositions[i3 + 1] = (Math.random() - 0.5) * 30;
      nebulaPositions[i3 + 2] = -Math.random() * 30;
      
      nebulaSizes[i] = Math.random() * 0.5 + 0.1;
      
      // Mix colors between wine and dutch white and purple
      let mixedColor;
      const colorChoice = Math.random();
      
      if (colorChoice < 0.4) {
        // Mix wine and dutch white
        mixedColor = new THREE.Color().lerpColors(
          wineColor, 
          dutchWhiteColor, 
          Math.random()
        );
      } else if (colorChoice < 0.7) {
        // Mix wine and purple
        mixedColor = new THREE.Color().lerpColors(
          wineColor, 
          purpleColor, 
          Math.random()
        );
      } else {
        // Mix purple and dutch white
        mixedColor = new THREE.Color().lerpColors(
          purpleColor, 
          dutchWhiteColor, 
          Math.random()
        );
      }
      
      nebulaColors[i3] = mixedColor.r;
      nebulaColors[i3 + 1] = mixedColor.g;
      nebulaColors[i3 + 2] = mixedColor.b;
    }
    
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
    
    const nebulaMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);
    
    // Create planet
    const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    
    // Create custom shader material with atmospheric glow
    const planetMaterial = new THREE.MeshBasicMaterial({
      color: 0x4287f5,
      transparent: true,
      opacity: 0.8
    });
    
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.set(2, -1, -3);
    scene.add(planet);
    
    // Add a glowing atmosphere to the planet
    const glowGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4287f5,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(2, -1, -3);
    scene.add(glow);
    
    // Add smaller planet
    const moonGeometry = new THREE.SphereGeometry(0.2, 24, 24);
    const moonMaterial = new THREE.MeshBasicMaterial({
      color: 0xccaa88,
      transparent: true,
      opacity: 0.7
    });
    
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(-1.5, 1, -4);
    scene.add(moon);
    
    // Add faint rings around the planet
    const ringGeometry = new THREE.RingGeometry(0.7, 1.2, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8899ff,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(2, -1, -3);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);
    
    // Create distant galaxy
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyCount = 400;
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    
    // Create spiral galaxy shape
    for (let i = 0; i < galaxyCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 3 + 1;
      
      // Spiral pattern
      const spiralAngle = angle + radius * 0.5;
      
      galaxyPositions[i3] = Math.cos(spiralAngle) * radius - 8;
      galaxyPositions[i3 + 1] = (Math.random() - 0.5) * 0.5;
      galaxyPositions[i3 + 2] = Math.sin(spiralAngle) * radius - 15;
    }
    
    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));
    
    const galaxyMaterial = new THREE.PointsMaterial({
      color: 0xffaa66,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);
    
    // Create shooting stars
    const shootingStars = [];
    
    const createShootingStar = () => {
      const geometry = new THREE.BufferGeometry();
      const particleCount = 15;
      const positions = new Float32Array(particleCount * 3);
      
      // Create a trail
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = i * -0.25;      // x
        positions[i3 + 1] = i * -0.1;   // y
        positions[i3 + 2] = -10;        // z
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.15,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const shootingStar = new THREE.Points(geometry, material);
      
      // Set random position and rotation
      shootingStar.position.set(
        (Math.random() - 0.3) * 20,
        (Math.random() + 0.3) * 15,
        -15
      );
      
      shootingStar.rotation.z = Math.random() * Math.PI / 4 - Math.PI / 8;
      
      scene.add(shootingStar);
      
      return {
        object: shootingStar,
        speed: 0.3 + Math.random() * 0.5,
        life: 0,
        maxLife: 1 + Math.random() * 0.5
      };
    };
    
    // Animation
    let time = 0;
    let animationFrame;
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      time += 0.01;
      
      // Rotate stars slowly
      stars.rotation.y += 0.0005;
      stars.rotation.z += 0.0002;
      
      // Parallax effect with mouse movement
      const parallaxX = mouseRef.current.x * 0.2;
      const parallaxY = mouseRef.current.y * 0.2;
      
      stars.position.x = parallaxX * 0.5;
      stars.position.y = parallaxY * 0.5;
      
      nebula.position.x = parallaxX * 0.3;
      nebula.position.y = parallaxY * 0.3;
      
      planet.position.x = 2 + parallaxX * 0.1;
      planet.position.y = -1 + parallaxY * 0.1;
      
      glow.position.x = planet.position.x;
      glow.position.y = planet.position.y;
      
      ring.position.x = planet.position.x;
      ring.position.y = planet.position.y;
      
      // Twinkle stars effect
      twinkleStars.material.opacity = 0.7 + Math.sin(time * 3) * 0.3;
      
      // Move nebula
      nebula.rotation.y += 0.0003;
      
      // Rotate planet
      planet.rotation.y += 0.005;
      
      // Rotate galaxy
      galaxy.rotation.z += 0.001;
      
      // Animate glow
      glow.scale.set(
        1 + Math.sin(time) * 0.05,
        1 + Math.sin(time) * 0.05,
        1 + Math.sin(time) * 0.05
      );
      
      // Move moon in orbit around planet
      const moonAngle = time * 0.5;
      moon.position.x = -1.5 + Math.cos(moonAngle) * 1.5;
      moon.position.y = 1 + Math.sin(moonAngle) * 1.5;
      moon.rotation.y += 0.01;
      
      // Random shooting stars
      if (Math.random() > 0.995 && shootingStars.length < 5) {
        shootingStars.push(createShootingStar());
      }
      
      // Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.object.position.x -= star.speed;
        star.object.position.y -= star.speed * 0.4;
        star.life += 0.02;
        
        // Fade out shooting star as it moves
        if (star.life > star.maxLife * 0.7) {
          star.object.material.opacity = 1 - ((star.life - star.maxLife * 0.7) / (star.maxLife * 0.3));
        }
        
        if (star.life >= star.maxLife) {
          scene.remove(star.object);
          star.object.geometry.dispose();
          star.object.material.dispose();
          shootingStars.splice(i, 1);
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Dispose resources
      starGeometry.dispose();
      starMaterial.dispose();
      twinkleGeometry.dispose();
      twinkleMaterial.dispose();
      nebulaGeometry.dispose();
      nebulaMaterial.dispose();
      planetGeometry.dispose();
      planetMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      
      // Clean up shooting stars
      shootingStars.forEach(star => {
        scene.remove(star.object);
        star.object.geometry.dispose();
        star.object.material.dispose();
      });
      
      renderer.dispose();
    };
  }, []);
  
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default SpaceCanvas;