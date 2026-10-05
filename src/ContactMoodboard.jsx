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
      const gather = smoothstep(0.05, 0.84, progress);
      const fade = smoothstep(0.28, 0.76, progress);
      const title = smoothstep(0.64, 0.94, progress);
      const mobile = width < 700;
      const stride = width * (mobile ? 0.19 : 0.18);
      const finalWidth = mobile ? width * 0.45 : Math.min(width * 0.21, 250);

      stage.style.setProperty("--moodboard-title-opacity", title.toFixed(3));
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
      <div className="contact-moodboard__images" role="img" aria-label="Five portrait photographs of earthen shelter details merge into one image">
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
