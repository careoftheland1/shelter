import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fourWallsModelUrl from "./assets/lavacrete-200.glb?url";
import lavacreteTextureUrl from "./assets/lavacrete-texture.jpg";
import csreTextureUrl from "./assets/csre-texture.jpg";
import fourWallsHeroUrl from "./assets/shelter-updates/four-walls-hero.webp";
import drylandsUrl from "./assets/climates/drylands.jpeg";
import tropicsUrl from "./assets/climates/tropics.jpeg";
import coldCountryUrl from "./assets/climates/cold-country.jpeg";
import SiteFooter from "./SiteFooter.jsx";
import PageMeta from "./PageMeta.jsx";
import { fourWallsSizes, languageMeta, shapeItUrl } from "./buildingLanguage.js";
import "./four-walls.css";

const build = { number: "Seed / Plans", name: "Four Walls", description: "Four walls. One roof. One useful room. A small complete building that can stand on its own, or become the beginning of something larger." };
const related = [
  ["courtyard", { number: "Pattern / Cluster", name: "Court", description: "Gather complete Four Walls across open land." }],
  ["long-house", { number: "Pattern / Row", name: "Long House", description: "Repeat Four Walls along constrained land." }],
];
const climates = [
  { id: "drylands", label: "Drylands", image: drylandsUrl },
  { id: "tropics", label: "Tropics", image: tropicsUrl },
  { id: "cold-country", label: "North", image: coldCountryUrl },
];
const conditions = [
  { id: "seismic", label: "Seismic", effect: "Vertical reinforcement", notePosition: "below" },
  { id: "waters", label: "Waters", effect: "Higher stem walls", notePosition: "above" },
  { id: "fires", label: "Fires", effect: "Metal framing", notePosition: "below" },
  { id: "wind", label: "Wind", effect: "Round houses", notePosition: "above" },
];
const wallThicknesses = ["12", "18", "24"];
const wallHeights = ["9", "10", "12"];

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
  const [wallMaterial, setWallMaterial] = useState("earth");
  const requestedSize = new URLSearchParams(location.search).get("size");
  const [size, setSize] = useState(fourWallsSizes.includes(requestedSize) ? requestedSize : fourWallsSizes[0]);
  const [climate, setClimate] = useState("");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [wallThickness, setWallThickness] = useState("18");
  const [wallHeight, setWallHeight] = useState("10");
  const metadata = languageMeta["four-walls"];
  const planRequestUrl = `/free-plans/?${new URLSearchParams({ plan: "four-walls", size, wallThickness, wallHeight, ...(climate ? { climate } : {}), source: "shelter" })}`;
  return <main className="shelter-page four-walls-page">
    <PageMeta title={metadata.title} description={metadata.description} path="/shelters/four-walls/" image={metadata.image}/>
    <header className="nav detail-nav"><a className="wordmark" href="/">shelter&nbsp;&nbsp;&nbsp;on the&nbsp;&nbsp;land</a><nav><a href="/#practice">Practice</a><a href="/#process">Process</a><a href="/#about">About</a></nav><a className="nav-cta" href="#downloads">Get the plans ↘</a></header>
    <section className="model-hero" id="top"><ModelViewer modelUrl={fourWallsModelUrl} textureUrl={wallMaterial === "earth" ? csreTextureUrl : lavacreteTextureUrl}/><div className="model-material-toggle" role="group" aria-label="Wall system"><span>Wall system</span><div><button className={wallMaterial === "earth" ? "active" : ""} onClick={() => setWallMaterial("earth")}>CS/RE</button><button className={wallMaterial === "lavacrete" ? "active" : ""} onClick={() => setWallMaterial("lavacrete")}>Lavacrete</button></div></div><div className="model-title"><p>{build.number}</p><h1>{build.name}</h1></div><a className="model-down" href="#overview">Explore the shelter ↓</a></section>

    <section className="shelter-intro" id="overview"><p className="kicker">The seed</p><h2>{build.description}</h2><p className="kicker conditions-kicker">In any condition</p><div className="site-conditions" aria-label="Site conditions">{conditions.map(condition => { const selected = selectedConditions.includes(condition.id); return <div className={`condition-option ${condition.notePosition}`} key={condition.id}><button type="button" aria-pressed={selected} onClick={() => setSelectedConditions(values => values.includes(condition.id) ? values.filter(value => value !== condition.id) : [...values, condition.id])}>{condition.label}</button>{selected && <span className="condition-effect">{condition.effect}</span>}</div>; })}</div></section>

    <section className={`climate-selector${climate ? " has-selection" : ""}`} aria-labelledby="climate-title"><header><p className="kicker" id="climate-title">Select a context</p></header><div className="climate-options" role="group" aria-label="Climate selection">{climates.map(option => <button type="button" key={option.id} className={climate && climate !== option.id ? "is-hidden" : ""} aria-pressed={climate === option.id} onClick={() => setClimate(value => value === option.id ? "" : option.id)}><span>{option.label}</span><img src={option.image} alt=""/></button>)}</div></section>

    <section className="seed-sizes" id="sizes"><header><p className="kicker">Four Walls / Kit of parts</p><p>A shed, studio, sleeping room, workshop or guest room. Straightforward drawings, adaptable openings and a rammed-earth or lavacrete wall system keep the building legible to its builder.</p></header><div><div className="seed-size-options" role="group" aria-label="Starting footprint">{fourWallsSizes.map(value => <button key={value} aria-pressed={size === value} onClick={() => setSize(value)}>{value} ft</button>)}</div><p className="seed-size-note">Footprint dimensions, not interior floor area. Usable space depends on the wall thickness.</p><div className="kit-options"><fieldset><legend>Wall thickness</legend><div>{wallThicknesses.map(value => <button type="button" key={value} aria-pressed={wallThickness === value} onClick={() => setWallThickness(value)}>{value} in</button>)}</div></fieldset><fieldset><legend>High wall height</legend><div>{wallHeights.map(value => <button type="button" key={value} aria-pressed={wallHeight === value} onClick={() => setWallHeight(value)}>{value} ft</button>)}</div></fieldset></div><a className="shape-it-handoff" href={shapeItUrl} aria-label="Explore this selected Four Walls room in Shape It">Explore this selection in Shape It <span>↗</span></a></div></section>

    <section className="plan-contents plan-contents-text-only"><header><h2>The plan set</h2></header><div className="plan-contents-details"><ul>{["Dimensioned plans","Exterior elevations","Building sections","Foundation details","Wall and opening details","Roof assembly","Door + window schedule","Outline material quantities","Suggested build sequence","Digital reference model"].map((x,i)=><li key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b></li>)}</ul><div className="plan-request-inline" id="downloads"><p className="kicker">Four Walls / Drawing request</p><a className="plan-request-action" href={planRequestUrl}>Request the {size} ft drawings <span>↗</span></a><div className="plan-request-resources"><a href="/downloads/shelter-plan-preview.svg" download>Sample sheet ↓</a><a href="/downloads/shelter-specifications.csv" download>Plan family overview ↓</a></div></div></div></section>

    <div className="support-transition">
      <section className="before-build"><p className="kicker">Before you build</p><h2>A plan is a foundation,<br/>not a permit.</h2><div><p>Build from the drawings, shape your own version, or bring us in when the site or build asks for more. Local requirements govern what you need for your particular use and site.</p><p>Check local requirements for foundations, structure, services and intended use. Bring in a licensed architect or engineer where required, and confirm the wall system and material mix for the site.</p><a className="tool-nudge" href={shapeItUrl}>Shape your Four Walls <span>↗</span></a></div></section>
      <section className="support"><p className="kicker">Adaptation + support</p><h2>Build it yourself.<br/>Don’t figure it out alone.</h2><p>The drawings are a path in their own right. Supported and Guided are available when you want help orienting the building, adapting openings, reviewing materials or working through the build.</p><a href="/supported/">Explore Supported <span>↗</span></a><a href="/guided/">Explore Guided <span>↗</span></a><a href="/packages/">Compare all ways of working <span>↗</span></a></section>
    </div>

    <section className="related"><p className="kicker">What the seed can become</p><div>{related.map(([key,item])=><a href={`/shelters/${key}/`} key={key}><span>{item.number}</span><h3>{item.name}</h3><p>{item.description}</p><b>↗</b></a>)}</div></section>
    <SiteFooter/>
  </main>;
}

export default FourWallsPage;
