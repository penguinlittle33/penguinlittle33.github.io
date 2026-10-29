"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { Lang } from "../../lib/content";
type Phase = "idle" | "rain" | "bloom" | "clear" | "sunny";
const flowers = [
  [30,158,14,-9],[56,146,19,5],[83,169,16,-4],[106,151,20,7],
  [134,173,17,-7],[158,145,18,6],[186,162,21,-4],[213,149,16,8],[244,172,19,-6],
];
export default function Meadow({lang}:{lang:Lang}) {
  const [phase,setPhase]=useState<Phase>("idle");
  const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
  const id=useId().replace(/:/g,"");
  const t=(zh:string,en:string)=>lang==="zh"?zh:en;
  useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
  function start() {
    if(phase!=="idle")return;
    timers.current.forEach(clearTimeout);timers.current=[];setPhase("rain");
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const schedule:[Phase,number][]=reduced?[["bloom",450],["clear",900],["sunny",1400]]:[["bloom",1800],["clear",3500],["sunny",4800]];
    for(const [next,delay] of schedule)timers.current.push(setTimeout(()=>setPhase(next),delay));
  }
  const status=phase==="idle"?t("点点云，等花开","Tap the cloud. Watch it bloom."):phase==="rain"?t("雨落下来了……","Here comes the rain…"):phase==="bloom"?t("看，小花长出来了","Look, little flowers are blooming."):phase==="clear"?t("云飘走了，天要晴啦","The cloud is drifting away…"):t("雨过天晴，花开了","A little rain, a little bloom.");
  const active=phase!=="idle";
  return <div className={`meadow is-${phase}`} data-phase={phase} role="group" aria-label={t("小草地互动","Interactive meadow")}>
    <div className="meadow-scene">
      <svg className="meadow-landscape" viewBox="0 0 280 190" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-edge`} cx="50%" cy="40%" r="50%"><stop offset="55%" stopColor="white"/><stop offset="1" stopColor="black"/></radialGradient><mask id={`${id}-ground`} maskUnits="userSpaceOnUse" x="0" y="100" width="280" height="90"><rect x="0" y="100" width="280" height="90" fill={`url(#${id}-edge)`}/></mask>
          <linearGradient id={`${id}-grass`} x2="0" y2="1"><stop stopColor="#accd86"/><stop offset="1" stopColor="#85aa66"/></linearGradient>
          <clipPath id={`${id}-rain`}><rect x="25" y="72" width="220" height="79"/></clipPath>
        </defs>

        <g className="meadow-sun">
          <g stroke="#d9b56a" strokeWidth="2" strokeLinecap="round">{Array.from({length:10},(_,i)=><path key={i} d="M218 20V14" transform={`rotate(${i*36} 218 45)`}/>)}</g>
          <circle cx="218" cy="45" r="18" fill="#edcf86"/>
          <circle cx="213" cy="43" r="1.1" fill="#a88e50"/><circle cx="223" cy="43" r="1.1" fill="#a88e50"/>
          <path d="M214 50Q218 53 222 50" fill="none" stroke="#a88e50" strokeWidth="1.1" strokeLinecap="round"/>
        </g>
        <g mask={`url(#${id}-ground)`}><path d="M0 129Q58 101 135 125T280 114V190H0Z" fill="#c6dbab"/>
        <path d="M0 143Q60 117 135 140T280 129V190H0Z" fill={`url(#${id}-grass)`}/>
        <path d="M0 178Q65 146 155 166T280 158V190H0Z" fill="#8daf70" opacity=".5"/>
        </g><g stroke="#799e60" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity=".7">{Array.from({length:21},(_,i)=><path key={i} d={`M${12+i*13} ${155+(i%4)*8}q-2 -9 -5 -11m5 11q1 -7 5 -9`}/>)}</g>
        <g className="meadow-rain" clipPath={`url(#${id}-rain)`}>{Array.from({length:13},(_,i)=><path className="rain-drop" key={i} d={`M${57+(i%7)*20} ${80+(i%3)*12}l-4 10`} fill="none" stroke="#78a6b4" strokeWidth="1.7" strokeLinecap="round" style={{"--delay":`${(i%6)*-130}ms` } as CSSProperties}/>)}</g>
        {flowers.map(([x,y,h,tilt],i)=><g key={i} transform={`translate(${x} ${y})`}>
          <g className="meadow-flower" style={{"--delay":`${i*85}ms`} as CSSProperties}>
            <path d={`M0 0Q${tilt/2} ${-h/2} ${tilt/3} ${-h}`} fill="none" stroke="#5e854c" strokeWidth="1.5"/>
            <path d={`M0 -5q-9 -9 -9 -2q3 4 9 2M0 -9q8 -8 8 -1q-3 3 -8 1`} fill="#73975c"/>
            <g transform={`translate(${tilt/3} ${-h})`}>
              {Array.from({length:6},(_,j)=><ellipse key={j} cx="0" cy="-4" rx="2.5" ry="4" transform={`rotate(${j*60})`} fill="#fffef7"/>)}
              <circle r="2.7" fill="#dfbb66"/>
            </g>
          </g>
        </g>)}
      </svg>
      <button className="meadow-cloud" type="button" onClick={start} disabled={active} aria-label={t("点击云朵，下雨让小花生长","Tap the cloud to make it rain and grow flowers") }>
        <svg viewBox="0 0 140 76" aria-hidden="true"><path className="cloud-body" d="M29 63C8 63 7 36 26 32C24 11 53 4 65 22C79 4 108 12 110 33C132 31 140 59 117 63Z" stroke="#cbd7cd" strokeWidth="1"/><path d="M43 43h.1m44 0h.1" stroke="#9ba99d" strokeWidth="2.5" strokeLinecap="round"/><path d="M60 48q5 4 10 0" fill="none" stroke="#a5b0a6" strokeWidth="1.2" strokeLinecap="round"/></svg>
      </button>
    </div>
    <span className="meadow-status" role="status" aria-live="polite">{phase==="idle"?"":status}</span>
  </div>;
}
