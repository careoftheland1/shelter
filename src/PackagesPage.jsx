import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";

const packages = [
  {
    index: "01", name: "Solo", price: "Free", label: "Plan access", note: "For the capable self-starter",
    intro: "Take the plans and make a start. You lead the work, assemble your local team and adapt the design to your land.",
    includes: ["Complete digital plan set", "Material quantities + build sequence", "Editable project checklist", "Future plan updates"],
    action: "Choose a shelter", href: "/#shelters"
  },
  {
    index: "02", name: "Starting Point", price: "$200", label: "Two-hour working session", tag: "A place to begin", note: "For finding the right first move",
    intro: "Bring your land, a plan or the questions taking shape. We’ll spend two focused hours understanding where you are, thinking through the choices in front of you and finding a useful way forward.",
    includes: ["A little preparation before we meet", "One private two-hour video conversation", "Review of the plans, site or questions you bring", "A written outline of useful next steps"],
    action: "Find your starting point", href: "mailto:build@onthe.land?subject=Starting Point session"
  },
  {
    index: "03", name: "Supported", price: "$1,000+", label: "Focused support", note: "For a strong start and timely answers",
    intro: "Bring us into the decisions that shape the build. Start with a Shelter plan or plans of your own; we review your direction, help assemble a team and stay available at key moments.",
    includes: ["Use a Shelter plan or bring your own", "Site + orientation review", "Two design work sessions", "Engineer + contractor introductions", "Shared project portal"],
    action: "Talk through your build", href: "mailto:build@onthe.land?subject=Supported build"
  },
  {
    index: "04", name: "Guided", price: "$5,000+", label: "Ongoing guidance", note: "For an owner-builder with a partner",
    intro: "A longer working relationship from site planning through construction. You remain the builder; we help keep the whole effort coherent.",
    includes: ["Everything in Supported", "Plan adaptations", "Material + assembly guidance", "Milestone drawing reviews", "Regular build consultations", "Shared project portal"],
    action: "Tell us about your build", href: "mailto:build@onthe.land?subject=Guided build"
  },
  {
    index: "05", name: "Custom", price: "By proposal", label: "Full commission", note: "For architecture made for one place",
    intro: "A full architectural commission shaped around your land, climate, material, budget and way of living—from first idea to a buildable design.",
    includes: ["Original site-specific design", "Architecture + consultant coordination", "Permit drawing set", "Material research + prototyping", "Construction-phase support", "Shared project portal"],
    action: "Start a conversation", href: "mailto:build@onthe.land?subject=Custom shelter"
  }
];

function PackagesPage() {
  return <main className="packages-page">
    <PageMeta title="Plans + Ways of Working — Shelter on the Land" description="Use a free Shelter plan or bring your own, then choose focused advice, ongoing guidance or a full custom commission." path="/packages/"/>
    <header className="nav packages-nav">
      <a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <nav><a href="/#practice">Practice</a><a href="/#shelters">Shelters</a><a href="/#process">Process</a><a href="/#about">About</a></nav>
      <a className="nav-cta" href="#choose">Find your way ↘</a>
    </header>

    <section className="packages-hero">
      <p className="kicker">Plans + ways of working</p>
      <h1>Build it<br/>your way.</h1>
      <div className="packages-hero-copy"><p>Start with one of our free Shelter plans—or bring plans of your own. Build independently, begin with one focused conversation, or bring us alongside through the work.</p><a href="#packages">Compare the paths <span>↓</span></a></div>
    </section>

    <section className="packages-intro" id="choose">
      <p className="kicker">Choose your level of support</p>
      <h2>The plans are free.<br/>Experience is there<br/>when you need it.</h2>
      <p>Use a Shelter plan or bring your own. Add support only when it creates real value—at the beginning, around the table or during the build. You can start with a conversation and decide what comes next.</p>
    </section>

    <section className="package-list" id="packages">
      {packages.map((item, i) => <article className={`package-row package-${i + 1}`} key={item.name}>
        <header className="package-heading"><span>{item.index} / {String(packages.length).padStart(2, "0")}</span>{item.tag && <em>{item.tag}</em>}<h2>{item.name}</h2><p>{item.note}</p></header>
        <div className="package-details"><div className="package-price"><span>{item.label}</span><strong>{item.price}</strong></div><p className="package-intro">{item.intro}</p><div className="package-includes"><span>Included in this path</span><ul>{item.includes.map(x => <li key={x}>{x}</li>)}</ul></div><a href={item.href}>{item.action}<span>↗</span></a></div>
      </article>)}
    </section>

    <section className="package-guide">
      <p className="kicker">A simple guide</p><h2>Not sure where<br/>you belong?</h2>
      <div>{packages.map((item, i) => <p key={item.name}><span className="guide-number">{String(i + 1).padStart(2, "0")}</span><span className="guide-copy">{i === 0 && <>You have land, practical experience and trusted local professionals. Begin <b>Solo</b>.</>}{i === 1 && <>You are curious, just beginning or need help finding the right first move. Start at the <b>Starting Point</b>.</>}{i === 2 && <>You want an experienced eye on early decisions and someone reliable to call. Choose <b>Supported</b>.</>}{i === 3 && <>You will lead the build and want an ongoing design partner. Choose <b>Guided</b>.</>}{i === 4 && <>The project needs to be drawn from the land outward. Begin with <b>Custom</b>.</>}</span></p>)}</div>
    </section>

    <section className="packages-contact"><p className="kicker">Tell us what you are building</p><h2>Begin with<br/>the land.</h2><p>You do not need to know which package fits. Send a few words about the place, the shelter and what you hope to do yourself.</p><a href="mailto:build@onthe.land?subject=My shelter project">Start a conversation <span>↗</span></a></section>
    <SiteFooter/>
  </main>;
}

export default PackagesPage;
