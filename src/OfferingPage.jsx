import PageMeta from "./PageMeta.jsx";
import SiteFooter from "./SiteFooter.jsx";

const offerings = {
  supported: {
    number: "03", name: "Supported", price: "$1,000", tone: "supported",
    heading: "Get ready<br/>to build.", workHeading: "Make the plan permit-ready.", intro: "For a project with a direction that needs thoughtful preparation before construction begins. Bring a Shelter plan or plans of your own; we work through the decisions that shape the build.",
    includes: ["Review the plan and the place it will sit", "Work through siting and orientation", "Discuss plan adaptations within an agreed scope", "Prepare for local permit conversations"],
    outcome: "A clearer project ready to move toward construction, with local requirements identified and next steps agreed.",
    process: ["Tell us about your project", "We review the brief and reply with a useful next step", "We agree a written scope before work begins", "Work through the pre-construction decisions together"],
  },
  guided: {
    number: "04", name: "Guided", price: "$5,000", tone: "guided",
    heading: "Build with<br/>us beside you.", workHeading: "Stay supported through the build.", intro: "For an owner-builder or local team that wants Shelter involved as the project moves from drawings into the field. You lead the build; we help you think through decisions as they arise.",
    includes: ["Pre-construction work covered by Supported", "Construction consultations within the agreed duration", "Review of site photos or video at key moments", "Discussion of construction-stage questions and changes"],
    outcome: "A working relationship that carries design intent through an agreed construction period.",
    process: ["Tell us about your project", "We review the brief and reply with a useful next step", "We agree a written scope and project duration", "Work together through preparation and construction"],
  },
};

const faqs = [
  ["Can I bring my own plans?", "Yes. Tell us what you have in the project brief so we can understand what kind of review or adaptation would be useful."],
  ["Do I need land already?", "No. You can begin the conversation while exploring or looking for land. The useful next step will depend on how far along you are."],
  ["Where do you work?", "Start by sharing your approximate project location. We’ll consider the location and local requirements when reviewing whether we can help."],
  ["What does permit preparation include?", "We can work through the information and plan changes needed for a local permit conversation. The exact drawings, review rounds and communication responsibilities belong in the written scope for your project."],
  ["Does this include engineering, surveys or permit fees?", "Those are local project needs and are not included in the listed Shelter fee. Any required local professional services, tests, submissions and fees are arranged for the project."],
  ["Who handles permits and construction decisions?", "The project owner and local professionals remain responsible for local approvals and on-site work. We’ll define Shelter’s role in writing before work begins."],
  ["How many meetings or revisions are included?", "We agree the meetings, revisions, response expectations and duration in a written scope for your project before kickoff."],
  ["What if the project changes or pauses?", "We’ll discuss changes, extended time or additional work before proceeding. The written scope will set out how these are handled."],
  ["Can I move from Supported to Guided?", "Yes, when the project and availability fit. We’ll explain any fee treatment and revised scope in writing before changing the engagement."],
  ["Does the Starting Point session count toward this service?", "The currently advertised $200 Starting Point fee is credited toward Supported or Guided if you continue. We’ll confirm the credit in your written scope."],
  ["What about cancellation or refunds?", "Any cancellation or refund terms will be set out in the written scope before you accept the work."],
];

function OfferingPage({ kind }) {
  const offer = offerings[kind];
  const briefHref = `/project/?offering=${kind}&source=${kind}`;
  const [firstLine, secondLine] = offer.heading.split("<br/>");
  return <main className={`offering-page offering-${offer.tone}`}>
    <PageMeta title={`${offer.name} — Shelter on the Land`} description={offer.intro} path={`/${kind}/`}/>
    <header className="nav offering-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><a className="nav-cta" href="/packages/">Compare paths ↗</a></header>
    <section className="offering-hero">
      <div className="offering-hero-top"><span>{offer.number} / {offer.name.toUpperCase()}</span></div>
      <h1>{firstLine}<br/>{secondLine}</h1>
      <div className="offering-hero-bottom"><p>{offer.intro}</p><a href={briefHref}>Tell us about your project <span>↗</span></a></div>
    </section>
    <section className="offering-overview"><p className="funnel-eyebrow">{offer.name.toUpperCase()}</p><div><h2>Help where<br/>it matters.</h2><p>{offer.outcome}</p></div><div className="offering-price"><span>CURRENTLY ADVERTISED FEE</span><strong>{offer.price}</strong><p>The deliverables, schedule and any project-specific conditions are set out in a written scope before work begins.</p></div></section>
    <section className="offering-includes"><div><p className="funnel-eyebrow">WHERE WE COME IN</p><h2>{offer.workHeading}</h2></div><ol>{offer.includes.map((item, i) => <li key={item}><span>{String(i+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol></section>
    <section className="offering-process"><p className="funnel-eyebrow">HOW WE KICK OFF</p><h2>Begin with<br/>the project.</h2><div>{offer.process.map((item, i) => <p key={item}><span>{String(i+1).padStart(2,"0")}</span>{item}</p>)}</div></section>
    <section className="offering-responsibilities"><p className="funnel-eyebrow">THE LOCAL WORK</p><h2>The work<br/>stays local.</h2><p>You and your local team make site and construction decisions, arrange required surveys, testing, engineering and inspections, and work with the local building department. Shelter’s role and any additional work are defined in the written scope.</p></section>
    <details className="offering-faq" id="questions"><summary className="offering-faq-toggle"><span className="funnel-eyebrow">PRACTICAL QUESTIONS</span><h2>Good to know.</h2><span className="offering-faq-action">View questions <b aria-hidden="true">+</b></span></summary><div className="offering-faq-content">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></details>
    <section className="offering-next"><p className="funnel-eyebrow">YOUR LAND / YOUR BUILD</p><h2>Tell us what<br/>you’re making.</h2><p>Share what you know so far. We’ll read the brief and reply with a useful next step.</p><a className="funnel-primary" href={briefHref}>Tell us about your project <span>↗</span></a></section>
    <SiteFooter/>
  </main>;
}

export default OfferingPage;
