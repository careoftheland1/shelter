import adobeUrl from "./assets/building-styles/adobe.jpeg";
import rammedEarthUrl from "./assets/building-styles/rammed-earth-wider.webp";
import lavacreteUrl from "./assets/building-styles/lavacrete-wider.webp";
import "./context-showcase.css";

const styles = [
  { name: "Adobe", image: adobeUrl, alt: "Adobe block shelter beneath flowering desert trees" },
  { name: "Rammed Earth", image: rammedEarthUrl, alt: "Layered earthen wall beneath tree shadows" },
  { name: "Lavacrete", image: lavacreteUrl, alt: "Dark Lavacrete shelter form among desert trees" },
];

export default function BuildingStyles() {
  return <section className="context-showcase building-styles" aria-labelledby="building-styles-title">
    <div className="context-showcase__inner">
      <h2 id="building-styles-title">BUILD IT WITH EARTH</h2>
      <div className="context-showcase__grid">
        {styles.map(style => <figure className="context-showcase__card" key={style.name}>
          <img src={style.image} alt={style.alt} loading="lazy" decoding="async" />
          <figcaption>{style.name}</figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}
