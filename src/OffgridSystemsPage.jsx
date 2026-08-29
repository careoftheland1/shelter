const systems = [
  { n:"01", id:"wash", verb:"Wash.", tech:["Pump showers","Solar water heating","Solar distillation"], line:"Carry it. Pump it. Heat it." },
  { n:"02", id:"warm", verb:"Keep warm.", tech:["Sand batteries","Open-vessel hydronic heat"], line:"Make heat when energy is available. Store it simply. Use it when it isn't." },
  { n:"03", id:"cook", verb:"Cook.", tech:["Insulated solar-electric cookers","Insulated ovens"], line:"Keep the heat in, and cooking begins to require much less energy." },
  { n:"04", id:"cold", verb:"Keep cold.", tech:["Built-in 12V chest refrigerators","Built-in 12V chest freezers"], line:"Top-opening. Highly insulated. Low voltage." },
  { n:"05", id:"go", verb:"Go.", tech:["Compost toilets","Dry sanitation"], line:"Don't add water to what doesn't need it." },
  { n:"06", id:"return", verb:"Return.", tech:["Constructed wetlands","Greywater treatment","Landscape reuse"], line:"Treat water close to where it was used and return it to the landscape." },
];

const principles = [
  ["Common parts.","Understandable, replaceable, adaptable."],
  ["Small loads.","Reduce the problem before increasing the system."],
  ["Low voltage where possible.","Keep useful systems close to the electricity the panels and batteries provide."],
  ["Store energy simply.","Water. Sand. Insulation. Thermal mass."],
  ["Separate systems.","A failure in one shouldn't take down the house."],
  ["Minimal supply chains.","Build from materials available almost anywhere."],
  ["Repair over replacement.","If you built it, you should have a reasonable chance of fixing it."],
];

function ShelterIndexDrawing(){return <svg className="og-thesis-drawing" viewBox="0 0 620 470" aria-hidden="true">
  <path d="M92 174 264 96l205 71-180 87zM92 174v172l197 74V254m180-87v170l-180 83M167 375V270l64 24v105M335 232l70-31v69l-70 32z"/>
  {[["01",120,132,78,72],["02",466,145,534,112],["03",212,380,157,432],["04",391,264,477,278],["05",332,390,395,442],["06",94,316,36,349]].map(([t,x,y,lx,ly])=><g key={t}><circle cx={x} cy={y} r="4"/><path d={`M${x} ${y} ${lx} ${ly}`}/><text x={lx} y={ly-8}>{t}</text></g>)}
 </svg>}

function SystemDrawing({id}){
  const common = {viewBox:"0 0 480 250", "aria-hidden":"true"};
  if(id==="wash") return <svg {...common}><path d="M64 190h145V82H64zM78 82V57h117v25m-58 108v30m-46 0h92M310 59v151m0-136c55 0 79 40 79 80M389 154v56m-24-31 24 31 24-31M209 142h101"/><circle cx="209" cy="142" r="14"/><path className="og-accent" d="M328 78c10 11 10 20 0 30-10-10-10-19 0-30z"/></svg>;
  if(id==="warm") return <svg {...common}><path d="M52 53h169v154H52zM70 72h133v116H70zM89 92h95m-95 22h95m-95 22h95m-95 22h95M221 101h79v82h94V69h-51v114m-43-41h43"/><path className="og-flow" d="M238 113h45m-15-9 15 9-15 9M326 167h-44m15-9-15 9 15 9"/></svg>;
  if(id==="cook") return <svg {...common}><path d="M72 69h260v142H72zM91 88h222v104H91zM122 115h158v77M332 105l77 35-77 34M122 115l43 28h115"/><path className="og-accent" d="M167 143c20-30 45-30 65 0-18 30-46 30-65 0z"/><path className="og-flow" d="m375 61-22 47m48-31-31 39"/></svg>;
  if(id==="cold") return <svg {...common}><path d="M75 81h286v137H75zM94 102h248v97H94zM75 81l45-36h286l-45 36M120 45v36m286-36v137l-45 36M260 102v97"/><path className="og-flow" d="M182 65h117m-15-9 15 9-15 9"/><path className="og-accent" d="m207 125 10 12 10-12m-10 12v33m-17-10 17 10 17-10"/></svg>;
  if(id==="go") return <svg {...common}><path d="M108 48h179v56H108zM128 104h139l-15 116H143zM287 64h74v156h-74M155 126h86m-73 20h60m-49 20h38"/><path className="og-flow" d="M197 49V22m-10 15 10-15 10 15"/><path className="og-accent" d="M312 191h25"/></svg>;
  return <svg {...common}><path d="M34 175c60-44 117-44 173 0 58 45 117 45 177 0M34 207h350M80 175v-61m58 61V80m60 95v-72m61 72V69m58 106v-61M65 114h30m28-34h30m30 23h30m31-34h30m28 45h30"/><path className="og-flow" d="M27 52h375m-17-10 17 10-17 10"/><path className="og-accent" d="M59 159c38-28 72-28 105 0m111 0c26-20 52-20 78 0"/></svg>;
}

export default function OffgridSystemsPage(){return <main className="og-page">
  <PageMeta title="Off-Grid Systems for Small Shelters — Shelter on the Land" description="Free plans and guides for understandable water, heat, cooking, cooling and sanitation systems that work without the grid or pipe." path="/offgrid/"/>
  <header className="og-nav"><a href="/offgrid/">offgrid&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><nav><a href="#systems">Systems</a><a href="#guides">Guides</a><a href="#experiments">Experiments</a><a href="#about">About</a></nav></header>
  <section className="og-hero"><p className="kicker">Systems for a small shelter</p><h1>Opt out</h1><p className="og-hero-copy">Free plans and guides for the systems<br/>that make a shelter work without the grid<br/>or the pipe.</p><ol>{["Water","Heat","Cold","Cooking","Washing","Waste"].map(x=><li key={x}>{x}</li>)}</ol></section>
  <section className="og-thesis" id="about"><div><p className="kicker">The whole shelter</p><h2>everything<br/>a shelter<br/>needs.</h2><strong>Nothing it needs to connect to.</strong><div className="og-split"><p><b>Off grid</b>power<br/>heat<br/>cold<br/>cooking</p><p><b>Off pipe</b>water<br/>washing<br/>sanitation<br/>wastewater</p></div></div><figure><ShelterIndexDrawing/><figcaption>01 power · 02 water · 03 heat · 04 cold · 05 sanitation · 06 return</figcaption></figure></section>
  <section className="og-systems" id="systems"><header><p className="kicker">Six ordinary needs</p><h2>The systems.</h2><p>Organized around what you need to do—not what you need to buy.</p></header><div className="og-system-grid">{systems.map(s=><article key={s.id}><span>{s.n} / 06</span><h3>{s.verb}</h3><div className="og-system-tech">{s.tech.map(t=><p key={t}>{t}</p>)}</div><SystemDrawing id={s.id}/><p className="og-system-line">{s.line}</p><a href={`#${s.id}`}>See the system <b>→</b></a></article>)}</div></section>
  <section className="og-principles" id="experiments"><header><p className="kicker">Design principles</p><h2>Built to be<br/>understood.</h2></header><ol>{principles.map(([title,copy],i)=><li key={title}><span>{String(i+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol></section>
  <section className="og-free" id="guides"><p className="kicker">Plans, parts lists, diagrams + experiments</p><h2>Free to build.</h2><div><p>Plans, parts lists, diagrams, experiments and what we've learned.</p><p>Take them. Build them. Change them. Make them better.</p><a href="#systems">Explore the guides <span>→</span></a></div></section>
  <footer className="og-footer"><a href="/offgrid/">offgrid.onthe.land</a><nav><a href="#about">About</a><a href="#guides">License</a><a href="/privacy/">Privacy</a><a href="mailto:hello@onthe.land">Contact</a></nav><p>Small systems for small shelters.</p><span>© 2026 ON THE LAND</span></footer>
 </main>}
import PageMeta from "./PageMeta.jsx";
