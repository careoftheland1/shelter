import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fourWallsModelUrl from "./assets/lavacrete-200.glb?url";
import courtyardModelUrl from "./assets/courtyard-cluster.glb?url";
import lavacreteTextureUrl from "./assets/lavacrete-texture.jpg";
import csreTextureUrl from "./assets/csre-texture.jpg";
import courtyardApproachUrl from "./assets/header-alternates/opposing-courtyard-minidv.webp";
import courtyardApproachSmallUrl from "./assets/header-alternates/opposing-courtyard-minidv-800.webp";
import longHouseOneUrl from "./assets/shelter-cards/long-house-minidv.webp";
import longHouseOneSmallUrl from "./assets/shelter-cards/long-house-minidv-800.webp";
import longHouseTwoUrl from "./assets/shelter-cards/long-house-minidv-v2.webp";
import longHouseTwoSmallUrl from "./assets/shelter-cards/long-house-minidv-v2-800.webp";
import longHouseThreeUrl from "./assets/shelter-cards/long-house-minidv-v3.webp";
import longHouseThreeSmallUrl from "./assets/shelter-cards/long-house-minidv-v3-800.webp";
import deepOpeningUrl from "./assets/header-alternates/deep-opening.webp";
import deepOpeningSmallUrl from "./assets/header-alternates/deep-opening-800.webp";
import fourWallsHeroUrl from "./assets/shelter-updates/four-walls-hero.webp";
import fourWallsHeroSmallUrl from "./assets/shelter-updates/four-walls-hero-800.webp";
import fourWallsLightSlotUrl from "./assets/shelter-updates/four-walls-light-slot.webp";
import fourWallsLightSlotSmallUrl from "./assets/shelter-updates/four-walls-light-slot-800.webp";
import fourWallsDiagonalLightUrl from "./assets/shelter-updates/four-walls-diagonal-light.webp";
import fourWallsDiagonalLightSmallUrl from "./assets/shelter-updates/four-walls-diagonal-light-800.webp";
import fourWallsMountainCourtUrl from "./assets/shelter-updates/four-walls-mountain-court.webp";
import fourWallsMountainCourtSmallUrl from "./assets/shelter-updates/four-walls-mountain-court-800.webp";
import courtyardDuskUrl from "./assets/shelter-updates/courtyard-dusk.webp";
import courtyardDuskSmallUrl from "./assets/shelter-updates/courtyard-dusk-800.webp";
import courtyardQuietUrl from "./assets/shelter-updates/courtyard-quiet.webp";
import courtyardQuietSmallUrl from "./assets/shelter-updates/courtyard-quiet-800.webp";
import courtyardPassageEveningUrl from "./assets/shelter-updates/courtyard-passage-evening.webp";
import courtyardPassageEveningSmallUrl from "./assets/shelter-updates/courtyard-passage-evening-800.webp";
import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";

const builds = {
  "the-four-walls": { number: "S—01", name: "The Four Walls", area: "200 sq ft", rooms: "Studio / 1 bath", footprint: "14′ × 18′", occupancy: "1–2 people", wall: "18–24 in", duration: "4–7 months", cost: "$45–75k", description: "Four walls, one quiet room, made from the ground beneath it. The Four Walls is the smallest complete shelter in the collection—a place to begin, retreat, work or stay." },
  "the-courtyard": { number: "S—02", name: "The Courtyard", area: "600 sq ft", rooms: "3 volumes + courtyards", footprint: "Site-adapted cluster", occupancy: "1–3 people", wall: "18–24 in", duration: "7–11 months", cost: "$95–145k", description: "Three Four Walls volumes come together around protected outdoor rooms. The Courtyard makes 600 square feet of interior shelter—and a much larger place to live through the useful space held between its walls." },
  "the-long-house": { number: "S—03", name: "The Long House", area: "1,000 sq ft", rooms: "4–6+ volumes", footprint: "Site-adapted linear arrangement", occupancy: "2–4 people", wall: "18–24 in", duration: "10–15 months", cost: "$140–210k", description: "Four Walls volumes repeat along a narrow site, opening and closing as they go. The Long House moves between enclosed rooms and the courts, passages and pauses created in the voids between them." },
};

const shelterMetadata = {
  "the-four-walls": {
    title: "The Four Walls — Free 200 sq ft Shelter Plan",
    description: "A free plan for a compact 200 sq ft rammed-earth or lavacrete room: a place to live, work, stay or begin building on the land.",
    image: "/social/the-four-walls.jpg",
  },
  "the-courtyard": {
    title: "The Courtyard — Free 600 sq ft Shelter Plan",
    description: "A free plan for three small earthen volumes gathered around protected outdoor rooms, with 600 sq ft of adaptable interior shelter.",
    image: "/social/the-courtyard-v2.jpg",
  },
  "the-long-house": {
    title: "The Long House — Free 1,000 sq ft Shelter Plan",
    description: "A free plan for an adaptable long house of repeated earthen rooms, open-air courts and passages shaped to a narrow site.",
    image: "/social/the-long-house.jpg",
  },
};

const galleries = {
  "the-four-walls": [
[fourWallsHeroUrl, fourWallsHeroSmallUrl, "Rammed-earth shelter volumes in a wooded desert courtyard", "The Four Walls volume", 1448],
[fourWallsLightSlotUrl, fourWallsLightSlotSmallUrl, "Low horizontal opening casting warm light into an earthen room", "Low opening + light", 1467],
[fourWallsDiagonalLightUrl, fourWallsDiagonalLightSmallUrl, "Diagonal sunlight moving across a rammed-earth interior", "Light across the wall", 1319],
[fourWallsMountainCourtUrl, fourWallsMountainCourtSmallUrl, "Rammed-earth volumes framing desert mountains", "Volume + landscape", 1086],
  ],
  "the-courtyard": [
[courtyardDuskUrl, courtyardDuskSmallUrl, "Rammed-earth volumes gathered around a quiet courtyard at dusk", "The courtyard at dusk", 1086],
[courtyardPassageEveningUrl, courtyardPassageEveningSmallUrl, "Sunlit passage framed by thick rammed-earth courtyard walls", "Passage between rooms", 1448],
[courtyardQuietUrl, courtyardQuietSmallUrl, "A quiet rammed-earth courtyard in warm desert light", "Quiet courtyard", 1067],
[courtyardApproachUrl, courtyardApproachSmallUrl, "An approach through opposing walls toward the courtyard", "Approach to the court", 1451],
  ],
  "the-long-house": [
[longHouseThreeUrl, longHouseThreeSmallUrl, "A long framed view from an earthen room across a planted court", "Room to courtyard", 1461],
[longHouseOneUrl, longHouseOneSmallUrl, "Repeated earthen rooms extending along the site", "A sequence of rooms", 1586],
[longHouseTwoUrl, longHouseTwoSmallUrl, "Long House openings aligned through interior and exterior space", "Long view", 1586],
[deepOpeningUrl, deepOpeningSmallUrl, "A deep opening cut through a thick earthen wall", "Depth + threshold", 1672],
  ],
};

const models = {
  "the-four-walls": { url: fourWallsModelUrl },
  "the-courtyard": { url: courtyardModelUrl },
  "the-long-house": { url: fourWallsModelUrl },
};

function ModelViewer({ modelUrl, textureUrl }) {
  const mount = useRef(null);
  const controlsRef = useRef(null);
  const isTouch = useRef(window.matchMedia("(hover: none), (pointer: coarse)").matches);
  const [loaded, setLoaded] = useState(false);
  const [interactive, setInteractive] = useState(!isTouch.current);
  useEffect(() => {
    const el = mount.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb8b2a6);
    scene.fog = new THREE.Fog(0xb8b2a6, 17, 34);
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
    camera.position.set(17, 10, 20);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    renderer.shadowMap.enabled = true;
    el.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enabled = !isTouch.current;
    controls.enableDamping = true; controls.dampingFactor = .055;
    controls.target.set(0, 1.7, 0); controls.minDistance = 10; controls.maxDistance = 32;
    controls.minPolarAngle = .55; controls.maxPolarAngle = 1.48;
    scene.add(new THREE.HemisphereLight(0xe9e2d3, 0x514a3e, 2.3));
    const sun = new THREE.DirectionalLight(0xffe3bd, 4.6);
    sun.position.set(-7, 11, 8); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); scene.add(sun);
    const ground = new THREE.Mesh(new THREE.CircleGeometry(36, 64), new THREE.MeshStandardMaterial({ color: 0x8e897e, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
    let loadedModel;
    const overrideTexture = textureUrl ? new THREE.TextureLoader().load(textureUrl) : null;
    if (overrideTexture) {
      overrideTexture.colorSpace = THREE.SRGBColorSpace;
      overrideTexture.wrapS = overrideTexture.wrapT = THREE.RepeatWrapping;
      overrideTexture.flipY = false;
      overrideTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    }
    new GLTFLoader().load(modelUrl, (gltf) => {
      loadedModel = gltf.scene;
      loadedModel.traverse(child => { if (child.isMesh) {
        child.castShadow = true; child.receiveShadow = true;
        if (overrideTexture) {
          child.material = child.material.clone();
          child.material.map = overrideTexture;
          child.material.color.set(0xffffff);
          child.material.roughness = .92;
          child.material.needsUpdate = true;
        }
      } });
      const box = new THREE.Box3().setFromObject(loadedModel), size = box.getSize(new THREE.Vector3());
      loadedModel.scale.setScalar(8.3 / Math.max(size.x, size.z)); loadedModel.updateMatrixWorld(true);
      const fitted = new THREE.Box3().setFromObject(loadedModel), center = fitted.getCenter(new THREE.Vector3());
      loadedModel.position.set(-center.x, -fitted.min.y, -center.z); scene.add(loadedModel); setLoaded(true);
    });
    const resize = () => { const w=el.clientWidth,h=el.clientHeight; renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(resize); ro.observe(el); resize(); let raf;
    const draw = () => { controls.update(); renderer.render(scene,camera); raf=requestAnimationFrame(draw); }; draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); controls.dispose(); overrideTexture?.dispose(); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, [modelUrl, textureUrl]);
  useEffect(() => {
    if (controlsRef.current) controlsRef.current.enabled = interactive;
  }, [interactive]);
  const reset = () => { const c=controlsRef.current; if (!c) return; c.object.position.set(17,10,20); c.target.set(0,1.7,0); c.update(); };
  return <div className={`model-wrap ${interactive ? "interactive" : ""}`} ref={mount}>
    <span className={`model-status ${loaded ? "ready" : ""}`}>{loaded ? (isTouch.current ? (interactive ? "Drag or pinch to explore" : "Scroll to continue") : "Drag to explore · Scroll to zoom") : "Loading model…"}</span>
    {isTouch.current && <button className="model-interact" onClick={() => setInteractive(value => !value)}>{interactive ? "Done" : "Explore 3D"}</button>}
    <button className="model-reset" onClick={reset}>Reset view</button>
  </div>;
}

const specsFor = b => [["Interior area",b.area],["Footprint",b.footprint],["Program",b.rooms],["Occupancy",b.occupancy],["Wall system","Rammed earth / lavacrete"],["Wall thickness",b.wall],["Foundation","Site-adapted slab"],["Roof","Low-slope shed roof"],["Typical build",b.duration],["Indicative cost",b.cost+"*"],["Plan version","1.0 / August 2026"],["Skill level","Ambitious owner-builder"]];

function ShelterPage() {
  const [wallMaterial, setWallMaterial] = useState("lavacrete");
  const requestedSlug = location.pathname.split("/").filter(Boolean).pop();
  const slug = requestedSlug === "the-room" ? "the-four-walls" : requestedSlug;
  const build = builds[slug] || builds["the-four-walls"];
  const metadata = shelterMetadata[slug] || shelterMetadata["the-four-walls"];
  const gallery = galleries[slug] || galleries["the-four-walls"];
  const model = models[slug] || models["the-four-walls"];
  const related = Object.entries(builds).filter(([key]) => key !== slug).slice(0,2);
  return <main className="shelter-page">
    <PageMeta title={metadata.title} description={metadata.description} path={`/shelters/${slug}/`} image={metadata.image}/>
    <header className="nav detail-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><nav><a href="/#practice">Practice</a><a href="/#shelters">Shelters</a><a href="/#process">Process</a><a href="/#about">About</a></nav><a className="nav-cta" href="#downloads">Get the plans ↘</a></header>
    <section className="model-hero" id="top"><ModelViewer modelUrl={model.url} textureUrl={wallMaterial === "earth" ? csreTextureUrl : lavacreteTextureUrl}/><div className="model-material-toggle" role="group" aria-label="Wall material preview"><span>Wall material</span><button className={wallMaterial === "earth" ? "active" : ""} onClick={() => setWallMaterial("earth")}>CSRE</button><button className={wallMaterial === "lavacrete" ? "active" : ""} onClick={() => setWallMaterial("lavacrete")}>Lavacrete</button></div><div className="model-title"><p>{build.number} / Buildable shelter</p><h1>{build.name}</h1><span>{build.area}<br/>{build.rooms}</span></div><a className="model-down" href="#overview">Explore the shelter ↓</a></section>

    <section className="shelter-intro" id="overview"><p className="kicker">The idea</p><h2>{build.description}</h2><p>Designed as a legible set of spaces and assemblies, this shelter can be built with local mineral materials and adapted to the realities of a particular site.</p></section>

    <section className="specs"><header><p className="kicker">Building specifications</p><h2>Small by design.<br/>Complete by nature.</h2><p>*Conceptual construction range in 2026 USD, excluding land, utilities, professional fees and unusually difficult site work.</p></header><dl>{specsFor(build).map(([term,value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></section>

    <section className="building-gallery"><figure className="gallery-wide"><img src={gallery[0][0]} srcSet={`${gallery[0][1]} 800w, ${gallery[0][0]} ${gallery[0][4]}w`} sizes="100vw" alt={gallery[0][2]} loading="lazy" decoding="async"/><figcaption>01 / {gallery[0][3]}</figcaption></figure><div className="gallery-pair"><figure><img src={gallery[1][0]} srcSet={`${gallery[1][1]} 800w, ${gallery[1][0]} ${gallery[1][4]}w`} sizes="(max-width: 760px) 100vw, 50vw" alt={gallery[1][2]} loading="lazy" decoding="async"/><figcaption>02 / {gallery[1][3]}</figcaption></figure><figure><img src={gallery[2][0]} srcSet={`${gallery[2][1]} 800w, ${gallery[2][0]} ${gallery[2][4]}w`} sizes="(max-width: 760px) 100vw, 50vw" alt={gallery[2][2]} loading="lazy" decoding="async"/><figcaption>03 / {gallery[2][3]}</figcaption></figure></div><figure className="gallery-wide"><img src={gallery[3][0]} srcSet={`${gallery[3][1]} 800w, ${gallery[3][0]} ${gallery[3][4]}w`} sizes="100vw" alt={gallery[3][2]} loading="lazy" decoding="async"/><figcaption>04 / {gallery[3][3]}</figcaption></figure></section>

    <section className="plan-contents"><header><p className="kicker">The plan set</p><h2>Everything you need<br/>to find a place to start.</h2></header><div className="sheet-preview"><div className="sheet-plan"><span>A—101</span><svg viewBox="0 0 600 380"><rect x="105" y="50" width="390" height="280"/><path d="M105 225h150m86 105V225h154M255 225v105M341 225h154"/><circle cx="300" cy="190" r="110"/><path d="M60 350h480M80 360v-20m440 20v-20"/></svg><b>Dimensioned floor plan / Scale varies</b></div></div><ul>{["Dimensioned plans","Exterior elevations","Building sections","Foundation details","Wall and opening details","Roof assembly","Door + window schedule","Outline material quantities","Suggested build sequence","Digital reference model"].map((x,i)=><li key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</li>)}</ul></section>

    <section className="downloads" id="downloads"><p className="kicker">Downloads / Version 1.0</p><h2>Build from<br/>good information.</h2><div><a href="/downloads/shelter-plan-preview.svg" download><span>Sample plan sheet</span><small>SVG · Preview</small><b>↓</b></a><a href="/downloads/shelter-specifications.csv" download><span>Specifications</span><small>CSV · 2 KB</small><b>↓</b></a><a className="purchase" href="mailto:build@onthe.land?subject=Free plan set request"><span>Complete plan set</span><small>Request the free plans</small><b>↗</b></a></div></section>

    <section className="before-build"><p className="kicker">Before you build</p><h2>A plan is a foundation,<br/>not a permit.</h2><div><p>Every site brings its own soil, climate, wind, seismic conditions and code requirements. These plans are designed as a robust starting point and must be localized before construction.</p><p>Work with your local building department and, where required, a licensed architect or engineer. Material mixes should be tested using the earth and aggregates available near your site by an engineer following ASTM D 4832.</p><a className="tool-nudge" href="/tools/">Make this shelter your own—explore the tools <span>↗</span></a></div></section>

    <section className="support"><p className="kicker">Adaptation + support</p><h2>Build it yourself.<br/>Don’t figure it out alone.</h2><p>Start with a free Shelter plan or bring plans of your own. We can help orient the building, adapt openings, review material choices and talk through the difficult moments of a natural build.</p><a href="/packages/">See the ways we can work together <span>↗</span></a></section>

    <section className="related"><p className="kicker">Other shelters</p><div>{related.map(([key,item])=><a href={`/shelters/${key}/`} key={key}><span>{item.number}</span><h3>{item.name}</h3><p>{item.area} / {item.rooms}</p><b>↗</b></a>)}</div></section>
    <SiteFooter/>
  </main>;
}

export default ShelterPage;
