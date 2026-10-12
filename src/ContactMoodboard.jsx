import bedUrl from "./assets/contact-moodboard/bed.jpg";
import lightUrl from "./assets/contact-moodboard/light.jpg";
import curtainUrl from "./assets/contact-moodboard/curtain.jpg";
import wallUrl from "./assets/contact-moodboard/wall.jpg";
import texturesUrl from "./assets/contact-moodboard/TEXTURES.jpg";
import duskUrl from "./assets/contact-moodboard/_.jpeg";
import bagHookUrl from "./assets/contact-moodboard/BAG-HOOK.jpg";
import cedarFloorsUrl from "./assets/contact-moodboard/CEDAR-FLOORS.jpg";
import cornerUrl from "./assets/contact-moodboard/CORNER.jpg";
import dinnerUrl from "./assets/contact-moodboard/DINNER.jpg";
import okraUrl from "./assets/contact-moodboard/OKRA.jpg";
import stovesUrl from "./assets/contact-moodboard/STOVES.jpg";
import tableUrl from "./assets/contact-moodboard/TABLE.jpg";
import warmthUrl from "./assets/contact-moodboard/WARMTH.jpg";
import "./contact-moodboard.css";

// The first and last sets match, so the different middle set can drift by
// without a visible jump when the animation loops.
const gallerySets = [
  [bedUrl, bagHookUrl, dinnerUrl, curtainUrl, cornerUrl, wallUrl, warmthUrl],
  [lightUrl, cedarFloorsUrl, okraUrl, texturesUrl, stovesUrl, duskUrl, tableUrl],
];

export default function ContactMoodboard() {
  return <section className="contact-moodboard" id="contact">
    <div className="contact-moodboard__stage">
      <div className="contact-moodboard__images" role="img" aria-label="A repeating field of photographs showing earthen shelter details">
        {[0, 1, 0].map((set, setIndex) => <div className="contact-moodboard__set" key={setIndex}>
          {gallerySets[set].map((photo, index) => <img
            key={`${setIndex}-${index}`}
            className="contact-moodboard__tile"
            src={photo}
            alt=""
            loading="eager"
            decoding="async"
          />)}
        </div>)}
      </div>
      <h2 className="contact-moodboard__title">start with a shelter</h2>
      <div className="contact-actions contact-moodboard__actions">
        <a href="#shelters">Select a plan set <span>↗</span></a>
        <a href="/project/?source=home">Tell us about your land <span>↗</span></a>
      </div>
    </div>
  </section>;
}
