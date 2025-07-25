"use client";
import React from "react";
import IncidentGrid from "./IncidentGridItem";

export default function IncidentList() {
  return (
    <div className="w-full h-full p-6 bg-[#181818] rounded-lg shadow-md flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-white">Incident List</h2>
      <IncidentGrid />
    </div>
  );
}
