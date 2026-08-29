import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";
import seeItLinework from "./assets/see-it-linework.png";
import shapeItLinework from "./assets/shape-it-linework.png";

function SpaceDiagram() {
  return <svg viewBox="0 0 640 420" aria-hidden="true">
    <path className="tool-field" d="M93 97 293 44l237 70 35 169-185 97-230-47-75-143z"/>
    <g className="tool-built">
      <rect x="239" y="35" width="124" height="112" transform="rotate(14 301 91)"/>
      <rect x="407" y="91" width="142" height="68" transform="rotate(-20 478 125)"/>
      <rect x="301" y="188" width="150" height="103"/>
      <rect x="178" y="145" width="75" height="79" transform="rotate(32 215.5 184.5)"/>
      <rect x="147" y="259" width="82" height="59" transform="rotate(-17 188 288.5)"/>
      <rect x="72" y="112" width="76" height="54" transform="rotate(-15 110 139)"/>
    </g>
    <g className="tool-held">
      <rect x="70" y="226" width="72" height="58" transform="rotate(24 106 255)"/>
      <rect x="306" y="321" width="70" height="58" transform="rotate(31 341 350)"/>
      <rect x="421" y="304" width="143" height="68" transform="rotate(-15 492.5 338)"/>
      <rect x="493" y="190" width="79" height="70" transform="rotate(24 532.5 225)"/>
    </g>
    <path className="tool-void" d="M243 140 294 128 321 176 294 219 241 201 224 163z"/>
    <circle className="tool-influence" cx="264" cy="160" r="43"/>
    <circle className="tool-influence" cx="303" cy="189" r="55"/>
    <path className="tool-thread" d="m258 205 20-78m-3 91 47-74m-65 61 74-23"/>
  </svg>;
}

function ShapeDiagram() {
  return <img className="tool-linework tool-linework-shape" src={shapeItLinework} alt=""/>;
}

function SeeDiagram() {
  return <img className="tool-linework tool-linework-see" src={seeItLinework} alt=""/>;
}

function ToolsPage() {
  return <main className="tools-page">
    <PageMeta title="Free Shelter Design Tools — Shelter on the Land" description="Arrange rooms with Space It, shape a measured shelter with Shape It and visualize the place with See It." path="/tools/"/>
    <header className="nav tools-nav">
      <a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <nav><a href="#workflow">Workflow</a><a href="#space-it">Space It</a><a href="#shape-it">Shape It</a><a href="#see-it">See It</a></nav>
      <a className="nav-cta" href="#begin">Begin a shelter ↘</a>
    </header>

    <section className="tools-hero">
      <p className="kicker">Free tools for building an idea</p>
      <h1>From an idea<br/>to a shelter.</h1>
      <div><p>Three simple browser tools help you find the arrangement, make it measurable, then see how it might feel on the land.</p><a href="#workflow">See the workflow <span>↓</span></a></div>
    </section>

    <section className="tools-intro" id="workflow">
      <p className="kicker">One continuous workflow</p>
      <h2>Gather the rooms.<br/>Shape the shelter.<br/>See the place.</h2>
      <p>Begin loosely. Let rooms gather around useful outdoor space, without deciding the whole building at once. Carry the arrangement into a measured model, then explore its light, material and atmosphere.</p>
    </section>

    <section className="tool-stage tool-stage-space" id="space-it">
      <header><span>01 / 03</span><p className="kicker">Arrange rooms + courtyards</p><h2>Space It</h2></header>
      <div className="tool-stage-visual"><SpaceDiagram/></div>
      <div className="tool-stage-copy"><h3>Start with four walls.</h3><p>Grow a home one room at a time. Add, hold back or remove volumes while Space It explores the courtyards, passages, shade and open-air rooms that form between them.</p><ul><li>Generate a starting arrangement</li><li>Explore rooms as separate small buildings</li><li>Test what belongs now and what can come later</li><li>Export the arrangement directly to Shape It</li></ul><a href="https://spaceit.onthe.land/">Open Space It <span>↗</span></a></div>
    </section>

    <section className="tools-handoff"><span>SPACE IT</span><i>01</i><b>Save the starting point</b><em>→</em><i>02</i><b>Open it in Shape It</b><span>SHAPE IT</span></section>

    <section className="tool-stage tool-stage-shape" id="shape-it">
      <header><span>02 / 03</span><p className="kicker">Define + understand the build</p><h2>Shape It</h2></header>
      <div className="tool-stage-visual"><ShapeDiagram/></div>
      <div className="tool-stage-copy"><h3>Make the idea measurable.</h3><p>Open a Space It starting point—or begin with a single volume—and work at the scale of an actual shelter. Set dimensions, wall systems, roofs and openings while the model keeps the material implications visible.</p><ul><li>Move and refine individual or grouped volumes</li><li>Set wall thickness, material and roof form</li><li>Place and size doors and windows</li><li>Export a dimensioned plan and preliminary material quantities</li></ul><a href="https://shapeit.onthe.land/">Open Shape It <span>↗</span></a></div>
    </section>

    <section className="tools-handoff"><span>SHAPE IT</span><i>02</i><b>Capture the chosen view</b><em>→</em><i>03</i><b>Bring it into the landscape</b><span>SEE IT</span></section>

    <section className="tool-stage tool-stage-see" id="see-it">
      <header><span>03 / 03</span><p className="kicker">Visualize light + material + place</p><h2>See It</h2></header>
      <div className="tool-stage-visual"><SeeDiagram/></div>
      <div className="tool-stage-copy"><h3>See what the drawing could become.</h3><p>Carry a view from Shape It into a focused visualization tool. Describe the landscape, light, material and atmosphere while the shelter's underlying composition stays in view.</p><ul><li>Begin with a Shape It capture or another source image</li><li>Describe the land, season, light and feeling</li><li>Explore alternate frames and visual directions</li><li>Save a set of images to guide the project forward</li></ul><a href="https://shapeit.onthe.land/see-it.html">Open See It <span>↗</span></a></div>
    </section>

    <section className="working-documents" id="working-documents">
      <header><p className="kicker">Working documents</p><h2>Carry the numbers<br/>into the work.</h2><p>Shape It can provide the quantities the geometry knows. Editable documents carry those numbers forward, leaving room for local prices, project-specific materials and the decisions only a builder can make.</p></header>
      <div className="working-document-list">
        <article><span>01</span><h3>Material takeoff</h3><p>Begin with calculated wall volume and weight, soil or lavasand, cement, formed wall area and floor area—organized by volume and for the project as a whole.</p><b>Populated by Shape It</b></article>
        <article><span>02</span><h3>Editable budget</h3><p>Carry the calculated quantities into a cost workbook. Add local unit prices, waste, labor, tax and the materials the model cannot determine.</p><b>Completed by the builder</b></article>
        <article><span>03</span><h3>Sample sequence</h3><p>Begin with an editable order of work, then adjust durations, dependencies, crews and dates to the site and the way the project will actually be built.</p><b>Adapted to the project</b></article>
        <article><span>04</span><h3>Make it complete</h3><p>Add reinforcement, foundations, roofing, openings, services, finishes and any other work specific to the plan, engineering and jurisdiction.</p><b>Verified locally</b></article>
      </div>
    </section>

    <section className="tools-begin" id="begin"><p className="kicker">Use one tool—or move through all three</p><h2>Begin with space.<br/>Leave with a vision.</h2><div><a href="https://spaceit.onthe.land/"><span>Start in Space It</span><b>Arrange the shelter ↗</b></a><a href="https://shapeit.onthe.land/"><span>Start in Shape It</span><b>Build the model ↗</b></a><a href="https://shapeit.onthe.land/see-it.html"><span>Start in See It</span><b>Visualize the place ↗</b></a></div></section>
    <SiteFooter/>
  </main>;
}

export default ToolsPage;
