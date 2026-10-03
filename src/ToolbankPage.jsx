import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";
import hero from "./assets/shelter-updates/four-walls-hero.webp";
import mixer from "./assets/toolbank/mixer.webp";
import miniLoader from "./assets/toolbank/mini-loader.webp";
import conveyor from "./assets/toolbank/conveyor.webp";
import compressor from "./assets/toolbank/compressor.webp";
import concretePump from "./assets/toolbank/concrete-pump.webp";
import "./toolbank.css";

const rentals = [
  { name: "Mixer", type: "Mix materials", image: mixer, description: "Mix earth and cement for consistent batches, ready to place." },
  { name: "Mini loader", type: "Move materials", image: miniLoader, description: "Move soil, aggregate and supplies around the worksite." },
  { name: "Conveyor", type: "Place materials", image: conveyor, description: "Carry material to the work, with 8, 20 and 24 foot belt options." },
  { name: "Compressor + compactor kit", type: "Supply air + compact earth", image: compressor, description: "A portable compressor paired with an earth rammer for compacting soil in consistent lifts." },
  { name: "Concrete pump", type: "Place concrete", image: concretePump, description: "Get concrete from the mixer to the forms with less handling." },
];

function ToolbankPage() {
  return <main className="toolbank-page">
    <PageMeta title="Toolbank — Shelter on the Land" description="Rent the tools that help bring a Shelter plan to life. Mix, move, place and compact materials with Toolbank." path="/toolbank/" image="/social/four-walls.jpg"/>
    <header className="nav toolbank-nav">
      <a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <nav><a href="/#shelters">Plans</a><a href="/packages/">Support</a><a href="#rentals">Rentals</a></nav>
      <a className="nav-cta" href="mailto:build@onthe.land?subject=Toolbank%20rental%20enquiry">Ask about a rental ↗</a>
    </header>

    <div className="landing-intro toolbank-landing-intro">
      <section className="hero toolbank-hero">
        <img src={hero} alt="A small earthen shelter opening onto a courtyard"/>
        <div className="hero-wash"/>
        <p className="hero-note">Shelter on the Land<br/>Tools for the work ahead</p>
        <h1>toolbank</h1>
        <a className="down" href="#rentals"><span>See what you can rent</span><span>↓</span></a>
      </section>

      <section className="manifesto toolbank-intro" id="start-building">
        <p className="kicker">Start building today</p>
        <p className="manifesto-statement">You can build your own shelter. Plans and support get your project ready to build. Toolbank brings the right tools to the work, so nothing stands in your way.</p>
      </section>
    </div>

    <section className="process toolbank-rentals" id="rentals">
      <header className="process-heading"><p className="kicker">Toolbank rentals / 01—05</p></header>
      <ol className="process-rail">
        {rentals.map((item, index) => <li className="process-card toolbank-card" key={item.name}>
          <span className="process-number">0{index + 1}</span><small>{item.type}</small>
          <div className="toolbank-card-image"><img src={item.image} alt={item.name}/></div>
          <h3>{item.name}</h3><p>{item.description}</p>
          <a href={`mailto:build@onthe.land?subject=${encodeURIComponent(`Toolbank rental enquiry: ${item.name}`)}`}><span>Ask about this tool</span><b>↗</b></a>
        </li>)}
      </ol>
      <p className="process-scroll-hint"><span>Scroll for all tools</span><span>→</span></p>
    </section>

    <section className="toolbank-start">
      <p className="kicker">Build it yourself</p>
      <h2>Everything you need to start building today.</h2>
      <div><a href="/#shelters"><span>Plans</span><b>Find a plan ↗</b></a><a href="/packages/"><span>Support</span><b>Secure a permit ↗</b></a><a href="#rentals"><span>Toolbank</span><b>Reserve your tools ↗</b></a></div>
    </section>
    <SiteFooter/>
  </main>;
}

export default ToolbankPage;
