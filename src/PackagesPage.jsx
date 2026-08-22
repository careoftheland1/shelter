import SiteFooter from "./SiteFooter.jsx";

const packages = [
  {
    index: "01", name: "Solo", price: "Free", label: "Plan access", note: "For the capable self-starter",
    intro: "Take the plans and make a start. You lead the work, assemble your local team and adapt the design to your land.",
    includes: ["Complete digital plan set", "Material quantities + build sequence", "Editable project checklist", "Future plan updates"],
    action: "Choose a shelter", href: "/#shelters"
  },
  {
    index: "02", name: "Supported", price: "$1,000+", label: "Focused support", tag: "A useful place to begin", note: "For a strong start and timely answers",
    intro: "Bring us into the decisions that shape the build. We review your direction, help assemble a team and stay available at key moments.",
    includes: ["Everything in Solo", "Site + orientation review", "Two design work sessions", "Engineer + contractor introductions", "Shared project portal"],
    action: "Ask about support", href: "mailto:build@onthe.land?subject=Supported build"
  },
  {
    index: "03", name: "Guided", price: "$5,000+", label: "Ongoing guidance", note: "For an owner-builder with a partner",
    intro: "A longer working relationship from site planning through construction. You remain the builder; we help keep the whole effort coherent.",
    includes: ["Everything in Supported", "Plan adaptations", "Material + assembly guidance", "Milestone drawing reviews", "Regular build consultations", "Shared project portal"],
    action: "Plan a guided build", href: "mailto:build@onthe.land?subject=Guided build"
  },
  {
    index: "04", name: "Custom", price: "By proposal", label: "Full commission", note: "For architecture made for one place",
    intro: "A full architectural commission shaped around your land, climate, material, budget and way of living—from first idea to a buildable design.",
    includes: ["Original site-specific design", "Architecture + consultant coordination", "Permit drawing set", "Material research + prototyping", "Construction-phase support", "Shared project portal"],
    action: "Start a conversation", href: "mailto:build@onthe.land?subject=Custom shelter"
  }
];

function PackagesPage() {
  return <main className="packages-page">
    <header className="nav packages-nav">
      <a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <nav><a href="/#practice">Practice</a><a href="/#shelters">Shelters</a><a href="/#process">Process</a><a href="/#about">About</a></nav>
      <a className="nav-cta" href="#choose">Find your way ↘</a>
    </header>

    <section className="packages-hero">
      <p className="kicker">Plans + ways of working</p>
      <h1>Build it<br/>your way.</h1>
      <div className="packages-hero-copy"><p>Every project begins with a free plan. Go independently, ask for a few well-timed conversations, or bring us alongside for the whole build.</p><a href="#packages">Compare the paths <span>↓</span></a></div>
    </section>

    <section className="packages-intro" id="choose">
      <p className="kicker">Choose your level of support</p>
      <h2>The plans are free.<br/>Experience is there<br/>when you need it.</h2>
      <p>Start small. Add support only when it creates real value—at the site, around the table or during the build. You can begin independently and move into another path later.</p>
    </section>

    <section className="package-list" id="packages">
      {packages.map((item, i) => <article className={`package-row package-${i + 1}`} key={item.name}>
        <header className="package-heading"><span>{item.index} / 04</span>{item.tag && <em>{item.tag}</em>}<h2>{item.name}</h2><p>{item.note}</p></header>
        <div className="package-details"><div className="package-price"><span>{item.label}</span><strong>{item.price}</strong></div><p className="package-intro">{item.intro}</p><div className="package-includes"><span>Included in this path</span><ul>{item.includes.map(x => <li key={x}>{x}</li>)}</ul></div><a href={item.href}>{item.action}<span>↗</span></a></div>
      </article>)}
    </section>

    <section className="package-guide">
      <p className="kicker">A simple guide</p><h2>Not sure where<br/>you belong?</h2>
      <div>{packages.map((item, i) => <p key={item.name}><span>{String(i + 1).padStart(2, "0")}</span>{i === 0 && <>You have land, practical experience and trusted local professionals. Begin <b>Solo</b>.</>}{i === 1 && <>You want an experienced eye on early decisions and someone reliable to call. Choose <b>Supported</b>.</>}{i === 2 && <>You will lead the build and want an ongoing design partner. Choose <b>Guided</b>.</>}{i === 3 && <>The project needs to be drawn from the land outward. Begin with <b>Custom</b>.</>}</p>)}</div>
    </section>

    <section className="packages-contact"><p className="kicker">Tell us what you are building</p><h2>Begin with<br/>the land.</h2><p>You do not need to know which package fits. Send a few words about the place, the shelter and what you hope to do yourself.</p><a href="mailto:build@onthe.land?subject=My shelter project">Start a conversation <span>↗</span></a></section>
    <SiteFooter/>
  </main>;
}

export default PackagesPage;
