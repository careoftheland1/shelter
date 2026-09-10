import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";

const packages = [
  {
    index: "01", name: "Solo", price: "Free", label: "Plan access",
    intro: "Take the plans and make a start. You lead the work, assemble your local team and adapt the design to your land.",
    includes: ["Complete digital plan set", "Material quantities + build sequence", "Editable project checklist", "Future plan updates"],
    action: "Choose a shelter", href: "/#shelters"
  },
  {
    index: "02", name: "Starting Point", price: "$200", label: "Two-hour working session",
    intro: "Bring your land, a plan or the questions taking shape. We’ll spend two focused hours understanding where you are, thinking through the choices in front of you and finding a useful way forward.",
    includes: ["A little preparation before we meet", "One private two-hour video conversation", "Review of the plans, site or questions you bring", "A written outline of useful next steps"],
    action: "Find your starting point", href: "mailto:build@onthe.land?subject=Starting Point session"
  },
  {
    index: "03", name: "Supported", price: "$1,000", label: "Focused support",
    intro: "Bring us into the decisions that shape the build. Start with a Shelter plan or plans of your own; we review your direction and stay available at key moments.",
    includes: ["Use a Shelter plan or bring your own", "Plan siting and orienting", "Plan check preparation"],
    action: "Talk through your build", href: "mailto:build@onthe.land?subject=Supported build"
  },
  {
    index: "04", name: "Guided", price: "$5,000", label: "Ongoing guidance",
    intro: "A longer working relationship from site planning through construction. You remain the builder; we help keep the whole effort coherent.",
    includes: ["Everything in Supported", "Full plan adaptations", "Building department interfacing", "Regular build consultations"],
    action: "Tell us about your build", href: "mailto:build@onthe.land?subject=Guided build"
  },
  {
    index: "05", name: "Custom", price: "", label: "Full commission",
    intro: "A full architectural commission shaped around your land, climate, material, budget and way of living. From first idea to a buildable design.",
    includes: ["Original site-specific design", "Architecture + consultant coordination", "Permit drawing set", "Soils testing & engineering", "Construction-phase support"],
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
      <div className="packages-hero-marks" aria-hidden="true">
        <svg className="marks-wide" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
          <rect x="70" y="90" width="150" height="150"/>
          <rect x="330" y="210" width="118" height="118" transform="rotate(6 389 269)"/>
          <rect x="560" y="60" width="170" height="170" transform="rotate(-4 645 145)"/>
          <rect x="800" y="280" width="140" height="140" transform="rotate(8 870 350)"/>
          <rect x="960" y="70" width="160" height="160"/>
          <rect x="990" y="400" width="128" height="112" transform="rotate(-6 1054 456)"/>
        </svg>
        <svg className="marks-tall" viewBox="0 0 700 1300" preserveAspectRatio="xMidYMid slice">
          <rect x="60" y="70" width="160" height="160"/>
          <rect x="330" y="30" width="130" height="130" transform="rotate(6 395 95)"/>
          <rect x="470" y="230" width="150" height="150" transform="rotate(-5 545 305)"/>
          <rect x="80" y="380" width="120" height="120" transform="rotate(8 140 440)"/>
          <rect x="360" y="500" width="170" height="170"/>
          <rect x="120" y="740" width="140" height="122" transform="rotate(-6 190 801)"/>
        </svg>
      </div>
      <p className="kicker">Ways of working</p>
      <h1>Build it yourself.<br/>Not alone.</h1>
      <div className="packages-hero-copy"><p>When the plans aren’t enough. Talk through the decisions before you build. Call when something unexpected comes up on site. We can be a call away.</p><a href="#packages">Compare the paths <span>↓</span></a></div>
    </section>

    <section className="packages-intro" id="choose">
      <p className="kicker">Choose your level of support</p>
      <h2>The plans are free.<br/>Experience is there<br/>when you need it.</h2>
    </section>

    <section className="package-list" id="packages">
      {packages.map((item, i) => <article className={`package-row package-${i + 1}`} key={item.name}>
        <header className="package-heading"><span>{item.index} / {String(packages.length).padStart(2, "0")}</span>{item.tag && <em>{item.tag}</em>}<h2>{item.name}</h2></header>
        <div className="package-details"><div className="package-price"><span>{item.label}</span>{item.price && <strong>{item.price}</strong>}</div><p className="package-intro">{item.intro}</p><div className="package-includes"><span>Included in this path</span><ul>{item.includes.map(x => <li key={x}>{x}</li>)}</ul></div><a href={item.href}>{item.action}<span>↗</span></a></div>
      </article>)}
    </section>

    <section className="package-guide">
      <p className="kicker">A simple guide</p><h2>Not sure where to start?</h2>
      <div>{packages.map((item, i) => <p key={item.name}><span className="guide-number">{String(i + 1).padStart(2, "0")}</span><span className="guide-copy">{i === 0 && <>You have land, practical experience and trusted local professionals. Begin <b>Solo</b>.</>}{i === 1 && <>You are curious, just beginning or need help finding the right first move. Start at the <b>Starting Point</b>.</>}{i === 2 && <>You want an experienced eye on early decisions and someone reliable to call. Choose <b>Supported</b>.</>}{i === 3 && <>You will lead the build and want an ongoing design partner. Choose <b>Guided</b>.</>}{i === 4 && <>The project needs to be drawn from the land outward. Begin with <b>Custom</b>.</>}</span></p>)}</div>
    </section>

    <section className="packages-contact"><p className="kicker">Tell us what you are building</p><h2>Begin with<br/>the land.</h2><p>You do not need to know which package fits. Send a few words about the place, the shelter and what you hope to do yourself.</p><a href="mailto:build@onthe.land?subject=My shelter project">Start a conversation <span>↗</span></a></section>
    <SiteFooter/>
  </main>;
}

export default PackagesPage;
