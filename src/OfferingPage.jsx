import PageMeta from "./PageMeta.jsx";
import SiteFooter from "./SiteFooter.jsx";

const offerings = {
  supported: {
    number: "03", name: "Supported", price: "$1,000", tone: "supported",
    heading: "Get ready<br/>to build.", workHeading: "Make the plan permit-ready.", intro: "For a project with a direction that needs thoughtful preparation before construction begins. Bring a Shelter plan or plans of your own; we work through the decisions that shape the build.",
    includes: ["Review the plan and the place it will sit", "Work through siting and orientation", "Discuss plan adaptations within an agreed scope", "Prepare for local permit conversations"],
    outcome: "A plan adapted to the site and prepared for local permit review.",
    process: ["Tell us about your project", "We review the brief and reply with a useful next step", "We agree a written scope before work begins", "Work through the pre-construction decisions together"],
  },
  guided: {
    number: "04", name: "Guided", price: "$5,000", tone: "guided",
    heading: "Build with<br/>us beside you.", workHeading: "Stay supported through the build.", intro: "For an owner-builder or local team that wants Shelter involved as the project moves from drawings into the field. You lead the build; we help you think through decisions as they arise.",
    includes: ["Pre-construction work covered by Supported", "Construction consultations within the agreed duration", "Review of site photos or video at key moments", "Discussion of construction-stage questions and changes"],
    outcome: "When you’re ready to build.",
    process: ["Tell us about your project", "We review the brief and reply with a useful next step", "We agree a written scope and project duration", "Work together through preparation and construction"],
  },
};

const faqs = {
  supported: [
    ["Can I use plans of my own?", "Yes. Bring the plans you have. We’ll review them and agree what adaptation the project needs before work begins."],
    ["Do I need land before starting?", "No. We can discuss a project while you look for land. Site-specific plan work begins once there is a site to assess."],
    ["What does “permit-ready” mean?", "The plan has been adapted to the known site and prepared for local permit review within the agreed scope. It does not mean the building department has approved it or that approval is guaranteed."],
    ["What exactly does permit preparation include?", "We review the plan and site, work through siting and agreed adaptations, and prepare the drawings and information named in your written scope for local review."],
    ["Who submits to and communicates with the building department?", "You or your local professional handle submissions and direct communication unless Shelter’s role is expressly included in the written scope."],
    ["Are engineering, surveys, soils testing, stamps, permit fees, and other local professional services included?", "No. You arrange and pay for those services and fees where required. We can identify what the project may need as part of the agreed work."],
    ["How many plan changes or revision rounds are included?", "The written scope states the included changes and revision rounds before work begins. Further revisions are discussed and scoped before they are undertaken."],
    ["What if the building department requests changes?", "Share the comments with us. We’ll review which changes fall within the agreed permit response work and discuss any additional work before proceeding."],
    ["When does Supported end?", "Supported ends when the agreed pre-construction plan work and permit preparation are delivered, including any permit response rounds in the written scope."],
    ["Can I move from Supported into Guided?", "Yes, if the project and timing fit. We’ll set out the construction support, duration, and treatment of your Supported fee in a new written scope."],
    ["How does the Starting Point credit work?", "If you’ve paid $200 for a Starting Point working session and continue into Supported, that $200 is credited toward the Supported fee. Starting Point is optional; you can inquire about Supported directly."],
  ],
  guided: [
    ["Does Guided include the Supported phase?", "Yes. Guided includes the agreed site, plan, and permit preparation work of Supported, followed by design advice through the agreed construction period."],
    ["When should I contact Shelter during construction?", "Bring questions to the agreed consultations, or contact us when a site condition or build decision needs design input. The working rhythm is set in your written scope."],
    ["What kinds of site questions can Shelter help work through?", "We can discuss how field conditions affect the plan, openings, materials, details, and design intent. Decisions requiring local engineering or approval go to the appropriate local professional."],
    ["Can you review site photos and video?", "Yes. Send photos or video at key moments so we can discuss the condition or question. Remote review does not replace an on-site inspection."],
    ["What happens when field conditions require a design change?", "We’ll discuss the change and its effect on the design. Any revised drawings, local professional review, or work outside the agreed scope will be confirmed before it is undertaken."],
    ["What response time should I expect during an active build?", "The written scope sets the consultation rhythm and response expectations for your build. Guided does not provide continuous availability."],
    ["How long does Guided last?", "Guided runs for the construction period agreed in writing before work begins."],
    ["What if the project pauses or runs beyond the agreed duration?", "Tell us when the schedule changes. We’ll discuss continued support and confirm any revised duration or fee in writing."],
    ["Is Shelter supervising the jobsite?", "No. Guided is advisory and design support through construction. Continuous site supervision is included only if separately agreed in writing."],
    ["Who is responsible for contractors, inspections, safety, sequencing, and on-site decisions?", "You and your local team remain responsible for those parts of the build. Shelter helps work through design questions within the agreed scope."],
    ["Are engineering and other local professional services included?", "No. You arrange and pay for required engineering, surveys, testing, stamps, inspections, and other local professional services."],
    ["How does the Starting Point credit work?", "If you’ve paid $200 for a Starting Point working session and continue into Guided, that $200 is credited toward the Guided fee. Starting Point is optional; you can inquire about Guided directly."],
  ],
};

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
    <section className="offering-overview"><p className="funnel-eyebrow">{offer.name.toUpperCase()}</p><div><h2>Help where<br/>it matters.</h2><p>{offer.outcome}</p></div><div className="offering-price"><span>Fee — </span><strong>{offer.price}</strong><p>Final scope is confirmed in writing before work begins. Additional work outside the agreed scope is discussed before it is undertaken.</p></div></section>
    <section className="offering-includes"><div><p className="funnel-eyebrow">WHERE WE COME IN</p><h2>{offer.workHeading}</h2></div><ol>{offer.includes.map((item, i) => <li key={item}><span>{String(i+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol></section>
    <section className="offering-process"><p className="funnel-eyebrow">HOW WE KICK OFF</p><h2>Begin with<br/>the project.</h2><div>{offer.process.map((item, i) => <p key={item}><span>{String(i+1).padStart(2,"0")}</span>{item}</p>)}</div></section>
    <section className="offering-responsibilities"><p className="funnel-eyebrow">THE LOCAL WORK</p><h2>The work<br/>stays local.</h2><p>You and your local team make site and construction decisions, arrange required surveys, testing, engineering and inspections, and work with the local building department. Shelter’s role and any additional work are defined in the written scope.</p></section>
    <details className="offering-faq" id="questions"><summary className="offering-faq-toggle"><span className="funnel-eyebrow">PRACTICAL QUESTIONS</span><h2>Good to know.</h2><span className="offering-faq-action">View questions <b aria-hidden="true">+</b></span></summary><div className="offering-faq-content">{faqs[kind].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></details>
    <section className="offering-next"><p className="funnel-eyebrow">YOUR LAND / YOUR BUILD</p><h2>Tell us what<br/>you’re making.</h2><p>Share what you know so far. We’ll read the brief and reply with a useful next step.</p><a className="offering-next-link" href={briefHref}>Tell us about your project <span>↗</span></a></section>
    <SiteFooter/>
  </main>;
}

export default OfferingPage;
