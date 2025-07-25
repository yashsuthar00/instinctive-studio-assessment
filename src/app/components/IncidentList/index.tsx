"use client";
import React, { useState, useEffect } from "react";
import IncidentGrid from "./IncidentGridItem";
import { DoorOpen, Plus, UserSearch, CheckCheck, AlertTriangle } from "lucide-react";

export default function IncidentList() {
  const [unresolvedCount, setUnresolvedCount] = useState<number>(0);
  const [resolvedCount, setResolvedCount] = useState<number>(0);

  useEffect(() => {
    fetch("/api/incidents?resolved=false")
      .then((res) => res.json())
      .then((data) => setUnresolvedCount(data.length));
    fetch("/api/incidents?resolved=true")
      .then((res) => res.json())
      .then((data) => setResolvedCount(data.length));
  }, []);

  return (
    <div className="w-full h-full p-3 bg-[#181818] rounded-lg shadow-md flex flex-col">
      <div className="flex items-center mb-2">
        <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
        <h2 className="text-lg font-bold text-white mr-2">
          {unresolvedCount} Unresolved incidents
        </h2>
        
        <div className="ml-auto">
          <div className="flex items-center">
            <div className="relative flex items-center mr-2" style={{ width: "78px", height: "24px" }}>
              <span className="absolute z-50 flex items-center justify-center bg-gray-800 rounded-full border border-gray-600"
              style={{ width: "24px", height: "24px", top: "0px", left: "0px" }}>
              <DoorOpen className="w-4 h-4 text-yellow-400" />
              </span>
              <span className="absolute z-40 flex items-center justify-center bg-gray-800 rounded-full border border-gray-600"
              style={{ width: "24px", height: "24px", top: "0px", left: "27px" }}>
              <Plus className="w-4 h-4 text-red-500" />
              </span>
              <span className="absolute z-30 flex items-center justify-center bg-gray-800 rounded-full border border-gray-600"
              style={{ width: "24px", height: "24px", top: "0px", left: "54px" }}>
              <UserSearch className="w-4 h-4 text-blue-500" />
              </span>
            </div>
            <span
              className="text-xs text-gray-400 border border-white rounded-full px-2 py-1 flex items-center justify-center bg-[#222] min-w-[1.5rem] min-h-[1.5rem]"
              style={{ boxSizing: "border-box" }}
            >
              <CheckCheck className="w-3 h-3 mr-1 text-green-500" />
              {resolvedCount} resolved incidents
            </span>
          </div>
        </div>
      </div>
      <IncidentGrid />
    </div>
  );
}
