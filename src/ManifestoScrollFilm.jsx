import { useEffect, useRef } from "react";
import shelterFilmUrl from "./assets/shelter-now-film.mp4";
import shelterFilmPosterUrl from "./assets/shelter-now-poster.jpg";
import "./manifesto-scroll-film.css";

export default function ManifestoScrollFilm() {
  const stageRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const video = videoRef.current;
    const sequence = stage?.closest(".manifesto-sequence");
    const finalBlock = sequence?.querySelector(".manifesto-block--final");
    if (!sequence || !finalBlock || !video) return undefined;

    let frame = 0;
    let targetTime = 0;
    let priming = false;
    let framePrimed = false;
    let pauseFallback = 0;
    const primeFrame = () => {
      if (priming || framePrimed || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return;
      priming = true;
      video.play().then(() => {
        const finishPriming = () => {
          window.clearTimeout(pauseFallback);
          video.pause();
          priming = false;
          framePrimed = true;
          scheduleSync();
        };
        if (typeof video.requestVideoFrameCallback === "function") {
          video.requestVideoFrameCallback(finishPriming);
        } else {
          pauseFallback = window.setTimeout(finishPriming, 80);
        }
      }).catch(() => { priming = false; });
    };
    const sync = () => {
      frame = 0;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      const start = sequence.getBoundingClientRect().top + window.scrollY;
      const end = finalBlock.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.65;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
      targetTime = progress * Math.max(0, video.duration - 0.04);
      primeFrame();
      // Mobile Safari often needs time to decode each paused seek. Keep only
      // the latest requested position, then apply it after the current seek.
      if (!priming && video.readyState >= HTMLMediaElement.HAVE_METADATA && !video.seeking && Math.abs(video.currentTime - targetTime) > 1 / 30) {
        video.currentTime = targetTime;
      }
    };
    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };

    video.pause();
    video.addEventListener("loadedmetadata", scheduleSync);
    video.addEventListener("loadeddata", scheduleSync);
    video.addEventListener("seeked", scheduleSync);
    video.addEventListener("canplay", scheduleSync);
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", scheduleSync);
      video.removeEventListener("loadeddata", scheduleSync);
      video.removeEventListener("seeked", scheduleSync);
      video.removeEventListener("canplay", scheduleSync);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, []);

  return <div className="manifesto-scroll-film" ref={stageRef} aria-hidden="true">
    <video ref={videoRef} src={shelterFilmUrl} poster={shelterFilmPosterUrl} preload="auto" muted playsInline disablePictureInPicture />
  </div>;
}
