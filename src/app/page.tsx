import Navbar from "./components/Navbar";
import IncidentPlayer from "./components/IncidentPlayer";
import IncidentList from "./components/IncidentList";
import TimelineRuler from "./components/TimelineRuler";

export default function Home() {
  return (
    <div className="font-sans min-h-screen h-screen overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-row gap-8 p-8 overflow-hidden">
        <div className="flex-[0_0_60%] max-w-[60%] flex items-center justify-center h-full">
          <IncidentPlayer />
        </div>
        <div className="flex-[0_0_40%] max-w-[40%] flex items-center justify-center h-full">
          <IncidentList />
        </div>
      </div>
      <div className="flex items-center justify-center pb-4 overflow-x-auto w-full">
        <div className="min-w-[900px]">
          <TimelineRuler />
        </div>
      </div>
    </div>
  );
}
