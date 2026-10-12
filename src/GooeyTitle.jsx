import { useEffect, useId, useRef, useState } from "react";

export default function GooeyTitle() {
  const filterId = useId().replaceAll(":", "");
  const svgRef = useRef(null);
  const groupRef = useRef(null);
  const blurRef = useRef(null);
  const mobileTitleRef = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const animationRef = useRef(null);
  const progressRef = useRef(0);
  const [titleWidth, setTitleWidth] = useState(810);
  const [mobileBuilder, setMobileBuilder] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    const group = groupRef.current;
    const blur = blurRef.current;
    const mobileTitle = mobileTitleRef.current;
    const first = firstRef.current;
    const second = secondRef.current;
    let target = 0;
    let previousTime = 0;
    let mounted = true;

    const sizeTitle = () => {
      if (!mounted) return;
      const width = Math.ceil(Math.max(first.getBBox().width, second.getBBox().width) + 22);
      svg.setAttribute("viewBox", `0 0 ${width} 260`);
      setTitleWidth(width);
    };

    const draw = (progress) => {
      const previousProgress = progressRef.current;
      progressRef.current = progress;
      if (previousProgress < 0.5 && progress >= 0.5) setMobileBuilder(true);
      if (previousProgress > 0.5 && progress <= 0.5) setMobileBuilder(false);
      first.style.opacity = String(1 - progress);
      second.style.opacity = String(progress);
      const blurAmount = Math.sin(Math.PI * progress) * 7;
      blur.setAttribute("stdDeviation", blurAmount.toFixed(2));
      const filter = blurAmount > 0.05 ? `url(#${filterId})` : "none";
      group.style.filter = filter;
      mobileTitle.style.filter = filter;
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
    const mobileTouch = (event) => {
      if (event.pointerType === "touch") start(progressRef.current < 0.5);
    };

    sizeTitle();
    document.fonts.ready.then(sizeTitle);
    svg.addEventListener("mouseenter", enter);
    svg.addEventListener("mouseleave", leave);
    svg.addEventListener("focus", enter);
    svg.addEventListener("blur", leave);
    svg.addEventListener("pointerdown", touch);
    mobileTitle.addEventListener("pointerdown", mobileTouch);
    return () => {
      mounted = false;
      cancelAnimationFrame(animationRef.current);
      svg.removeEventListener("mouseenter", enter);
      svg.removeEventListener("mouseleave", leave);
      svg.removeEventListener("focus", enter);
      svg.removeEventListener("blur", leave);
      svg.removeEventListener("pointerdown", touch);
      mobileTitle.removeEventListener("pointerdown", mobileTouch);
    };
  }, [filterId]);

  return <>
  <svg ref={svgRef} className="gooey-title" viewBox="0 0 810 260" style={{ width: `${titleWidth / 132}em` }} tabIndex="0" role="img" aria-label="Be a builder. Hover or focus to reveal build your own shelter today.">
    <defs>
      <filter id={filterId} x="-10%" y="-40%" width="120%" height="180%">
        <feGaussianBlur ref={blurRef} in="SourceGraphic" stdDeviation="0" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -8" result="goo" />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
    <g ref={groupRef} className="gooey-title__words">
      <text ref={firstRef} x="7" y="94"><tspan x="7">BE A</tspan><tspan x="7" dy="104">BUILDER</tspan></text>
      <text ref={secondRef} x="7" y="94" style={{ opacity: 0 }}><tspan x="7">BUILD YOUR OWN</tspan><tspan x="7" dy="104">SHELTER TODAY</tspan></text>
    </g>
  </svg>
  <span className="gooey-title__mobile" ref={mobileTitleRef}>{mobileBuilder ? "BUILD YOUR OWN SHELTER TODAY" : "BE A BUILDER"}</span>
  </>;
}
