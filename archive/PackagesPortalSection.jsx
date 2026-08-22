// Archived from the packages page on 2026-08-21.
// Restore by importing and rendering <PackagesPortalSection /> in PackagesPage.jsx.

const portalItems = [
  ["01", "One source of truth", "Current drawings, specifications, site photographs and meeting notes stay together—not scattered across inboxes."],
  ["02", "Decisions made visible", "Open questions, approvals and next actions are recorded so everyone knows what has changed and why."],
  ["03", "Help in the field", "Share a photograph or question from the build and keep the response connected to the right detail or milestone."],
];

export default function PackagesPortalSection() {
  return <section className="portal">
    <header>
      <p className="kicker">The project portal / In development</p>
      <h2>A clear place<br/>for the work.</h2>
      <p>Supported, Guided and Custom projects will share a simple online workspace built around the realities of making a building.</p>
    </header>
    <div className="portal-window">
      <div className="portal-top"><span>S—01 / The Four Walls</span><span>Build overview</span><i>24% complete</i></div>
      <div className="portal-body">
        <aside><b>Overview</b><span>Drawings</span><span>Decisions <i>3</i></span><span>Site log</span><span>Conversations</span></aside>
        <div className="portal-content">
          <p>Next milestone</p><h3>Confirm the building on the land</h3><div className="progress"><i/></div>
          <dl><div><dt>Current drawing</dt><dd>A—101 / Site plan v.03</dd></div><div><dt>Next conversation</dt><dd>Friday / 10:00 Arizona</dd></div><div><dt>Open decisions</dt><dd>3 items need attention</dd></div></dl>
        </div>
      </div>
    </div>
    <div className="portal-points">{portalItems.map(([n, title, copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </section>;
}
