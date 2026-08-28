import SiteFooter from "./SiteFooter.jsx";

function SpaceDiagram() {
  return <svg viewBox="0 0 640 420" aria-hidden="true">
    <g className="tool-built"><rect x="54" y="68" width="150" height="104"/><rect x="242" y="42" width="142" height="112"/><rect x="420" y="92" width="158" height="106"/><rect x="88" y="246" width="164" height="110"/><rect x="382" y="254" width="150" height="102"/></g>
    <path className="tool-void" d="M224 179 389 163 419 231 353 288 257 267z"/>
    <path className="tool-thread" d="M204 120h38m142-20 36 42M171 172l-20 74m101 55 130 4m75-107-10 56"/>
  </svg>;
}

function ShapeDiagram() {
  return <svg viewBox="0 0 640 420" aria-hidden="true">
    <path className="tool-volume" d="m86 117 166-70 153 61-169 77zM86 117v169l150 78V185m169-77v170l-169 86"/>
    <path className="tool-opening" d="m127 201 54 27v81l-54-28zM291 192l65-28v55l-65 29z"/>
    <path className="tool-measure" d="M455 87v205m-15-190 15-15 15 15m-30 175 15 15 15-15M91 337l145 75 170-74"/>
  </svg>;
}

function SeeDiagram() {
  return <svg viewBox="0 0 640 420" aria-hidden="true">
    <rect className="tool-frame" x="52" y="42" width="536" height="336"/>
    <path className="tool-land" d="M52 291c81-36 137-42 205-14 76 31 123-47 199-40 48 4 84 26 132 48v93H52z"/>
    <path className="tool-shelter" d="m183 241 108-48 133 38-112 54zM183 241v70l129 40v-66m112-54v65l-112 55"/>
    <circle className="tool-sun" cx="487" cy="116" r="35"/>
    <path className="tool-rays" d="m455 151-80 83m106-70-43 65m91-74-29 64"/>
  </svg>;
}

function ToolsPage() {
  return <main className="tools-page">
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
      <div className="tool-stage-copy"><h3>Make the idea measurable.</h3><p>Open a Space It starting point—or begin with a single volume—and work at the scale of an actual shelter. Set dimensions, wall systems, roofs and openings while the model keeps the material implications visible.</p><ul><li>Move and refine individual or grouped volumes</li><li>Set wall thickness, material and roof form</li><li>Place and size doors and windows</li><li>Export a dimensioned plan and material takeoff</li></ul><a href="https://shapeit.onthe.land/">Open Shape It <span>↗</span></a></div>
    </section>

    <section className="tools-handoff"><span>SHAPE IT</span><i>02</i><b>Capture the chosen view</b><em>→</em><i>03</i><b>Bring it into the landscape</b><span>SEE IT</span></section>

    <section className="tool-stage tool-stage-see" id="see-it">
      <header><span>03 / 03</span><p className="kicker">Visualize light + material + place</p><h2>See It</h2></header>
      <div className="tool-stage-visual"><SeeDiagram/></div>
      <div className="tool-stage-copy"><h3>See what the drawing could become.</h3><p>Carry a view from Shape It into a focused visualization tool. Describe the landscape, light, material and atmosphere while the shelter's underlying composition stays in view.</p><ul><li>Begin with a Shape It capture or another source image</li><li>Describe the land, season, light and feeling</li><li>Explore alternate frames and visual directions</li><li>Save a set of images to guide the project forward</li></ul><a href="https://shapeit.onthe.land/see-it.html">Open See It <span>↗</span></a></div>
    </section>

    <section className="tools-begin" id="begin"><p className="kicker">Use one tool—or move through all three</p><h2>Begin with space.<br/>Leave with a vision.</h2><div><a href="https://spaceit.onthe.land/"><span>Start in Space It</span><b>Arrange the shelter ↗</b></a><a href="https://shapeit.onthe.land/"><span>Start in Shape It</span><b>Build the model ↗</b></a><a href="https://shapeit.onthe.land/see-it.html"><span>Start in See It</span><b>Visualize the place ↗</b></a></div></section>
    <SiteFooter/>
  </main>;
}

export default ToolsPage;
