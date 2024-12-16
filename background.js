document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particleCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
  
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
  
    for (let i = 0; i < 20000; i++) {
      vertices.push((Math.random() - 0.5) * 2000);
      vertices.push((Math.random() - 0.5) * 2000);
      vertices.push((Math.random() - 0.5) * 2000);
  
      colors.push(Math.random());
      colors.push(Math.random());
      colors.push(Math.random());
    }
  
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  
    const texture = createCircleTexture();
    const material = new THREE.PointsMaterial({
      size: 3,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
  
    let animationFrameId;
  
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
  
    const onDocumentMouseMove = (event) => {
      const mouseX = (event.clientX - window.innerWidth / 2) / 100;
      const mouseY = (event.clientY - window.innerHeight / 2) / 100;
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    };
  
    const animate = () => {
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0005;
  
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
  
    const cleanup = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
  
      // Dispose of Three.js objects
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onDocumentMouseMove);
    animate();
  
    // Add cleanup logic on page unload
    window.addEventListener('beforeunload', cleanup);
  
    function createCircleTexture() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 64;
  
      canvas.width = size;
      canvas.height = size;
  
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
  
      return new THREE.CanvasTexture(canvas);
    }
  });
  