"use client";
import React, { useRef, useState } from "react";

const HOURS = Array.from({ length: 25 }, (_, i) => i);
const TIMELINE_WIDTH = 1600; // px (make timeline much wider)
const TIMELINE_HEIGHT = 60; // px

// Example incidents for demo
const exampleIncidents = [
  { time: 2.5, label: "Incident 1" }, // 2:30
  { time: 8, label: "Incident 2" },   // 8:00
  { time: 17.25, label: "Incident 3" }, // 17:15
];

const cameras = [
  { id: "cam1", name: "Main Entrance" },
  { id: "cam2", name: "Parking Lot" },
  { id: "cam3", name: "Vault" },
];

function timeToX(time: number) {
  return (time / 24) * TIMELINE_WIDTH;
}

export default function TimelineRuler() {
  const [scrubberTime, setScrubberTime] = useState(0); // in hours
  const svgRef = useRef<SVGSVGElement>(null);

  // Drag logic (basic, can be improved)
  function handleDrag(e: React.MouseEvent) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    let time = (x / TIMELINE_WIDTH) * 24;
    // Snap to nearest incident if close
    const snap = exampleIncidents.find(
      (inc) => Math.abs(inc.time - time) < 0.25 // snap within 15min
    );
    if (snap) time = snap.time;
    setScrubberTime(Math.max(0, Math.min(24, time)));
  }

  return (
    <div className="w-full flex flex-col items-center overflow-x-auto p-0 m-0">
      <div className="min-w-[900px] p-0 m-0" style={{ width: '900px' }}>
        <svg
          ref={svgRef}
          width={TIMELINE_WIDTH}
          height={TIMELINE_HEIGHT}
          className="select-none cursor-pointer block p-0 m-0"
          onClick={handleDrag}
          style={{ background: "#181818", borderRadius: 8, display: 'block', margin: 0, padding: 0 }}
        >
          {/* Timeline base */}
          <line x1={0} y1={30} x2={TIMELINE_WIDTH} y2={30} stroke="#444" strokeWidth={4} />
          {/* Hour ticks */}
          {HOURS.map((h) => (
            <g key={h}>
              <line
                x1={timeToX(h)}
                y1={20}
                x2={timeToX(h)}
                y2={40}
                stroke="#888"
                strokeWidth={h % 6 === 0 ? 3 : 1}
              />
              <text
                x={timeToX(h)}
                y={50}
                fill="#aaa"
                fontSize={h % 6 === 0 ? 14 : 10}
                textAnchor="middle"
              >
                {h === 0 ? "00:00" : h === 24 ? "24:00" : `${h}:00`}
              </text>
            </g>
          ))}
          {/* Incident markers */}
          {exampleIncidents.map((inc, i) => (
            <circle
              key={i}
              cx={timeToX(inc.time)}
              cy={30}
              r={8}
              fill="#e11d48"
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
          {/* Scrubber */}
          <rect
            x={timeToX(scrubberTime) - 2}
            y={10}
            width={4}
            height={40}
            fill="#facc15"
            rx={2}
          />
        </svg>
      </div>
    </div>
  );
}
