import { useEffect, useRef } from "react";
import formsUrl from "./assets/contact-moodboard/forms.jpg";
import exteriorUrl from "./assets/contact-moodboard/exterior.jpg";
import noonUrl from "./assets/contact-moodboard/noon.jpg";
import "./principle-cards.css";

const principles = [
  {
    name: "Local",
    copy: "Build with what is close at hand. Soil, stone, and other regional materials can shape a shelter around the place it belongs.",
    image: formsUrl,
    imageAlt: "Construction form and rammed-earth material seen from above",
  },
  {
    name: "Lasting",
    copy: "When you understand how your shelter is built, you can inspect it, maintain it, and make repairs over time. The building stays legible to the people who live with it.",
    image: exteriorUrl,
    imageAlt: "A ladder beside an earthen volume and its dark doorway",
  },
  {
    name: "Comfort",
    copy: "Earthen walls add thermal mass: they absorb and slowly release heat, helping moderate temperature swings when paired with thoughtful shade, openings, and ventilation.",
    image: noonUrl,
    imageAlt: "Sunlight falling between thick earthen walls",
  },
];

export default function PrincipleCards() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) return;
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -section.getBoundingClientRect().top / travel));
      track.style.transform = `translate3d(${-progress * 200}vw, 0, 0)`;
      const active = Math.min(2, Math.round(progress * 2));
      dotsRef.current.forEach((dot, index) => dot?.classList.toggle("is-active", index === active));
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

  return <section className="principle-scroll" ref={sectionRef} aria-label="Three principles for building a shelter">
    <div className="principle-scroll__viewport">
      <div className="principle-scroll__track" ref={trackRef}>
        {principles.map((item) => <article className="principle-card" key={item.name}>
          <figure className="principle-card__art">
            <img src={item.image} alt={item.imageAlt} loading="eager" decoding="async"/>
          </figure>
          <div className="principle-card__copy">
            <h2>{item.name}</h2>
            <p className="principle-card__description">{item.copy}</p>
          </div>
        </article>)}
      </div>
      <div className="principle-scroll__progress" aria-hidden="true">
        {principles.map((item, index) => <i key={item.name} className={index === 0 ? "is-active" : ""} ref={element => { dotsRef.current[index] = element; }} />)}
      </div>
      <span className="principle-scroll__hint" aria-hidden="true">Scroll to continue <b>↓</b></span>
    </div>
  </section>;
}
