import { useEffect, useRef } from "react";
import "./shelter-language-sequence.css";

// The first four courtyard layouts come from the supplied motion study.
// The next three add a room each; the last rearranges all six.
// Each room is [center x, center y, rotation].
const configurations = [
  [[184, 76, 0], [120, 124, 0], [184, 184, 45]],
  [[111, 118, 0], [246, 118, 0], [180, 210, 0]],
  [[122, 61, 0], [122, 202, 0], [243, 133, 0]],
  [[123, 91, 0], [243, 89, 0], [185, 205, 45]],
  [[123, 91, 0], [243, 89, 0], [185, 205, 45], [77, 196, 0]],
  [[123, 91, 0], [243, 89, 0], [185, 205, 45], [77, 196, 0], [285, 190, 0]],
  [[123, 91, 0], [243, 89, 0], [185, 205, 45], [77, 196, 0], [285, 190, 0], [183, 38, 45]],
  [[118, 62, 45], [238, 72, 0], [229, 216, 0], [106, 218, -15], [296, 137, 0], [64, 142, 45]],
];

const volumeSizes = [[50, 50], [50, 50], [76, 76], [44, 56], [56, 36], [42, 42]];
const firstPositions = volumeSizes.map((_, index) => configurations.find((layout) => layout[index])?.[index]);
const seed = [[175, 137.5, 0], [175, 137.5, 0], [175, 137.5, 0]];
const longhouseStates = [
  { bounds: [16, 39, 59, 80], partials: { 1: ["top", .5, .52, "left"], 3: ["bottom", .5, .48, "right"] } },
  { bounds: [11, 34, 68, 84], partials: {} },
  { bounds: [18, 46, 56, 78], partials: { 3: ["top", .5, .38, "left"] } },
  { bounds: [14, 28, 52, 86], partials: {} },
  { bounds: [20, 41, 63, 82], partials: { 2: ["bottom", .5, .5, "right"] } },
  { bounds: [13, 44, 61, 79], partials: {} },
  { bounds: [17, 32, 71, 87], partials: { 1: ["bottom", .5, .42, "left"] } },
  { bounds: [12, 37, 58, 83], partials: {} },
];
const lineBlocks = [
  [209, 47.5, 174.8, 95],
  [528.2, 95, 159.6, 190],
  [372.4, 95, 152, 190],
  [209, 142.5, 174.8, 95],
  [684, 95, 152, 190],
  [60.8, 95, 121.6, 190],
];
const clamp = (value) => Math.max(0, Math.min(1, value));
const smoothstep = (start, end, value) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a + (b - a) * t;
const shortAngle = (a, b) => a + ((b - a + 540) % 360 - 180);
const ease = (value) => .5 - .5 * Math.cos(Math.PI * value);

function roomPosition(from, to, progress) {
  return [
    mix(from[0], to[0], progress),
    mix(from[1], to[1], progress),
    mix(from[2], shortAngle(from[2], to[2]), progress),
  ];
}

function partialBetween(from, to, progress) {
  if (!from && !to) return null;
  if (!from) return [to[0], to[1] * ease(progress), to[2], to[3]];
  if (!to) return [from[0], from[1] * (1 - ease(progress)), from[2], from[3]];
  let anchor;
  let depth;
  if (from[0] === to[0]) {
    anchor = from[0];
    depth = mix(from[1], to[1], ease(progress));
  } else if (progress < .5) {
    anchor = from[0];
    depth = from[1] * (1 - ease(progress * 2));
  } else {
    anchor = to[0];
    depth = to[1] * ease((progress - .5) * 2);
  }
  return [anchor, depth, mix(from[2], to[2], ease(progress)), progress < .5 ? from[3] : to[3]];
}

function longhousePath(from, to, progress) {
  const bounds = from.bounds.map((value, index) => mix(value, to.bounds[index], ease(progress)));
  const columns = [0, ...bounds, 100];
  let path = "M0 0H760V190H0Z";
  bounds.forEach((value) => { path += `M${value * 7.6} 0V190`; });
  for (const column of [1, 2, 3]) {
    const partial = partialBetween(from.partials[column], to.partials[column], progress);
    if (!partial || partial[1] <= .01) continue;
    const [anchor, depth, ratio, side] = partial;
    const start = columns[column] * 7.6;
    const end = columns[column + 1] * 7.6;
    const split = mix(start, end, ratio);
    const y = anchor === "top" ? depth * 190 : (1 - depth) * 190;
    path += `M${side === "left" ? start : split} ${y}H${side === "left" ? split : end}`;
    path += `M${split} ${anchor === "top" ? 0 : y}V${anchor === "top" ? y : 190}`;
  }
  return path;
}

export default function ShelterLanguageSequence() {
  const sectionRef = useRef(null);
  const roomsRef = useRef([]);
  const introRef = useRef(null);
  const figureRef = useRef(null);
  const svgRef = useRef(null);
  const housePathRef = useRef(null);
  const seedLabelsRef = useRef(null);
  const seedCopyRef = useRef(null);
  const courtLabelRef = useRef(null);
  const courtCopyRef = useRef(null);
  const longhouseLabelRef = useRef(null);
  const longhouseCopyRef = useRef(null);
  const summaryRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-section.getBoundingClientRect().top / scrollRange);
      const beat = progress * 18;
      const gathering = smoothstep(2, 3, beat);
      const courtStep = clamp((beat - 3) / 6) * (configurations.length - 1);
      const fromIndex = Math.min(configurations.length - 1, Math.floor(courtStep));
      const toIndex = Math.min(configurations.length - 1, fromIndex + 1);
      const fraction = courtStep - fromIndex;
      const between = reducedMotion.matches ? (fraction < 0.5 ? 0 : 1) : smoothstep(0.12, 0.88, fraction);
      const lineGathering = smoothstep(9, 10, beat);
      const squareReturn = smoothstep(16, 17, beat);
      const expansion = beat < 9 ? 0 : beat < 10 ? lineGathering : 1;
      const baseWidth = window.innerWidth <= 760 ? window.innerWidth - 36 : Math.min(window.innerWidth * .56, 620);
      const baseHeight = Math.min(baseWidth * 275 / 350, window.innerHeight * (window.innerWidth <= 760 ? .48 : .57));
      const lineWidth = 4 * 76 * Math.min(baseWidth / 350, baseHeight / 275);
      section.style.setProperty("--longhouse-half-width", `${lineWidth / 2}px`);
      figureRef.current.style.width = `${mix(baseWidth, lineWidth, expansion)}px`;
      figureRef.current.style.height = `${mix(baseHeight, lineWidth / 4, expansion)}px`;
      figureRef.current.style.maxHeight = "none";
      svgRef.current.setAttribute("viewBox", `0 0 ${mix(350, 760, expansion)} ${mix(275, 190, expansion)}`);

      const houseStep = clamp((beat - 10) / 6) * (longhouseStates.length - 1);
      const houseFrom = Math.min(longhouseStates.length - 1, Math.floor(houseStep));
      const houseTo = Math.min(longhouseStates.length - 1, houseFrom + 1);
      const houseFraction = houseStep - houseFrom;
      const houseBetween = reducedMotion.matches ? (houseFraction < .5 ? 0 : 1) : smoothstep(.12, .88, houseFraction);
      housePathRef.current.setAttribute("d", longhousePath(longhouseStates[houseFrom], longhouseStates[houseTo], houseBetween));
      const lineHandoff = smoothstep(9.9, 10.3, beat);
      const squareHandoff = smoothstep(16, 16.25, beat);
      housePathRef.current.style.opacity = String(beat < 16 ? lineHandoff : 1 - squareHandoff);

      roomsRef.current.forEach((rect, index) => {
        let position;
        let opacity = 1;
        let scale = 1;
        let width = volumeSizes[index][0];
        let height = volumeSizes[index][1];

        if (beat < 3) {
          position = index < seed.length
            ? roomPosition(seed[index], configurations[0][index], beat < 2 ? 0 : reducedMotion.matches ? (gathering < 0.5 ? 0 : 1) : gathering)
            : firstPositions[index];
          opacity = index < 2 ? gathering : index === 2 ? 1 : 0;
        } else if (beat < 9) {
          const from = configurations[fromIndex][index];
          const to = configurations[toIndex][index];
          position = roomPosition(from ?? to ?? firstPositions[index], to ?? from ?? firstPositions[index], between);
          if (!from) {
            opacity = to ? between : 0;
            scale = .7 + .3 * opacity;
          }
        } else if (beat < 16) {
          const [x, y, lineWidth, lineHeight] = lineBlocks[index];
          position = roomPosition(configurations.at(-1)[index], [x, y, 0], lineGathering);
          width = mix(width, lineWidth, lineGathering);
          height = mix(height, lineHeight, lineGathering);
          opacity = 1 - lineHandoff;
        } else {
          const [x, y, lineWidth, lineHeight] = lineBlocks[index];
          position = roomPosition([x, y, 0], [380, 95, 0], squareReturn);
          width = mix(lineWidth, 190, squareReturn);
          height = mix(lineHeight, 190, squareReturn);
          opacity = squareHandoff * (index === 2 ? 1 : 1 - smoothstep(16.1, 16.6, beat));
        }

        const [x, y, angle] = position;
        rect.setAttribute("x", String(-width / 2));
        rect.setAttribute("y", String(-height / 2));
        rect.setAttribute("width", String(width));
        rect.setAttribute("height", String(height));
        rect.setAttribute("transform", `translate(${x.toFixed(3)} ${y.toFixed(3)}) rotate(${angle.toFixed(3)}) scale(${scale.toFixed(3)})`);
        rect.style.opacity = String(opacity);
      });

      introRef.current.style.opacity = String(1 - smoothstep(0.55, 1.1, beat));
      figureRef.current.style.opacity = String(smoothstep(0.7, 1.25, beat));
      const seedOpacity = smoothstep(1.15, 1.5, beat) * (1 - smoothstep(2.1, 2.55, beat));
      seedLabelsRef.current.style.opacity = String(seedOpacity);
      seedCopyRef.current.style.opacity = String(seedOpacity);
      const courtOpacity = smoothstep(2.35, 2.75, beat) * (1 - smoothstep(9.05, 9.5, beat));
      courtLabelRef.current.style.opacity = String(courtOpacity * (1 - smoothstep(8.2, 8.7, beat)));
      courtCopyRef.current.style.opacity = String(courtOpacity);
      const longhouseOpacity = smoothstep(9.65, 10.15, beat) * (1 - smoothstep(16.1, 16.6, beat));
      longhouseLabelRef.current.style.opacity = String(longhouseOpacity);
      longhouseCopyRef.current.style.opacity = String(longhouseOpacity);
      summaryRef.current.style.opacity = String(smoothstep(17.15, 17.7, beat));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return <section className="shelter-language-sequence" ref={sectionRef} aria-label="From one room to courtyard and longhouse arrangements">
    <div className="shelter-language-stage">
      <a className="shelter-language-skip" href="#shelter-cards" aria-label="Skip the animation and go to shelter plans">( SKIP AHEAD )</a>
      <h2 className="shelter-language-intro" ref={introRef}>START WITH FOUR WALLS</h2>
      <figure className="shelter-language-figure" ref={figureRef}>
        <svg ref={svgRef} viewBox="0 0 350 275" role="img" aria-label="A square room gathers into courtyard layouts, the rooms fall into a longhouse line, then return to one square">
          {volumeSizes.map(([width, height], index) => <rect
            key={index}
            ref={(element) => { roomsRef.current[index] = element; }}
            x={-width / 2}
            y={-height / 2}
            width={width}
            height={height}
          />)}
          <path className="shelter-language-house-path" ref={housePathRef}/>
        </svg>
      </figure>
      <div className="shelter-language-seed-labels" ref={seedLabelsRef}>
        <span>Four Walls</span>
        <span>The Seed</span>
      </div>
      <div className="shelter-language-court-label" ref={courtLabelRef}>Gather Them</div>
      <div className="shelter-language-copy shelter-language-copy--seed" ref={seedCopyRef}>
        <p>An independent room. Simple, scalable.</p>
      </div>
      <div className="shelter-language-copy shelter-language-copy--court" ref={courtCopyRef}>
        <span>( COURTYARDS )</span>
        <p>Combine rooms to create sheltered courtyards.</p>
      </div>
      <div className="shelter-language-longhouse-label" ref={longhouseLabelRef}>Repeat Them</div>
      <div className="shelter-language-copy shelter-language-copy--longhouse" ref={longhouseCopyRef}>
        <span>( LONGHOUSES )</span>
        <p>A flexible line of rooms creates enclosure.</p>
      </div>
      <p className="shelter-language-summary" ref={summaryRef}>Start small. See where it takes you.</p>
    </div>
  </section>;
}
