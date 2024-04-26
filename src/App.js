import { useState } from "react";
import "./App.css";
import HeaderButton from "./component/HeaderButton";
import WeeklyTable from "./component/WeeklyTable";
import Raid from "./component/Raid";
import DailyTable from "./component/DailyTable";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isToday, setIsToday] = useState(true);
  const raidInfo = { raid: "daily1620", party: "mainParty" };
  console.log(window.innerWidth);
  return (
    <div className="container">
      <div className="header"></div>
      <div className="body">
        <WeeklyTable />
      </div>
    </div>
  );
}

export default App;
