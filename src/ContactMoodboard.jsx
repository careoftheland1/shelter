import { useEffect, useRef } from "react";
import formsUrl from "./assets/contact-moodboard/forms.jpg";
import curtainUrl from "./assets/contact-moodboard/curtain.jpg";
import wallUrl from "./assets/contact-moodboard/wall.jpg";
import noonUrl from "./assets/contact-moodboard/noon.jpg";
import exteriorUrl from "./assets/contact-moodboard/exterior.jpg";
import "./contact-moodboard.css";

const photographs = [formsUrl, curtainUrl, wallUrl, noonUrl, exteriorUrl];

const clamp = (value) => Math.max(0, Math.min(1, value));
const smoothstep = (start, end, value) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

export default function ContactMoodboard() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const tileRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const scrollRegion = section.parentElement;
    const scrollSpace = scrollRegion.querySelector(".home-finale__scroll-space");
    const tiles = tileRefs.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const width = stage.clientWidth;
      const distance = Math.max(1, scrollSpace.offsetHeight);
      const progress = reducedMotion.matches ? 1 : clamp(-scrollRegion.getBoundingClientRect().top / (distance * 0.8));
      const mobile = width <= 760;
      const title = mobile
        ? smoothstep(0.77, 0.95, progress)
        : smoothstep(0.64, 0.94, progress);

      stage.style.setProperty("--moodboard-title-opacity", title.toFixed(3));

      if (mobile) {
        const pairProgress = Math.min(photographs.length - 2, clamp(progress / 0.68) * (photographs.length - 2));
        const pairIndex = Math.min(photographs.length - 2, Math.floor(pairProgress));
        const transition = pairProgress - pairIndex;
        const gather = smoothstep(0.69, 0.87, progress);
        const fade = smoothstep(0.72, 0.86, progress);
        const stride = width * 0.45;
        const finalWidth = width * 0.55;

        tiles.forEach((tile, index) => {
          // One photo hands its place to the next while the shared photo crosses
          // the frame; no more than two portraits are visible at once.
          let opacity = 0;
          if (index === pairIndex) opacity = 1 - smoothstep(0, 0.5, transition);
          if (index === pairIndex + 1) opacity = 1;
          if (index === pairIndex + 2) opacity = smoothstep(0.5, 1, transition);

          const startX = (index - pairProgress - 0.5) * stride;
          const x = startX * (1 - gather);
          const scale = 1 + (finalWidth / tile.offsetWidth - 1) * gather;
          tile.style.transform = `translate(-50%, -50%) translateX(${x.toFixed(1)}px) scale(${scale.toFixed(3)})`;
          tile.style.opacity = String(index === photographs.length - 1 ? opacity : opacity * (1 - fade));
        });
        return;
      }

      const gather = smoothstep(0.05, 0.84, progress);
      const fade = smoothstep(0.28, 0.76, progress);
      const stride = width * 0.18;
      const finalWidth = Math.min(width * 0.21, 250);
      tiles.forEach((tile, index) => {
        const startX = (index - (photographs.length - 1) / 2) * stride;
        const x = startX * (1 - gather) + index * gather;
        const scale = 1 + (finalWidth / tile.offsetWidth - 1) * gather;
        tile.style.transform = `translate(-50%, -50%) translateX(${x.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        tile.style.opacity = index === photographs.length - 1 ? "1" : String(1 - fade);
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return <section className="contact-moodboard" id="contact" ref={sectionRef}>
    <div className="contact-moodboard__stage" ref={stageRef}>
      <p className="kicker contact-moodboard__kicker">YOUR LAND. YOUR HANDS. A PLACE TO BEGIN.</p>
      <div className="contact-moodboard__images" role="img" aria-label="Five portrait photographs of earthen shelter details resolve into one exterior image">
        {photographs.map((photo, index) => <img
          key={index}
          ref={(element) => { tileRefs.current[index] = element; }}
          className="contact-moodboard__tile"
          src={photo}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ zIndex: index + 1 }}
        />)}
      </div>
      <h2 className="contact-moodboard__title">start with a shelter</h2>
      <div className="contact-actions contact-moodboard__actions">
        <a href="#shelters">Select a plan set <span>↗</span></a>
        <a href="/project/?source=home">Tell us about your land <span>↗</span></a>
      </div>
    </div>
  </section>;
}
