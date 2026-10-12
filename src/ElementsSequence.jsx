import { useEffect, useRef } from "react";
import "./elements-sequence.css";

const MOVING_PARTICLES = 6500;
const TIME_PARTICLES = 32000;
const STAGES = [
  { start: 0.2, end: 0.46 },
  { start: 0.42, end: 0.75 },
  { start: 0.71, end: 0.91 },
];
const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (from, to, amount) => from + (to - from) * amount;

function seededRandom(seed) {
  let state = seed;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function makeParticles(count, seed) {
  const random = seededRandom(seed);
  return Array.from({ length: count }, () => {
    const y = random();
    return {
      x: random(),
      y,
      speed: 0.7 + random() * 0.65,
      alpha: 0.4 + random() * 0.6,
      settleY: 0.74 + random() * 0.23,
      targetX: random(),
      targetY: random(),
      scatter: random() - 0.5,
    };
  });
}

function prepareCanvas(canvas) {
  const context = canvas.getContext("2d");
  if (!context) return null;
  const width = Math.max(1, canvas.clientWidth);
  const height = Math.max(1, canvas.clientHeight);
  const ratio = Math.min(window.devicePixelRatio || 1, 1.7);
  const pixelWidth = Math.round(width * ratio);
  const pixelHeight = Math.round(height * ratio);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  return { context, width, height };
}

function drawWater(context, width, height, particles, progress, opacity = 1) {
  context.fillStyle = "#f5f3ee";
  const clear = ease((progress - 0.86) / 0.14);
  for (const particle of particles) {
    const fallingY = ((particle.y + progress * particle.speed * 1.55) % 1.35) - 0.16;
    const y = fallingY + clear * 1.25;
    context.globalAlpha = particle.alpha * 0.66 * opacity;
    context.fillRect(particle.x * width, y * height, 1.2, 8 * particle.speed);
  }
  context.globalAlpha = 1;
}

function drawEarth(context, width, height, particles, progress, opacity = 1) {
  context.fillStyle = "#f5f3ee";
  const clear = ease((progress - 0.86) / 0.14);
  for (const particle of particles) {
    const travelingX = ((particle.x + progress * particle.speed * 1.5) % 1.4) - 0.2;
    const travelingY = particle.y * 0.92 + 0.04 + Math.sin(particle.x * 15 + progress * 8) * 0.035;
    const x = travelingX + clear * 1.35;
    context.globalAlpha = particle.alpha * 0.62 * opacity;
    context.fillRect(x * width, travelingY * height, 9 * particle.speed, 1.2);
  }
  context.globalAlpha = 1;
}

function drawTime(context, width, height, particles, progress, opacity = 1) {
  const packed = ease((progress - 0.68) / 0.32);
  const fallingFront = 1 - ease((progress - 0.06) / 0.76);
  const mobile = width < 600;
  context.fillStyle = "#f5f3ee";

  for (let index = 0; index < particles.length; index++) {
    if (mobile && index % 3 !== 0) continue;
    const particle = particles[index];
    const depositAt = 0.16 + (1 - particle.targetY) * 0.72;
    const collected = ease((progress - depositAt) / 0.14);
    const fallingY = ((particle.y + progress * particle.speed * 1.8) % 1.5) - 0.5;
    const inStream = index % (mobile ? 9 : 3) === 0;
    const looseY = particle.targetY + particle.scatter * 0.12;
    const targetY = mix(looseY, particle.targetY, packed);
    const targetX = mix(particle.x, particle.targetX, collected);

    // Stream grains travel into their final positions as the fill rises.
    if (inStream && fallingY < fallingFront && collected < 1) {
      const x = mix(particle.x, targetX, collected);
      const y = mix(fallingY, targetY, collected);
      context.globalAlpha = particle.alpha * 0.72 * opacity;
      context.fillRect(x * width, y * height, mix(1.35, 1.9, collected), mix(5 * particle.speed, 1.9, collected));
    }

    if (collected > 0 && (!inStream || collected === 1 || fallingY >= fallingFront)) {
      const stratum = 0.66 + 0.3 * Math.sin(targetY * 44 + Math.sin(targetX * 12) * 0.9);
      context.globalAlpha = particle.alpha * stratum * collected * mix(0.78, 0.56, packed) * opacity;
      context.fillRect(targetX * width, targetY * height, 1.9, 1.9);
    }
  }
  context.globalAlpha = 1;
}

export default function ElementsSequence() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const canvas = canvasRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const particles = [
      makeParticles(MOVING_PARTICLES, 119),
      makeParticles(MOVING_PARTICLES, 761),
      makeParticles(TIME_PARTICLES, 2039),
    ];
    let frame = 0;

    const draw = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reducedMotion.matches ? 1 : clamp(-bounds.top / travel);
      const introOpacity = reducedMotion.matches ? 1 : 1 - ease((progress - 0.1) / 0.09);
      intro.style.opacity = String(introOpacity);
      intro.style.visibility = introOpacity < 0.01 ? "hidden" : "visible";
      STAGES.forEach(({ start }, index) => {
        titleRefs.current[index].style.opacity = String(reducedMotion.matches ? 1 : ease((progress - start) / 0.04));
      });

      const surface = prepareCanvas(canvas);
      if (!surface) return;
      const { context, width, height } = surface;
      const [water, earth, time] = STAGES;
      if (progress >= water.start && progress < earth.start) {
        const stageProgress = clamp((progress - water.start) / (water.end - water.start));
        canvas.style.opacity = String(ease((progress - water.start) / 0.025));
        drawWater(context, width, height, particles[0], stageProgress);
      } else if (progress >= earth.start && progress < water.end) {
        canvas.style.opacity = "1";
        const blend = ease((progress - earth.start) / (water.end - earth.start));
        drawWater(context, width, height, particles[0], (progress - water.start) / (water.end - water.start), 1 - blend);
        drawEarth(context, width, height, particles[1], (progress - earth.start) / (earth.end - earth.start), blend);
      } else if (progress >= earth.start && progress < time.start) {
        canvas.style.opacity = "1";
        drawEarth(context, width, height, particles[1], (progress - earth.start) / (earth.end - earth.start));
      } else if (progress >= time.start) {
        canvas.style.opacity = "1";
        const blend = ease((progress - time.start) / (earth.end - time.start));
        if (progress < earth.end) drawEarth(context, width, height, particles[1], (progress - earth.start) / (earth.end - earth.start), 1 - blend);
        drawTime(context, width, height, particles[2], clamp((progress - time.start) / (time.end - time.start)), blend);
      } else {
        canvas.style.opacity = "0";
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return <section className="elemental-scroll" ref={sectionRef} aria-label="Water, earth and time">
    <div className="elemental-scroll__viewport">
      <canvas className="elemental-scroll__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="elemental-scroll__intro" ref={introRef}>
        <h1><span>UNDERSTAND HOW SIMPLE SHELTER CAN BE.</span><span>IT'S JUST WATER, EARTH, AND TIME.</span></h1>
      </div>
      <div className="elemental-scroll__titles" aria-label="Water, Earth, Time">
        {["Water", "Earth", "Time"].map((title, index) => <h3 key={title} ref={element => { titleRefs.current[index] = element; }}>{title}</h3>)}
      </div>
    </div>
  </section>;
}
