import { useState } from "react";
import SiteFooter from "./SiteFooter.jsx";
import schoolHeroUrl from "./assets/shelter-cards/courtyard-minidv.png";

const chapters = [
  { number: "01", title: "Soils", summary: "Learn what is beneath your feet and whether it can become a wall.", lessons: ["Reading the land", "Simple field tests", "Soil composition", "Mix trials + test blocks"] },
  { number: "02", title: "Foundations", summary: "Move loads safely into the ground and keep water away from the building.", lessons: ["Drainage before concrete", "Setting out the building", "Slabs + footings", "Capillary breaks"] },
  { number: "03", title: "Engineering", summary: "Understand the forces at work and know when local expertise is required.", lessons: ["Loads in plain language", "Walls, openings + spans", "Wind + seismic conditions", "Working with an engineer"] },
  { number: "04", title: "Planning", summary: "Turn a drawing into an ordered, permitted and properly supplied project.", lessons: ["Permits + jurisdiction", "Budgeting the work", "Material takeoffs", "People, tools + sequence"] },
  { number: "05", title: "Building", summary: "Follow the shelter from the first line on the ground to a weather-tight shell.", lessons: ["Layout + excavation", "Formwork + reinforcement", "Making the walls", "Openings, roof + services"] },
  { number: "06", title: "Finishing", summary: "Complete the surfaces, systems and quiet details that make shelter habitable.", lessons: ["Earthen surfaces", "Floors + fixtures", "Water management", "Care + repair"] },
];

const resources = [
  ["01", "Project budget", "A simple cost plan organized around the sequence of the build.", "XLSX"],
  ["02", "Material inventory", "Track what is needed, sourced, delivered and still outstanding.", "XLSX"],
  ["03", "Build schedule", "A practical framework for dependencies, labor and time on site.", "XLSX"],
  ["04", "Calculators", "Working quantities for soil, aggregate, cement, walls and floors.", "XLSX"],
];

function SchoolPage() {
  const [selectedLesson, setSelectedLesson] = useState({ chapter: chapters[0], chapterIndex: 0, lesson: chapters[0].lessons[0], lessonIndex: 0 });
  const lessonNumber = `${selectedLesson.chapter.number}.${String(selectedLesson.lessonIndex + 1).padStart(2, "0")}`;
  const selectLesson = (chapter, chapterIndex, lesson, lessonIndex) => {
    setSelectedLesson({ chapter, chapterIndex, lesson, lessonIndex });
    requestAnimationFrame(() => document.querySelector("#lesson-player")?.scrollIntoView({ behavior: "smooth" }));
  };
  return <main className="school-page">
    <header className="nav school-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><nav><a href="#curriculum">Curriculum</a><a href="#resources">Resources</a></nav><a className="nav-cta" href="/tools/">Design tools ↗</a></header>

    <section className="school-hero" id="top">
      <img src={schoolHeroUrl} alt="Rammed-earth shelter volumes arranged around a courtyard"/>
      <p className="kicker">Shelter School / Free forever</p>
      <h1>Learn how to build with the earth</h1>
      <div><p>A comprehensive guide to building small shelters from the land using rammed earth and lavacrete. Everything from the first soil test to the last window, see it done before you try it on your own.</p><a href="#curriculum">See the curriculum <span>↓</span></a></div>
    </section>

    <section className="school-statement" id="start"><p className="kicker">Knowledge made practical</p><h2>Plans tell you what.<br/>School shows you how.</h2><div><p>Our goal with the Shelter School is to make independent building possible. Every lesson follows the actual order of the build, using simple language, clear demonstrations and insights into tools you can carry into the field.</p></div></section>

    <section className="curriculum" id="curriculum">
      <header><p className="kicker">The complete build</p><h2>From land<br/>to shelter.</h2><p>Move in order or go directly to the work in front of you. Each chapter combines short lessons, demonstrations and downloadable field references.</p></header>
      <div className="chapter-list">{chapters.map((chapter, index) => <article className="chapter" key={chapter.number}>
        <div className="chapter-title"><span className="chapter-number">{chapter.number}</span><h3>{chapter.title}</h3><p>{chapter.summary}</p><span>{chapter.lessons.length} lessons</span></div>
        <ol>{chapter.lessons.map((lesson, i) => <li key={lesson}><button className="lesson-row" onClick={() => selectLesson(chapter, index, lesson, i)}><span>{chapter.number}.{String(i + 1).padStart(2,"0")}</span><b>{lesson}</b><i>{index === 0 && i === 0 ? "Watch first lesson" : "Video lesson"}</i><em>↘</em></button></li>)}</ol>
      </article>)}</div>
    </section>

    <section className="featured-lesson" id="lesson-player">
      <div className="lesson-screen"><div className="soil-lines"/><button aria-label={`Play ${selectedLesson.lesson}`}><span>▶</span></button><p>{lessonNumber} / {selectedLesson.lesson}</p><i>Video lesson</i></div>
      <div className="lesson-copy"><p className="kicker">{lessonNumber} / {selectedLesson.chapter.title}</p><h2>{selectedLesson.lesson}</h2><p>{selectedLesson.chapter.summary} This lesson follows the work in sequence, with a clear demonstration to watch before you begin.</p><a href="#curriculum">Choose another lesson <span>↑</span></a></div>
    </section>

    <section className="field-notes"><p className="kicker">How to use the school</p><div><article><span>01</span><h3>Watch before you build</h3><p>See the whole operation before materials, tools and people are moving.</p></article><article><span>02</span><h3>Carry it into the field</h3><p>Take your notes, and our checklists and calculations, to make the drawings even more buildable.</p></article><article><span>03</span><h3>Know what to ask</h3><p>Learn enough to recognize the decisions that need local expertise, ask sharper questions and make every consultation more productive.</p></article></div></section>

    <section className="school-resources" id="resources"><header><p className="kicker">Free resources</p><h2>The quiet tools<br/>behind a build.</h2><p>Planning documents made for a small, owner-led project. Download them, change them and make them part of your own way of working.</p></header><div className="resource-list">{resources.map(([n,title,copy,type]) => <a href="mailto:build@onthe.land?subject=School resource" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p><i>{type}</i><b>↓</b></a>)}</div></section>

    <section className="school-tool"><p className="kicker">Free digital tools</p><h2>Turn ideas<br/>into plans.</h2><p>Space It and Shape It help you find an arrangement, shape the shelter into your own, place doors and windows, and understand preliminary material quantities as you work.</p><a href="/tools/">Explore the design workflow <span>↗</span></a></section>

    <section className="school-plans"><p className="kicker">LEARN BY BUILDING</p><h2>Choose a shelter.<br/>Follow the build.</h2><p>The lessons refer back to the free shelter plans, giving every demonstration a real dimension, assembly and sequence.</p><a href="/#shelters">Get the free plans <span>↗</span></a></section>

    <section className="school-help" id="consultation"><p className="kicker">Help when you need it</p><h2>Start on your own.<br/>{' '}Know who to call.</h2><p>Book a focused consultation when you need another set of eyes on soil tests, siting, plans, materials or an approaching construction decision, or if problems arise.</p><a href="mailto:build@onthe.land?subject=School consultation">Ask for a consultation <span>↗</span></a><small>Or compare <a href="/packages/">all ways of working →</a></small></section>

    <SiteFooter/>
  </main>;
}

export default SchoolPage;
