import PageMeta from "./PageMeta.jsx";
import SiteFooter from "./SiteFooter.jsx";

const shelters = [
  { name: "Four Walls", area: "200 sq ft", description: "One compact room: a place to live, work, stay or begin building on the land.", slug: "four-walls" },
  { name: "Courtyard", area: "600 sq ft", description: "Three small earthen volumes gathered around protected outdoor rooms.", slug: "courtyard" },
  { name: "Long House", area: "1,000 sq ft", description: "Repeated rooms, open-air courts and passages shaped to a narrow site.", slug: "long-house" },
];

export default function SheltersPage() {
  return <main className="packages-page">
    <PageMeta title="Free Shelter Plans — Shelter on the Land" description="Explore Four Walls, Courtyard and Long House: free plans for small earthen shelters." path="/shelters/" image="/social/four-walls.jpg"/>
    <header className="nav packages-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><nav><a href="/plans/">Building system</a><a href="/packages/">Ways of working</a><a href="/#about">About</a></nav></header>
    <section className="packages-hero"><p className="kicker">Free plans to get started</p><h1>Plans made<br/>to be built.</h1><div className="packages-hero-copy"><p>Begin with one useful room. Grow around a courtyard or along the land using the same simple building language.</p><a href="/plans/">Explore the building system ↗</a></div></section>
    <section className="package-list" aria-label="Shelter plans">{shelters.map((shelter, index) => <article className="package-row" key={shelter.slug}><header className="package-heading"><span>0{index + 1} / 03</span><h2>{shelter.name}</h2></header><div className="package-details"><p>{shelter.area}</p><p className="package-intro">{shelter.description}</p><a href={`/shelters/${shelter.slug}/`}>Explore {shelter.name} <span>↗</span></a></div></article>)}</section>
    <SiteFooter/>
  </main>;
}
