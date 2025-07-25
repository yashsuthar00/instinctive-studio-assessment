"use client";
import React, { useState, useEffect } from "react";

function IncidentPlayerSkeleton() {
  return (
    <div className="w-full h-full bg-[#222] flex items-center justify-center rounded relative overflow-hidden animate-pulse">
      <div className="absolute inset-0 w-full h-full bg-gray-700 rounded" />
      <div className="absolute top-2 left-2 bg-gray-800 text-gray-500 text-xs px-3 py-1 rounded w-24 h-6" />
      <div className="absolute bottom-2 left-2 bg-gray-800 text-gray-500 text-sm font-semibold px-4 py-1 rounded w-24 h-6" />
      <div className="absolute bottom-2 right-2 flex flex-row gap-2">
        <div className="w-24 h-24 bg-gray-800 rounded" />
        <div className="w-24 h-24 bg-gray-800 rounded" />
      </div>
    </div>
  );
}

export default function IncidentPlayer() {
  // Simulate loading for demo
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // Camera data
  const cameras = [
    {
      name: "Camera 01",
      imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      dateTime: "2025-07-26 14:32:10",
    },
    {
      name: "Camera 02",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      dateTime: "2025-07-26 14:32:10",
    },
    {
      name: "Camera 03",
      imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      dateTime: "2025-07-26 14:32:10",
    },
  ];
  const [mainIdx, setMainIdx] = useState(0);

  // Get the other cameras for the bottom right
  const otherCams = cameras.filter((_, idx) => idx !== mainIdx);

  if (loading) {
    return (
      <div className="w-full h-full p-6 bg-[#181818] rounded-lg shadow-md flex flex-col items-center justify-center">
        <IncidentPlayerSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 bg-[#181818] rounded-lg shadow-md flex flex-col items-center justify-center">
      <div className="w-full h-full bg-[#222] flex items-center justify-center rounded relative overflow-hidden">
        <img src={cameras[mainIdx].imageUrl} alt="Incident" className="absolute inset-0 w-full h-full object-cover rounded" />
        {/* Top-left camera datetime */}
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-3 py-1 rounded z-10">
          {cameras[mainIdx].dateTime}
        </div>
        {/* Bottom-left camera name */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm font-semibold px-4 py-1 rounded z-10">
          {cameras[mainIdx].name}
        </div>
        {/* Bottom-right camera switchers */}
        <div className="absolute bottom-2 right-2 flex flex-row gap-2 z-10">
          {otherCams.map((cam, idx) => (
            <button
              key={cam.name}
              className="w-24 h-24 bg-black/70 rounded flex flex-col items-center justify-center border-2 border-[#444] hover:border-yellow-400 transition"
              onClick={() => {
                const newIdx = cameras.findIndex((c) => c.name === cam.name);
                setMainIdx(newIdx);
              }}
            >
              <img src={cam.imageUrl} alt={cam.name} className="w-full h-16 object-cover rounded-t" />
              <span className="text-sm text-white font-semibold mt-1">{cam.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
