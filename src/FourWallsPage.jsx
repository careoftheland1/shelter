import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fourWallsModelUrl from "./assets/lavacrete-200.glb?url";
import lavacreteTextureUrl from "./assets/lavacrete-texture.jpg";
import csreTextureUrl from "./assets/csre-texture.jpg";
import fourWallsHeroUrl from "./assets/shelter-updates/four-walls-hero.webp";
import fourWallsHeroSmallUrl from "./assets/shelter-updates/four-walls-hero-800.webp";
import fourWallsLightSlotUrl from "./assets/shelter-updates/four-walls-light-slot.webp";
import fourWallsLightSlotSmallUrl from "./assets/shelter-updates/four-walls-light-slot-800.webp";
import fourWallsDiagonalLightUrl from "./assets/shelter-updates/four-walls-diagonal-light.webp";
import fourWallsDiagonalLightSmallUrl from "./assets/shelter-updates/four-walls-diagonal-light-800.webp";
import fourWallsMountainCourtUrl from "./assets/shelter-updates/four-walls-mountain-court.webp";
import fourWallsMountainCourtSmallUrl from "./assets/shelter-updates/four-walls-mountain-court-800.webp";
import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";
import { fourWallsSizes, languageMeta, shapeItUrl } from "./buildingLanguage.js";
import "./four-walls.css";

const build = { number: "Seed / Plans", name: "Four Walls", description: "Four walls. One roof. One useful room. A small complete building that can stand on its own, or become the beginning of something larger." };
const related = [
  ["courtyard", { number: "Pattern / Cluster", name: "Court", description: "Gather complete Four Walls across open land." }],
  ["long-house", { number: "Pattern / Row", name: "Long House", description: "Repeat Four Walls along constrained land." }],
];
const gallery = [
[fourWallsHeroUrl, fourWallsHeroSmallUrl, "Rammed-earth shelter volumes in a wooded desert courtyard", "Four Walls volume", 1448],
[fourWallsLightSlotUrl, fourWallsLightSlotSmallUrl, "Low horizontal opening casting warm light into an earthen room", "Low opening + light", 1467],
[fourWallsDiagonalLightUrl, fourWallsDiagonalLightSmallUrl, "Diagonal sunlight moving across a rammed-earth interior", "Light across the wall", 1319],
[fourWallsMountainCourtUrl, fourWallsMountainCourtSmallUrl, "Rammed-earth volumes framing desert mountains", "Volume + landscape", 1086],
];

function ModelViewer({ modelUrl, textureUrl }) {
  const mount = useRef(null);
  const controlsRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) setInteractive(false);
  }, []);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [interactive, setInteractive] = useState(true);
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
    controls.enabled = true;
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
    }, undefined, () => setFailed(true));
    const resize = () => { const w=el.clientWidth,h=el.clientHeight; renderer.setSize(w,h); camera.aspect=w/h; camera.updateProjectionMatrix(); };
    const ro = new ResizeObserver(resize); ro.observe(el); resize(); let raf;
    const draw = () => { controls.update(); renderer.render(scene,camera); raf=requestAnimationFrame(draw); }; draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); controls.dispose(); overrideTexture?.dispose(); renderer.dispose(); el.removeChild(renderer.domElement); };
  }, [modelUrl, textureUrl]);
  useEffect(() => {
    if (controlsRef.current) controlsRef.current.enabled = interactive;
  }, [interactive]);
  const reset = () => { const c=controlsRef.current; if (!c) return; c.object.position.set(17,10,20); c.target.set(0,1.7,0); c.update(); };
  return <div className={`model-wrap ${interactive ? "interactive" : ""} ${loaded ? "ready" : ""}`} ref={mount}>
    <img className="model-poster" src={fourWallsHeroUrl} alt="" aria-hidden="true"/>
    <span className={`model-status ${loaded ? "ready" : ""}`}>{loaded ? (isTouch ? (interactive ? "Drag or pinch to explore" : "Scroll to continue") : "Drag to explore · Scroll to zoom") : failed ? "3D preview unavailable" : "Loading model…"}</span>
    {isTouch && <button className="model-interact" onClick={() => setInteractive(value => !value)}>{interactive ? "Done" : "Explore 3D"}</button>}
    <button className="model-reset" onClick={reset}>Reset view</button>
  </div>;
}

function FourWallsPage() {
  const [wallMaterial, setWallMaterial] = useState("lavacrete");
  const moodboardRef = useRef(null);
  const requestedSize = new URLSearchParams(location.search).get("size");
  const [size, setSize] = useState(fourWallsSizes.includes(requestedSize) ? requestedSize : fourWallsSizes[0]);
  const metadata = languageMeta["four-walls"];
  useEffect(() => {
    const board = moodboardRef.current;
    if (!board) return;
    const figures = [...board.querySelectorAll("figure")];
    const speeds = [0.06, -0.05, 0.07];
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
  }, []);
  return <main className="shelter-page four-walls-page">
    <PageMeta title={metadata.title} description={metadata.description} path="/shelters/four-walls/" image={metadata.image}/>
    <header className="nav detail-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><nav><a href="/#practice">Practice</a><a href="/plans/">Building language</a><a href="/#process">Process</a><a href="/#about">About</a></nav><a className="nav-cta" href="#downloads">Get the plans ↘</a></header>
    <section className="model-hero" id="top"><ModelViewer modelUrl={fourWallsModelUrl} textureUrl={wallMaterial === "earth" ? csreTextureUrl : lavacreteTextureUrl}/><div className="model-material-toggle" role="group" aria-label="Wall material preview"><span>Wall material</span><button className={wallMaterial === "earth" ? "active" : ""} onClick={() => setWallMaterial("earth")}>CSRE</button><button className={wallMaterial === "lavacrete" ? "active" : ""} onClick={() => setWallMaterial("lavacrete")}>Lavacrete</button></div><div className="model-title"><p>{build.number}</p><h1>{build.name}</h1><span>One complete room<br/>A family of small footprints</span></div><a className="model-down" href="#overview">Explore the shelter ↓</a></section>

    <section className="shelter-intro" id="overview"><p className="kicker">The seed</p><h2>{build.description}</h2><p>A shed, studio, sleeping room, workshop or guest room. Straightforward drawings, adaptable openings and a rammed-earth or lavacrete wall system keep the building legible to its builder.</p></section>

    <section className="seed-sizes" id="sizes"><header><p className="kicker">Four Walls / Plan family</p><h2>Choose a useful beginning.</h2></header><div><div className="seed-size-options" role="group" aria-label="Starting footprint">{fourWallsSizes.map(value => <button key={value} aria-pressed={size === value} onClick={() => setSize(value)}>{value} ft</button>)}</div><p className="seed-size-note">Footprint dimensions, not interior floor area. Usable space depends on the wall system and thickness.</p><div className="language-actions"><a href={`/free-plans/?plan=four-walls&size=${encodeURIComponent(size)}&source=shelter`}>Request {size} ft drawings →</a><a href={shapeItUrl}>Shape your Four Walls ↗</a></div></div></section>

    <section className="building-gallery moodboard" ref={moodboardRef} aria-label="Four Walls image studies">{gallery.slice(1).map(([src, small, alt, caption, width], index) => <figure key={caption}><img src={src} srcSet={`${small} 800w, ${src} ${width}w`} sizes="(max-width: 760px) 90vw, 55vw" alt={alt} loading="lazy" decoding="async"/><figcaption><span>0{index + 1}</span>{caption}</figcaption></figure>)}</section>

    <section className="plan-contents"><header><p className="kicker">The plan set</p><h2>Straightforward drawings.<br/>A useful room.</h2></header><div className="sheet-preview"><div className="sheet-plan"><span>A—101</span><svg viewBox="0 0 600 380"><rect x="105" y="50" width="390" height="280"/><path d="M105 225h150m86 105V225h154M255 225v105M341 225h154"/><circle cx="300" cy="190" r="110"/><path d="M60 350h480M80 360v-20m440 20v-20"/></svg><b>Dimensioned floor plan / Scale varies</b></div></div><div className="plan-contents-details"><ul>{["Dimensioned plans","Exterior elevations","Building sections","Foundation details","Wall and opening details","Roof assembly","Door + window schedule","Outline material quantities","Suggested build sequence","Digital reference model"].map((x,i)=><li key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</li>)}</ul><div className="plan-request-inline" id="downloads"><p className="kicker">Four Walls / Drawing request</p><a className="plan-request-action" href={`/free-plans/?plan=four-walls&size=${encodeURIComponent(size)}&source=shelter`}>Request the {size} ft drawings <span>↗</span></a><div className="plan-request-resources"><a href="/downloads/shelter-plan-preview.svg" download>Sample sheet ↓</a><a href="/downloads/shelter-specifications.csv" download>Plan family overview ↓</a></div></div></div></section>

    <div className="support-transition">
      <section className="before-build"><p className="kicker">Before you build</p><h2>A plan is a foundation,<br/>not a permit.</h2><div><p>Build from the drawings, shape your own version, or bring us in when the site or build asks for more. Local requirements govern what you need for your particular use and site.</p><p>Check local requirements for foundations, structure, services and intended use. Bring in a licensed architect or engineer where required, and confirm the wall system and material mix for the site.</p><a className="tool-nudge" href={shapeItUrl}>Shape your Four Walls <span>↗</span></a></div></section>
      <section className="support"><p className="kicker">Adaptation + support</p><h2>Build it yourself.<br/>Don’t figure it out alone.</h2><p>The drawings are a path in their own right. Supported and Guided are available when you want help orienting the building, adapting openings, reviewing materials or working through the build.</p><a href="/supported/">Explore Supported <span>↗</span></a><a href="/guided/">Explore Guided <span>↗</span></a><a href="/packages/">Compare all ways of working <span>↗</span></a></section>
    </div>

    <section className="related"><p className="kicker">What the seed can become</p><div>{related.map(([key,item])=><a href={`/shelters/${key}/`} key={key}><span>{item.number}</span><h3>{item.name}</h3><p>{item.description}</p><b>↗</b></a>)}</div></section>
    <SiteFooter/>
  </main>;
}

export default FourWallsPage;
