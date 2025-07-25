"use client";
import React from "react";

export default function IncidentPlayer() {
  return (
    <div className="w-full h-full p-6 bg-[#181818] rounded-lg shadow-md flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Incident Player</h2>
      {/* Add player UI or details here */}
      <div className="w-full h-64 bg-[#222] flex items-center justify-center rounded">
        <span className="text-gray-400">No incident selected</span>
      </div>
    </div>
  );
}
