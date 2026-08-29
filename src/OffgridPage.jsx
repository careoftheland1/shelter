import { useEffect, useRef, useState } from "react";
import fourWallsUrl from "./assets/shelter-cards/four-walls-angles/01-low-floor.webp";
import fourWallsSmallUrl from "./assets/shelter-cards/four-walls-angles/01-low-floor-800.webp";
import courtyardUrl from "./assets/shelter-cards/courtyard-minidv-v3.webp";
import courtyardSmallUrl from "./assets/shelter-cards/courtyard-minidv-v3-800.webp";
import longHouseUrl from "./assets/shelter-cards/long-house-minidv-v3.webp";
import longHouseSmallUrl from "./assets/shelter-cards/long-house-minidv-v3-800.webp";
import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";

const growthSteps = [
  { state: "one", number: "01", kicker: "One room", title: "Start with the seed.", copy: "Four walls. One roof. One useful room. A bedroom, studio, kitchen, workshop or place to stay. For a small site—or a small beginning—that can be enough.", action: "Build one." },
  { state: "around", number: "02", kicker: "Courtyard", title: "Add another. Leave space between.", copy: "The room does not have to get bigger. Add another nearby. Then another. The passages, gardens, shade and courtyards left between them become part of the architecture.", action: "Build around." },
  { state: "out", number: "03", kicker: "Long house", title: "When the land is narrow, build along it.", copy: "Room. Courtyard. Room. Courtyard. Room. Each room stays small. Moving through the house means moving between inside and outside.", action: "Build out." },
];

const plans = [
  { code: "SEED 01", name: "The Four Walls", footprint: "16 × 12 FT", area: "200 SQ FT", use: "STUDIO / SLEEPS 2", next: "CAN GROW → COURTYARD / LONG HOUSE", image: fourWallsUrl, imageSmall: fourWallsSmallUrl, href: "/shelters/the-four-walls/" },
  { code: "COURTYARD 01", name: "The Courtyard", footprint: "3 VOLUMES", area: "600 SQ FT", use: "ROOMS + OPEN-AIR COURTS", next: "CAN GROW → ONE VOLUME AT A TIME", image: courtyardUrl, imageSmall: courtyardSmallUrl, href: "/shelters/the-courtyard/" },
  { code: "LONG HOUSE 01", name: "The Long House", footprint: "4–6+ VOLUMES", area: "1,000 SQ FT", use: "ROOM / COURT / ROOM", next: "CAN GROW → ALONG THE LAND", image: longHouseUrl, imageSmall: longHouseSmallUrl, href: "/shelters/the-long-house/" },
];

function GrowthPlan({ state }) {
  return <svg className={`offgrid-plan offgrid-plan-${state}`} viewBox="0 0 760 620" role="img" aria-label={`${state} shelter plan arrangement`}>
    <g className="offgrid-seed"><path d="M145 216h176v176H145z"/><path className="offgrid-poche" d="M145 216h176v176H145zm22 22v132h132V238z" fillRule="evenodd"/></g>
    <g className="offgrid-around">
      <g transform="rotate(8 482 198)"><path d="M398 122h168v152H398z"/><path className="offgrid-poche" d="M398 122h168v152H398zm22 22v108h124V144z" fillRule="evenodd"/></g>
      <g transform="rotate(-7 481 442)"><path d="M394 370h174v146H394z"/><path className="offgrid-poche" d="M394 370h174v146H394zm22 22v102h130V392z" fillRule="evenodd"/></g>
      <path className="offgrid-void" d="M339 279 393 250 435 291 414 365 333 383z"/>
      <text x="380" y="328">COURTYARD</text>
    </g>
    <g className="offgrid-out">
      <g><path d="M60 216h120v140H60z"/><path className="offgrid-poche" d="M60 216h120v140H60zm18 18v104h84V234z" fillRule="evenodd"/></g>
      <g><path d="M300 216h120v140H300z"/><path className="offgrid-poche" d="M300 216h120v140H300zm18 18v104h84V234z" fillRule="evenodd"/></g>
      <g><path d="M540 216h120v140H540z"/><path className="offgrid-poche" d="M540 216h120v140H540zm18 18v104h84V234z" fillRule="evenodd"/></g>
      <path className="offgrid-court" d="M180 234h120v104H180zm240 0h120v104H420z"/>
      <text x="240" y="384">COURT</text><text x="480" y="384">COURT</text>
    </g>
    <path className="offgrid-ground" d="M76 525H706"/>
  </svg>;
}

function OffgridPage() {
  const [growthState, setGrowthState] = useState("one");
  const growthRef = useRef(null);

  useEffect(() => {
    const nodes = growthRef.current?.querySelectorAll("[data-growth]");
    if (!nodes?.length) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setGrowthState(visible.target.dataset.growth);
    }, { rootMargin: "-30% 0px -40%", threshold: [0, .25, .5, .75] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return <main className="offgrid-page">
    <PageMeta title="A Building Language for Starting Small — Shelter on the Land" description="Begin with one useful room, then grow into courtyards or a long house with a simple building language and free shelter plans." path="/plans/"/>
    <header className="offgrid-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><nav><a href="#language">The system</a><a href="#plans">Plans</a><a href="/tools/">Tools</a></nav><a href="#plans">Start with four walls ↓</a></header>

    <section className="offgrid-seed-intro">
      <p className="kicker">A building language for starting small</p>
      <h1>Start with<br/>four walls.</h1>
      <div className="offgrid-seed-symbol"><span>The seed</span><svg viewBox="0 0 300 300" aria-hidden="true"><path d="M40 40h220v220H40zM70 70v160h160V70z" fillRule="evenodd"/></svg></div>
      <div className="offgrid-seed-copy"><p>Every Shelter begins with the same simple idea: <b>four walls.</b></p><p>A small room that can stand on its own—or become the beginning of something larger.</p><p>Build only what you need. Add to it when you need more.</p></div>
    </section>

    <section className="offgrid-growth" id="language" ref={growthRef}>
      <div className="offgrid-growth-canvas"><GrowthPlan state={growthState}/><div className="offgrid-growth-index"><span>{growthState === "one" ? "01" : growthState === "around" ? "02" : "03"}</span><i/><span>03</span></div></div>
      <div className="offgrid-growth-copy">{growthSteps.map((step) => <article data-growth={step.state} key={step.state}><span>{step.number} / 03</span><p className="kicker">{step.kicker}</p><h2>{step.title}</h2><p>{step.copy}</p><b>{step.action}</b></article>)}</div>
    </section>

    <section className="offgrid-language">
      <p className="kicker">The whole system</p><h2>One building language.<br/>Many ways to live.</h2><p>One room. A courtyard. A long house. They aren't three different kinds of Shelter. They're three ways the same seed can grow.</p>
      <div className="offgrid-language-plans"><figure><GrowthPlan state="one"/><figcaption>01 / One room</figcaption></figure><figure><GrowthPlan state="around"/><figcaption>02 / Courtyard</figcaption></figure><figure><GrowthPlan state="out"/><figcaption>03 / Long house</figcaption></figure></div>
      <strong>Start with four walls.<br/>See where they take you.</strong>
    </section>

    <section className="offgrid-plans" id="plans">
      <header><p className="kicker">Free shelter plans</p><h2>Plans made<br/>to be built.</h2><p>Start small. Build now. Leave room for what comes next. Every plan belongs to the same system, and every small beginning contains the possibility of something larger.</p></header>
      <div className="offgrid-plan-list">{plans.map((plan) => <a href={plan.href} key={plan.code}><div className="offgrid-plan-image"><img src={plan.image} srcSet={`${plan.imageSmall} 800w, ${plan.image} ${plan.code === "COURTYARD 01" ? 1445 : plan.code === "LONG HOUSE 01" ? 1461 : 1452}w`} sizes="(max-width: 760px) 100vw, 55vw" alt="" loading="lazy" decoding="async"/><span>{plan.code}</span></div><div className="offgrid-plan-info"><h3>{plan.name}</h3><dl><div><dt>Footprint</dt><dd>{plan.footprint}</dd></div><div><dt>Interior</dt><dd>{plan.area}</dd></div><div><dt>Use</dt><dd>{plan.use}</dd></div></dl><p>{plan.next}</p><b>View the plan ↗</b></div></a>)}</div>
    </section>

    <section className="offgrid-close"><p className="kicker">Build only what you need</p><h2>One little room.<br/>More little rooms.<br/>A place to live.</h2><a href="#plans">Choose a place to begin <span>↑</span></a></section>
    <SiteFooter/>
  </main>;
}

export default OffgridPage;
