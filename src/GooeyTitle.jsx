import { useEffect, useId, useRef, useState } from "react";

export default function GooeyTitle() {
  const filterId = useId().replaceAll(":", "");
  const svgRef = useRef(null);
  const groupRef = useRef(null);
  const blurRef = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const animationRef = useRef(null);
  const progressRef = useRef(0);
  const [titleWidth, setTitleWidth] = useState(810);

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    const blur = blurRef.current;
    const first = firstRef.current;
    const second = secondRef.current;
    let target = 0;
    let previousTime = 0;
    let mounted = true;

    const sizeTitle = () => {
      if (!mounted) return;
      const width = Math.ceil(Math.max(first.getComputedTextLength(), second.getComputedTextLength()) + 22);
      svg.setAttribute("viewBox", `0 0 ${width} 144`);
      setTitleWidth(width);
    };

    const draw = (progress) => {
      progressRef.current = progress;
      first.style.opacity = String(1 - progress);
      second.style.opacity = String(progress);
      const blurAmount = Math.sin(Math.PI * progress) * 7;
      blur.setAttribute("stdDeviation", blurAmount.toFixed(2));
      group.style.filter = blurAmount > 0.05 ? `url(#${filterId})` : "none";
    };

    const tick = (time) => {
      if (!previousTime) previousTime = time;
      const step = Math.min((time - previousTime) / 1400, 0.08);
      previousTime = time;
      const next = target > progressRef.current
        ? Math.min(target, progressRef.current + step)
        : Math.max(target, progressRef.current - step);
      draw(next);
      if (next !== target) animationRef.current = requestAnimationFrame(tick);
      else animationRef.current = null;
    };

    const start = (showShelter) => {
      target = showShelter ? 1 : 0;
      cancelAnimationFrame(animationRef.current);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        draw(target);
        return;
      }
      previousTime = 0;
      animationRef.current = requestAnimationFrame(tick);
    };

    const enter = () => start(true);
    const leave = () => start(false);
    const touch = (event) => {
      if (event.pointerType === "touch") start(progressRef.current < 0.5);
    };

    sizeTitle();
    document.fonts.ready.then(sizeTitle);
    svg.addEventListener("mouseenter", enter);
    svg.addEventListener("mouseleave", leave);
    svg.addEventListener("focus", enter);
    svg.addEventListener("blur", leave);
    svg.addEventListener("pointerdown", touch);
    return () => {
      mounted = false;
      cancelAnimationFrame(animationRef.current);
      svg.removeEventListener("mouseenter", enter);
      svg.removeEventListener("mouseleave", leave);
      svg.removeEventListener("focus", enter);
      svg.removeEventListener("blur", leave);
      svg.removeEventListener("pointerdown", touch);
    };
  }, [filterId]);

  return <svg ref={svgRef} className="gooey-title" viewBox="0 0 810 144" style={{ width: `${titleWidth / 132}em` }} tabIndex="0" role="img" aria-label="Be a builder. Hover or focus to reveal shelter now.">
    <defs>
      <filter id={filterId} x="-10%" y="-40%" width="120%" height="180%">
        <feGaussianBlur ref={blurRef} in="SourceGraphic" stdDeviation="0" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -8" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
    <g ref={groupRef} className="gooey-title__words">
      <text ref={firstRef} x="7" y="112">BE A BUILDER</text>
      <text ref={secondRef} x="7" y="112" style={{ opacity: 0 }}>SHELTER NOW</text>
    </g>
  </svg>;
}
