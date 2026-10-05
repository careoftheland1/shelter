import { lazy, Suspense } from "react";
import heroUrl from "./assets/shelter-updates/four-walls-hero.webp";
import heroSmallUrl from "./assets/shelter-updates/four-walls-hero-800.webp";
import fourWallsUrl from "./assets/shelter-cards/four-walls-angles/four-walls-table.webp";
import fourWallsSmallUrl from "./assets/shelter-cards/four-walls-angles/four-walls-table-800.webp";
import courtyardUrl from "./assets/shelter-cards/courtyard-court-b.webp";
import courtyardSmallUrl from "./assets/shelter-cards/courtyard-court-b-800.webp";
import longHouseUrl from "./assets/shelter-cards/long-house-courtyard.webp";
import longHouseSmallUrl from "./assets/shelter-cards/long-house-courtyard-800.webp";
import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";
import GooeyTitle from "./GooeyTitle.jsx";
import ContactMoodboard from "./ContactMoodboard.jsx";

const ShelterPage = lazy(() => import("./ShelterPage.jsx"));
const SheltersPage = lazy(() => import("./SheltersPage.jsx"));
const PackagesPage = lazy(() => import("./PackagesPage.jsx"));
const ToolsPage = lazy(() => import("./ToolsPage.jsx"));
const OffgridPage = lazy(() => import("./OffgridPage.jsx"));
const OffgridSystemsPage = lazy(() => import("./OffgridSystemsPage.jsx"));
const PrivacyPage = lazy(() => import("./PrivacyPage.jsx"));
const ProjectPage = lazy(() => import("./ProjectPage.jsx"));
const PlanRequestPage = lazy(() => import("./PlanRequestPage.jsx"));
const OfferingPage = lazy(() => import("./OfferingPage.jsx"));

const processSteps = [
  {
    number: "01",
    label: "Free plans",
    title: "Choose a shelter",
    copy: "Start with free, dimensioned plans for a complete earthen shelter.",
    action: "Explore the shelters",
    href: "#shelters",
  },
  {
    number: "02",
    label: "Design tools",
    title: "Make it your own",
    copy: "Arrange the rooms, set the dimensions and see the shelter on your land.",
    action: "Use the design tools",
    href: "/tools/#workflow",
  },
  {
    number: "03",
    label: "Working documents",
    title: "Price it & plan it",
    copy: "Turn material quantities and local prices into a practical build plan.",
    action: "Open the documents",
    href: "/tools/#working-documents",
  },
  {
    number: "04",
    label: "Experienced help",
    title: "Build with support",
    copy: "Build independently, or bring us in for review, tailoring and guidance.",
    action: "See ways of working",
    href: "/packages/",
  },
];

const shelters = [
  { number: "SEED", name: "Four Walls", area: "Free plans", action: "Get the plans", shape: "room", image: fourWallsUrl, imageSmall: fourWallsSmallUrl, imageAlt: "A stone table in a dark earthen room opening onto a small courtyard", slug: "four-walls", width: 1024 },
  { number: "GATHER", name: "Courtyard", area: "Building pattern", action: "Explore the pattern", shape: "court", image: courtyardUrl, imageSmall: courtyardSmallUrl, imageAlt: "Rammed earth rooms surrounding a planted courtyard", slug: "courtyard", width: 1024 },
  { number: "REPEAT", name: "Long House", area: "Building pattern", action: "Explore the pattern", shape: "long", image: longHouseUrl, imageSmall: longHouseSmallUrl, imageAlt: "A narrow grass court leading toward a two-story earthen room", slug: "long-house", width: 1200 },
];

function Plan({ shape }) {
  return <svg className={`plan plan-${shape}`} viewBox="0 0 420 260" aria-hidden="true">
    {shape === "room" && <><rect x="105" y="34" width="210" height="192"/><path d="M105 164h80m45 62v-62h85M185 164v62M230 164h85"/><path className="door" d="M185 180a38 38 0 0 1 38-38"/></>}
    {shape === "court" && <>
      <path d="M26 91h86v70H26zM306 83h88v91h-88zM105 184h184v65H105zM177 11l109 56-49 91-109-57z"/>
      <path d="M112 126h-24m218 3h25M164 184v19m67-45-17-9"/>
      <path className="door" d="M88 126a24 24 0 0 1 24-24M331 129a25 25 0 0 0-25-25M164 203a19 19 0 0 1 19-19M214 149a19 19 0 0 0 26-8"/>
      <path className="plan-court-center" d="M137 126c28 22 51 35 77 41 25 6 50 3 78-13"/>
    </>}
    {shape === "long" && <><rect x="28" y="70" width="364" height="120"/><path d="M128 70v120m98-120v120m78-120v120M28 130h100m98 0h78"/><path className="door" d="M128 150a30 30 0 0 1 30-30M226 150a30 30 0 0 0-30-30"/></>}
  </svg>;
}

function BuildingLanguageDiagram() {
  return <figure className="building-language language-diagram">
    <svg viewBox="0 0 1040 250" role="img" aria-labelledby="language-title language-desc">
      <title id="language-title">Four Walls seed growing into courtyard and long house arrangements</title>
      <desc id="language-desc">One thick-walled room gathers with independent rooms around a courtyard, or repeats in a line with room-width open courts.</desc>
      <path className="language-thread" d="M235 125h112m250 0h83"/>
      <path className="language-arrow" d="m342 120 5 5-5 5m333-10 5 5-5 5"/>
      <g className="language-seed"><rect x="70" y="65" width="120" height="115"/><circle cx="130" cy="123" r="3"/></g>
      <g className="language-courtyard">
        <rect x="400" y="55" width="65" height="65"/><rect x="500" y="45" width="65" height="65" transform="rotate(16 532.5 77.5)"/><rect x="410" y="140" width="65" height="60" transform="rotate(-10 442.5 170)"/>
        <path className="language-void" d="M465 110 505 100 512 133 482 160 465 138z"/>
      </g>
      <g className="language-long">
        <rect x="720" y="85" width="60" height="65"/><rect x="825" y="85" width="60" height="65"/><rect x="930" y="85" width="60" height="65"/>
        <path className="language-void" d="M780 92h45v51h-45zm105 0h45v51h-45z"/>
      </g>
    </svg>
    <figcaption>
      <div><span>01 / Four Walls</span><h3>The seed.</h3><p>An independent room. Simple, scalable.</p></div>
      <div><span>02 / Court</span><h3>Gather around open space.</h3><p>Combine rooms to create sheltered courtyards, gardens, and light.</p></div>
      <div><span>03 / Row</span><h3>Repeat along a line.</h3><p>A flexible line of rooms creates shelter, program, and enclosure.</p></div>
    </figcaption>
  </figure>;
}

function App() {
  if (window.location.pathname.startsWith("/project")) {
    return <Suspense fallback={<div className="page-loading">Opening project brief…</div>}><ProjectPage /></Suspense>;
  }
  if (window.location.pathname.startsWith("/free-plans")) {
    return <Suspense fallback={<div className="page-loading">Opening free plans…</div>}><PlanRequestPage /></Suspense>;
  }
  if (window.location.pathname.startsWith("/supported")) {
    return <Suspense fallback={<div className="page-loading">Opening Supported…</div>}><OfferingPage kind="supported" /></Suspense>;
  }
  if (window.location.pathname.startsWith("/guided")) {
    return <Suspense fallback={<div className="page-loading">Opening Guided…</div>}><OfferingPage kind="guided" /></Suspense>;
  }
  if (window.location.pathname.startsWith("/privacy")) {
    return <Suspense fallback={<div className="page-loading">Opening privacy notice…</div>}><PrivacyPage /></Suspense>;
  }
  if (window.location.pathname.startsWith("/offgrid")) {
    return <Suspense fallback={<div className="page-loading">Opening off grid…</div>}><OffgridSystemsPage /></Suspense>;
  }
  if (window.location.pathname.startsWith("/school")) {
    window.history.replaceState(null, "", "/");
  }
  if (window.location.pathname.startsWith("/packages")) {
    return <Suspense fallback={<div className="page-loading">Loading support…</div>}><PackagesPage /></Suspense>;
  }
  if (window.location.pathname.startsWith("/tools")) {
    return <Suspense fallback={<div className="page-loading">Opening the tools…</div>}><ToolsPage /></Suspense>;
  }
  if (window.location.pathname.startsWith("/plans")) {
    return <Suspense fallback={<div className="page-loading">Opening the building language…</div>}><OffgridPage /></Suspense>;
  }
  if (["/shelters", "/shelters/"].includes(window.location.pathname)) {
    return <Suspense fallback={<div className="page-loading">Loading shelters…</div>}><SheltersPage /></Suspense>;
  }
  if (window.location.pathname.startsWith("/shelters/")) {
    return <Suspense fallback={<div className="page-loading">Loading shelter…</div>}><ShelterPage /></Suspense>;
  }
  return <main>
    <PageMeta title="Shelter on the Land — Free Plans for Earthen Shelters" description="Free buildable plans, design tools and experienced guidance for small rammed-earth and lavacrete shelters."/>
    <header className="nav">
      <a className="wordmark" href="#top">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <nav><a href="#practice">Build</a><a href="#shelters">Shelters</a><a href="#process">With</a><a href="#about">Us</a></nav>
      <a className="nav-cta" href="#contact">Start a build ↗</a>
    </header>

    <div className="landing-intro">
      <section className="hero" id="top">
        <img src={heroUrl} srcSet={`${heroSmallUrl} 800w, ${heroUrl} 1448w`} sizes="100vw" alt="Rammed-earth shelter volumes in a wooded desert courtyard" fetchPriority="high" decoding="async"/>
        <div className="hero-wash"/>
        <p className="hero-note">FREE BUILDABLE PLANS FOR BUILDING WITH RAMMED EARTH AND LAVACRETE</p>
        <h1><GooeyTitle/></h1>
        <a className="down" href="#process">See how it works <span>↓</span></a>
      </section>

      <section className="manifesto" id="practice">
        <p className="kicker">START BUILDING TODAY</p>
        <p className="manifesto-statement">You can build your own shelter. We design small buildings that ordinary people can understand, adapt and build. No experience necessary. The plans and design tools are free. Experienced help is there when the work calls for it.</p>
      </section>
    </div>

    <section className="plans language-plans" id="shelters">
      <header><h2>Start with four walls. Gather them. Repeat them.</h2></header>
      <BuildingLanguageDiagram/>
      <div className="language-summary"><p>Start small. See where it takes you.</p></div>
      <div className="plan-grid">
        {shelters.map(s => <a className="plan-card" href={`/shelters/${s.slug}/`} key={s.number}>
          <div className="plan-meta"><span>{s.number}</span><span>{s.area}</span></div>
          {s.image ? <img className="plan-image" src={s.image} srcSet={`${s.imageSmall} 800w, ${s.image} ${s.width}w`} sizes="(max-width: 760px) 100vw, 33vw" alt={s.imageAlt} loading="lazy" decoding="async"/> : <Plan shape={s.shape}/>}
          <div className="plan-name"><h3>{s.name}</h3><p>{s.action}</p><b>↗</b></div>
        </a>)}
      </div>
    </section>

    <section className="process" id="process">
      <header className="process-heading">
        <p className="kicker">How it works</p>
        <h2>From a free plan<br/>to a built shelter.</h2>
      </header>
      <ol className="process-rail" aria-label="Four ways to move a shelter forward">
        {processSteps.map(step => <li className="process-card" key={step.number}>
          <span className="process-number">{step.number}</span>
          <small>{step.label}</small>
          <h3>{step.title}</h3>
          <p>{step.copy}</p>
          <a href={step.href}><span>{step.action}</span><b aria-hidden="true">↗</b></a>
        </li>)}
      </ol>
      <p className="process-scroll-hint" aria-hidden="true">Scroll to explore <span>→</span></p>
    </section>

    <div className="home-finale">
      <ContactMoodboard/>
      <div className="home-finale__scroll-space" aria-hidden="true"/>
      <SiteFooter/>
    </div>
  </main>;
}

export default App;
