import { useEffect, useRef } from "react";
import shelterFilmUrl from "./assets/shelter-now-film.mp4";
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
    const sync = () => {
      frame = 0;
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      const start = sequence.getBoundingClientRect().top + window.scrollY;
      const end = finalBlock.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.65;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / Math.max(1, end - start)));
      const time = progress * Math.max(0, video.duration - 0.04);
      if (Math.abs(video.currentTime - time) > 1 / 30) video.currentTime = time;
    };
    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(sync);
    };

    video.pause();
    video.addEventListener("loadedmetadata", scheduleSync);
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", scheduleSync);
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
    };
  }, []);

  return <div className="manifesto-scroll-film" ref={stageRef} aria-hidden="true">
    <video ref={videoRef} src={shelterFilmUrl} preload="auto" muted playsInline disablePictureInPicture />
  </div>;
}
