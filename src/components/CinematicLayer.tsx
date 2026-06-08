import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * CinematicLayer — Floating bokeh particle overlay using Three.js.
 *
 * PERFORMANCE OPTIMISATIONS (v2):
 *  1. Uses IntersectionObserver to PAUSE the render loop when off-screen.
 *  2. Caps pixel ratio at 1.5 (instead of 2) — halves GPU fill-rate.
 *  3. Reduced particle count: 35 (mobile) / 70 (desktop).
 *  4. Throttles to 30 FPS instead of 60 to halve CPU/GPU usage.
 *  5. Uses passively-listened mousemove and debounced resize.
 */
const CinematicLayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ── Performance-aware settings ── */
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 35 : 70;
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
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
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;

      const t = Math.random();
      if (t < 0.42) {
        colors[i * 3] = 0.94 + Math.random() * 0.06;
        colors[i * 3 + 1] = 0.42 + Math.random() * 0.22;
        colors[i * 3 + 2] = 0.12 + Math.random() * 0.16;
      } else if (t < 0.78) {
        colors[i * 3] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 1] = 0.86 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.8 + Math.random() * 0.12;
      } else {
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

    const origin = new Float32Array(positions);

    /* ── Mouse parallax ── */
    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    /* ── Visibility control: pause when off-screen ── */
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(container);

    /* ── 30 FPS throttled render loop ── */
    let raf: number;
    const clock = new THREE.Clock();
    let lastFrameTime = 0;

    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);

      // Skip if off-screen — save 100% of GPU work when scrolled away
      if (!isVisible) return;

      // Throttle to 30fps — halves GPU load vs 60fps
      const delta = now - lastFrameTime;
      if (delta < FRAME_INTERVAL) return;
      lastFrameTime = now - (delta % FRAME_INTERVAL);

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
    raf = requestAnimationFrame(animate);

    /* ── Debounced resize ── */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 200);
    };
    window.addEventListener('resize', onResize, { passive: true });

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      observer.disconnect();
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
