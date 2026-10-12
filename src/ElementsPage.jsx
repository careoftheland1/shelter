import ElementsSequence from './ElementsSequence.jsx';
import PageMeta from './PageMeta.jsx';
import SiteFooter from './SiteFooter.jsx';

export default function ElementsPage() {
  return <main className="elements-page">
    <PageMeta
      title="Water, Earth & Time — Shelter on the Land"
      description="An animated study of water, earth, and time in earthen building."
      path="/elements/"
    />
    <header className="nav">
      <a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <nav><a href="/#shelters">Shelters</a></nav>
      <a className="nav-cta" href="/">Back to home ↗</a>
    </header>
    <ElementsSequence />
    <SiteFooter />
  </main>;
}
