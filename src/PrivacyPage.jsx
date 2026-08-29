import PageMeta from "./PageMeta.jsx";
import SiteFooter from "./SiteFooter.jsx";

function PrivacyPage() {
  return <main className="privacy-page">
    <PageMeta
      title="Privacy — Shelter on the Land"
      description="How Shelter on the Land handles website analytics, email correspondence and information shared through linked services."
      path="/privacy/"
    />

    <header className="privacy-nav">
      <a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <a href="/">Back to shelter ↗</a>
    </header>

    <article className="privacy-content">
      <header>
        <p className="kicker">Privacy notice / Effective August 29, 2026</p>
        <h1>A small site.<br/>A small data footprint.</h1>
        <p>Shelter on the Land uses limited information to operate, secure and improve this website, and to respond when you choose to get in touch. We do not sell personal information or use advertising trackers.</p>
      </header>

      <section>
        <span>01</span>
        <div><h2>What this site collects</h2><p>You can browse this site without creating an account or submitting a form. Cloudflare hosts and secures the site and may process technical request information needed to deliver it, protect it from abuse and diagnose problems.</p><p>Cloudflare Web Analytics measures aggregate visits, pages viewed, referring sites, approximate country, device and browser type, and page-performance information such as Core Web Vitals. It is configured without advertising pixels, cross-site identifiers, session replay or a tag manager.</p></div>
      </section>

      <section>
        <span>02</span>
        <div><h2>Email and project conversations</h2><p>If you email us, we receive the address you use and anything you include in the message or attachments. We use that information to answer your question, discuss a plan or service, and maintain the resulting working correspondence.</p><p>Please do not send sensitive personal, financial or health information. Email is not a secure construction-document portal.</p></div>
      </section>

      <section>
        <span>03</span>
        <div><h2>Cookies and tracking</h2><p>Cloudflare Web Analytics is a cookie-free analytics service and is not used to follow individual visitors across websites. Shelter on the Land does not currently use advertising or marketing cookies.</p><p>Cloudflare may use strictly necessary cookies or similar measures for security features when required. If we later add checkout, scheduling, accounts, uploads or other services, this notice will be updated before those features are introduced.</p></div>
      </section>

      <section>
        <span>04</span>
        <div><h2>Who handles information</h2><p>Cloudflare provides website hosting, delivery, security and aggregate analytics. Email providers and their infrastructure process messages you send us. We share information only as needed to operate these services, respond to you, comply with law or protect the site and its users.</p><p>Links to Space It, Shape It, See It and other websites open separate services. Their own notices apply once you leave this site.</p></div>
      </section>

      <section>
        <span>05</span>
        <div><h2>Retention and your choices</h2><p>Aggregate analytics is retained according to Cloudflare’s current service settings. Email correspondence is kept only as long as it remains useful for the conversation, the work, recordkeeping or legal obligations.</p><p>You may ask what personal information we hold about you, request a correction or deletion where applicable, or raise a privacy question by emailing <a href="mailto:build@onthe.land?subject=Privacy question">build@onthe.land</a>. Applicable rights and exceptions depend on where you live.</p></div>
      </section>

      <section>
        <span>06</span>
        <div><h2>Changes to this notice</h2><p>We will revise this page when the site’s data practices materially change and update the effective date above. This notice describes the website as it operates today.</p></div>
      </section>
    </article>

    <SiteFooter />
  </main>;
}

export default PrivacyPage;
