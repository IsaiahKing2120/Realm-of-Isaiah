import { useEffect, useRef, useState } from "react";
import { projects } from "../data/portfolio";
import { featuredIds, caseStudyPath } from "../data/caseStudies";

export default function RealmCore({ enabled }) {
  const host = useRef(null),
    canvas = useRef(null),
    target = useRef({ x: 0, y: 0 });
  const [selected, setSelected] = useState("monday");
  const mode = useRef(0);
  useEffect(() => {
    mode.current = featuredIds.indexOf(selected);
  }, [selected]);
  const [rendered, setRendered] = useState(false);
  const [paused, setPaused] = useState(false);
  const project = projects.find((item) => item.id === selected);
  useEffect(() => {
    if (!enabled || paused) {
      setRendered(false);
      return;
    }
    let disposed = false,
      renderer,
      frame = 0,
      visible = false,
      last = 0,
      time = 0;
    let x = 0,
      y = 0,
      tone = 0,
      loading = false,
      hasDrawn = false;
    const tick = (now) => {
      frame = 0;
      if (disposed || !visible || document.hidden || !renderer) return;
      if (now - last >= 32) {
        time += Math.min((now - last) / 1000, 0.05);
        last = now;
        x += (target.current.x - x) * 0.06;
        y += (target.current.y - y) * 0.06;
        tone += (mode.current - tone) * 0.08;
        renderer.draw(time, x, y, Math.min(window.scrollY / 700, 1), tone);
        if (!hasDrawn) {
          hasDrawn = true;
          setRendered(true);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (visible && !document.hidden && renderer) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const observer = new IntersectionObserver(
      async (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !renderer && !disposed && !loading) {
          loading = true;
          try {
            const { createCoreRenderer } = await import("../lib/coreRenderer");
            if (disposed) return;
            renderer = createCoreRenderer(canvas.current);
          } catch {
            setRendered(false);
          }
        }
        sync();
      },
      { threshold: 0.05 },
    );
    const lost = (event) => {
      event.preventDefault();
      setRendered(false);
      cancelAnimationFrame(frame);
      renderer = undefined;
    };
    const node = canvas.current;
    node.addEventListener("webglcontextlost", lost);
    observer.observe(host.current);
    document.addEventListener("visibilitychange", sync);
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", sync);
      node.removeEventListener("webglcontextlost", lost);
      renderer?.dispose();
    };
  }, [enabled, paused]);
  return (
    <aside
      className="realm-core"
      ref={host}
      aria-label="Interactive Realm artifact"
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const r = event.currentTarget.getBoundingClientRect();
        target.current = {
          x: ((event.clientX - r.left) / r.width) * 2 - 1,
          y: ((event.clientY - r.top) / r.height) * 2 - 1,
        };
      }}
      onPointerLeave={() => {
        target.current = { x: 0, y: 0 };
      }}
    >
      <div className="core-topline">
        <span>REALM ENGINE / 01</span>
        <span>{rendered ? "SPATIAL VIEW" : "STILL VIEW"}</span>
      </div>
      <div className={`core-viewport ${rendered ? "is-rendered" : ""}`}>
        <div className="core-fallback" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>IK</span>
        </div>
        <canvas ref={canvas} aria-hidden="true" />
        <span className="core-axis axis-left" aria-hidden="true">
          SYSTEMS
          <br />↓<br />
          SOFTWARE
        </span>
        <span className="core-axis axis-right" aria-hidden="true">
          BUILD
          <br />↕<br />
          EXPLORE
        </span>
      </div>
      <div
        className="core-controls"
        role="group"
        aria-label="Tune the Realm core"
      >
        {featuredIds.map((id, index) => (
          <button
            key={id}
            aria-pressed={id === selected}
            onClick={() => setSelected(id)}
          >
            0{index + 1} /{" "}
            {id === "toolkit" ? "KTD" : id === "tcg" ? "TCG" : "MONDAY"}
          </button>
        ))}
        <button
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label="Use still view of Realm core"
        >
          {paused ? "Resume" : "Still"}
        </button>
      </div>
      <div className="core-readout" aria-live="polite">
        <span>{project.tags.join(" / ")}</span>
        <a href={caseStudyPath(selected)}>
          Inspect {project.title} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  );
}
