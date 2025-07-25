import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#131313] border-b border-b-[#ffffff33] font-plus-jakarta-sans pointer-events-none select-none">
      <div className="flex items-center gap-2 text-lg cursor-pointer hover:bg-[#232323] rounded px-2 py-1 pointer-events-auto select-auto transition-colors">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span>
          MANDLAC<span className="font-bold">X</span>
        </span>
      </div>

      <div className="flex-1 flex justify-center gap-12 text-base">
        <span className="flex items-center gap-2 cursor-pointer hover:bg-[#232323] rounded px-2 py-1 pointer-events-auto select-auto transition-colors">
          <img src="./dashboard.svg" alt="" className="h-4 w-4" />
          Dashboard
        </span>
        <span className="flex items-center gap-2 cursor-pointer hover:bg-[#232323] rounded px-2 py-1 pointer-events-auto select-auto transition-colors">
          <img src="./camaras.svg" alt="" className="h-4 w-4" />
          Camaras
        </span>
        <span className="flex items-center gap-2 cursor-pointer hover:bg-[#232323] rounded px-2 py-1 pointer-events-auto select-auto transition-colors">
          <img src="./scenes.svg" alt="" className="h-4 w-4" />
          Scenes
        </span>
        <span className="flex items-center gap-2 cursor-pointer hover:bg-[#232323] rounded px-2 py-1 pointer-events-auto select-auto transition-colors">
          <img src="./incidents.svg" alt="" className="h-4 w-4" />
          Incidents
        </span>
        <span className="flex items-center gap-2 cursor-pointer hover:bg-[#232323] rounded px-2 py-1 pointer-events-auto select-auto transition-colors">
          <img src="./users.svg" alt="" className="h-4 w-4" />
          Users
        </span>
      </div>

      <div className="flex items-center gap-3 cursor-pointer hover:bg-[#232323] rounded px-2 py-1 pointer-events-auto select-auto transition-colors">
        <img src="./Image.png" alt="" className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <span className="font-bold text-lg">Yash Suthar</span>
          <span className="text-sm text-gray-400">yash.demo@email.com</span>
        </div>
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </nav>
  );
}
