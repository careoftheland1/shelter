import { lazy, Suspense } from "react";
import heroUrl from "./assets/shelter-updates/four-walls-hero.webp";
import heroSmallUrl from "./assets/shelter-updates/four-walls-hero-800.webp";
import fourWallsUrl from "./assets/shelter-cards/four-walls-angles/01-low-floor.webp";
import fourWallsSmallUrl from "./assets/shelter-cards/four-walls-angles/01-low-floor-800.webp";
import courtyardUrl from "./assets/shelter-cards/courtyard-minidv-v3.webp";
import courtyardSmallUrl from "./assets/shelter-cards/courtyard-minidv-v3-800.webp";
import longHouseUrl from "./assets/shelter-cards/long-house-minidv-v3.webp";
import longHouseSmallUrl from "./assets/shelter-cards/long-house-minidv-v3-800.webp";
import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";

const ShelterPage = lazy(() => import("./ShelterPage.jsx"));
const PackagesPage = lazy(() => import("./PackagesPage.jsx"));
const ToolsPage = lazy(() => import("./ToolsPage.jsx"));
const OffgridPage = lazy(() => import("./OffgridPage.jsx"));
const OffgridSystemsPage = lazy(() => import("./OffgridSystemsPage.jsx"));

const services = [
  { number: "01", kind: "plans", title: "Start small", copy: "Begin with four walls. A small first project can become the beginning of a larger place.", action: "See the shelters", href: "#shelters" },
  { number: "02", kind: "tool", title: "Develop your own idea", copy: "Use Space It, Shape It and See It to generate an arrangement, develop a measured shelter and visualize it on the land.", action: "Explore the tools", href: "/tools/" },
];

const shelters = [
  { number: "S—01", name: "The Four Walls", area: "200 sq ft", rooms: "Studio / 1 bath", shape: "room", image: fourWallsUrl, imageSmall: fourWallsSmallUrl, imageAlt: "Empty earthen room framed by two bright openings", slug: "the-four-walls" },
  { number: "S—02", name: "The Courtyard", area: "600 sq ft", rooms: "3 volumes + courtyards", shape: "court", image: courtyardUrl, imageSmall: courtyardSmallUrl, imageAlt: "Three rammed-earth volumes forming a shaded courtyard", slug: "the-courtyard" },
  { number: "S—03", name: "The Long House", area: "1,000 sq ft", rooms: "4–6+ volumes", shape: "long", image: longHouseUrl, imageSmall: longHouseSmallUrl, imageAlt: "View from a dark earthen room across a planted courtyard into a minimal kitchen", slug: "the-long-house" },
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

function EntryVisual({ kind }) {
  if (kind === "plans") return <svg className="entry-visual" viewBox="0 0 240 88" aria-hidden="true">
    <path d="M80 80V8h80v26m0 16v30h-30m-20 0H80M86 74V14h68v20m0 16v24h-24m-20 0H86"/>
    <path d="M110 74v6m20-6v6m24-40h6m-6 4h6"/>
  </svg>;
  return <svg className="entry-visual" viewBox="0 0 240 88" aria-hidden="true">
    <path d="M24 28 83 11l65 17v41L83 82 24 66zM83 11v71"/>
    <path d="M103 78V47h26v27"/>
    <path d="m157 39 22-7 43 10v32l-43 8-22-7zM179 32v50"/>
    <path d="M188 80V52h16v25"/>
  </svg>;
}

function BuildingLanguageDiagram() {
  return <figure className="building-language">
    <svg viewBox="0 0 1040 250" role="img" aria-labelledby="language-title language-desc">
      <title id="language-title">The Four Walls seed growing into courtyard and long house arrangements</title>
      <desc id="language-desc">One thick-walled room gathers with independent rooms around a courtyard, or repeats in a line with room-width open courts.</desc>
      <path className="language-thread" d="M183 125H275M528 125h86"/>
      <g className="language-seed" transform="translate(34.5 37.5) scale(.7)"><rect x="48" y="58" width="134" height="134"/><circle cx="115" cy="125" r="4"/></g>
      <g className="language-courtyard" transform="translate(110.6 35) scale(.72)">
        <rect x="288" y="39" width="88" height="88"/><rect x="411" y="28" width="88" height="88" transform="rotate(7 455 72)"/><rect x="303" y="151" width="88" height="76" transform="rotate(-5 347 189)"/>
        <path className="language-void" d="M390 119 431 109 450 146 409 185 384 161z"/>
      </g>
      <g className="language-long" transform="translate(324.4 50.4) scale(.6)">
        <rect x="626" y="79" width="74" height="94"/><rect x="774" y="79" width="74" height="94"/><rect x="922" y="79" width="74" height="94"/>
        <path className="language-void" d="M700 88h74v76h-74zm148 0h74v76h-74z"/>
      </g>
    </svg>
    <figcaption><span>01 / Four Walls</span><span>02 / Courtyard</span><span>03 / Long House</span></figcaption>
  </figure>;
}

function App() {
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
  if (window.location.pathname.startsWith("/shelters/")) {
    return <Suspense fallback={<div className="page-loading">Loading shelter…</div>}><ShelterPage /></Suspense>;
  }
  return <main>
    <PageMeta title="Shelter on the Land — Free Plans for Earthen Shelters" description="Free buildable plans, design tools and experienced guidance for small rammed-earth and lavacrete shelters."/>
    <header className="nav">
      <a className="wordmark" href="#top">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <nav><a href="#practice">Practice</a><a href="#shelters">Shelters</a><a href="#process">Process</a><a href="#about">About</a></nav>
      <a className="nav-cta" href="#contact">Start a build ↗</a>
    </header>

    <section className="hero" id="top">
      <img src={heroUrl} srcSet={`${heroSmallUrl} 800w, ${heroUrl} 1448w`} sizes="100vw" alt="Rammed-earth shelter volumes in a wooded desert courtyard" fetchPriority="high" decoding="async"/>
      <div className="hero-wash"/>
      <p className="hero-note">FREE BUILDABLE PLANS AND GUIDES + EXPERIENCED HELP FOR BUILDING WITH RAMMED EARTH AND LAVACRETE</p>
      <h1>be a builder</h1>
      <a className="down" href="#process">See how it works <span>↓</span></a>
    </section>

    <section className="manifesto" id="practice">
      <p className="kicker">START BUILDING TODAY</p>
      <div>
        <h2>You can build<br/>your own shelter.</h2>
        <p>We make small buildings that ordinary people can understand, adapt and build. No experience necessary. The plans and design tools are free. Experienced help is there when the work calls for it.</p>
      </div>
    </section>

    <section className="services">
      {services.map(item => <article key={item.number}><a href={item.href}><span>{item.number}</span><EntryVisual kind={item.kind}/><h3>{item.title}</h3><p>{item.copy}</p><b>{item.action} ↗</b></a></article>)}
    </section>

    <section className="plans" id="shelters">
      <header><p className="kicker">FREE PLANS TO GET STARTED</p><h2>Plans made<br/>to be built.</h2><p>The Four Walls is the seed: a 200 sq ft room that teaches the whole system. Larger shelters grow through repetition, gathering enclosed rooms and useful open space between them.</p></header>
      <BuildingLanguageDiagram/>
      <div className="plan-grid">
        {shelters.map(s => <a className="plan-card" href={`/shelters/${s.slug}/`} key={s.number}>
          <div className="plan-meta"><span>{s.number}</span><span>{s.area}</span></div>
          {s.image ? <img className="plan-image" src={s.image} srcSet={`${s.imageSmall} 800w, ${s.image} ${s.slug === "the-courtyard" ? 1445 : s.slug === "the-long-house" ? 1461 : 1452}w`} sizes="(max-width: 760px) 100vw, 33vw" alt={s.imageAlt} loading="lazy" decoding="async"/> : <Plan shape={s.shape}/>}
          <div className="plan-name"><h3>{s.name}</h3><p>{s.rooms}</p><b>↗</b></div>
        </a>)}
      </div>
      <a className="text-link" href="/plans/">Explore the building language <span>→</span></a>
    </section>

    <section className="process" id="process">
      <p className="kicker">How it works</p>
      <h2>From a free plan<br/>to a built shelter.</h2>
      <ol>
        <li><span>01</span><div><small>Plans · Details · Material schedule</small><h3>Start with a complete shelter</h3><p>Choose a free plan with dimensioned drawings, assemblies and preliminary quantities—or use our free tools to test a form of your own.</p><div className="step-links"><a href="#shelters">Choose a shelter ↗</a><a href="/tools/">Customize a shelter ↗</a></div></div></li>
        <li><span>02</span><div><small>Quantities · Local prices · Build sequence</small><h3>Put numbers to the work</h3><p>Export preliminary material quantities from Shape It, add prices from the places you will actually buy, and begin with an editable sample build sequence.</p><a href="/tools/#working-documents">Explore the working documents ↗</a></div></li>
        <li><span>03</span><div><small>Site · Code · Engineering</small><h3>Make the plan belong to the land</h3><p>Confirm access, utilities, soil, climate and local requirements. Adapt siting, foundations and structural details with the professionals required in your jurisdiction.</p></div></li>
        <li><span>04</span><div><small>Review · Tailoring · Build support</small><h3>Build independently—or with us</h3><p>Carry the plan into construction yourself. When a decision needs experience, bring us in for a focused review, plan tailoring or guidance through the build.</p><a href="/packages/">See ways of working ↗</a></div></li>
      </ol>
    </section>

    <section className="contact" id="contact">
      <p className="kicker">YOUR LAND. YOUR HANDS. A PLACE TO BEGIN.</p>
      <h2>Start with<br/>a shelter.</h2>
      <div className="contact-actions"><a href="#shelters">Select a plan set <span>↗</span></a><a href="mailto:build@onthe.land?subject=My land">Tell us about your land <span>↗</span></a></div>
    </section>

    <SiteFooter/>
  </main>;
}

export default App;
