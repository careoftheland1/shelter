import drylandsUrl from "./assets/climates/drylands.jpeg";
import tropicsUrl from "./assets/climates/tropics.jpeg";
import northUrl from "./assets/climates/cold-country.jpeg";
import "./context-showcase.css";

const contexts = [
  { name: "Drylands", image: drylandsUrl, alt: "Earthen shelter surrounded by dry grassland" },
  { name: "Tropics", image: tropicsUrl, alt: "Earthen shelter in a lush, rain-soaked landscape" },
  { name: "North", image: northUrl, alt: "Earthen shelter among snow-covered trees" },
];

export default function ContextShowcase() {
  return <section className="context-showcase" aria-labelledby="context-showcase-title">
    <div className="context-showcase__inner">
      <h2 id="context-showcase-title">( IN ANY CONTEXT )</h2>
      <div className="context-showcase__grid">
        {contexts.map(context => <figure className="context-showcase__card" key={context.name}>
          <img src={context.image} alt={context.alt} loading="lazy" decoding="async" />
          <figcaption>{context.name}</figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}
