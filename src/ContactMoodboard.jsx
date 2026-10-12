import bedUrl from "./assets/contact-moodboard/bed.jpg";
import lightUrl from "./assets/contact-moodboard/light.jpg";
import curtainUrl from "./assets/contact-moodboard/curtain-new.png";
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
import GuidedMoodboardField from "./GuidedMoodboardField.jsx";
import "./contact-moodboard.css";

// The first and last sets match, so the different middle set can drift by
// without a visible jump when the animation loops.
const gallerySets = [
  [bedUrl, bagHookUrl, dinnerUrl, curtainUrl, cornerUrl, wallUrl, warmthUrl],
  [lightUrl, cedarFloorsUrl, okraUrl, texturesUrl, stovesUrl, duskUrl, tableUrl],
];

const homeActions = [
  { href: "/#shelter-cards", label: "Select a plan set" },
  { href: "/project/?source=home", label: "Tell us about your land" },
];

export default function ContactMoodboard({
  variant = "home",
  title = "start with a shelter",
  kicker,
  description,
  actions = homeActions,
  photos = gallerySets,
  galleryLabel = "A repeating field of photographs showing earthen shelter details",
  headingLevel = 2,
}) {
  const Title = headingLevel === 1 ? "h1" : "h2";
  const offeringTop = variant === "guided-top" || variant === "supported-top";
  return <section className={`contact-moodboard contact-moodboard--${variant}${offeringTop ? " contact-moodboard--offering-top" : ""}`} id="contact">
    <div className="contact-moodboard__stage">
      {offeringTop
        ? <div className="contact-moodboard__guided-images" role="img" aria-label={galleryLabel}><GuidedMoodboardField volumeOnly={variant === "supported-top"}/></div>
        : <div className="contact-moodboard__images" role="img" aria-label={galleryLabel}>
            {[0, 1, 0].map((set, setIndex) => <div className="contact-moodboard__set" key={setIndex}>
              {photos[set].map((photo, index) => <img
                key={`${setIndex}-${index}`}
                className="contact-moodboard__tile"
                src={photo}
                alt=""
                loading="eager"
                decoding="async"
              />)}
            </div>)}
          </div>}
      {kicker && <p className="kicker contact-moodboard__kicker">{kicker}</p>}
      <Title className="contact-moodboard__title">{title}</Title>
      {description && <p className="contact-moodboard__description">{description}</p>}
      <div className="contact-actions contact-moodboard__actions">
        {actions.map(({ href, label }) => <a href={href} key={href}>{label} <span>↗</span></a>)}
      </div>
    </div>
  </section>;
}
