import { useEffect, useRef, useState } from "react";
import PageMeta from "./PageMeta.jsx";
import SiteFooter from "./SiteFooter.jsx";
import { languageMeta, longHouseShapeItUrl, spaceItUrl } from "./buildingLanguage.js";
import "./pattern-page.css";

const courts = [
  { title: "Two volumes + court", rooms: ["LIVE", "SLEEP"], copy: "Begin with two complete rooms. Orient their openings toward a useful outdoor room." },
  { title: "Three volumes around one court", rooms: ["LIVE", "SLEEP", "WORK"], copy: "Gather daily life around one shared space, with passages and planting at its edges." },
  { title: "Three volumes / two linked courts", rooms: ["LIVE", "SLEEP", "WORK"], copy: "Let one court welcome people and another hold a quieter part of the day." },
  { title: "Live + work", rooms: ["LIVE", "WORK"], copy: "Keep work nearby, with an outdoor threshold that gives each room its independence." },
  { title: "Grow one volume at a time", rooms: ["LIVE", "FUTURE", "FUTURE"], copy: "Build what is useful now. Leave room for future volumes without treating the court as leftover space." },
];
const rows = [
  { title: "[LIVE] COURT [REST]", rooms: ["LIVE", "COURT", "REST"] },
  { title: "[LIVE] COURT [COOK] COURT [REST]", rooms: ["LIVE", "COURT", "COOK", "COURT", "REST"] },
  { title: "[WORK] COURT [LIVE] COURT [REST]", rooms: ["WORK", "COURT", "LIVE", "COURT", "REST"] },
  { title: "[ROOM] COURT [ROOM] …", rooms: ["ROOM", "COURT", "ROOM", "FUTURE SKY", "FUTURE"] },
];
const principles = [
  ["Follow the line", "Narrow urban and infill sites provide the organizing constraint."],
  ["Share construction", "Use shared walls where adjoining rooms or buildings can share mass. Resolve party walls with the particular site."],
  ["Leave sky", "Courts bring light, air and outdoor life into the depth of the house."],
  ["Open toward the court", "Openings connect enclosed rooms with outdoor rooms while protecting privacy along the edges."],
  ["Vary the rhythm", "Rooms and courts expand or contract according to use. There is no fixed bay or program."],
  ["Stay low / rise once", "One enclosed volume may rise to two stories while the rest stays close to the ground."],
  ["Occupy the roof", "A lower adjacent roof can become a planted or usable deck connected to the taller room."],
  ["Grow along the line", "Extend the sequence when the site and your life allow."],
];

function Arrangement({ rooms, court, index }) {
  if (!court) return <svg viewBox="0 0 680 200" role="img" aria-label={rooms.join(" / ")}>
    <path className="diagram-ground" d="M20 35H660M20 165H660"/>
    {rooms.map((room, i) => { const w = 620 / rooms.length; return <g key={i} className={room.includes("FUTURE") ? "diagram-future" : ""}><rect className={room === "COURT" || room.includes("SKY") || room === "DECK" ? "diagram-sky" : "diagram-room"} x={30 + i * w} y="55" width={w - 8} height="90"/><text x={30 + i * w + (w - 8) / 2} y="104">{room === "COURT" ? room : room === "FUTURE SKY" ? "FUTURE COURT" : `[${room}]`}</text>{room === "TALL" && <path d={`M${38 + i * w} 48h${w - 24}`}/>}</g>; })}
  </svg>;
  const positions = index === 2 ? [[100, 70], [280, 120], [465, 60]] : [[120, 100], [350, 40], [350, 185]];
  return <svg viewBox="0 0 680 340" role="img" aria-label={`${rooms.join(" + ")} around ${index === 2 ? "linked courts" : "a useful outdoor room"}`}>
    {index === 2 ? <><rect className="diagram-sky" x="235" y="70" width="40" height="100"/><rect className="diagram-sky" x="415" y="120" width="40" height="100"/></> : <rect className="diagram-sky" x="258" y="115" width="78" height="125"/>}
    {rooms.map((room, i) => <g key={i} className={room === "FUTURE" ? "diagram-future" : ""}><rect className="diagram-room" x={positions[i][0]} y={positions[i][1]} width="120" height="105"/><text x={positions[i][0]+60} y={positions[i][1]+58}>{room}</text></g>)}
    <text x="340" y="315">OPENINGS / SUN / WIND / LANDSCAPE</text>
  </svg>;
}

export default function PatternPage({ slug, gallery }) {
  const court = slug === "courtyard";
  const name = court ? "Court" : "Long House";
  const meta = languageMeta[slug];
  const places = court ? courts : rows;
  const [active, setActive] = useState(0);
  const [activeMoodboardImage, setActiveMoodboardImage] = useState(null);
  const moodboardRef = useRef(null);
  const toolUrl = court ? spaceItUrl : longHouseShapeItUrl;
  const action = court ? "Space a court" : "Shape a long house";
  useEffect(() => {
    if (court) return;
    const board = moodboardRef.current;
    if (!board) return;
    const figures = [...board.querySelectorAll("figure")];
    const speeds = [0.06, -0.05, 0.07, -0.06];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduceMotion.matches) return;
      const viewport = window.innerHeight;
      const bounds = board.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > viewport) return;
      figures.forEach((figure, index) => {
        const rect = figure.getBoundingClientRect();
        const distance = viewport / 2 - (rect.top + rect.height / 2);
        const shift = Math.max(-24, Math.min(24, distance * speeds[index]));
        figure.style.setProperty("--image-shift", `${shift.toFixed(1)}px`);
      });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [court]);
  useEffect(() => {
    if (!activeMoodboardImage) return;
    const closeOnEscape = (event) => { if (event.key === "Escape") setActiveMoodboardImage(null); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeMoodboardImage]);
  return <main className={`pattern-page ${court ? "court-pattern" : "long-house-pattern"}`}>
    <PageMeta {...meta} path={`/shelters/${slug}/`}/>
    <header className="offgrid-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><nav><a href="#places">Places to start</a><a href="/supported/">Supported</a></nav><a href={toolUrl}>{action} ↗</a></header>
    <section className="pattern-hero"><div><p className="kicker">Pattern / {name}</p><h1>{court ? "Gather around the space between." : "When the land is narrow, build along it."}</h1><p>{court ? "Court is a way of clustering complete Four Walls volumes around useful outdoor rooms. Openings, sun, wind, privacy and landscape help decide where each volume belongs." : "Long House arranges Four Walls along a line. Rooms can share walls where building less makes sense, then open to sky where light, air, privacy and separation matter more."}</p><div className="language-actions"><a href={toolUrl}>{action} ↗</a><a href="#places">See places to start ↓</a></div></div><img src={gallery[0][0]} srcSet={court ? `${gallery[0][1]} 800w, ${gallery[0][0]} ${gallery[0][4]}w` : undefined} sizes="(max-width: 760px) 100vw, 65vw" alt={gallery[0][2]} fetchPriority="high"/></section>
    <section className="pattern-logic"><header><p className="kicker">{court ? "Cluster / The relationships" : "Row / The rhythm"}</p><h2>{court ? "The court is a room with the sky for a roof." : "Room / sky / room / sky / room"}</h2><p>{court ? "Begin with Four Walls. Place an opening. Turn toward light, shelter from wind and make room for another volume. Give the outdoor room its own purpose, proportions and edges." : "The architecture is a rhythm, not a fixed floor plan. Complete rooms, opaque side walls and open-sky courts give a narrow site depth, light and places to pause."}</p></header><Arrangement court={court} rooms={court ? courts[1].rooms : rows[1].rooms} index={1}/>{court ? <div className="pattern-principles">{[["Begin with the opening", "Decide what each room looks toward, and where its threshold meets outdoor life."], ["Orient to the place", "Read sun, wind, privacy, paths and existing landscape before adding another room."], ["Give space a purpose", "A court can be a garden, a gathering place or a quiet retreat. It is positive space, not leftover setback."]].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div> : <div className="pattern-principles">{principles.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>}</section>
    <section className="pattern-places" id="places"><header><p className="kicker">Places to start</p>{court && <p>Try different relationships between complete volumes and outdoor rooms.</p>}</header><div className="pattern-explorer"><div className="pattern-options" role="group" aria-label={`${name} starting arrangements`}>{places.map((place, i) => <button key={place.title} aria-pressed={active === i} onClick={() => setActive(i)}><span>0{i+1}</span>{place.title}<b>{active === i ? "−" : "+"}</b></button>)}<a className="pattern-tool-button" href={toolUrl}>{action} <span>↗</span></a></div><div className="pattern-preview" aria-live="polite"><Arrangement court={court} rooms={places[active].rooms} index={active}/><h3>{places[active].title}</h3><p>{places[active].copy || "A starting relationship to explore, with dimensions and uses shaped by your site."}</p><p className="pattern-caption">Concept diagram / No fixed scale</p></div></div></section>
    {court ? <><section className="pattern-photo"><img src={gallery[1][0]} srcSet={`${gallery[1][1]} 800w, ${gallery[1][0]} ${gallery[1][4]}w`} sizes="100vw" alt={gallery[1][2]} loading="lazy"/><p>{gallery[1][3]}</p></section><section className="support"><p className="kicker">Develop with Supported</p><h2>The pattern can repeat. The project cannot.</h2><p>Once several volumes meet a real site, foundations, drainage, structure, services, code and construction details become specific to that place.</p><a href={`/supported/?plan=${slug}`}>Develop it with Supported →</a></section></> : <div className="long-house-transition"><div className="long-house-moodboard-run"><section className="pattern-moodboard" ref={moodboardRef} aria-label="Long House image studies">{gallery.slice(1).map(([src, , alt, caption], index) => <figure key={caption}><button className="moodboard-open" type="button" onClick={() => setActiveMoodboardImage({ src, alt, caption })} aria-label={`View image: ${caption}`}><img src={src} alt="" loading="lazy" decoding="async"/><span className="moodboard-expand" aria-hidden="true">↗</span></button><figcaption><span>0{index + 1}</span>{caption}</figcaption></figure>)}</section></div><section className="support"><p className="kicker">Develop with Supported</p><h2>Design it yourself.<br/>With help.</h2><p>Turning the pattern into a building means resolving the particular lot, party walls, structure, stairs, services, drainage, code and construction. Explore our support packages if you need a hand.</p><a href={`/supported/?plan=${slug}`}>Develop it with Supported →</a></section></div>}
    {activeMoodboardImage && <div className="moodboard-lightbox" role="dialog" aria-modal="true" aria-label={activeMoodboardImage.caption} onClick={() => setActiveMoodboardImage(null)}><button className="lightbox-close" type="button" onClick={() => setActiveMoodboardImage(null)} aria-label="Close image">×</button><img src={activeMoodboardImage.src} alt={activeMoodboardImage.alt}/><p>{activeMoodboardImage.caption}</p></div>}
    <section className="pattern-related"><a href="/shelters/four-walls/">Return to the seed / Four Walls plans →</a><a href={court ? "/shelters/long-house/" : "/shelters/courtyard/"}>Explore {court ? "Long House" : "Court"} →</a></section><SiteFooter/>
  </main>;
}
