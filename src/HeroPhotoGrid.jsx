import { useEffect, useRef } from "react";
import formsUrl from "./assets/contact-moodboard/forms.jpg";
import curtainUrl from "./assets/contact-moodboard/curtain.jpg";
import wallUrl from "./assets/contact-moodboard/wall.jpg";
import noonUrl from "./assets/contact-moodboard/noon.jpg";
import exteriorUrl from "./assets/contact-moodboard/exterior.jpg";
import bricksUrl from "./assets/contact-moodboard/BRICKS.jpg";
import floorsUrl from "./assets/contact-moodboard/FLOORS.jpg";
import cornerInteriorUrl from "./assets/contact-moodboard/CORNER-INT.jpg";
import websUrl from "./assets/contact-moodboard/WEBS.jpg";
import lightWellUrl from "./assets/contact-moodboard/PLANT-LIGHT-WELL.jpg";
import sinksUrl from "./assets/contact-moodboard/SINKS.jpg";
import thresholdUrl from "./assets/contact-moodboard/THRESHOLD.jpg";
import shelterFilmUrl from "./assets/shelter-now-film.mp4";
import shelterFilmPosterUrl from "./assets/shelter-now-poster.jpg";
import "./hero-photo-grid.css";

// One loose composition repeats across a torus. Each copy is wrapped back to
// the far edge, so the camera can drift or be dragged in either direction.
const photos = [
  { variants: [formsUrl, bricksUrl, floorsUrl], x: 0.02, y: 0.05, width: 0.35, depth: 0.8 },
  { variants: [curtainUrl, cornerInteriorUrl], x: 0.47, y: -0.16, width: 0.31, depth: 1.16 },
  { variants: [wallUrl, websUrl, lightWellUrl], x: 0.69, y: 0.30, width: 0.36, depth: 0.94 },
  { variants: [noonUrl, sinksUrl, thresholdUrl], x: 0.18, y: 0.48, width: 0.32, depth: 1.25 },
  { variants: [exteriorUrl], x: 0.53, y: 0.70, width: 0.26, depth: 1.05 },
];

const COLS = 4;
const ROWS = 4;
const tiles = Array.from({ length: COLS * ROWS * photos.length }, (_, key) => {
  const col = Math.floor(key / (ROWS * photos.length));
  const row = Math.floor(key / photos.length) % ROWS;
  const photo = key % photos.length;
  return {
    key, col, row, photo,
    variant: (col * 5 + row * 7 + photo * 3) % photos[photo].variants.length,
  };
});

const imageRatio = (slot) => slot === 4 ? "350 / 623" : "3 / 4";

const wrap = (value, period, margin) => ((value + margin) % period + period) % period - margin;

export default function HeroPhotoGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    const hero = grid.parentElement;
    const images = [...grid.querySelectorAll("img")];
    const film = grid.querySelector("video");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const camera = { x: -250, y: -190, followX: 0, followY: 0, targetX: 0, targetY: 0 };
    const pointer = { x: 0, y: 0, previousX: 0, previousY: 0, dragging: false, inside: false };
    let width = 0;
    let height = 0;
    let cellWidth = 0;
    let cellHeight = 0;
    let frame = 0;
    let previousTime = 0;
    let visible = true;

    const measure = () => {
      width = hero.clientWidth;
      height = hero.clientHeight;
      cellWidth = width <= 760 ? Math.max(430, width * 1.12) : Math.max(760, Math.min(1320, width * 0.7));
      cellHeight = width <= 760 ? Math.max(510, height * 0.66) : Math.max(620, Math.min(920, height * 0.88));
      images.forEach((image, index) => {
        const photo = photos[tiles[index].photo];
        image.style.width = `${Math.round(cellWidth * photo.width * 0.85)}px`;
      });
      draw(performance.now());
    };

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
        const variant = (tile.col * 3 + tile.row * 5) % 4;
        const variationX = [0, 0.075, -0.055, 0.035][variant] * cellWidth;
        const variationY = [0, -0.055, 0.07, 0.035][variant] * cellHeight;
        const floatX = reduced ? 0 : Math.sin(time * 0.00038 + index * 1.7) * 7;
        const floatY = reduced ? 0 : Math.cos(time * 0.00047 + index * 1.3) * 10;
        const x = wrap(tile.col * cellWidth + photo.x * cellWidth + variationX + camera.x + camera.followX * photo.depth + floatX, cycleX, cellWidth);
        const y = wrap(tile.row * cellHeight + photo.y * cellHeight + variationY + camera.y + camera.followY * photo.depth + floatY, cycleY, cellHeight);
        image.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      const filmWidth = Math.round(cellWidth * 0.3 * 0.85);
      const filmFloatX = reduced ? 0 : Math.sin(time * 0.00032) * 5;
      const filmFloatY = reduced ? 0 : Math.cos(time * 0.00039) * 7;
      const filmLeft = reduced ? width * 0.64 : wrap(-100 + camera.x + camera.followX * 0.9 + filmFloatX, cycleX, cellWidth);
      const filmTop = reduced ? height * 0.43 : wrap(height * 0.25 + cellHeight * 0.13 + camera.y * 0.8 + camera.followY * 0.9 + filmFloatY, cycleY, cellHeight);
      const filmHeight = filmWidth * 3 / 4;
      film.style.width = `${filmWidth}px`;
      film.style.transform = `translate3d(${filmLeft.toFixed(1)}px, ${filmTop.toFixed(1)}px, 0)`;
      film.style.opacity = filmLeft < width - 10 && filmLeft + filmWidth > 10 && filmTop < height - 10 && filmTop + filmHeight > 10 ? "1" : "0";
      grid.classList.add("is-ready");
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

    const syncFilm = () => {
      if (visible && !motionQuery.matches) film.play().catch(() => {});
      else film.pause();
    };

    const motionChange = () => {
      syncFilm();
      schedule();
    };

    const move = (event) => {
      const bounds = hero.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      if (pointer.dragging) {
        camera.x += event.clientX - pointer.previousX;
        camera.y += event.clientY - pointer.previousY;
      } else {
        camera.targetX = (pointer.x - width / 2) * -0.13;
        camera.targetY = (pointer.y - height / 2) * -0.13;
      }
      pointer.previousX = event.clientX;
      pointer.previousY = event.clientY;
      if (pointerQuery.matches && event.pointerType !== "touch") {
        pointer.inside = true;
      }
      schedule();
    };

    const down = (event) => {
      if (event.button !== 0 || event.target.closest("a, button, .gooey-title")) return;
      pointer.dragging = true;
      pointer.previousX = event.clientX;
      pointer.previousY = event.clientY;
      hero.classList.add("hero--dragging");
      hero.setPointerCapture(event.pointerId);
      event.preventDefault();
    };

    const up = (event) => {
      pointer.dragging = false;
      hero.classList.remove("hero--dragging");
      if (hero.hasPointerCapture(event.pointerId)) hero.releasePointerCapture(event.pointerId);
    };

    const leave = () => {
      if (!pointer.dragging) {
        pointer.inside = false;
        camera.targetX = 0;
        camera.targetY = 0;
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      previousTime = 0;
      syncFilm();
      if (visible) schedule();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    const resizeObserver = new ResizeObserver(measure);
    observer.observe(hero);
    resizeObserver.observe(hero);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerdown", down);
    hero.addEventListener("pointerup", up);
    hero.addEventListener("pointercancel", up);
    hero.addEventListener("pointerleave", leave);
    motionQuery.addEventListener("change", motionChange);
    measure();
    syncFilm();
    schedule();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerdown", down);
      hero.removeEventListener("pointerup", up);
      hero.removeEventListener("pointercancel", up);
      hero.removeEventListener("pointerleave", leave);
      motionQuery.removeEventListener("change", motionChange);
      film.pause();
      hero.classList.remove("hero--dragging");
    };
  }, []);

  return <>
    <div className="hero-photo-grid" ref={gridRef} aria-hidden="true">
      {tiles.map((tile) => <img
        key={tile.key}
        src={photos[tile.photo].variants[tile.variant]}
        alt=""
        decoding="async"
        loading="eager"
        style={{ aspectRatio: imageRatio(tile.photo), zIndex: 1 + tile.photo }}
      />)}
      <video
        className="hero-photo-grid__film"
        src={shelterFilmUrl}
        poster={shelterFilmPosterUrl}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  </>;
}
