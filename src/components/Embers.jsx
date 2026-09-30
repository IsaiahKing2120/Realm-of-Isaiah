import { useEffect, useRef } from 'react';

export default function Embers({ enabled }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame;
    let last = 0;
    let width = 0;
    let height = 0;
    let particles = [];
    const resize = () => {
      width = window.innerWidth;
      height = Math.min(window.innerHeight, 1000);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: width < 700 ? 14 : 30 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.5 + Math.random() * 1.3,
        speed: 8 + Math.random() * 15,
        alpha: 0.15 + Math.random() * 0.35,
      }));
    };
    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (document.hidden || now - last < 32) return;
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed * delta;
        particle.x += Math.sin(now / 3000 + particle.y / 100) * delta * 7;
        if (particle.y < 0) particle.y = height;
        context.beginPath();
        context.fillStyle = `rgba(226,174,93,${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
    };
    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [enabled]);
  return enabled ? (
    <canvas className="embers" ref={ref} aria-hidden="true" />
  ) : null;
}
