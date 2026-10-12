import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./particle-cube-assembly.css";

const PARTICLE_COUNT = 13000;
const FACE_BRIGHTNESS = [0.5, 0.72, 0.42, 0.82, 0.3, 0.96];
const VOLUMES = [
  { x: -3.7, y: -0.35, z: -2.4, width: 2.2, height: 1.5, depth: 2.0 },
  { x: -0.2, y: 0.3, z: -3.5, width: 1.65, height: 2.8, depth: 2.1 },
  { x: 3.5, y: -0.15, z: -2.2, width: 2.35, height: 1.9, depth: 1.9 },
  { x: 3.6, y: 0.1, z: 2.0, width: 1.8, height: 2.4, depth: 2.5 },
  { x: 0.4, y: -0.475, z: 3.5, width: 2.5, height: 1.25, depth: 1.8 },
  { x: -3.5, y: -0.025, z: 2.3, width: 1.9, height: 2.15, depth: 2.0 },
];

const volumeCorners = VOLUMES.flatMap(({ x, y, z, width, height, depth }) =>
  [-1, 1].flatMap((sideX) => [-1, 1].flatMap((sideY) => [-1, 1].map((sideZ) =>
    new THREE.Vector3(x + sideX * width / 2, y + sideY * height / 2, z + sideZ * depth / 2)
  )))
);

const randomBetween = (min, max) => min + Math.random() * (max - min);

function buildPositions() {
  const scattered = new Float32Array(PARTICLE_COUNT * 3);
  const target = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    const offset = i * 3;
    scattered[offset] = randomBetween(-7.2, 7.2);
    scattered[offset + 1] = randomBetween(-4.8, 4.8);
    scattered[offset + 2] = randomBetween(-4, 4);

    const volumeIndex = Math.min(VOLUMES.length - 1, Math.floor(i * VOLUMES.length / PARTICLE_COUNT));
    const volume = VOLUMES[volumeIndex];
    const halfWidth = volume.width / 2;
    const halfHeight = volume.height / 2;
    const halfDepth = volume.depth / 2;
    const face = Math.floor(Math.random() * 6);
    let x = randomBetween(-halfWidth, halfWidth);
    let y = randomBetween(-halfHeight, halfHeight);
    let z = randomBetween(-halfDepth, halfDepth);
    if (face === 0) x = -halfWidth;
    if (face === 1) x = halfWidth;
    if (face === 2) y = -halfHeight;
    if (face === 3) y = halfHeight;
    if (face === 4) z = -halfDepth;
    if (face === 5) z = halfDepth;
    x += volume.x;
    y += volume.y;
    z += volume.z;

    target[offset] = x;
    target[offset + 1] = y;
    target[offset + 2] = z;

    const shade = FACE_BRIGHTNESS[face] * randomBetween(0.8, 1);
    colors[offset] = shade;
    colors[offset + 1] = shade;
    colors[offset + 2] = shade;
  }

  return { scattered, target, colors };
}

export default function ParticleCubeAssembly() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const { scattered, target, colors } = buildPositions();
    let renderer;
    let frame = 0;
    let progress = reducedMotion.matches ? 1 : 0;
    let renderedProgress = -1;
    let visible = false;
    let holdStartedAt = 0;

    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      section.classList.add("particle-cube--unavailable");
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const cameraDirection = new THREE.Vector3(0.13, 0.82, 1).normalize();
    const cameraTarget = new THREE.Vector3(0, 0.15, 0);

    const positions = new Float32Array(scattered);
    const geometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", positionAttribute);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.86,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      // Frame every volume while allowing the six buildings to fill the stage.
      const fit = (distance) => {
        camera.position.copy(cameraTarget).addScaledVector(cameraDirection, distance);
        camera.lookAt(cameraTarget);
        camera.updateMatrixWorld();
        return volumeCorners.every((corner) => {
          const projected = corner.clone().project(camera);
          return Math.abs(projected.x) <= 0.92 && Math.abs(projected.y) <= 0.84;
        });
      };
      let near = 5;
      let far = 60;
      for (let i = 0; i < 18; i += 1) {
        const middle = (near + far) / 2;
        if (fit(middle)) far = middle;
        else near = middle;
      }
      fit(far);
      scheduleRender();
    };

    const draw = (now) => {
      frame = 0;
      if (renderedProgress !== progress) {
        const eased = progress * progress * (3 - 2 * progress);
        for (let i = 0; i < positions.length; i += 1) {
          positions[i] = scattered[i] + (target[i] - scattered[i]) * eased;
        }
        positionAttribute.needsUpdate = true;
        material.opacity = 0.86 - eased * 0.04;
        renderedProgress = progress;
      }

      const holding = progress >= 1 && visible && !reducedMotion.matches && !document.hidden;
      if (holding) {
        if (!holdStartedAt) holdStartedAt = now;
        const seconds = (now - holdStartedAt) / 1000;
        const fadeIn = Math.min(1, seconds / 1.1);
        particles.rotation.y = Math.sin(seconds * 0.55) * 0.045 * fadeIn;
        particles.rotation.x = Math.sin(seconds * 0.38) * 0.009 * fadeIn;
      } else {
        holdStartedAt = 0;
        particles.rotation.set(0, 0, 0);
      }

      renderer.render(scene, camera);
      if (holding) frame = window.requestAnimationFrame(draw);
    };

    const scheduleRender = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const updateProgress = () => {
      const sequence = section.closest(".manifesto-sequence") || section;
      const bounds = sequence.getBoundingClientRect();
      visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      if (reducedMotion.matches) {
        progress = 1;
      } else {
        const travel = Math.max(1, sequence.offsetHeight - window.innerHeight);
        const resolveDistance = travel * 0.74;
        progress = Math.max(0, Math.min(1, -bounds.top / resolveDistance));
      }
      scheduleRender();
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", resize);
    reducedMotion.addEventListener("change", updateProgress);
    document.addEventListener("visibilitychange", updateProgress);
    resize();
    updateProgress();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", resize);
      reducedMotion.removeEventListener("change", updateProgress);
      document.removeEventListener("visibilitychange", updateProgress);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <section className="particle-cube" ref={sectionRef} aria-label="Particles assembling into six shelter volumes around an open courtyard">
    <div className="particle-cube__stage">
      <canvas className="particle-cube__canvas" ref={canvasRef} aria-hidden="true" />
    </div>
  </section>;
}
