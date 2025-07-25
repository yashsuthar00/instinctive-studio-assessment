import Navbar from "./components/Navbar";
import IncidentPlayer from "./components/IncidentPlayer";
import IncidentList from "./components/IncidentList";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <Navbar />
      <div className="flex flex-row gap-8 p-8">
        <div className="flex-1">
          <IncidentPlayer />
        </div>
        <div className="flex-1">
          <IncidentList />
        </div>
      </div>
    </div>
  );
}
