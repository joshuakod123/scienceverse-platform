import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const LandingPage = () => {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };
  
  useEffect(() => {
    // Variables for animation
    let scene, camera, renderer, controls;
    let skybox, planet, ring, stars, nebula;
    let animationId;
    
    // Setup variables
    const center = {
      x: 0,
      y: 0,
      z: 0
    };
    
    const cameraFinalPosition = {
      x: 0,
      y: 50,
      z: 150
    };
    
    // Initialize scene
    const init = async () => {
      // Create scene
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000814); // Deep space blue
      
      // Create camera
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      camera.position.x = 0;
      camera.position.y = 100;
      camera.position.z = 300;
      
      // Create renderer
      renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.5;
      
      if (mountRef.current) {
        // Clear any existing canvas
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
        mountRef.current.appendChild(renderer.domElement);
      }
      
      // Create controls with limited functionality for the landing page
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.minDistance = 100;
      controls.maxDistance = 200;
      controls.enablePan = false;
      controls.enableZoom = false; 
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      
      // Add lights
      const ambientLight = new THREE.AmbientLight(0x334466, 0.3);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xFFDD99, 2);
      directionalLight.position.set(100, 100, 100);
      directionalLight.castShadow = true;
      scene.add(directionalLight);
      
      // Add a subtle point light for the planet
      const planetLight = new THREE.PointLight(0xFF9933, 2, 300);
      planetLight.position.set(100, 50, 50);
      scene.add(planetLight);
      
      // Add a blue point light for contrast
      const blueLight = new THREE.PointLight(0x3366FF, 1.5, 300);
      blueLight.position.set(-100, -50, 50);
      scene.add(blueLight);
      
      // Add elements to the scene
      try {
        await Promise.all([
          createSkybox(),
          createPlanet(),
          createStars(),
          createNebula()
        ]);
        
        // Show loading for 2 seconds then reveal animation
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        
      } catch (error) {
        console.error("Error initializing the scene:", error);
        setIsLoading(false);
      }
      
      // Event listener for window resize
      window.addEventListener('resize', onWindowResize);
      
      // Start animation loop
      animate();
    };
    
    // Create skybox
    const createSkybox = () => {
      return new Promise((resolve) => {
        const geometry = new THREE.SphereGeometry(900, 32, 32);
        
        // Create gradient skybox
        const vertexShader = `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;
        
        const fragmentShader = `
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          uniform float offset;
          uniform float exponent;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition + offset).y;
            gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
          }
        `;
        
        const uniforms = {
          topColor: { value: new THREE.Color(0x0B1026) },      // Deep blue
          bottomColor: { value: new THREE.Color(0x1E0538) },   // Deep purple
          offset: { value: 33 },
          exponent: { value: 0.6 }
        };
        
        const material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          side: THREE.BackSide
        });
        
        skybox = new THREE.Mesh(geometry, material);
        scene.add(skybox);
        resolve();
      });
    };
    
    // Create planet
    const createPlanet = () => {
      return new Promise((resolve) => {
        // Planet body
        const geometry = new THREE.SphereGeometry(30, 64, 64);
        
        // Create a more interesting planet material with gradient color
        const material = new THREE.MeshStandardMaterial({
          color: 0x6B4333, // Rust brown
          metalness: 0.2,
          roughness: 0.8,
          emissive: 0x2E1E12, // Slight emissive glow
          emissiveIntensity: 0.1
        });
        
        planet = new THREE.Mesh(geometry, material);
        planet.castShadow = true;
        planet.receiveShadow = true;
        
        // Add surface texture using noise
        const planetDetail = new THREE.SphereGeometry(30.5, 64, 64);
        const detailMaterial = new THREE.MeshStandardMaterial({
          color: 0x7C5541, // Lighter brown
          transparent: true,
          opacity: 0.5,
          roughness: 1,
          metalness: 0
        });
        
        const detailLayer = new THREE.Mesh(planetDetail, detailMaterial);
        detailLayer.scale.set(0.98, 0.98, 0.98);
        planet.add(detailLayer);
        
        scene.add(planet);
        
        // Planet ring - with beautiful colors
        const ringGeometry = new THREE.RingGeometry(45, 70, 64);
        const ringMaterial = new THREE.MeshStandardMaterial({
          color: 0xB18F65, // Gold-ish color
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
          metalness: 0.5,
          roughness: 0.6
        });
        
        ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        
        // Add more subtle ring details
        const ringDetail = new THREE.RingGeometry(50, 68, 64);
        const ringDetailMaterial = new THREE.MeshStandardMaterial({
          color: 0xD4AF85, // Lighter gold
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4,
        });
        
        const ringDetailMesh = new THREE.Mesh(ringDetail, ringDetailMaterial);
        ringDetailMesh.rotation.x = Math.PI / 2;
        ringDetailMesh.rotation.y = Math.PI / 6;
        scene.add(ringDetailMesh);
        
        scene.add(ring);
        resolve();
      });
    };
    
    // Create stars
    const createStars = () => {
      return new Promise((resolve) => {
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 2000;
        
        const positions = new Float32Array(starsCount * 3);
        const colors = new Float32Array(starsCount * 3);
        const sizes = new Float32Array(starsCount);
        
        for (let i = 0; i < starsCount; i++) {
          const i3 = i * 3;
          
          // Position
          positions[i3] = (Math.random() - 0.5) * 1000;
          positions[i3 + 1] = (Math.random() - 0.5) * 1000;
          positions[i3 + 2] = (Math.random() - 0.5) * 1000;
          
          // Color - create multi-colored stars
          const colorChoice = Math.random();
          if (colorChoice < 0.2) { 
            // Blue-white stars
            colors[i3] = 0.8 + Math.random() * 0.2;
            colors[i3 + 1] = 0.8 + Math.random() * 0.2;
            colors[i3 + 2] = 1.0;
          } else if (colorChoice < 0.4) { 
            // Yellow stars
            colors[i3] = 1.0;
            colors[i3 + 1] = 0.8 + Math.random() * 0.2;
            colors[i3 + 2] = 0.3 + Math.random() * 0.2;
          } else if (colorChoice < 0.5) { 
            // Red stars
            colors[i3] = 1.0;
            colors[i3 + 1] = 0.3 + Math.random() * 0.3;
            colors[i3 + 2] = 0.3 + Math.random() * 0.2;
          } else {
            // White stars
            colors[i3] = 0.8 + Math.random() * 0.2;
            colors[i3 + 1] = 0.8 + Math.random() * 0.2;
            colors[i3 + 2] = 0.8 + Math.random() * 0.2;
          }
          
          // Random size
          sizes[i] = Math.random() * 2;
        }
        
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        const starsMaterial = new THREE.PointsMaterial({
          size: 1.2,
          transparent: true,
          opacity: 0.8,
          vertexColors: true,
          blending: THREE.AdditiveBlending
        });
        
        stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);
        resolve();
      });
    };
    
    // Create colorful nebula
    const createNebula = () => {
      return new Promise((resolve) => {
        const geometryNebula = new THREE.BufferGeometry();
        const particleCount = 500;
        
        const positionsNebula = new Float32Array(particleCount * 3);
        const colorsNebula = new Float32Array(particleCount * 3);
        const sizesNebula = new Float32Array(particleCount);
        
        // Wine color in RGB (114, 47, 55) / #722F37
        const wineColor = new THREE.Color(0x722F37);
        
        // Dutch white in RGB (239, 223, 187) / #EFDFBB
        const dutchWhiteColor = new THREE.Color(0xEFDFBB);
        
        // Space purple color
        const purpleColor = new THREE.Color(0x1E0538);
        
        // Accent Orange
        const orangeColor = new THREE.Color(0xE85A4F);
        
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          
          // Create a nebula shape
          const theta = Math.random() * Math.PI * 2;
          const radius = 70 + Math.random() * 200;
          const height = (Math.random() - 0.5) * 100;
          
          positionsNebula[i3] = Math.cos(theta) * radius;
          positionsNebula[i3 + 1] = height;
          positionsNebula[i3 + 2] = Math.sin(theta) * radius;
          
          // Larger particles
          sizesNebula[i] = 5 + Math.random() * 10;
          
          // Mix colors between the brand colors
          let mixedColor;
          const colorChoice = Math.random();
          
          if (colorChoice < 0.3) {
            // Mix wine and dutch white
            mixedColor = new THREE.Color().lerpColors(
              wineColor, 
              dutchWhiteColor, 
              Math.random()
            );
          } else if (colorChoice < 0.6) {
            // Mix wine and purple
            mixedColor = new THREE.Color().lerpColors(
              wineColor, 
              purpleColor, 
              Math.random()
            );
          } else if (colorChoice < 0.8) {
            // Mix orange and dutch white
            mixedColor = new THREE.Color().lerpColors(
              orangeColor, 
              dutchWhiteColor, 
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
          
          colorsNebula[i3] = mixedColor.r;
          colorsNebula[i3 + 1] = mixedColor.g;
          colorsNebula[i3 + 2] = mixedColor.b;
        }
        
        geometryNebula.setAttribute('position', new THREE.BufferAttribute(positionsNebula, 3));
        geometryNebula.setAttribute('color', new THREE.BufferAttribute(colorsNebula, 3));
        geometryNebula.setAttribute('size', new THREE.BufferAttribute(sizesNebula, 1));
        
        const materialNebula = new THREE.PointsMaterial({
          size: 5,
          transparent: true,
          opacity: 0.3,
          vertexColors: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        
        nebula = new THREE.Points(geometryNebula, materialNebula);
        scene.add(nebula);
        resolve();
      });
    };
    
    // Handle window resize
    const onWindowResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    // Animation loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate planet and ring
      if (planet && ring) {
        planet.rotation.y += 0.003;
        ring.rotation.z += 0.001;
      }
      
      // Rotate skybox slowly
      if (skybox) {
        skybox.rotation.y += 0.0001;
      }
      
      // Animate nebula
      if (nebula) {
        nebula.rotation.y += 0.0002;
        
        // Pulsate nebula
        const time = Date.now() * 0.001;
        nebula.material.opacity = 0.2 + Math.sin(time) * 0.1;
      }
      
      // Twinkle stars
      if (stars && stars.geometry.attributes.size) {
        const time = Date.now() * 0.001;
        const sizes = stars.geometry.attributes.size;
        
        for (let i = 0; i < sizes.count; i++) {
          sizes.array[i] = Math.abs(Math.sin(time + i * 0.1)) * 2 + 0.5;
        }
        
        sizes.needsUpdate = true;
      }
      
      // Gradually move camera to final position
      if (camera) {
        camera.position.x += (cameraFinalPosition.x - camera.position.x) * 0.02;
        camera.position.y += (cameraFinalPosition.y - camera.position.y) * 0.02;
        camera.position.z += (cameraFinalPosition.z - camera.position.z) * 0.02;
        camera.lookAt(center.x, center.y, center.z);
      }
      
      if (controls) {
        controls.update();
      }
      
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };
    
    // Initialize the scene
    init();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationId);
      
      if (controls) {
        controls.dispose();
      }
      
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials
      if (skybox) {
        skybox.geometry.dispose();
        skybox.material.dispose();
      }
      
      if (planet) {
        planet.geometry.dispose();
        planet.material.dispose();
        if (planet.children.length > 0) {
          planet.children.forEach(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
          });
        }
      }
      
      if (ring) {
        ring.geometry.dispose();
        ring.material.dispose();
      }
      
      if (stars) {
        stars.geometry.dispose();
        stars.material.dispose();
      }
      
      if (nebula) {
        nebula.geometry.dispose();
        nebula.material.dispose();
      }
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="landing-page">
      {isLoading && (
        <div className="loading">
          <p>
            <span className="letter" style={{ '--i': 0 }}>S</span>
            <span className="letter" style={{ '--i': 1 }}>C</span>
            <span className="letter" style={{ '--i': 2 }}>I</span>
            <span className="letter" style={{ '--i': 3 }}>E</span>
            <span className="letter" style={{ '--i': 4 }}>N</span>
            <span className="letter" style={{ '--i': 5 }}>C</span>
            <span className="letter" style={{ '--i': 6 }}>E</span>
          </p>
        </div>
      )}
      <div 
        ref={mountRef} 
        style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }}
      />
      <div className="content-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none',
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
      }}>
        <h1 style={{ 
          color: '#EFDFBB',
          fontSize: 'clamp(2rem, 8vw, 5rem)', 
          marginBottom: '1rem',
          textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(114, 47, 55, 0.5)',
          textAlign: 'center',
          fontWeight: 'bold',
          letterSpacing: '2px',
        }}>
          BrainByte
        </h1>
        <p style={{ 
          color: '#EFDFBB',
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          maxWidth: '800px',
          margin: '0 auto 2rem',
          textShadow: '0 0 10px rgba(0,0,0,0.8)',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          Unlock Your Potential: One BrainByte at a time  
        </p>
        <button 
          onClick={handleGetStarted}
          style={{
            background: 'linear-gradient(135deg, #722F37 0%, #E85A4F 100%)',
            color: 'white',
            border: 'none',
            padding: '14px 40px',
            borderRadius: '30px',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            cursor: 'pointer',
            pointerEvents: 'auto',
            boxShadow: '0 4px 15px rgba(114, 47, 55, 0.5)',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
            letterSpacing: '1px',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(114, 47, 55, 0.7)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(114, 47, 55, 0.5)';
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;