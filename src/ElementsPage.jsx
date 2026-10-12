import { useState } from 'react';
import ElementsSequence from './ElementsSequence.jsx';
import ParticleCubeAssembly from './ParticleCubeAssembly.jsx';
import PageMeta from './PageMeta.jsx';
import SiteFooter from './SiteFooter.jsx';
import './particle-experiments.css';

export default function ElementsPage() {
  const [variant, setVariant] = useState('four');

  return <main className="elements-page">
    <PageMeta
      title="Experiments — Shelter on the Land"
      description="Motion studies of water, earth, time and particle-built shelter clusters."
      path="/elements/"
    />
    <header className="nav">
      <a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a>
      <nav><a href="#particle-studies">Particle studies</a><a href="/#shelters">Shelters</a></nav>
      <a className="nav-cta" href="/">Back to home ↗</a>
    </header>
    <ElementsSequence />
    <section className="particle-experiments" id="particle-studies" aria-label="Particle cluster studies">
      <header className="particle-experiments__header">
        <p className="kicker">Experiments / Particle clusters</p>
        <h2>ROOMS GATHER<br/>AROUND SPACE.</h2>
        <p>Two studies of small shelter volumes gathering around an open court. Choose a layout, then scroll to assemble it.</p>
        <div className="particle-experiments__options" role="group" aria-label="Choose a particle cluster study">
          <button type="button" aria-pressed={variant === 'four'} onClick={() => setVariant('four')}>01 / Four volumes</button>
          <button type="button" aria-pressed={variant === 'six'} onClick={() => setVariant('six')}>02 / Six volumes</button>
        </div>
      </header>
      <div className="particle-experiment-run" key={variant}>
        <ParticleCubeAssembly variant={variant}/>
      </div>
    </section>
    <SiteFooter />
  </main>;
}
