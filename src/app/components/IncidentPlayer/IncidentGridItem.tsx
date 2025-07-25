import React from "react";

interface IncidentGridItemProps {
  imageUrl: string;
  incidentName: string;
  cameraName: string;
  dateTime: string;
  resolved: boolean;
  onResolve: () => void;
}

export default function IncidentGridItem({
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
        alt={incidentName}
        className="w-16 h-16 object-cover rounded mr-4"
      />
      <div className="flex-1 flex flex-col">
        <span className="text-lg font-semibold text-white">{incidentName}</span>
        <span className="text-sm text-gray-400">{cameraName}</span>
        <span className="text-xs text-gray-500">{dateTime}</span>
      </div>
      <button
        className={`ml-4 px-4 py-2 rounded font-bold text-sm ${resolved ? 'bg-green-700 text-white' : 'bg-red-700 text-white hover:bg-red-800'}`}
        onClick={onResolve}
        disabled={resolved}
      >
        {resolved ? 'Resolved' : 'Resolve'}
      </button>
    </div>
  );
}
