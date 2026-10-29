"use client";

import { useRef, useState } from "react";
import { ExternalLink, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { assetPath, type Lang } from "../../lib/content";
import SectionDivider from "./SectionDivider";



const drawing = { zh: "拱坝平面布置图", en: "Arch-dam plan layout" };

export default function ArchDamMedia({ lang }: { lang: Lang }) {
  const base = assetPath("/projects/arch-dam");
  const label = (zh: string, en: string) => lang === "zh" ? zh : en;
  const dialog = useRef<HTMLDialogElement>(null);
  const viewer = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  function open() {
    setZoom(1);
    dialog.current?.showModal();
    viewer.current?.scrollTo(0, 0);
  }
  return <div className="arch-dam-media">
    <section className="project-video-section" aria-labelledby="render-video-title">
      <SectionDivider motif="flow"/><h2 id="render-video-title">{label("三维渲染", "3D rendering")}</h2>
      <figure>
        <video controls playsInline preload="metadata" poster={assetPath("/projects/arch-dam-render.jpg")} aria-label={label("QL 水利枢纽三维渲染视频", "3D rendering of the QL water-control project")}>
          <source src={`${base}/render-tour.mp4`} type="video/mp4" />
          <a href={`${base}/render-tour.mp4`}>{label("打开渲染视频", "Open the rendering video")}</a>
        </video>
        <figcaption>{label("QL 水利枢纽 · 三维渲染视频", "QL water-control project · 3D rendering")}</figcaption>
      </figure>
    </section>
    <section className="cad-section" aria-labelledby="cad-title">
      <SectionDivider motif="reeds"/><div className="cad-heading">
        <div><h2 id="cad-title">{label("枢纽布置图", "General layout")}</h2><p>{label("点击图纸，可放大查看", "Select the drawing to view in detail")}</p></div>
      </div>
      <div className="cad-single">
        <button type="button" className="cad-preview" onClick={open} aria-label={label("放大枢纽布置图", "Enlarge the general layout")}>
          <div className="cad-thumbnail"><img src={`${base}/drawing-1-thumb.webp`} width="1200" height="848" alt={drawing[lang]} loading="lazy" /><Maximize2 size={18} aria-hidden="true" /></div>
          <span className="cad-caption">{label("QL 水利枢纽 · 拱坝平面布置图", "QL water-control project · Arch-dam plan layout")}</span>
        </button>
      </div>
    </section>
    <dialog ref={dialog} className="cad-dialog" aria-labelledby="drawing-viewer-title" onClick={event => { if (event.target === dialog.current) dialog.current?.close(); }}>
      <div className="cad-dialog-bar">
        <h3 id="drawing-viewer-title">{drawing[lang]}</h3>
        <button type="button" className="cad-icon-button" onClick={() => dialog.current?.close()} aria-label={label("关闭图纸", "Close drawing")}><X size={22} /></button>
      </div>
      <div className="cad-dialog-tools">
        <div className="cad-tool-group"><button type="button" className="cad-icon-button" onClick={() => setZoom(z => Math.max(1, z - .5))} disabled={zoom === 1} aria-label={label("缩小", "Zoom out")}><ZoomOut size={19} /></button><span className="cad-zoom" aria-live="polite">{Math.round(zoom * 100)}%</span><button type="button" className="cad-icon-button" onClick={() => setZoom(z => Math.min(3, z + .5))} disabled={zoom === 3} aria-label={label("放大", "Zoom in")}><ZoomIn size={19} /></button></div>
        <a href={`${base}/drawing-1.png`} target="_blank" rel="noopener noreferrer" className="text-link">{label("查看原图", "Full-size image")}<ExternalLink size={15} /></a>
      </div>
      <div className="cad-dialog-image" ref={viewer}>
        <img src={`${base}/drawing-1.png`} alt={drawing[lang]} style={{ width: `${zoom * 100}%` }} width="4400" height="3109" />
      </div>
    </dialog>
  </div>;
}
