import { useEffect } from "react";

export default function useRealmEffects(enabled) {
  useEffect(() => {
    if (!enabled) return;
    const selectors =
      ".featured-art, .project-art-button, .case-cover, .architecture-node";
    let frame = 0,
      card = null,
      lastCard = null,
      pointer = null;
    const reset = (node) => {
      if (node) {
        node.style.removeProperty("--tilt-x");
        node.style.removeProperty("--tilt-y");
        node.style.removeProperty("--light-x");
        node.style.removeProperty("--light-y");
      }
    };
    const draw = () => {
      frame = 0;
      if (!card || !pointer) return;
      const r = card.getBoundingClientRect();
      const x = (pointer.x - r.left) / r.width,
        y = (pointer.y - r.top) / r.height;
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 9}deg`);
      card.style.setProperty("--light-x", `${x * 100}%`);
      card.style.setProperty("--light-y", `${y * 100}%`);
    };
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      card = event.target.closest(selectors);
      if (lastCard !== card) reset(lastCard);
      lastCard = card;
      pointer = { x: event.clientX, y: event.clientY };
      if (card && !frame) frame = requestAnimationFrame(draw);
    };
    const leave = () => {
      reset(lastCard);
      card = null;
      lastCard = null;
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-realm", entry.isIntersecting);
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        "main > section, .featured-build, .case-study > section",
      )
      .forEach((node) => observer.observe(node));
    let scrollFrame = 0;
    const scroll = () => {
      if (!scrollFrame)
        scrollFrame = requestAnimationFrame(() => {
          scrollFrame = 0;
          document.documentElement.style.setProperty(
            "--realm-depth",
            `${Math.min(window.scrollY * 0.12, 110)}px`,
          );
        });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      document.documentElement.style.removeProperty("--realm-depth");
      window.removeEventListener("scroll", scroll);
      leave();
      observer.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);
}
