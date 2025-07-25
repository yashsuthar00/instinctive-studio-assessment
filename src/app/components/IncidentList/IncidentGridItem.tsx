"use client";
import React, { useEffect, useState } from "react";

interface IncidentGridItemProps {
  id: string;
  imageUrl: string;
  incidentName: string;
  cameraName: string;
  dateTime: string;
  resolved: boolean;
  onResolve: () => void;
}

function IncidentGridItem({
  id,
  imageUrl,
  incidentName,
  cameraName,
  dateTime,
  resolved,
  onResolve,
}: IncidentGridItemProps) {
  return (
    <div className="flex items-center bg-[#222] rounded-lg p-4 shadow mb-4">
      <img
        src={imageUrl}
        alt=""
        className="w-24 h-24 object-cover rounded mr-4" // Increased size
      />
      <div className="flex-1 flex flex-col">
        <span className="text-lg font-semibold text-white">{incidentName}</span>
        <span className="text-sm text-gray-400">{cameraName}</span>
        <span className="text-xs text-gray-500">{dateTime}</span>
      </div>
      <button
        className={`ml-4 px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-colors bg-[#222] text-white hover:bg-[#383838] dark:hover:bg-[#222] ${resolved ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={onResolve}
        disabled={resolved}
      >
        {resolved ? 'Resolved' : 'Resolve'}
        <span className="text-lg">&gt;</span>
      </button>
    </div>
  );
}

export default function IncidentGrid() {
  const [incidents, setIncidents] = useState<IncidentGridItemProps[]>([]);

  useEffect(() => {
    fetch("/api/incidents?resolved=false")
      .then((res) => res.json())
      .then((data) => {
        setIncidents(
          data.map((incident: any) => ({
            id: incident.id,
            imageUrl: incident.thumbnailUrl || "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=64&q=80",
            incidentName: incident.type,
            cameraName: incident.cameraId,
            dateTime: new Date(incident.tsStart).toLocaleString(),
            resolved: incident.resolved,
            onResolve: () => handleResolve(incident.id),
          }))
        );
      });
  }, []);

  function handleResolve(id: string) {
    fetch(`/api/incidents/${id}/resolve`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((updated) => {
        setIncidents((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, resolved: true } : item
          )
        );
      });
  }

  return (
    <div>
      {incidents.length === 0 ? (
        <div className="text-gray-400">No incidents found</div>
      ) : (
        incidents.map((incident) => (
          <IncidentGridItem key={incident.id} {...incident} />
        ))
      )}
    </div>
  );
}
