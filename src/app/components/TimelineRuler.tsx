"use client";
import React, { useRef, useState, useEffect } from "react";

const HOURS = Array.from({ length: 25 }, (_, i) => i);
const TIMELINE_HEIGHT = 60; // px
const SIDE_PADDING = 48; // px, space on left and right

const exampleIncidents = [
  { time: 2.5, label: "Incident 1" },
  { time: 8, label: "Incident 2" },
  { time: 17.25, label: "Incident 3" },
];

function timeToX(time: number, width: number) {
  // width excludes padding, so add SIDE_PADDING to both sides
  const usableWidth = width - 2 * SIDE_PADDING;
  return SIDE_PADDING + (time / 24) * usableWidth;
}

export default function TimelineRuler() {
  const [scrubberTime, setScrubberTime] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [timelineWidth, setTimelineWidth] = useState(1600);

  // Set timeline width to match container width (min 900px)
  useEffect(() => {
    function updateWidth() {
      if (scrollRef.current) {
        const w = Math.max(scrollRef.current.offsetWidth, 900);
        setTimelineWidth(w);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Scroll to center the end of the timeline on mount
  useEffect(() => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      // Center the end (right) of the ruler (with padding) in the middle
      const scrollTo =
        timelineWidth - containerWidth / 2 - SIDE_PADDING;
      scrollRef.current.scrollLeft = Math.max(0, scrollTo);
    }
  }, [timelineWidth]);

  function handleDrag(e: React.MouseEvent) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    let x = e.clientX - rect.left;
    // Clamp x to the ruler area (with padding)
    x = Math.max(SIDE_PADDING, Math.min(timelineWidth - SIDE_PADDING, x));
    let time =
      ((x - SIDE_PADDING) / (timelineWidth - 2 * SIDE_PADDING)) * 24;
    const snap = exampleIncidents.find(
      (inc) => Math.abs(inc.time - time) < 0.25
    );
    if (snap) time = snap.time;
    setScrubberTime(Math.max(0, Math.min(24, time)));
  }

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto"
      style={{
        width: "100%",
        scrollSnapType: "x mandatory",
        margin: "0 auto",
      }}
    >
      <div
        className="inline-block"
        style={{
          minWidth: timelineWidth,
          width: timelineWidth,
        }}
      >
        <svg
          ref={svgRef}
          width={timelineWidth}
          height={TIMELINE_HEIGHT}
          className="select-none cursor-pointer block"
          onClick={handleDrag}
          style={{
            background: "#181818",
            borderRadius: 8,
            display: "block",
            margin: 0,
            padding: 0,
            width: "100%",
          }}
        >
          {/* Timeline base */}
          <line
            x1={SIDE_PADDING}
            y1={30}
            x2={timelineWidth - SIDE_PADDING}
            y2={30}
            stroke="#444"
            strokeWidth={4}
          />
          {/* Hour ticks */}
          {HOURS.map((h) => (
            <g key={h}>
              <line
                x1={timeToX(h, timelineWidth)}
                y1={20}
                x2={timeToX(h, timelineWidth)}
                y2={40}
                stroke="#888"
                strokeWidth={h % 6 === 0 ? 3 : 1}
              />
              <text
                x={timeToX(h, timelineWidth)}
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
              cx={timeToX(inc.time, timelineWidth)}
              cy={30}
              r={8}
              fill="#e11d48"
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
          {/* Scrubber */}
          <rect
            x={timeToX(scrubberTime, timelineWidth) - 2}
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
