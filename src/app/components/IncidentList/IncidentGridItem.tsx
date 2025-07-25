"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle, ShieldAlert, DoorOpen } from "lucide-react";

interface IncidentGridItemProps {
  id: string;
  imageUrl: string;
  incidentName: string;
  cameraName: string;
  dateTime: string;
  resolved: boolean;
  onResolve: () => void;
}

function getIncidentIcon(incidentName: string) {
  let iconSrc = "/icons/default.svg";
  switch (incidentName.toLowerCase()) {
    case "suspicious activity":
      iconSrc = "./door-orange.svg";
      break;
    case "gun threat":
      iconSrc = "./gun.svg";
      break;
    case "unauthorised access":
      iconSrc = "./door-orange.svg";
      break;
    default:
      iconSrc = "./door.svg";
      break;
  }
  return <img src={iconSrc} alt={incidentName} className="w-6 h-6" />;
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
    <div className="flex items-center bg-[#222] rounded-lg p-1 shadow mb-3 min-h-[120px] w-full">
      <img
        src={imageUrl}
        alt=""
        className="w-28 h-20 object-cover rounded-lg mr-3"
      />
      <div className="flex-6 flex flex-col justify-between h-full">
        <span className="text-base font-semibold text-white flex items-center gap-2 pb-2">
          {getIncidentIcon(incidentName)}
          {incidentName}
        </span>
        <span className="text-xs text-gray-400 pt-2 flex items-center gap-2">
          <img src="./camaras.svg" alt="" className="w-3 h-3 text-gray-400" />
          {cameraName}
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
          </svg>
          {dateTime}
        </span>
      </div>
      <button
        className={`ml-3 px-3 py-2 rounded font-bold text-xs flex items-center gap-2 transition-colors bg-[#222] text-white hover:bg-[#383838] dark:hover:bg-[#222] ${resolved ? 'opacity-60 cursor-not-allowed' : ''}`}
        onClick={onResolve}
        disabled={resolved}
      >
        <span className="text-yellow-400 font-bold">
          {resolved ? 'Resolved' : 'Resolve'}
        </span>
        <span className="text-base">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
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
            cameraName: incident.camera?.name || "Unknown Camera",
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
    <div className="w-full grid grid-cols-1 gap-3 overflow-y-auto" style={{ maxHeight: '100%' }}>
      {incidents.length === 0 ? (
        <div className="text-gray-400 col-span-1">No incidents found</div>
      ) : (
        incidents.map((incident) => (
          <IncidentGridItem key={incident.id} {...incident} />
        ))
      )}
    </div>
  );
}
