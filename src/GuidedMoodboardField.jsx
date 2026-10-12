import { useEffect, useRef } from "react";
import { packageMoodboardPhotos } from "./packageMoodboardImages.js";
import ledgerUrl from "./assets/packages-moodboard/ledger.png";
import volumeUrl from "./assets/contact-moodboard/volume-cutout.png";

// Repeat a loose arrangement through a camera field so the images can be
// explored with the same pointer drift and drag movement as the home hero.
const guidedPhotos = [
  { src: packageMoodboardPhotos[0], x: 0.03, y: 0.08, width: 0.34, depth: 0.8 },
  { src: packageMoodboardPhotos[1], x: 0.48, y: -0.12, width: 0.29, depth: 1.16 },
  { src: packageMoodboardPhotos[2], x: 0.70, y: 0.28, width: 0.36, depth: 0.94 },
  { src: packageMoodboardPhotos[3], x: 0.17, y: 0.50, width: 0.32, depth: 1.25 },
  { src: packageMoodboardPhotos[4], x: 0.54, y: 0.72, width: 0.26, depth: 1.05 },
  { src: packageMoodboardPhotos[5], x: 0.90, y: 0.55, width: 0.30, depth: 0.72 },
  { src: ledgerUrl, x: 0.32, y: 0.34, width: 0.38, depth: 1.1, ratio: "3 / 2" },
  { src: volumeUrl, x: 0.76, y: 0.78, width: 0.34, depth: 0.88, fit: "contain", ratio: "390 / 256" },
];
const volumePhotos = [
  { x: 0.06, y: 0.12, width: 0.38, depth: 0.72 },
  { x: 0.48, y: -0.08, width: 0.28, depth: 1.12 },
  { x: 0.73, y: 0.24, width: 0.42, depth: 0.92 },
  { x: 0.16, y: 0.52, width: 0.34, depth: 1.24 },
  { x: 0.52, y: 0.70, width: 0.27, depth: 1.02 },
  { x: 0.88, y: 0.56, width: 0.36, depth: 0.82 },
].map((photo) => ({ ...photo, src: volumeUrl, fit: "contain", ratio: "390 / 256" }));

const COLS = 4;
const ROWS = 4;
const makeTiles = (photoCount) => Array.from({ length: COLS * ROWS * photoCount }, (_, key) => ({
  key,
  col: Math.floor(key / (ROWS * photoCount)),
  row: Math.floor(key / photoCount) % ROWS,
  photo: key % photoCount,
}));
const guidedTiles = makeTiles(guidedPhotos.length);
const volumeTiles = makeTiles(volumePhotos.length);
const wrap = (value, period, margin) => ((value + margin) % period + period) % period - margin;

export default function GuidedMoodboardField({ volumeOnly = false }) {
  const fieldRef = useRef(null);
  const photos = volumeOnly ? volumePhotos : guidedPhotos;
  const tiles = volumeOnly ? volumeTiles : guidedTiles;

  useEffect(() => {
    const field = fieldRef.current;
    const stage = field.closest(".contact-moodboard__stage");
    const images = [...field.querySelectorAll("img")];
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const camera = { x: -250, y: -190, followX: 0, followY: 0, targetX: 0, targetY: 0 };
    const pointer = { previousX: 0, previousY: 0, dragging: false };
    let width = 0;
    let height = 0;
    let cellWidth = 0;
    let cellHeight = 0;
    let frame = 0;
    let previousTime = 0;
    let visible = true;

    const draw = (time) => {
      const reduced = motionQuery.matches;
      const seconds = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      if (!reduced && !pointer.dragging) {
        camera.x += seconds * 11;
        camera.y -= seconds * 6;
      }
      const easing = reduced ? 1 : Math.min(1, seconds * 4.5);
      camera.followX += (camera.targetX - camera.followX) * easing;
      camera.followY += (camera.targetY - camera.followY) * easing;
      const cycleX = cellWidth * COLS;
      const cycleY = cellHeight * ROWS;

      images.forEach((image, index) => {
        const tile = tiles[index];
        const photo = photos[tile.photo];
        const variation = (tile.col * 3 + tile.row * 5) % 4;
        const offsetX = [0, 0.075, -0.055, 0.035][variation] * cellWidth;
        const offsetY = [0, -0.055, 0.07, 0.035][variation] * cellHeight;
        const floatX = reduced ? 0 : Math.sin(time * 0.00038 + index * 1.7) * 7;
        const floatY = reduced ? 0 : Math.cos(time * 0.00047 + index * 1.3) * 10;
        const x = wrap(tile.col * cellWidth + photo.x * cellWidth + offsetX + camera.x + camera.followX * photo.depth + floatX, cycleX, cellWidth);
        const y = wrap(tile.row * cellHeight + photo.y * cellHeight + offsetY + camera.y + camera.followY * photo.depth + floatY, cycleY, cellHeight);
        image.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      field.classList.add("is-ready");
    };

    const tick = (time) => {
      frame = 0;
      if (!visible) return;
      draw(time);
      if (!motionQuery.matches) frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };
    const measure = () => {
      width = stage.clientWidth;
      height = stage.clientHeight;
      cellWidth = width <= 760 ? Math.max(430, width * 1.12) : Math.max(760, Math.min(1320, width * 0.7));
      cellHeight = width <= 760 ? Math.max(510, height * 0.66) : Math.max(620, Math.min(920, height * 0.88));
      images.forEach((image, index) => {
        const photo = photos[tiles[index].photo];
        image.style.width = `${Math.round(cellWidth * photo.width * 0.85)}px`;
        image.style.aspectRatio = photo.ratio || "auto";
        image.style.objectFit = photo.fit || "cover";
      });
      draw(performance.now());
    };
    const move = (event) => {
      const bounds = stage.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (pointer.dragging) {
        camera.x += event.clientX - pointer.previousX;
        camera.y += event.clientY - pointer.previousY;
      } else {
        camera.targetX = (x - width / 2) * -0.13;
        camera.targetY = (y - height / 2) * -0.13;
      }
      pointer.previousX = event.clientX;
      pointer.previousY = event.clientY;
      schedule();
    };
    const down = (event) => {
      if (event.button !== 0 || event.target.closest("a, button")) return;
      pointer.dragging = true;
      pointer.previousX = event.clientX;
      pointer.previousY = event.clientY;
      stage.classList.add("guided-moodboard--dragging");
      stage.setPointerCapture(event.pointerId);
      if (event.pointerType !== "touch") event.preventDefault();
    };
    const up = (event) => {
      pointer.dragging = false;
      stage.classList.remove("guided-moodboard--dragging");
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    };
    const leave = () => {
      if (!pointer.dragging) {
        camera.targetX = 0;
        camera.targetY = 0;
      }
    };
    const motionChange = () => schedule();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      previousTime = 0;
      if (visible) schedule();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const resizeObserver = new ResizeObserver(measure);
    observer.observe(stage);
    resizeObserver.observe(stage);
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("pointerleave", leave);
    motionQuery.addEventListener("change", motionChange);
    measure();
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("pointerleave", leave);
      motionQuery.removeEventListener("change", motionChange);
      stage.classList.remove("guided-moodboard--dragging");
    };
  }, [photos, tiles]);

  return <div className="guided-photo-field" ref={fieldRef} aria-hidden="true">
    {tiles.map((tile) => <img key={tile.key} src={photos[tile.photo].src} alt="" decoding="async" loading="eager"/>) }
  </div>;
}
