import { useEffect, useRef } from "react";

export default function Embers({ enabled }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame;
    let last = 0;
    let width = 0;
    let height = 0;
    let particles = [];
    let visible = false;
    const pointer = { x: -1000, y: -1000 };
    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
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
      if (!visible || document.hidden) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(tick);
      if (document.hidden || now - last < 32) return;
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.y -= particle.speed * delta;
        particle.x += Math.sin(now / 3000 + particle.y / 100) * delta * 7;
        const dx = particle.x - pointer.x,
          dy = particle.y - pointer.y,
          d = Math.hypot(dx, dy);
        if (d < 100 && d > 0) {
          particle.x += (dx / d) * delta * 24;
          particle.y += (dy / d) * delta * 24;
        }
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y < 0) particle.y = height;
        context.beginPath();
        context.fillStyle = `rgba(226,174,93,${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
    };
    resize();
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      sync();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pointermove", move);
    };
  }, [enabled]);
  return enabled ? (
    <canvas className="embers" ref={ref} aria-hidden="true" />
  ) : null;
}
