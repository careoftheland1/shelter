import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";

const packages = [
  {
    index: "01", name: "The Open Set", price: "Free", label: "Open building system",
    intro: "Start with the Shelter building system: one room, three around a court or six along a line. The plans are open so you can study them, adapt them to your land and make a start yourself.",
    includes: ["Four Walls — one independent room, the seed", "Courtyard — three volumes around shared outdoor space", "Longhouse — six volumes arranged along a line", "Complete digital plan sets", "Material quantities + build sequence", "Editable project checklist + future updates"],
    note: "Shelter plans are reference construction sets. Structure, soil, climate, code and permitting requirements must be verified for the project location.",
    action: "Explore the open set", href: "/#shelters"
  },
  {
    index: "02", name: "Starting Point", price: "$200", label: "One-hour working session",
    intro: "Bring your land, a Shelter plan or the questions taking shape. We’ll spend one focused hour understanding where you are, testing the choices in front of you and finding the clearest way forward.",
    includes: ["Preparation before we meet", "One private one-hour video conversation", "Review of the plans, site or questions you bring", "A written outline of useful next steps"],
    note: "If you continue into Supported or Guided, the $200 is credited toward that service.",
    action: "Find your starting point", href: "mailto:build@onthe.land?subject=Starting Point session"
  },
  {
    index: "03", name: "Supported", price: "$1,000", label: "Get ready to build",
    intro: "Bring us into the decisions that shape the project before construction begins. Start with a Shelter plan or plans of your own; we help site the project and get the plans ready for submitting to your local building department.",
    includes: ["Use a Shelter plan or bring your own", "Site planning + orientation", "Plan adaptations within the agreed scope", "Plan-check and permit preparation"],
    note: "Supported ends when the project is ready to move into construction.",
    action: "Explore Supported", href: "/supported/"
  },
  {
    index: "04", name: "Guided", price: "$5,000", label: "Build with Shelter beside you",
    intro: "A longer working relationship from site planning through construction. You remain the builder; we stay with the project as decisions move from drawings into the field.",
    includes: ["Everything in Supported", "Building-department interfacing", "Regular build consultations", "Review of site photos or video at key moments", "Construction-stage problem solving", "Support through completion within the agreed project duration"],
    note: "Supported gets you to construction. Guided stays through construction.",
    action: "Explore Guided", href: "/guided/"
  },
  {
    index: "05", name: "Custom", price: "", label: "Designed from the land outward",
    intro: "Some projects should not begin with a plan. For unusual sites, programs or ambitions, we can begin with the land and develop a project from first principles—drawing from the Shelter material and building language where useful.",
    includes: ["Original site-specific design", "Architecture + consultant coordination", "Permit drawing set", "Soils testing & engineering", "Construction-phase support"],
    action: "Start a conversation", href: "mailto:build@onthe.land?subject=Custom shelter"
  }
];

function PackagesPage() {
  return <main className="packages-page">
    <PageMeta title="Plans + Ways of Working — Shelter on the Land" description="Start with the open Shelter building system, then bring us in for focused advice, pre-construction support, guidance through the build or a project designed from the land outward." path="/packages/"/>
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
      <div className="packages-hero-copy"><p>When the plans aren’t enough, talk through the decisions before you build. And when something unexpected comes up on site, we’re a call away.</p><a href="#packages">Compare the paths <span>↓</span></a></div>
    </section>

    <section className="packages-intro" id="choose">
      <p className="kicker">Choose your level of support</p>
      <h2>The plans are free.<br/>Experience is there<br/>when you need it.</h2>
    </section>

    <section className="package-list" id="packages">
      {packages.map((item, i) => <article className={`package-row package-${i + 1}`} key={item.name}>
        <header className="package-heading"><span>{item.index} / {String(packages.length).padStart(2, "0")}</span>{item.tag && <em>{item.tag}</em>}<h2>{item.name}</h2></header>
        <div className="package-details"><div className="package-price"><span>{item.label}</span>{item.price && <strong>{item.price}</strong>}</div><p className="package-intro">{item.intro}</p><div className="package-includes"><span>Included in this path</span><ul>{item.includes.map(x => <li key={x}>{x}</li>)}</ul></div>{item.note && <p className="package-note">{item.note}</p>}<a href={item.href}>{item.action}<span>↗</span></a></div>
      </article>)}
    </section>

    <section className="package-guide">
      <p className="kicker">A simple guide</p><h2>Not sure where to start?</h2>
      <div>{packages.map((item, i) => <p key={item.name}><span className="guide-number">{String(i + 1).padStart(2, "0")}</span><span className="guide-copy">{i === 0 && <>You have land, practical experience and trusted local professionals. Begin with <b>The Open Set</b>.</>}{i === 1 && <>You are curious, just beginning or need help identifying the right first move. Start at the <b>Starting Point</b>.</>}{i === 2 && <>You have a direction and want help getting it ready for construction. Choose <b>Supported</b>.</>}{i === 3 && <>You will lead the build and want Shelter alongside you through construction. Choose <b>Guided</b>.</>}{i === 4 && <>The project needs to be drawn from the land outward. Begin with <b>Custom</b>.</>}</span></p>)}</div>
    </section>

    <section className="packages-contact"><p className="kicker">Tell us what you are building</p><h2>Begin with<br/>the land.</h2><p>You do not need to choose a path first. Tell us about the place, the shelter and the parts of the work you hope to take on yourself.</p><a href="/project/?source=packages">Tell us about your project <span>↗</span></a></section>
    <SiteFooter/>
  </main>;
}

export default PackagesPage;
