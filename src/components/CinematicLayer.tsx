import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CinematicLayer — Floating bokeh particle overlay using Three.js.
 *
 * Creates a dreamy, depth-rich atmosphere with warm orange + white
 * glowing particles, additive blending, sine-wave oscillation,
 * and mouse-driven parallax. Renders on a transparent canvas
 * that sits above the video but below the UI content.
 */
const CinematicLayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Performance-aware particle count ── */
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 55 : 110;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ── Soft bokeh sprite texture (generated via canvas) ── */
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 64;
    texCanvas.height = 64;
    const ctx = texCanvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.15, 'rgba(255,255,255,0.85)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.3)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const bokehTexture = new THREE.CanvasTexture(texCanvas);

    /* ── Particle attributes ── */
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const amplitudes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread across a wide 3D volume
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;

      // Colour palette: warm orange ↔ soft cream ↔ faint blue
      const t = Math.random();
      if (t < 0.42) {
        // Warm orange tones
        colors[i * 3] = 0.94 + Math.random() * 0.06;
        colors[i * 3 + 1] = 0.42 + Math.random() * 0.22;
        colors[i * 3 + 2] = 0.12 + Math.random() * 0.16;
      } else if (t < 0.78) {
        // Soft warm white / cream
        colors[i * 3] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.86 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.12;
      } else {
        // Subtle monitor-blue accent
        colors[i * 3] = 0.38 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.58 + Math.random() * 0.22;
        colors[i * 3 + 2] = 0.88 + Math.random() * 0.12;
      }

      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.12 + Math.random() * 0.38;
      amplitudes[i] = 0.25 + Math.random() * 0.85;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      map: bokehTexture,
      size: isMobile ? 0.45 : 0.38,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Keep a copy of the original positions for sine-wave offset
    const origin = new Float32Array(positions);

    /* ── Mouse parallax ── */
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    /* ── Render loop ── */
    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth camera parallax
      smooth.x += (mouse.x - smooth.x) * 0.012;
      smooth.y += (mouse.y - smooth.y) * 0.012;
      camera.position.x = smooth.x * 0.55;
      camera.position.y = -smooth.y * 0.35;
      camera.lookAt(0, 0, 0);

      // Sine-wave floating motion
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        pos[i3] =
          origin[i3] +
          Math.sin(t * speeds[i] + phases[i]) * amplitudes[i] * 0.28;
        pos[i3 + 1] =
          origin[i3 + 1] +
          Math.cos(t * speeds[i] * 0.75 + phases[i]) * amplitudes[i] * 0.38;
        pos[i3 + 2] =
          origin[i3 + 2] +
          Math.sin(t * speeds[i] * 0.45 + phases[i] * 1.4) *
            amplitudes[i] *
            0.18;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      bokehTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
};

export default CinematicLayer;
